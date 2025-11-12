package com.xhhao.dataStatistics.service.impl;

import com.xhhao.dataStatistics.service.SettingConfigGetter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import reactor.core.publisher.Mono;
import run.halo.app.plugin.ReactiveSettingFetcher;

@Component
@RequiredArgsConstructor
public class SettingConfigGetterImpl implements SettingConfigGetter {
    private final ReactiveSettingFetcher settingFetcher;

    @Override
    public Mono<BasicsConfig> getBasicsConfig() {
        return settingFetcher.fetch(BasicsConfig.GROUP, BasicsConfig.class)
            .defaultIfEmpty(new BasicsConfig());
    }

    @Override
    public Mono<UmamiConfig> getUmamiConfig() {
        return settingFetcher.fetch(UmamiConfig.GROUP, UmamiConfig.class)
            .defaultIfEmpty(new UmamiConfig());
    }

    @Override
    public Mono<UptimeConfig> getUptimeKumaConfig() {
        return settingFetcher.fetch(UptimeConfig.GROUP, UptimeConfig.class)
            .defaultIfEmpty(new UptimeConfig());
    }
}
