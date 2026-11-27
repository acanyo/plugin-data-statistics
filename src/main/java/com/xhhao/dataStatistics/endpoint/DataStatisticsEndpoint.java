package com.xhhao.dataStatistics.endpoint;

import static org.springdoc.core.fn.builders.apiresponse.Builder.responseBuilder;
import static org.springdoc.core.fn.builders.parameter.Builder.parameterBuilder;
import static org.springdoc.core.fn.builders.schema.Builder.schemaBuilder;

import java.util.Map;

import org.springdoc.webflux.core.fn.SpringdocRouteBuilder;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;

import com.xhhao.dataStatistics.common.ApiResponse;
import com.xhhao.dataStatistics.common.Constants;
import com.xhhao.dataStatistics.service.SettingConfigGetter;
import com.xhhao.dataStatistics.service.StatisticalService;
import com.xhhao.dataStatistics.service.UmamiService;
import com.xhhao.dataStatistics.service.UptimeKumaService;
import com.xhhao.dataStatistics.vo.PieChartVO;

import cn.hutool.core.util.StrUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.endpoint.CustomEndpoint;
import run.halo.app.extension.GroupVersion;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataStatisticsEndpoint implements CustomEndpoint {

    private final String tag = "api.data.statistics.xhhao.com/v1alpha1/statistics";
    private final StatisticalService statisticalService;
    private final UmamiService umamiService;
    private final UptimeKumaService uptimeKumaService;
    private final SettingConfigGetter settingConfigGetter;

    @Override
    public RouterFunction<ServerResponse> endpoint() {
        return SpringdocRouteBuilder.route()
            .GET("/chart/data", this::fetchChartData, builder -> {
                builder.operationId("fetchChartData")
                    .description("获取图表数据源")
                    .tag(tag)
                    .response(responseBuilder()
                        .implementation(PieChartVO.class)
                        .responseCode("200")
                        .description("成功返回图表数据")
                    );
            })
            .POST("/chart/cache/clear", this::clearChartCache, builder -> {
                builder.operationId("clearChartCache")
                    .description("手动清除站内图表统计缓存")
                    .tag(tag)
                    .response(responseBuilder()
                        .responseCode("200")
                        .description("缓存清除成功")
                    );
            })
            .GET("/umami/websites", this::fetchUmamiWebsites, builder -> {
                builder.operationId("fetchUmamiWebsites")
                    .description("获取Umami网站列表")
                    .tag(tag)
                    .response(responseBuilder()
                        .responseCode("200")
                        .description("成功返回网站列表（原始JSON）")
                    );
            })
            .GET("/umami/visits", this::fetchVisits, builder -> {
                builder.operationId("fetchVisits")
                    .description("获取访问统计（支持日、周、月、季、年）")
                    .tag(tag)
                    .parameter(parameterBuilder()
                        .name("type")
                        .description("统计类型：daily, weekly, monthly, quarterly, yearly")
                        .required(true)
                        .schema(schemaBuilder()
                            .type("string")
                            .example("daily")
                        )
                    )
                    .response(responseBuilder()
                        .responseCode("200")
                        .description("成功返回访问统计数据")
                    );
            })
            .GET("/umami/pageviews", this::fetchPageviewsTrend, builder -> {
                builder.operationId("fetchPageviewsTrend")
                    .description("获取访问量与访客时间序列趋势")
                    .tag(tag)
                    .parameter(parameterBuilder()
                        .name("type")
                        .description("统计类型：daily, weekly, monthly, quarterly, yearly")
                        .required(false)
                        .schema(schemaBuilder()
                            .type("string")
                            .example("weekly")
                        )
                    )
                    .response(responseBuilder()
                        .responseCode("200")
                        .description("成功返回时间序列趋势数据")
                    );
            })
            .GET("/umami/metrics", this::fetchUmamiMetrics, builder -> {
                builder.operationId("fetchUmamiMetrics")
                    .description("获取访客画像指标（来源/地区/浏览器/系统/设备/页面）")
                    .tag(tag)
                    .parameter(parameterBuilder()
                        .name("type")
                        .description("统计周期：daily, weekly, monthly, quarterly, yearly")
                        .required(false)
                        .schema(schemaBuilder().type("string").example("monthly"))
                    )
                    .parameter(parameterBuilder()
                        .name("metricType")
                        .description("指标维度：referrer, country, browser, os, device, url")
                        .required(false)
                        .schema(schemaBuilder().type("string").example("referrer"))
                    )
                    .parameter(parameterBuilder()
                        .name("limit")
                        .description("返回条数上限（1-20）")
                        .required(false)
                        .schema(schemaBuilder().type("integer").example("8"))
                    )
                    .response(responseBuilder()
                        .responseCode("200")
                        .description("成功返回访客画像指标列表")
                    );
            })
            .GET("/umami/realtime", this::fetchRealtimeVisits, builder -> {
                builder.operationId("fetchRealtimeVisits")
                    .description("获取实时访问统计")
                    .tag(tag)
                    .response(responseBuilder()
                        .responseCode("200")
                        .description("成功返回实时访问数据")
                    );
            })
            .GET("/uptime/status", this::fetchUptimeKumaStatus, builder -> {
                builder.operationId("fetchUptimeKumaStatus")
                    .description("获取 Uptime Kuma 状态页面数据")
                    .tag(tag)
                    .response(responseBuilder()
                        .responseCode("200")
                        .description("成功返回状态码：1-所有业务正常，0-全部业务异常，2-部分业务异常，-1-未配置状态页 URL")
                    );
            })
            .GET("/github/config", this::fetchGithubConfig, builder -> {
                builder.operationId("fetchGithubConfig")
                    .description("获取 GitHub 配置信息")
                    .tag(tag)
                    .response(responseBuilder()
                        .responseCode("200")
                        .description("成功返回 GitHub 配置")
                    );
            })
            .build();
    }

    private Mono<ServerResponse> handleError(String operation, Throwable e) {
        log.error("{}失败", operation, e);
        return ServerResponse.status(500)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(ApiResponse.error(operation + "失败", e.getMessage()));
    }

    private boolean isValidPeriod(String typeParam) {
        return typeParam.matches("daily|weekly|monthly|quarterly|yearly");
    }

    private Mono<ServerResponse> fetchChartData(ServerRequest request) {
        return statisticalService.getPieChartVO()
            .flatMap(dataSource -> ServerResponse.ok().bodyValue(dataSource))
            .switchIfEmpty(ServerResponse.ok().bodyValue(new PieChartVO()))
            .onErrorResume(e -> handleError("获取图表数据", e));
    }

    private Mono<ServerResponse> clearChartCache(ServerRequest request) {
        statisticalService.clearCache();
        return ServerResponse.ok()
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(Map.of("cleared", true));
    }

    private Mono<ServerResponse> fetchUmamiWebsites(ServerRequest request) {
        return umamiService.getWebsites()
            .flatMap(data -> ServerResponse.ok().bodyValue(data))
            .onErrorResume(e -> handleError("获取 Umami 网站列表", e));
    }

    private Mono<ServerResponse> fetchVisits(ServerRequest request) {
        String typeParam = request.queryParam("type").orElse("daily");
        if (!isValidPeriod(typeParam)) {
            return ServerResponse.badRequest()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(ApiResponse.error("参数错误", "type 参数错误，支持的值: daily, weekly, monthly, quarterly, yearly"));
        }
        return umamiService.getVisitStatistics(null, typeParam)
            .flatMap(data -> ServerResponse.ok().bodyValue(data))
            .onErrorResume(e -> handleError("获取" + typeParam + "访问统计", e));
    }

    private Mono<ServerResponse> fetchPageviewsTrend(ServerRequest request) {
        String typeParam = request.queryParam("type").orElse("weekly");
        if (!isValidPeriod(typeParam)) {
            return ServerResponse.badRequest()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(ApiResponse.error("参数错误", "type 参数错误，支持的值: daily, weekly, monthly, quarterly, yearly"));
        }
        return umamiService.getPageviewsTrend(null, typeParam)
            .flatMap(data -> ServerResponse.ok().bodyValue(data))
            .onErrorResume(e -> handleError("获取" + typeParam + "访问趋势", e));
    }

    private Mono<ServerResponse> fetchUmamiMetrics(ServerRequest request) {
        String typeParam = request.queryParam("type").orElse("monthly");
        if (!isValidPeriod(typeParam)) {
            return ServerResponse.badRequest()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(ApiResponse.error("参数错误", "type 参数错误，支持的值: daily, weekly, monthly, quarterly, yearly"));
        }

        String metricType = request.queryParam("metricType").orElse("referrer");
        if (!metricType.matches("referrer|country|browser|os|device|url")) {
            return ServerResponse.badRequest()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(ApiResponse.error("参数错误", "metricType 参数错误，支持的值: referrer, country, browser, os, device, url"));
        }

        int limit = 8;
        try {
            limit = Integer.parseInt(request.queryParam("limit").orElse("8"));
        } catch (NumberFormatException ignored) {
            // use default
        }

        return umamiService.getMetrics(null, typeParam, metricType, limit)
            .flatMap(data -> ServerResponse.ok().bodyValue(data))
            .onErrorResume(e -> handleError("获取访客画像指标", e));
    }

    private Mono<ServerResponse> fetchRealtimeVisits(ServerRequest request) {
        String websiteIdParam = request.queryParam("websiteId").orElse("");
        String finalWebsiteId = StrUtil.isBlank(websiteIdParam) ? null : websiteIdParam;
        return umamiService.getRealtimeVisitStatistics(finalWebsiteId)
            .flatMap(data -> ServerResponse.ok().bodyValue(data))
            .onErrorResume(e -> handleError("获取实时访问统计", e));
    }

    private Mono<ServerResponse> fetchUptimeKumaStatus(ServerRequest request) {
        return uptimeKumaService.getStatusPage()
            .flatMap(data -> ServerResponse.ok().bodyValue(data))
            .onErrorResume(e -> handleError("获取 Uptime Kuma 状态页面", e));
    }

    private Mono<ServerResponse> fetchGithubConfig(ServerRequest request) {
        return settingConfigGetter.getGithubConfig()
            .map(config -> {
                String proxyUrl = StrUtil.isNotBlank(config.getProxyUrl())
                    ? normalizeUrl(config.getProxyUrl(), Constants.DefaultUrls.GITHUB_STATS_URL)
                    : Constants.DefaultUrls.GITHUB_STATS_URL;
                String graphProxyUrl = StrUtil.isNotBlank(config.getGraphProxyUrl())
                    ? normalizeUrl(config.getGraphProxyUrl(), Constants.DefaultUrls.GITHUB_GRAPH_URL)
                    : Constants.DefaultUrls.GITHUB_GRAPH_URL;
                return new GithubConfigResponse(proxyUrl, config.getUsername(), graphProxyUrl);
            })
            .flatMap(config -> ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(config))
            .onErrorResume(e -> handleError("获取 GitHub 配置", e));
    }

    private String normalizeUrl(String url, String defaultUrl) {
        if (StrUtil.isBlank(url)) {
            return defaultUrl;
        }
        String normalized = url.trim();
        if (!normalized.endsWith("/")) {
            normalized += "/";
        }
        return normalized;
    }

    private record GithubConfigResponse(String proxyUrl, String username, String graphProxyUrl) {}

    @Override
    public GroupVersion groupVersion() {
        return GroupVersion.parseAPIVersion("api.data.statistics.xhhao.com/v1alpha1");
    }
}
