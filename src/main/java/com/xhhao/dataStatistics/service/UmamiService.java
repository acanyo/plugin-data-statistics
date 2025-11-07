package com.xhhao.dataStatistics.service;

import com.xhhao.dataStatistics.vo.UmamiStatisticsVO;
import reactor.core.publisher.Mono;

/**
 * Umami服务接口
 *
 * @author Handsome
 * @since 1.0.0
 */
public interface UmamiService {
    /**
     * 获取Umami Token
     * 如果已存在有效的token则直接返回，否则调用API获取新token并存储
     *
     * @return token字符串
     */
    Mono<String> getToken();

    /**
     * 获取网站列表
     *
     * @return 网站列表
     */
    Mono<UmamiStatisticsVO> getWebsites();

    /**
     * 获取要使用的网站ID
     * 如果配置中指定了websiteId则使用配置的，否则自动获取第一个网站
     *
     * @return 网站ID
     */
    Mono<String> getWebsiteId();

    /**
     * 获取网站统计数据
     *
     * @param websiteId 网站ID
     * @param startAt 开始时间（时间戳）
     * @param endAt 结束时间（时间戳）
     * @return 统计数据
     */
    Mono<UmamiStatisticsVO.WebsiteStats> getWebsiteStats(String websiteId, Long startAt, Long endAt);

    /**
     * 获取实时数据
     *
     * @param websiteId 网站ID
     * @return 实时数据
     */
    Mono<UmamiStatisticsVO.RealtimeData> getRealtimeData(String websiteId);
}

