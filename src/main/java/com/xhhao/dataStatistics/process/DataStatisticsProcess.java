package com.xhhao.dataStatistics.process;

import lombok.RequiredArgsConstructor;
import org.pf4j.PluginWrapper;
import org.springframework.stereotype.Component;
import org.springframework.util.PropertyPlaceholderHelper;
import org.thymeleaf.context.ITemplateContext;
import org.thymeleaf.model.IModel;
import org.thymeleaf.model.IModelFactory;
import org.thymeleaf.processor.element.IElementModelStructureHandler;
import reactor.core.publisher.Mono;
import run.halo.app.theme.dialect.TemplateHeadProcessor;
import java.util.Properties;

@Component
@RequiredArgsConstructor
public class DataStatisticsProcess implements TemplateHeadProcessor {

    static final PropertyPlaceholderHelper PROPERTY_PLACEHOLDER_HELPER =
        new PropertyPlaceholderHelper("${", "}");

    private final PluginWrapper pluginWrapper;

    @Override
    public Mono<Void> process(ITemplateContext context, IModel model,
        IElementModelStructureHandler structureHandler) {
        final IModelFactory modelFactory = context.getModelFactory();
        model.add(modelFactory.createText(componentScript()));
        return Mono.empty();
    }

    private String componentScript() {

        final Properties properties = new Properties();
        properties.setProperty("version", pluginWrapper.getDescriptor().getVersion());

        return PROPERTY_PLACEHOLDER_HELPER.replacePlaceholders("""
            <!-- flow-post start -->
            <script defer src="/plugins/data-statistics/assets/static/js/chart.umd.min.js?version=${version}"></script>
            <link rel="stylesheet" href="/plugins/data-statistics/assets/static/css/siteCharts.css?version=${version}" />
            <script defer src="/plugins/data-statistics/assets/static/js/siteCharts.js?version=${version}"></script>
            <script defer src="/plugins/data-statistics/assets/static/js/dataStatistics.js?version=${version}"></script>
            <link rel="stylesheet" href="/plugins/data-statistics/assets/static/css/dataStatistics.css?version=${version}" />
            <!-- flow-post end -->
            """, properties);
    }
}