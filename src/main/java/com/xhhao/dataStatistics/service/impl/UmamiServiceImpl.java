package com.xhhao.dataStatistics.service.impl;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.function.Function;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.reactive.function.client.WebClientRequestException;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.xhhao.dataStatistics.common.Constants;
import com.xhhao.dataStatistics.service.SettingConfigGetter;
import com.xhhao.dataStatistics.service.UmamiService;

import cn.hutool.cache.CacheUtil;
import cn.hutool.cache.impl.TimedCache;
import cn.hutool.core.util.StrUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;
import reactor.util.retry.Retry;

@Component
@RequiredArgsConstructor
@Slf4j
public class UmamiServiceImpl implements UmamiService {

    private final SettingConfigGetter settingConfigGetter;
    private final WebClient.Builder webClientBuilder;
    private final ObjectMapper objectMapper = new ObjectMapper();

    private static final long TOKEN_CACHE_EXPIRE_MS = Duration.ofHours(Constants.Cache.UMAMI_TOKEN_CACHE_HOURS).toMillis();
    private final TimedCache<String, String> tokenCache = CacheUtil.newTimedCache(TOKEN_CACHE_EXPIRE_MS);

    private static final String CACHE_KEY_PREFIX = "umami_token_";

    /**
     * 通用重试策略
     */
    private <T> Mono<T> withRetry(Mono<T> mono, String operationName) {
        return mono.retryWhen(Retry.backoff(3, Duration.ofSeconds(1))
            .maxBackoff(Duration.ofSeconds(5))
            .filter(throwable -> throwable instanceof WebClientRequestException)
            .doBeforeRetry(signal -> log.warn("{} 请求失败，正在重试 ({}/3): {}",
                operationName, signal.totalRetries() + 1, signal.failure().getMessage())));
    }

    /**
     * 通用 API 请求方法
     */
    private <T> Mono<T> executeApiRequest(
            Function<WebClient, Mono<T>> requestBuilder,
            String operationName) {
        return getToken()
            .flatMap(token -> getBaseUrl()
                .flatMap(baseUrl -> {
                    if (StrUtil.isBlank(baseUrl)) {
                        return Mono.error(new IllegalStateException("Umami 站点地址未配置"));
                    }
                    WebClient client = webClientBuilder
                        .baseUrl(baseUrl)
                        .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + token)
                        .build();
                    return withRetry(requestBuilder.apply(client), operationName);
                }))
            .doOnError(error -> log.debug("{} 失败: {}", operationName, error.getMessage()));
    }

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

                log.debug("缓存未命中，请求新的 Umami token");
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

        return withRetry(
            client.post()
                .uri("/api/auth/login")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(request)
                .retrieve()
                .bodyToMono(LoginResponse.class),
            "Umami 登录"
        ).doOnError(error -> log.error("请求 Umami token 失败: {}", error.getMessage()))
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
        return executeApiRequest(
            client -> client.get()
                .uri("/api/websites")
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(body -> parseJsonBody(body, "获取 Umami 网站列表")),
            "获取 Umami 网站列表"
        );
    }

    @Override
    public Mono<JsonNode> getRealtimeData(String websiteId) {
        return resolveWebsiteId(websiteId)
            .flatMap(id -> executeApiRequest(
                client -> client.get()
                    .uri(uriBuilder -> uriBuilder
                        .path("/api/realtime/{websiteId}")
                        .queryParam("timezone", Constants.DEFAULT_TIMEZONE)
                        .build(id))
                    .retrieve()
                    .bodyToMono(String.class)
                    .flatMap(body -> parseJsonBody(body, "获取实时数据")),
                "获取实时数据"
            ));
    }

    @Override
    public Mono<JsonNode> getVisitStatistics(String websiteId, String type) {
        return resolveWebsiteId(websiteId)
            .flatMap(id -> {
                LocalDateTime now = LocalDateTime.now(Constants.DEFAULT_ZONE_ID);
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

                long startAt = timeRange.start.atZone(Constants.DEFAULT_ZONE_ID).toInstant().toEpochMilli();
                long endAt = now.atZone(Constants.DEFAULT_ZONE_ID).toInstant().toEpochMilli();
                
                return fetchVisitStatistics(id, startAt, endAt, timeRange.unit);
            });
    }
    
    private record TimeRange(LocalDateTime start, String unit) {}

    @Override
    public Mono<JsonNode> getRealtimeVisitStatistics(String websiteId) {
        return resolveWebsiteId(websiteId).flatMap(this::getRealtimeData);
    }
    
    private Mono<JsonNode> fetchVisitStatistics(String websiteId, long startAt, long endAt, String unit) {
        return executeApiRequest(
            client -> client.get()
                .uri(uriBuilder -> uriBuilder
                    .path("/api/websites/{websiteId}/stats")
                    .queryParam("startAt", startAt)
                    .queryParam("endAt", endAt)
                    .queryParam("unit", unit)
                    .queryParam("timezone", Constants.DEFAULT_TIMEZONE)
                    .build(websiteId))
                .retrieve()
                .bodyToMono(String.class)
                .flatMap(body -> parseJsonBody(body, "获取访问统计")),
            "获取访问统计"
        );
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
                        if (json.isArray() && !json.isEmpty()) {
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

    private Mono<JsonNode> parseJsonBody(String body, String operationName) {
        try {
            return Mono.just(objectMapper.readTree(body));
        } catch (Exception e) {
            return Mono.error(new IllegalStateException(operationName + "响应解析失败: " + e.getMessage(), e));
        }
    }
}

