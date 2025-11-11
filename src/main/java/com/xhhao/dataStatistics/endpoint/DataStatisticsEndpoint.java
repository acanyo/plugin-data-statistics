package com.xhhao.dataStatistics.endpoint;

import static org.springdoc.core.fn.builders.apiresponse.Builder.responseBuilder;
import static org.springdoc.core.fn.builders.parameter.Builder.parameterBuilder;
import static org.springdoc.core.fn.builders.schema.Builder.schemaBuilder;

import cn.hutool.core.util.StrUtil;
import com.xhhao.dataStatistics.service.StatisticalService;
import com.xhhao.dataStatistics.service.UmamiService;
import com.xhhao.dataStatistics.vo.PieChartVO;
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
                        .description("统计类型，可选值：daily(日统计，默认1天=24小时), weekly(周统计，默认1周=7天), monthly(月统计，默认1月=30天), quarterly(季统计，默认1季=3个月=90天), yearly(年统计，默认1年=365天)")
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
            .GET("/umami/realtime", this::fetchRealtimeVisits, builder -> {
                builder.operationId("fetchRealtimeVisits")
                    .description("获取实时访问统计")
                    .tag(tag)
                    .response(responseBuilder()
                        .responseCode("200")
                        .description("成功返回实时访问数据")
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
            .onErrorResume(e -> {
                log.error("获取Umami网站列表失败", e);
                return ServerResponse.status(500)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue("获取Umami网站列表失败: " + e.getMessage());
            });
    }

    private Mono<ServerResponse> fetchVisits(ServerRequest request) {
        String typeParam = request.queryParam("type").orElse("daily");
        
        if (!typeParam.matches("daily|weekly|monthly|quarterly|yearly")) {
            return ServerResponse.badRequest()
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue("type 参数错误，支持的值: daily, weekly, monthly, quarterly, yearly");
        }
        
        return umamiService.getVisitStatistics(null, typeParam)
            .flatMap(data -> ServerResponse.ok().bodyValue(data))
            .onErrorResume(e -> {
                log.error("获取{}访问统计失败", typeParam, e);
                return ServerResponse.status(500)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue("获取" + typeParam + "访问统计失败: " + e.getMessage());
            });
    }
    private Mono<ServerResponse> fetchRealtimeVisits(ServerRequest request) {
        String websiteIdParam = request.queryParam("websiteId").orElse("");
        String finalWebsiteId = StrUtil.isBlank(websiteIdParam) ? null : websiteIdParam;
        
        return umamiService.getRealtimeVisitStatistics(finalWebsiteId)
            .flatMap(data -> ServerResponse.ok().bodyValue(data))
            .onErrorResume(e -> {
                log.error("获取实时访问统计失败", e);
                return ServerResponse.status(500)
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue("获取实时访问统计失败: " + e.getMessage());
            });
    }

    @Override
    public GroupVersion groupVersion() {
        return GroupVersion.parseAPIVersion("api.data.statistics.xhhao.com/v1alpha1");
    }
}

