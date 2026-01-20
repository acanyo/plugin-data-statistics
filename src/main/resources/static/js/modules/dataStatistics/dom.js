(function() {
    'use strict';

    const { createIcon } = window.xhhaocomDataStatisticsV2Constants || {};
    const { formatNumber } = window.xhhaocomDataStatisticsV2Formatters || {};

    function createStatCard(iconName, value, label, isRealtime = false) {
        const card = document.createElement('div');
        card.className = 'xhhaocom-dataStatistics-v2-traffic-card';
        card.setAttribute('data-variant', isRealtime ? 'realtime' : 'history');

        const iconEl = document.createElement('span');
        iconEl.className = 'xhhaocom-dataStatistics-v2-traffic-icon';
        iconEl.innerHTML = createIcon ? createIcon(iconName, 24) : '';

        const valueEl = document.createElement('div');
        valueEl.className = 'xhhaocom-dataStatistics-v2-traffic-value';
        valueEl.textContent = formatNumber ? formatNumber(value) : value;

        const labelEl = document.createElement('div');
        labelEl.className = 'xhhaocom-dataStatistics-v2-traffic-label';
        labelEl.textContent = label;

        card.appendChild(iconEl);
        card.appendChild(valueEl);
        card.appendChild(labelEl);

        if (isRealtime) {
            const realtimeEl = document.createElement('div');
            realtimeEl.className = 'xhhaocom-dataStatistics-v2-traffic-realtime';
            realtimeEl.dataset.tooltip = '实时数据';
            card.appendChild(realtimeEl);
        }

        return card;
    }

    function createActivityMetric(iconName, value, label) {
        const metric = document.createElement('div');
        metric.className = 'xhhaocom-dataStatistics-v2-activity-metric';

        const iconEl = document.createElement('span');
        iconEl.className = 'xhhaocom-dataStatistics-v2-activity-metric-icon';
        iconEl.innerHTML = createIcon ? createIcon(iconName, 18) : '';

        const contentEl = document.createElement('div');
        contentEl.className = 'xhhaocom-dataStatistics-v2-activity-metric-content';

        const valueEl = document.createElement('div');
        valueEl.className = 'xhhaocom-dataStatistics-v2-activity-metric-value';
        valueEl.textContent = formatNumber ? formatNumber(value) : value;

        const labelEl = document.createElement('div');
        labelEl.className = 'xhhaocom-dataStatistics-v2-activity-metric-label';
        labelEl.textContent = label;

        contentEl.appendChild(valueEl);
        contentEl.appendChild(labelEl);

        metric.appendChild(iconEl);
        metric.appendChild(contentEl);

        return metric;
    }

    window.xhhaocomDataStatisticsV2DOM = {
        createStatCard,
        createActivityMetric
    };
})();
