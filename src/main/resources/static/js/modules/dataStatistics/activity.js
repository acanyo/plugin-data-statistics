(function() {
    'use strict';

    const { showLoading, safeFetch } = window.xhhaocomDataStatisticsV2Utils || {};
    const { MAX_ACTIVITY_EVENTS } = window.xhhaocomDataStatisticsV2Constants || {};
    const { createActivityMetric } = window.xhhaocomDataStatisticsV2DOM || {};
    const { formatTimeChinese, formatDeviceInfo } = window.xhhaocomDataStatisticsV2Formatters || {};
    const { createIcon } = window.xhhaocomDataStatisticsV2Constants || {};

    function initRealtimeActivity(element, embedMode) {
        element.className = 'xhhaocom-dataStatistics-v2-activity';
        if (showLoading) showLoading(element);

        const realtimeUrl = '/apis/api.data.statistics.xhhao.com/v1alpha1/umami/realtime';

        const updateActivity = () => {
            if (!safeFetch) return;
            safeFetch(realtimeUrl)
                .then(data => {
                    if (!data?.events || !Array.isArray(data.events) || data.events.length === 0) {
                        element.innerHTML = '<div class="xhhaocom-dataStatistics-v2-activity-empty">暂无活动</div>';
                        return;
                    }
                    
                    element.innerHTML = '';

                    const section = document.createElement('div');
                    section.className = 'xhhaocom-dataStatistics-v2-activity-section';

                    const header = document.createElement('div');
                    header.className = 'xhhaocom-dataStatistics-v2-activity-header';
                    header.innerHTML = `
                        <div class="xhhaocom-dataStatistics-v2-activity-title-box">
                            <span class="xhhaocom-dataStatistics-v2-activity-title">近30分钟网站活动</span>
                            <span class="xhhaocom-dataStatistics-v2-activity-badge-wrapper">
                                <span class="xhhaocom-dataStatistics-v2-activity-badge"></span>
                                <span class="xhhaocom-dataStatistics-v2-activity-badge-text">实时数据</span>
                            </span>
                        </div>
                        <span class="xhhaocom-dataStatistics-v2-activity-subtitle">
                            捕捉最新访客动态与来源
                        </span>
                    `;
                    section.appendChild(header);

                    const totals = data.totals || {};
                    const listContainer = document.createElement('div');
                    listContainer.className = 'xhhaocom-dataStatistics-v2-activity-body';

                    const metricsBar = document.createElement('div');
                    metricsBar.className = 'xhhaocom-dataStatistics-v2-activity-metrics';
                    const uniqueVisitors = parseInt(totals.visitors) || 0;
                    const totalViews = parseInt(totals.views) || 0;
                    const activePages = new Set();
                    data.events.forEach(event => {
                        if (event.urlPath) {
                            activePages.add(event.urlPath);
                        }
                    });

                    if (createActivityMetric) {
                        metricsBar.appendChild(createActivityMetric('fire', totalViews, '实时浏览量'));
                        metricsBar.appendChild(createActivityMetric('account', uniqueVisitors, '实时访客'));
                        metricsBar.appendChild(createActivityMetric('eye', activePages.size, '活跃页面数'));
                    }
                    listContainer.appendChild(metricsBar);

                    const maxEvents = MAX_ACTIVITY_EVENTS || 30;
                    const events = data.events.slice(0, maxEvents);
                    const list = document.createElement('div');
                    list.className = 'xhhaocom-dataStatistics-v2-activity-list';

                    events.forEach(event => {
                        const item = document.createElement('div');
                        item.className = 'xhhaocom-dataStatistics-v2-activity-item';
                        const time = new Date(event.createdAt);
                        const timeStr = formatTimeChinese ? formatTimeChinese(time) : time.toLocaleString();
                        const urlPath = event.urlPath || '/';

                        item.innerHTML = `
                            <div class="xhhaocom-dataStatistics-v2-activity-content">
                                <div class="xhhaocom-dataStatistics-v2-activity-time-line">
                                    <span class="xhhaocom-dataStatistics-v2-activity-time">${timeStr}</span>
                                    <span class="xhhaocom-dataStatistics-v2-activity-separator">
                                        ${createIcon ? createIcon('eye', 14) : ''}
                                        <span>${urlPath}</span>
                                    </span>
                                </div>
                                <div class="xhhaocom-dataStatistics-v2-activity-detail">
                                    <span class="xhhaocom-dataStatistics-v2-activity-person">
                                        ${createIcon ? createIcon('account', 14) : ''}
                                    </span>
                                    <span class="xhhaocom-dataStatistics-v2-activity-text">${formatDeviceInfo ? formatDeviceInfo(event) : ''}</span>
                                </div>
                            </div>
                        `;

                        list.appendChild(item);
                    });
                    listContainer.appendChild(list);
                    section.appendChild(listContainer);

                    element.appendChild(section);
                })
                .catch(err => {
                    console.error('[Activity]', err);
                    element.innerHTML = '<div class="xhhaocom-dataStatistics-v2-activity-error">加载失败</div>';
                });
        };
        
        updateActivity();
        const interval = setInterval(updateActivity, 30000);
        element.setAttribute('data-cleanup', interval);
    }

    window.xhhaocomDataStatisticsV2Activity = {
        initRealtimeActivity
    };
})();
