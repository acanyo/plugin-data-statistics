package com.xhhao.dataStatistics.service;

import reactor.core.publisher.Mono;

public interface UptimeKumaService {
    Mono<UptimeStatus> getStatusPage();

    record UptimeStatus(int status, String statusPageUrl) {}
}

