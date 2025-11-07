package com.xhhao.dataStatistics.endpoint;

import static org.springdoc.core.fn.builders.apiresponse.Builder.responseBuilder;

import cn.hutool.core.util.StrUtil;
import com.xhhao.dataStatistics.service.StatisticalService;
import com.xhhao.dataStatistics.service.UmamiService;
import com.xhhao.dataStatistics.vo.PieChartVO;
import com.xhhao.dataStatistics.vo.UmamiStatisticsVO;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springdoc.webflux.core.fn.SpringdocRouteBuilder;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.server.RouterFunction;
import org.springframework.web.reactive.function.server.ServerRequest;
import org.springframework.web.reactive.function.server.ServerResponse;
import reactor.core.publisher.Mono;
import run.halo.app.core.extension.endpoint.CustomEndpoint;
import run.halo.app.extension.GroupVersion;

import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataStatisticsEndpoint implements CustomEndpoint {

    private final String tag = "api.data.statistics.xhhao.com/v1alpha1/statistics";
    private final StatisticalService statisticalService;
    private final UmamiService umamiService;

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
            .GET("/umami/websites", this::fetchUmamiWebsites, builder -> {
                builder.operationId("fetchUmamiWebsites")
                    .description("获取Umami网站列表")
                    .tag(tag)
                    .response(responseBuilder()
                        .implementation(UmamiStatisticsVO.class)
                        .responseCode("200")
                        .description("成功返回网站列表")
                    );
            })
            .GET("/umami/stats", this::fetchUmamiStats, builder -> {
                builder.operationId("fetchUmamiStats")
                    .description("获取Umami网站统计数据。websiteId参数可选，不传则使用配置中的websiteId或自动获取第一个网站")
                    .tag(tag)
                    .response(responseBuilder()
                        .implementation(UmamiStatisticsVO.WebsiteStats.class)
                        .responseCode("200")
                        .description("成功返回统计数据")
                    );
            })
            .GET("/umami/realtime", this::fetchUmamiRealtime, builder -> {
                builder.operationId("fetchUmamiRealtime")
                    .description("获取Umami实时数据。websiteId参数可选，不传则使用配置中的websiteId或自动获取第一个网站")
                    .tag(tag)
                    .response(responseBuilder()
                        .implementation(UmamiStatisticsVO.RealtimeData.class)
                        .responseCode("200")
                        .description("成功返回实时数据")
                    );
            })
            .GET("/umami/website-id", this::fetchCurrentWebsiteId, builder -> {
                builder.operationId("fetchCurrentWebsiteId")
                    .description("获取当前使用的网站ID（配置中的或自动获取的第一个）")
                    .tag(tag)
                    .response(responseBuilder()
                        .responseCode("200")
                        .description("成功返回网站ID")
                    );
            })
            .build();
    }

    private Mono<ServerResponse> fetchChartData(ServerRequest request) {
        return statisticalService.getPieChartVO()
            .flatMap(dataSource -> ServerResponse.ok().bodyValue(dataSource))
            .switchIfEmpty(ServerResponse.ok().bodyValue(new PieChartVO()))
            .onErrorResume(e -> {
                log.error("Failed to fetch chart data", e);
                return ServerResponse.status(500)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue("获取图表数据失败: " + e.getMessage());
            });
    }

    private Mono<ServerResponse> fetchUmamiWebsites(ServerRequest request) {
        return umamiService.getWebsites()
            .flatMap(data -> ServerResponse.ok().bodyValue(data))
            .switchIfEmpty(ServerResponse.ok().bodyValue(new UmamiStatisticsVO()))
            .onErrorResume(e -> {
                log.error("获取Umami网站列表失败", e);
                return ServerResponse.status(500)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue("获取Umami网站列表失败: " + e.getMessage());
            });
    }

    private Mono<ServerResponse> fetchUmamiStats(ServerRequest request) {
        String websiteIdParam = request.queryParam("websiteId").orElse("");
        String startAtStr = request.queryParam("startAt").orElse("0");
        String endAtStr = request.queryParam("endAt").orElse("0");

        try {
            Long startAt = Long.parseLong(startAtStr);
            Long endAt = Long.parseLong(endAtStr);
            
            // 如果提供了websiteId参数则使用，否则自动获取
            Mono<String> websiteIdMono = StrUtil.isBlank(websiteIdParam)
                ? umamiService.getWebsiteId()
                : Mono.just(websiteIdParam);
            
            return websiteIdMono
                .flatMap(websiteId -> umamiService.getWebsiteStats(websiteId, startAt, endAt))
                .flatMap(data -> ServerResponse.ok().bodyValue(data))
                .onErrorResume(e -> {
                    log.error("获取Umami统计数据失败", e);
                    return ServerResponse.status(500)
                        .contentType(MediaType.APPLICATION_JSON)
                        .bodyValue("获取Umami统计数据失败: " + e.getMessage());
                });
        } catch (NumberFormatException e) {
            return ServerResponse.badRequest()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue("时间参数格式错误");
        }
    }

    private Mono<ServerResponse> fetchUmamiRealtime(ServerRequest request) {
        String websiteIdParam = request.queryParam("websiteId").orElse("");
        
        // 如果提供了websiteId参数则使用，否则自动获取
        Mono<String> websiteIdMono = StrUtil.isBlank(websiteIdParam)
            ? umamiService.getWebsiteId()
            : Mono.just(websiteIdParam);

        return websiteIdMono
            .flatMap(websiteId -> umamiService.getRealtimeData(websiteId))
            .flatMap(data -> ServerResponse.ok().bodyValue(data))
            .onErrorResume(e -> {
                log.error("获取Umami实时数据失败", e);
                return ServerResponse.status(500)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue("获取Umami实时数据失败: " + e.getMessage());
            });
    }

    private Mono<ServerResponse> fetchCurrentWebsiteId(ServerRequest request) {
        return umamiService.getWebsiteId()
            .flatMap(websiteId -> ServerResponse.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(Map.of("websiteId", websiteId)))
            .onErrorResume(e -> {
                log.error("获取当前网站ID失败", e);
                return ServerResponse.status(500)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue("获取当前网站ID失败: " + e.getMessage());
            });
    }

    @Override
    public GroupVersion groupVersion() {
        return GroupVersion.parseAPIVersion("api.data.statistics.xhhao.com/v1alpha1");
    }
}

