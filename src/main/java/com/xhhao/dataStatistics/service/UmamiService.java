package com.xhhao.dataStatistics.service;

import com.fasterxml.jackson.databind.JsonNode;
import reactor.core.publisher.Mono;

public interface UmamiService {
    Mono<String> getToken();
    Mono<JsonNode> getWebsites();
    Mono<JsonNode> getRealtimeData(String websiteId);
    Mono<JsonNode> getVisitStatistics(String websiteId, String type);
    Mono<JsonNode> getRealtimeVisitStatistics(String websiteId);
}

