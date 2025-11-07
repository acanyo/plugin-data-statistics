package com.xhhao.dataStatistics.service.impl;

import cn.hutool.core.util.StrUtil;
import cn.hutool.crypto.SecureUtil;
import cn.hutool.crypto.digest.DigestUtil;
import cn.hutool.crypto.symmetric.AES;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xhhao.dataStatistics.service.SettingConfigGetter;
import com.xhhao.dataStatistics.service.UmamiService;
import com.xhhao.dataStatistics.vo.UmamiStatisticsVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import run.halo.app.extension.ConfigMap;
import run.halo.app.extension.Metadata;
import run.halo.app.extension.ReactiveExtensionClient;

import java.time.Duration;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Umami服务实现类
 *
 * @author Handsome
 * @since 1.0.0
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class UmamiServiceImpl implements UmamiService {

    private static final String CONFIG_MAP_NAME = "plugin-dataStatistics-umami-token";
    private static final String TOKEN_KEY = "encryptedToken";
    private static final String AES_KEY_SEED = "xhhaocom-umami-token-key-2024";
    private static final byte[] AES_KEY_BYTES = DigestUtil.sha256(AES_KEY_SEED);
    private static final AES AES = SecureUtil.aes(AES_KEY_BYTES);
    private static final ObjectMapper OBJECT_MAPPER = new ObjectMapper();

    private final ReactiveExtensionClient client;
    private final SettingConfigGetter settingConfigGetter;

    @Override
    public Mono<String> getToken() {
        return getTokenFromConfigMap()
            .filter(StrUtil::isNotBlank)
            .switchIfEmpty(fetchAndSaveToken())
            .onErrorResume(e -> {
                log.warn("获取token失败，重新获取: {}", e.getMessage());
                return fetchAndSaveToken();
            });
    }

    private Mono<String> fetchAndSaveToken() {
        return fetchTokenFromApi()
            .flatMap(token -> saveTokenToConfigMap(token).thenReturn(token));
    }

    private Mono<String> fetchTokenFromApi() {
        return settingConfigGetter.getUmamiConfig()
            .flatMap(config -> {
                if (StrUtil.hasBlank(config.getSiteUrl(), config.getUserName(), config.getUserPassWord())) {
                    return Mono.error(new IllegalStateException("Umami配置不完整"));
                }

                String apiUrl = StrUtil.addSuffixIfNot(config.getSiteUrl(), "/") + "api/auth/login";
                Map<String, String> body = Map.of("username", config.getUserName(), "password", config.getUserPassWord());

                return WebClient.create()
                    .post()
                    .uri(apiUrl)
                    .body(BodyInserters.fromValue(body))
                    .retrieve()
                    .bodyToMono(String.class)
                    .timeout(Duration.ofSeconds(30))
                    .<String>handle((response, sink) -> {
                        try {
                            sink.next(OBJECT_MAPPER.readTree(response).get("token").asText());
                        } catch (Exception e) {
                            sink.error(new RuntimeException("解析响应失败", e));
                        }
                    })
                    .filter(StrUtil::isNotBlank)
                    .switchIfEmpty(Mono.error(new IllegalStateException("Umami API返回的token为空")))
                    .doOnSuccess(token -> log.info("成功获取Umami token"))
                    .onErrorMap(e -> new RuntimeException("调用Umami API失败: " + e.getMessage(), e));
            });
    }

    private Mono<Void> saveTokenToConfigMap(String token) {
        String encryptedToken = AES.encryptBase64(token);
        return client.fetch(ConfigMap.class, CONFIG_MAP_NAME)
            .switchIfEmpty(createConfigMap(encryptedToken))
            .flatMap(configMap -> {
                Map<String, String> data = new HashMap<>(configMap.getData() != null ? configMap.getData() : Map.of());
                data.put(TOKEN_KEY, encryptedToken);
                configMap.setData(data);
                return client.update(configMap);
            })
            .then()
            .doOnSuccess(v -> log.info("成功保存token到ConfigMap"));
    }

    private Mono<ConfigMap> createConfigMap(String encryptedToken) {
        ConfigMap configMap = new ConfigMap();
        Metadata metadata = new Metadata();
        metadata.setName(CONFIG_MAP_NAME);
        configMap.setMetadata(metadata);
        configMap.setData(new HashMap<>(Map.of(TOKEN_KEY, encryptedToken)));
        return client.create(configMap);
    }

    private Mono<String> getTokenFromConfigMap() {
        return client.fetch(ConfigMap.class, CONFIG_MAP_NAME)
            .mapNotNull(configMap -> {
                String encryptedToken = configMap.getData() != null 
                    ? configMap.getData().get(TOKEN_KEY) 
                    : null;
                return StrUtil.isNotBlank(encryptedToken) ? AES.decryptStr(encryptedToken) : null;
            })
            .onErrorResume(e -> {
                log.warn("从ConfigMap获取token失败", e);
                return Mono.empty();
            });
    }

    private Mono<String> getBaseUrl() {
        return settingConfigGetter.getUmamiConfig()
            .map(config -> StrUtil.addSuffixIfNot(config.getSiteUrl(), "/") + "api")
            .switchIfEmpty(Mono.error(new IllegalStateException("Umami配置不完整")));
    }

    private WebClient createWebClient(String token) {
        return WebClient.builder()
            .defaultHeader("Authorization", "Bearer " + token)
            .build();
    }

    @Override
    public Mono<UmamiStatisticsVO> getWebsites() {
        return Mono.zip(getToken(), getBaseUrl())
            .flatMap(tuple -> {
                String token = tuple.getT1();
                String baseUrl = tuple.getT2();
                return createWebClient(token)
                    .get()
                    .uri(baseUrl + "/websites")
                    .retrieve()
                    .bodyToMono(String.class)
                    .timeout(Duration.ofSeconds(30))
                    .<UmamiStatisticsVO>handle((response, sink) -> {
                        try {
                            JsonNode jsonNode = OBJECT_MAPPER.readTree(response);
                            UmamiStatisticsVO vo = new UmamiStatisticsVO();
                            List<UmamiStatisticsVO.Website> websites = new ArrayList<>();
                            // API返回的是 { data: [...], count: 1, page: 1, pageSize: 10 }
                            JsonNode dataNode = jsonNode.path("data");
                            if (dataNode.isArray()) {
                                for (JsonNode websiteNode : dataNode) {
                                    UmamiStatisticsVO.Website website = new UmamiStatisticsVO.Website();
                                    website.setId(websiteNode.path("id").asText(""));
                                    website.setName(websiteNode.path("name").asText(""));
                                    website.setDomain(websiteNode.path("domain").asText(""));
                                    website.setShareId(websiteNode.path("shareId").asText(""));
                                    website.setCreatedAt(websiteNode.path("createdAt").asLong(0));
                                    websites.add(website);
                                }
                            }
                            vo.setWebsites(websites);
                            sink.next(vo);
                        } catch (Exception e) {
                            sink.error(new RuntimeException("解析网站列表失败", e));
                        }
                    })
                    .onErrorMap(e -> new RuntimeException("获取网站列表失败: " + e.getMessage(), e));
            });
    }

    @Override
    public Mono<UmamiStatisticsVO.WebsiteStats> getWebsiteStats(String websiteId, Long startAt, Long endAt) {
        return Mono.zip(getToken(), getBaseUrl())
            .flatMap(tuple -> {
                String token = tuple.getT1();
                String baseUrl = tuple.getT2();
                String url = baseUrl + "/websites/" + websiteId + "/stats?startAt=" + startAt + "&endAt=" + endAt;
                return createWebClient(token)
                    .get()
                    .uri(url)
                    .retrieve()
                    .bodyToMono(String.class)
                    .timeout(Duration.ofSeconds(30))
                    .<UmamiStatisticsVO.WebsiteStats>handle((response, sink) -> {
                        try {
                            JsonNode jsonNode = OBJECT_MAPPER.readTree(response);
                            UmamiStatisticsVO.WebsiteStats stats = new UmamiStatisticsVO.WebsiteStats();
                            stats.setPageviews(jsonNode.path("pageviews").asLong(0));
                            stats.setUniques(jsonNode.path("uniques").asLong(0));
                            stats.setBounces(jsonNode.path("bounces").asLong(0));
                            stats.setTotalTime(jsonNode.path("totalTime").asLong(0));

                            // 解析统计数据
                            parseStatsData(jsonNode.path("pageviewsData"), stats.getPageviewsData());
                            parseStatsData(jsonNode.path("uniquesData"), stats.getUniquesData());
                            parseStatsData(jsonNode.path("bouncesData"), stats.getBouncesData());
                            parseStatsData(jsonNode.path("totalTimeData"), stats.getTotalTimeData());

                            sink.next(stats);
                        } catch (Exception e) {
                            sink.error(new RuntimeException("解析统计数据失败", e));
                        }
                    })
                    .onErrorMap(e -> new RuntimeException("获取统计数据失败: " + e.getMessage(), e));
            });
    }

    private void parseStatsData(JsonNode dataNode, List<UmamiStatisticsVO.StatsItem> items) {
        if (dataNode.isArray()) {
            for (JsonNode itemNode : dataNode) {
                UmamiStatisticsVO.StatsItem item = new UmamiStatisticsVO.StatsItem();
                item.setX(itemNode.path("x").asText(""));
                item.setY(itemNode.path("y").asLong(0));
                items.add(item);
            }
        }
    }

    @Override
    public Mono<UmamiStatisticsVO.RealtimeData> getRealtimeData(String websiteId) {
        return Mono.zip(getToken(), getBaseUrl())
            .flatMap(tuple -> {
                String token = tuple.getT1();
                String baseUrl = tuple.getT2();
                // 尝试使用 /realtime 端点（不带websiteId）
                String url = baseUrl + "/realtime?websiteId=" + websiteId;
                return createWebClient(token)
                    .get()
                    .uri(url)
                    .retrieve()
                    .onStatus(status -> status.value() == 404, response -> {
                        log.warn("实时数据API端点不存在(404)，返回空数据");
                        return Mono.error(new RuntimeException("实时数据API端点不存在"));
                    })
                    .bodyToMono(String.class)
                    .timeout(Duration.ofSeconds(30))
                    .<UmamiStatisticsVO.RealtimeData>handle((response, sink) -> {
                        if (response == null || response.trim().isEmpty()) {
                            // 返回空数据
                            sink.next(new UmamiStatisticsVO.RealtimeData());
                            return;
                        }
                        try {
                            JsonNode jsonNode = OBJECT_MAPPER.readTree(response);
                            UmamiStatisticsVO.RealtimeData realtime = new UmamiStatisticsVO.RealtimeData();
                            realtime.setPageviews(jsonNode.path("pageviews").asLong(0));
                            realtime.setVisitors(jsonNode.path("visitors").asLong(0));

                            JsonNode dataNode = jsonNode.path("data");
                            List<UmamiStatisticsVO.RealtimeItem> items = new ArrayList<>();
                            if (dataNode.isArray()) {
                                for (JsonNode itemNode : dataNode) {
                                    UmamiStatisticsVO.RealtimeItem item = new UmamiStatisticsVO.RealtimeItem();
                                    item.setX(itemNode.path("x").asText(""));
                                    item.setY(itemNode.path("y").asLong(0));
                                    items.add(item);
                                }
                            }
                            realtime.setData(items);

                            sink.next(realtime);
                        } catch (Exception e) {
                            log.error("解析实时数据失败: {}", response, e);
                            // 解析失败时返回空数据而不是抛出错误
                            sink.next(new UmamiStatisticsVO.RealtimeData());
                        }
                    })
                    .onErrorResume(e -> {
                        log.warn("获取实时数据失败，返回空数据: {}", e.getMessage());
                        // 返回空数据而不是抛出错误
                        return Mono.just(new UmamiStatisticsVO.RealtimeData());
                    });
            });
    }

    @Override
    public Mono<String> getWebsiteId() {
        return settingConfigGetter.getUmamiConfig()
            .flatMap(config -> {
                // 如果配置中指定了websiteId，直接使用
                if (StrUtil.isNotBlank(config.getWebsiteId())) {
                    return Mono.just(config.getWebsiteId());
                }
                // 否则自动获取第一个网站
                return getWebsites()
                    .map(vo -> {
                        if (vo.getWebsites() != null && !vo.getWebsites().isEmpty()) {
                            return vo.getWebsites().get(0).getId();
                        }
                        throw new IllegalStateException("未找到可用的网站，请先在Umami中创建网站或在设置中指定websiteId");
                    });
            });
    }
}

