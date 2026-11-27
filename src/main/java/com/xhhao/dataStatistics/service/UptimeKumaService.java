package com.xhhao.dataStatistics.service;

import reactor.core.publisher.Mono;

public interface UptimeKumaService {
    Mono<UptimeStatus> getStatusPage();

    /**
     * @param status 1-所有业务正常，0-全部业务异常，2-部分业务异常，-1-未配置状态页 URL
     * @param statusPageUrl Uptime Kuma 状态页 URL，未配置时为 null
     */
    record UptimeStatus(int status, String statusPageUrl) {}
}

