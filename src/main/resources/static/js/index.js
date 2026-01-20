(function() {
    'use strict';

    const { detectEmbedMode } = window.xhhaocomDataStatisticsV2Utils || {};
    const { initTrafficStats } = window.xhhaocomDataStatisticsV2Traffic || {};
    const { initRealtimeActivity } = window.xhhaocomDataStatisticsV2Activity || {};
    const { initUptimeKumaStatus } = window.xhhaocomDataStatisticsV2Uptime || {};
    const { 
        initGithubPin, 
        initGithubStats, 
        initGithubTopLangs, 
        initGithubGraph,
        initGithubStatisticsContainer 
    } = window.xhhaocomDataStatisticsV2Github || {};

    const COMPONENT_INIT_MAP = {
        'traffic': initTrafficStats,
        'activity': initRealtimeActivity,
        'uptime-kuma': initUptimeKumaStatus,
        'github-pin': initGithubPin,
        'github-stats': initGithubStats,
        'github-top-langs': initGithubTopLangs,
        'github-graph': initGithubGraph
    };

    const COMPONENT_SELECTORS = [
        '.xhhaocom-dataStatistics-v2-traffic',
        '.xhhaocom-dataStatistics-v2-activity',
        '.xhhaocom-dataStatistics-v2-uptime-kuma',
        '.xhhaocom-dataStatistics-v2-github-pin',
        '.xhhaocom-dataStatistics-v2-github-stats',
        '.xhhaocom-dataStatistics-v2-github-top-langs',
        '.xhhaocom-dataStatistics-v2-github-graph'
    ];

    function detectComponentType(className) {
        if (className.includes('traffic')) return 'traffic';
        if (className.includes('activity')) return 'activity';
        if (className.includes('uptime-kuma')) return 'uptime-kuma';
        if (className.includes('github-pin')) return 'github-pin';
        if (className.includes('github-stats')) return 'github-stats';
        if (className.includes('github-top-langs')) return 'github-top-langs';
        if (className.includes('github-graph')) return 'github-graph';
        return null;
    }

    function initComponent(element, componentType) {
        const initFn = COMPONENT_INIT_MAP[componentType];
        if (!initFn) return;

        if (componentType === 'traffic' || componentType === 'activity') {
            const embedMode = detectEmbedMode ? detectEmbedMode(element) : { isEmbed: false, isArticle: false, isSidebar: false };
            initFn(element, embedMode);
        } else {
            initFn(element);
        }
    }

    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }

        if (initGithubStatisticsContainer) {
            document.querySelectorAll('.github-statistics-container').forEach(container => {
                initGithubStatisticsContainer(container);
            });
        }

        COMPONENT_SELECTORS.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                if (element.hasAttribute('data-initialized')) {
                    return;
                }

                const componentType = detectComponentType(element.className);
                if (componentType) {
                    element.setAttribute('data-initialized', 'true');
                    initComponent(element, componentType);
                }
            });
        });
    }

    window.xhhaocomDataStatisticsV2Init = init;
    init();

    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(() => {
            init();
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
})();
