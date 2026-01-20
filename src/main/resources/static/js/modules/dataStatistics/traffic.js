(function() {
    'use strict';

    const { showLoading, extractValue, safeFetch } = window.xhhaocomDataStatisticsV2Utils || {};
    const { TRAFFIC_TYPE_LABELS } = window.xhhaocomDataStatisticsV2Constants || {};
    const { createStatCard } = window.xhhaocomDataStatisticsV2DOM || {};
    const { formatNumber } = window.xhhaocomDataStatisticsV2Formatters || {};

    function initTrafficStats(element, embedMode) {
        element.className = 'xhhaocom-dataStatistics-v2-traffic';
        if (showLoading) showLoading(element);

        const type = element.getAttribute('data-type') || 'weekly';
        const visitUrl = `/apis/api.data.statistics.xhhao.com/v1alpha1/umami/visits?type=${type}`;
        const realtimeUrl = '/apis/api.data.statistics.xhhao.com/v1alpha1/umami/realtime';
        
        Promise.all([
            safeFetch ? safeFetch(visitUrl) : Promise.resolve(null),
            safeFetch ? safeFetch(realtimeUrl) : Promise.resolve(null)
        ])
        .then(([visitData, realtimeData]) => {
            if (!visitData && !realtimeData) {
                element.innerHTML = '<div class="xhhaocom-dataStatistics-v2-traffic-loading">暂无数据</div>';
                return;
            }

            element.innerHTML = '';

            const section = document.createElement('div');
            section.className = 'xhhaocom-dataStatistics-v2-traffic-section';

            const header = document.createElement('div');
            header.className = 'xhhaocom-dataStatistics-v2-traffic-header';
            const typeLabel = TRAFFIC_TYPE_LABELS ? (TRAFFIC_TYPE_LABELS[type] || '访问概览') : '访问概览';
            header.innerHTML = `
                <div class="xhhaocom-dataStatistics-v2-traffic-title-box">
                    <span class="xhhaocom-dataStatistics-v2-traffic-title">访问统计</span>
                    <span class="xhhaocom-dataStatistics-v2-traffic-badge">${typeLabel}</span>
                </div>
                <span class="xhhaocom-dataStatistics-v2-traffic-subtitle">历史与实时数据一目了然</span>
            `;
            section.appendChild(header);

            const grid = document.createElement('div');
            grid.className = 'xhhaocom-dataStatistics-v2-traffic-grid';
            section.appendChild(grid);

            if (visitData) {
                const pageviews = extractValue ? extractValue(visitData.pageviews) : 0;
                const visits = extractValue ? extractValue(visitData.visits) : 0;
                const visitors = extractValue ? extractValue(visitData.visitors) : 0;

                if (createStatCard) {
                    grid.appendChild(createStatCard('chart-line', pageviews, '页面浏览量'));
                    grid.appendChild(createStatCard('account-group', visits, '访问次数'));
                    grid.appendChild(createStatCard('account', visitors, '访客数'));
                }
            }

            if (realtimeData?.totals) {
                const realtimeViews = parseInt(realtimeData.totals.views) || 0;
                const realtimeVisitors = parseInt(realtimeData.totals.visitors) || 0;

                if (realtimeViews > 0 || realtimeVisitors > 0) {
                    if (createStatCard) {
                        grid.appendChild(createStatCard('fire', realtimeViews, '实时浏览量', true));
                        grid.appendChild(createStatCard('lightning-bolt', realtimeVisitors, '实时访客', true));
                    }
                }
            }

            element.appendChild(section);

            if (element.children.length === 0) {
                element.innerHTML = '<div class="xhhaocom-dataStatistics-v2-traffic-loading">暂无数据</div>';
            }
        })
        .catch(err => {
            console.error('[Traffic Stats]', err);
            element.innerHTML = '<div class="xhhaocom-dataStatistics-v2-traffic-error">加载失败</div>';
        });

        const updateRealtime = () => {
            if (!safeFetch) return;
            safeFetch(realtimeUrl)
                .then(realtimeData => {
                    if (realtimeData?.totals) {
                        const realtimeCards = element.querySelectorAll('.xhhaocom-dataStatistics-v2-traffic-card');
                        const realtimeViews = parseInt(realtimeData.totals.views) || 0;
                        const realtimeVisitors = parseInt(realtimeData.totals.visitors) || 0;
                        
                        realtimeCards.forEach(card => {
                            const label = card.querySelector('.xhhaocom-dataStatistics-v2-traffic-label')?.textContent;
                            const valueEl = card.querySelector('.xhhaocom-dataStatistics-v2-traffic-value');
                            if (!valueEl) return;
                            
                            if (label === '实时浏览量') {
                                valueEl.textContent = formatNumber ? formatNumber(realtimeViews) : realtimeViews;
                            } else if (label === '实时访客') {
                                valueEl.textContent = formatNumber ? formatNumber(realtimeVisitors) : realtimeVisitors;
                            }
                        });
                    }
                })
                .catch(err => console.error('[Realtime Update]', err));
        };
        
        setTimeout(updateRealtime, 1000);
        const interval = setInterval(updateRealtime, 30000);
        element.setAttribute('data-cleanup', interval);
    }

    window.xhhaocomDataStatisticsV2Traffic = {
        initTrafficStats
    };
})();
