package com.xhhao.dataStatistics.service;

import lombok.Data;
import reactor.core.publisher.Mono;

public interface SettingConfigGetter {
    Mono<BasicsConfig> getBasicsConfig();
    Mono<UmamiConfig> getUmamiConfig();
    Mono<UptimeConfig> getUptimeKumaConfig();
    Mono<GithubConfig> getGithubConfig();
    
    @Data
    class BasicsConfig {
        public static final String GROUP = "basics";
        private String title;
        private Boolean enableMomentHeatmap;
    }
    @Data
    class UmamiConfig {
        public static final String GROUP = "umami";
        private String siteUrl;
        private String userName;
        private String userPassWord;
        private String websiteId;
    }
    @Data
    class UptimeConfig {
        public static final String GROUP = "uptime";
        private String uptimeUrl;
    }
    @Data
    class GithubConfig {
        public static final String GROUP = "github";
        private String proxyUrl;
        private String graphProxyUrl;
        private String username;
    }
    
}
