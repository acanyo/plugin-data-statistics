package com.xhhao.dataStatistics.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.reactive.function.client.WebClient;

/**
 * WebClient 配置类
 * 提供 WebClient.Builder Bean 供其他组件使用
 *
 * @author Handsome
 * @since 1.0.0
 */
@Configuration
public class WebClientConfig {

    @Bean
    public WebClient.Builder webClientBuilder() {
        return WebClient.builder();
    }
}

