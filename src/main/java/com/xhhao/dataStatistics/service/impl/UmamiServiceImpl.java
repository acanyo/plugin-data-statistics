package com.xhhao.dataStatistics.service.impl;

import cn.hutool.cache.CacheUtil;
import cn.hutool.cache.impl.TimedCache;
import cn.hutool.core.util.StrUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.xhhao.dataStatistics.service.SettingConfigGetter;
import com.xhhao.dataStatistics.service.UmamiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;

@Component
@RequiredArgsConstructor
@Slf4j
public class UmamiServiceImpl implements UmamiService {

    private final SettingConfigGetter settingConfigGetter;
    private final WebClient.Builder webClientBuilder;

    private static final long TOKEN_CACHE_EXPIRE_MS = Duration.ofHours(24).toMillis();
    private final TimedCache<String, String> tokenCache = CacheUtil.newTimedCache(TOKEN_CACHE_EXPIRE_MS);

    private static final String CACHE_KEY_PREFIX = "umami_token_";

    @Override
    public Mono<String> getToken() {
        return settingConfigGetter.getUmamiConfig()
            .flatMap(config -> {
                if (StrUtil.isBlank(config.getSiteUrl()) || StrUtil.isBlank(config.getUserName()) 
                    || StrUtil.isBlank(config.getUserPassWord())) {
                    return Mono.error(new IllegalStateException("Umami 配置不完整"));
                }

                String cacheKey = CACHE_KEY_PREFIX + normalizeBaseUrl(config.getSiteUrl()) + "_" + config.getUserName();
                String cachedToken = tokenCache.get(cacheKey, false);
                if (cachedToken != null) {
                    return Mono.just(cachedToken);
                }

                log.info("缓存未命中，请求新的 Umami token");
                return requestToken(config)
                    .map(response -> {
                        tokenCache.put(cacheKey, response.token());
                        return response.token();
                    });
            });
    }

    private Mono<LoginResponse> requestToken(SettingConfigGetter.UmamiConfig config) {
        String baseUrl = normalizeBaseUrl(config.getSiteUrl());
        if (baseUrl.isEmpty()) {
            return Mono.error(new IllegalStateException("Umami 站点地址为空"));
        }
        
        WebClient client = webClientBuilder.baseUrl(baseUrl).build();
        LoginRequest request = new LoginRequest(config.getUserName(), config.getUserPassWord());

        return client.post()
            .uri("/api/auth/login")
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(request)
            .retrieve()
            .bodyToMono(LoginResponse.class)
            .doOnSuccess(response -> log.info("成功获取 Umami token"))
            .doOnError(error -> log.error("请求 Umami token 失败: {}", error.getMessage()))
            .onErrorResume(ex -> Mono.error(new IllegalStateException("请求 Umami token 失败: " + ex.getMessage(), ex)));
    }


    private String normalizeBaseUrl(String siteUrl) {
        return StrUtil.isBlank(siteUrl) ? "" : StrUtil.removeSuffix(siteUrl.trim(), "/");
    }

    private record LoginRequest(String username, String password) {}
    private record LoginResponse(String token, User user) {}
    private record User(String id, String username, String role, String createdAt, boolean isAdmin) {}


    @Override
    public Mono<JsonNode> getWebsites() {
        return getToken()
            .flatMap(token -> getBaseUrl()
                .flatMap(baseUrl -> {
                    if (StrUtil.isBlank(baseUrl)) {
                        return Mono.error(new IllegalStateException("Umami 站点地址未配置"));
                    }
                    return webClientBuilder.baseUrl(baseUrl).build()
                        .get()
                        .uri("/api/websites")
                        .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .retrieve()
                        .bodyToMono(JsonNode.class);
                }));
    }
    @Override
    public Mono<JsonNode> getRealtimeData(String websiteId) {
        return resolveWebsiteId(websiteId)
            .flatMap(id -> getToken()
                .flatMap(token -> getBaseUrl()
                    .flatMap(baseUrl -> {
                        if (StrUtil.isBlank(baseUrl)) {
                            return Mono.error(new IllegalStateException("Umami 站点地址未配置"));
                        }
                        return webClientBuilder.baseUrl(baseUrl).build()
                            .get()
                            .uri("/api/websites/" + id + "/active")
                            .header(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                            .retrieve()
                            .bodyToMono(JsonNode.class);
                    })));
    }

    @Override
    public Mono<JsonNode> getVisitStatistics(String websiteId, String type) {
        ZoneId zoneId = ZoneId.of("Asia/Shanghai");
        return resolveWebsiteId(websiteId)
            .flatMap(id -> {
                LocalDateTime now = LocalDateTime.now(zoneId);
                var timeRange = switch (type.toLowerCase()) {
                    case "daily" -> new TimeRange(now.minusDays(1), "day");
                    case "weekly" -> new TimeRange(now.minusDays(7), "day");
                    case "monthly" -> new TimeRange(now.minusDays(30), "day");
                    case "quarterly" -> new TimeRange(now.minusDays(90), "month");
                    case "yearly" -> new TimeRange(now.minusDays(365), "month");
                    default -> null;
                };
                
                if (timeRange == null) {
                    return Mono.error(new IllegalArgumentException("不支持的统计类型: " + type));
                }

                long startAt = timeRange.start.atZone(zoneId).toInstant().toEpochMilli();
                long endAt = now.atZone(zoneId).toInstant().toEpochMilli();
                
                return fetchVisitStatistics(id, startAt, endAt, timeRange.unit);
            });
    }
    
    private record TimeRange(LocalDateTime start, String unit) {}

    @Override
    public Mono<JsonNode> getRealtimeVisitStatistics(String websiteId) {
        return resolveWebsiteId(websiteId).flatMap(this::getRealtimeData);
    }
    
    private Mono<JsonNode> fetchVisitStatistics(String websiteId, long startAt, long endAt, String unit) {
        return getToken()
            .flatMap(token -> getBaseUrl()
                .flatMap(baseUrl -> {
                    if (StrUtil.isBlank(baseUrl)) {
                        return Mono.error(new IllegalStateException("Umami 站点地址未配置"));
                    }
                    return webClientBuilder.baseUrl(baseUrl)
                        .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .build()
                        .get()
                        .uri(uriBuilder -> uriBuilder
                            .path("/api/websites/{websiteId}/stats")
                            .queryParam("startAt", startAt)
                            .queryParam("endAt", endAt)
                            .queryParam("unit", unit)
                            .queryParam("timezone", "Asia/Shanghai")
                            .build(websiteId))
                        .retrieve()
                        .bodyToMono(JsonNode.class);
                }));
    }



    private Mono<String> resolveWebsiteId(String websiteId) {
        if (StrUtil.isNotBlank(websiteId)) {
            return Mono.just(websiteId);
        }
        return settingConfigGetter.getUmamiConfig()
            .flatMap(config -> {
                if (StrUtil.isNotBlank(config.getWebsiteId())) {
                    return Mono.just(config.getWebsiteId());
                }
                return getWebsites()
                    .map(json -> {
                        if (json.isArray() && json.size() > 0) {
                            JsonNode first = json.get(0);
                            return first.has("id") ? first.get("id").asText() 
                                : first.has("websiteId") ? first.get("websiteId").asText() : null;
                        }
                        throw new IllegalStateException("未找到可用的网站");
                    });
            });
    }

    private Mono<String> getBaseUrl() {
        return settingConfigGetter.getUmamiConfig()
            .map(config -> normalizeBaseUrl(config.getSiteUrl()))
            .defaultIfEmpty("");
    }
}


