package com.xhhao.dataStatistics.service.impl;

import cn.hutool.core.text.StrFormatter;
import cn.hutool.core.util.StrUtil;
import com.fasterxml.jackson.databind.JsonNode;
import com.xhhao.dataStatistics.service.SettingConfigGetter;
import com.xhhao.dataStatistics.service.UptimeKumaService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.net.URI;
import java.net.URISyntaxException;

@Slf4j
@Component
@RequiredArgsConstructor
public class UptimeKumaServiceImpl implements UptimeKumaService {

    private final SettingConfigGetter settingConfigGetter;
    private final WebClient.Builder webClientBuilder;

    @Override
    public Mono<UptimeStatus> getStatusPage() {
        return settingConfigGetter.getUptimeKumaConfig()
            .flatMap(config -> {
                var statusPageUrl = StrUtil.trim(config.getUptimeUrl());
                if (StrUtil.isBlank(statusPageUrl)) {
                    log.warn("Uptime Kuma 状态页 URL 未配置，请在插件设置中配置");
                    return Mono.error(new IllegalStateException("Uptime Kuma 状态页 URL 未配置，请在插件设置中配置状态页 URL"));
                }

                try {
                    var apiUrl = buildHeartbeatApiUrl(statusPageUrl);
                    return requestStatusData(apiUrl)
                        .map(status -> new UptimeKumaService.UptimeStatus(status, statusPageUrl));
                } catch (URISyntaxException e) {
                    return Mono.error(new IllegalStateException("状态页 URL 不合法: " + e.getMessage(), e));
                }
            });
    }

    private Mono<Integer> requestStatusData(String apiUrl) {
        log.info("请求 Uptime Kuma API: {}", apiUrl);
        return webClientBuilder.build()
            .get()
            .uri(apiUrl)
            .retrieve()
            .bodyToMono(JsonNode.class)
            .map(this::parseStatusData)
            .doOnError(error -> log.error("调用 Uptime Kuma API 失败: {}", error.getMessage()));
    }

    private Integer parseStatusData(JsonNode jsonNode) {
        var uptimeList = jsonNode.get("uptimeList");
        if (uptimeList == null || !uptimeList.isObject()) {
            return 0;
        }

        var counts = new int[2];
        uptimeList.fieldNames().forEachRemaining(key -> {
            var value = uptimeList.get(key).asDouble(0.0);
            counts[1]++;
            if (value != 0.0) {
                counts[0]++;
            }
        });

        if (counts[0] == counts[1]) {
            return 1;
        }
        if (counts[0] == 0) {
            return 0;
        }
        return 2;
    }

    private String buildHeartbeatApiUrl(String statusPageUrl) throws URISyntaxException {
        var uri = new URI(statusPageUrl);

        var baseUrl = uri.getPort() == -1
            ? StrFormatter.format("{}://{}", uri.getScheme(), uri.getHost())
            : StrFormatter.format("{}://{}:{}", uri.getScheme(), uri.getHost(), uri.getPort());

        var segments = StrUtil.splitTrim(StrUtil.nullToEmpty(uri.getPath()), '/');
        var slug = "heartbeat";
        if (!segments.isEmpty() && "status".equalsIgnoreCase(segments.get(0))) {
            slug = StrUtil.blankToDefault(segments.size() >= 2 ? segments.get(1) : null, "heartbeat");
        }

        return StrFormatter.format("{}/api/status-page/heartbeat/{}", baseUrl, slug);
    }
}

