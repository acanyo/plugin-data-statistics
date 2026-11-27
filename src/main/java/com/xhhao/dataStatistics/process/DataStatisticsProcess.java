package com.xhhao.dataStatistics.process;

import java.util.Properties;
import java.util.regex.Pattern;

import org.pf4j.PluginWrapper;
import org.springframework.stereotype.Component;
import org.springframework.util.PropertyPlaceholderHelper;
import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.model.IModel;
import org.thymeleaf.model.IModelFactory;
import org.thymeleaf.processor.element.IElementModelStructureHandler;

import com.xhhao.dataStatistics.service.SettingConfigGetter;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Mono;
import run.halo.app.theme.dialect.TemplateHeadProcessor;

@Component
@RequiredArgsConstructor
public class DataStatisticsProcess implements TemplateHeadProcessor {

    static final PropertyPlaceholderHelper PROPERTY_PLACEHOLDER_HELPER =
        new PropertyPlaceholderHelper("${", "}");
    private static final Pattern HEX_COLOR_PATTERN =
        Pattern.compile("^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$");

    private final PluginWrapper pluginWrapper;
    private final SettingConfigGetter settingConfigGetter;

    @Override
    public Mono<Void> process(ITemplateContext context, IModel model,
        IElementModelStructureHandler structureHandler) {
        final IModelFactory modelFactory = context.getModelFactory();
        return settingConfigGetter.getBasicsConfig()
            .map(cfg -> cfg.getAccentColor() != null ? cfg.getAccentColor().trim() : "")
            .defaultIfEmpty("")
            .onErrorReturn("")
            .doOnNext(accentColor -> model.add(modelFactory.createText(componentScript(accentColor))))
            .then();
    }

    private String componentScript(String accentColor) {
        final Properties properties = new Properties();
        properties.setProperty("version", pluginWrapper.getDescriptor().getVersion());

        String styleTag = "";
        if (HEX_COLOR_PATTERN.matcher(accentColor).matches() && !"#2563eb".equalsIgnoreCase(accentColor)) {
            styleTag = "\n<style>:root{--ds-custom-accent:" + accentColor + ";}</style>";
        }

        return PROPERTY_PLACEHOLDER_HELPER.replacePlaceholders("""
            <!-- data-statistics start -->
            <script defer src="/plugins/data-statistics/assets/static/data-statistics.umd.js?version=${version}"></script>""" + styleTag + """

            <!-- data-statistics end -->
            """, properties);
    }
}
