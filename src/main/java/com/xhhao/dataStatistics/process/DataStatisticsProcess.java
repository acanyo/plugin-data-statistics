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

        // Ultra-lightweight inline bootstrap: 0 external JS requests on pages without any statistics widget.
        // Automatically loads the ESM on-demand loader when a component or legacy placeholder appears (incl. Pjax).
        return PROPERTY_PLACEHOLDER_HELPER.replacePlaceholders("""
            <!-- data-statistics start -->
            <script>(function(){if(window.__dsBoot)return;window.__dsBoot=1;var s="site-charts,traffic-statistics,activity-statistics,umami-metrics,uptime-statistics,github-statistics,.xhhaocom-chartboard,.xhhaocom-dataStatistics-v2-traffic,.xhhaocom-dataStatistics-v2-activity,.xhhaocom-dataStatistics-v2-uptime-kuma,.github-statistics-container,.xhhaocom-dataStatistics-v2-github-stats,.xhhaocom-dataStatistics-v2-github-pin,.xhhaocom-dataStatistics-v2-github-top-langs,.xhhaocom-dataStatistics-v2-github-graph",loaded=0,obs;function load(){if(loaded||!document.querySelector(s))return;loaded=1;if(obs)obs.disconnect();var el=document.createElement("script");el.type="module";el.src="/plugins/data-statistics/assets/static/esm/loader.js?version=${version}";document.head.appendChild(el);}if(document.readyState==="loading"){document.addEventListener("DOMContentLoaded",load,{once:true});}else{load();}if(typeof MutationObserver!=="undefined"){obs=new MutationObserver(load);obs.observe(document.documentElement,{childList:true,subtree:true});}})();</script>""" + styleTag + """

            <!-- data-statistics end -->
            """, properties);
    }
}
