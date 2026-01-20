(function() {
    'use strict';

    const LOADING_CLASS_MAP = {
        'xhhaocom-dataStatistics-v2-traffic': 'xhhaocom-dataStatistics-v2-traffic-loading',
        'xhhaocom-dataStatistics-v2-activity': 'xhhaocom-dataStatistics-v2-activity-loading',
        'xhhaocom-dataStatistics-v2-uptime-kuma': 'xhhaocom-dataStatistics-v2-uptime-kuma-loading',
        'xhhaocom-dataStatistics-v2-github-pin': 'xhhaocom-dataStatistics-v2-github-loading',
        'xhhaocom-dataStatistics-v2-github-stats': 'xhhaocom-dataStatistics-v2-github-loading',
        'xhhaocom-dataStatistics-v2-github-top-langs': 'xhhaocom-dataStatistics-v2-github-loading',
        'xhhaocom-dataStatistics-v2-github-graph': 'xhhaocom-dataStatistics-v2-github-loading'
    };

    function detectEmbedMode(element) {
        const isInArticle = element.closest('article') ||
                           element.closest('.post-content') ||
                           element.closest('.content') ||
                           element.closest('[class*="content"]');
        const isInSidebar = element.closest('aside') ||
                           element.closest('.sidebar') ||
                           element.closest('[class*="sidebar"]');

        return {
            isEmbed: isInArticle || isInSidebar,
            isArticle: isInArticle,
            isSidebar: isInSidebar
        };
    }

    function showLoading(element) {
        const className = element.className;
        const loadingClass = LOADING_CLASS_MAP[className] || 'xhhaocom-dataStatistics-v2-github-loading';
        element.innerHTML = `<div class="${loadingClass}">加载中</div>`;
    }

    function extractValue(data) {
        if (data == null) return 0;
        if (typeof data === 'object' && 'value' in data) {
            return parseInt(data.value) || 0;
        }
        return parseInt(data) || 0;
    }

    function safeFetch(url) {
        return fetch(url).then(r => {
            if (!r.ok) {
                throw new Error(`HTTP ${r.status}`);
            }
            return r.json();
        });
    }

    window.xhhaocomDataStatisticsV2Utils = {
        detectEmbedMode,
        showLoading,
        extractValue,
        safeFetch
    };
})();
