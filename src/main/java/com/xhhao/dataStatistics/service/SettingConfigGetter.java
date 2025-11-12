package com.xhhao.dataStatistics.service;

import lombok.Data;
import reactor.core.publisher.Mono;

public interface SettingConfigGetter {
    Mono<BasicsConfig> getBasicsConfig();
    Mono<UmamiConfig> getUmamiConfig();
    Mono<UptimeConfig> getUptimeKumaConfig();

    @Data
    class BasicsConfig {
        public static final String GROUP = "basics";
        private String title;
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
}
