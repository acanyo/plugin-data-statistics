(function() {
    'use strict';
    
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
        if (element.classList.contains('xhhaocom-dataStatistics-v2-traffic')) {
            element.innerHTML = '<div class="xhhaocom-dataStatistics-v2-traffic-loading">加载中</div>';
        } else if (element.classList.contains('xhhaocom-dataStatistics-v2-activity')) {
            element.innerHTML = '<div class="xhhaocom-dataStatistics-v2-activity-loading">加载中</div>';
        } else if (element.classList.contains('xhhaocom-dataStatistics-v2-uptime-kuma')) {
            element.innerHTML = '<div class="xhhaocom-dataStatistics-v2-uptime-kuma-loading">加载中</div>';
        }
    }
    
    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    const regionDisplay = typeof Intl !== 'undefined' && typeof Intl.DisplayNames === 'function'
        ? new Intl.DisplayNames(['zh-CN'], { type: 'region' })
        : null;

    const specialRegionMap = {
        HK: '中国香港',
        MO: '中国澳门',
        TW: '中国台湾'
    };

    function getCountryName(code = '') {
        const normalized = code.toUpperCase();
        if (!normalized) return '';

        let result = normalized;
        if (regionDisplay) {
            const localized = regionDisplay.of(normalized);
            if (localized && localized !== normalized) {
                result = localized;
            }
        }

        if (specialRegionMap[normalized]) {
            if (!result.includes('中国')) {
                result = specialRegionMap[normalized];
            } else {
                const trimmed = result.replace(/^中国/, '');
                result = `中国${trimmed}`;
            }
        }

        return result;
    }
    
    const icons = {
        'chart-line': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>',
        'account-group': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>',
        'account': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>',
        'fire': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"></path></svg>',
        'lightning-bolt': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>',
        'eye': '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>'
    };

    const MAX_ACTIVITY_EVENTS = 30;
    
    function createIcon(iconName, size = 24) {
        const svg = icons[iconName];
        if (!svg) return '';
        return svg.replace('viewBox="0 0 24 24"', `viewBox="0 0 24 24" width="${size}" height="${size}"`);
    }

    const TRAFFIC_TYPE_LABELS = {
        daily: '今日概览',
        weekly: '近7天趋势',
        monthly: '近30天趋势',
        quarterly: '近90天趋势',
        yearly: '近一年趋势'
    };
    
    function createStatCard(iconName, value, label, isRealtime = false) {
        const card = document.createElement('div');
        card.className = 'xhhaocom-dataStatistics-v2-traffic-card';
        card.setAttribute('data-variant', isRealtime ? 'realtime' : 'history');
        
        const iconEl = document.createElement('span');
        iconEl.className = 'xhhaocom-dataStatistics-v2-traffic-icon';
        iconEl.innerHTML = createIcon(iconName, 24);
        
        const valueEl = document.createElement('div');
        valueEl.className = 'xhhaocom-dataStatistics-v2-traffic-value';
        valueEl.textContent = formatNumber(value);
        
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
        iconEl.innerHTML = createIcon(iconName, 18);

        const contentEl = document.createElement('div');
        contentEl.className = 'xhhaocom-dataStatistics-v2-activity-metric-content';

        const valueEl = document.createElement('div');
        valueEl.className = 'xhhaocom-dataStatistics-v2-activity-metric-value';
        valueEl.textContent = formatNumber(value);

        const labelEl = document.createElement('div');
        labelEl.className = 'xhhaocom-dataStatistics-v2-activity-metric-label';
        labelEl.textContent = label;

        contentEl.appendChild(valueEl);
        contentEl.appendChild(labelEl);

        metric.appendChild(iconEl);
        metric.appendChild(contentEl);

        return metric;
    }
    
    function initTrafficStats(element, embedMode) {
        element.className = 'xhhaocom-dataStatistics-v2-traffic';
        showLoading(element);
        
        const type = element.getAttribute('data-type') || 'weekly';
        const visitUrl = `/apis/api.data.statistics.xhhao.com/v1alpha1/umami/visits?type=${type}`;
        const realtimeUrl = '/apis/api.data.statistics.xhhao.com/v1alpha1/umami/realtime';
        Promise.all([
            fetch(visitUrl).then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`))),
            fetch(realtimeUrl).then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
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
            header.innerHTML = `
                <div class="xhhaocom-dataStatistics-v2-traffic-title-box">
                    <span class="xhhaocom-dataStatistics-v2-traffic-title">访问统计</span>
                    <span class="xhhaocom-dataStatistics-v2-traffic-badge">${TRAFFIC_TYPE_LABELS[type] || '访问概览'}</span>
                </div>
                <span class="xhhaocom-dataStatistics-v2-traffic-subtitle">历史与实时数据一目了然</span>
            `;
            section.appendChild(header);

            const grid = document.createElement('div');
            grid.className = 'xhhaocom-dataStatistics-v2-traffic-grid';
            section.appendChild(grid);
            
            if (visitData) {
                const pageviews = parseInt(visitData.pageviews) || 0;
                const visits = parseInt(visitData.visits) || 0;
                const visitors = parseInt(visitData.visitors) || 0;

                grid.appendChild(createStatCard('chart-line', pageviews, '页面浏览量'));
                grid.appendChild(createStatCard('account-group', visits, '访问次数'));
                grid.appendChild(createStatCard('account', visitors, '访客数'));
            }
            
            if (realtimeData && realtimeData.totals) {
                const realtimeViews = parseInt(realtimeData.totals.views) || 0;
                const realtimeVisitors = parseInt(realtimeData.totals.visitors) || 0;

                if (realtimeViews > 0 || realtimeVisitors > 0) {
                    grid.appendChild(createStatCard('fire', realtimeViews, '实时浏览量', true));
                    grid.appendChild(createStatCard('lightning-bolt', realtimeVisitors, '实时访客', true));
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
            fetch(realtimeUrl)
                .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
                .then(realtimeData => {
                    if (realtimeData && realtimeData.totals) {
                        const realtimeCards = element.querySelectorAll('.xhhaocom-dataStatistics-v2-traffic-card');
                        const realtimeViews = parseInt(realtimeData.totals.views) || 0;
                        const realtimeVisitors = parseInt(realtimeData.totals.visitors) || 0;
                        realtimeCards.forEach(card => {
                            const label = card.querySelector('.xhhaocom-dataStatistics-v2-traffic-label').textContent;
                            if (label === '实时浏览量') {
                                card.querySelector('.xhhaocom-dataStatistics-v2-traffic-value').textContent = formatNumber(realtimeViews);
                            } else if (label === '实时访客') {
                                card.querySelector('.xhhaocom-dataStatistics-v2-traffic-value').textContent = formatNumber(realtimeVisitors);
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
    
    function formatTimeChinese(date) {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const period = hours >= 12 ? '下午' : '上午';
        const displayHours = hours > 12 ? hours - 12 : (hours === 0 ? 12 : hours);
        return `${period} ${String(displayHours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    
    function formatDeviceInfo(event) {
        const osMap = {
            'Mac OS': 'macOS',
            'Windows': 'Windows',
            'Android': 'Android',
            'iOS': 'iOS',
            'Linux': 'Linux'
        };
        const deviceMap = {
            'desktop': '桌面电脑',
            'mobile': '手机',
            'tablet': '平板电脑',
            'laptop': '笔记本'
        };
        let browser = event.browser || '';
        if (browser && browser.toLowerCase().includes('webview')) {
            if (browser.includes('(') && browser.includes(')')) {
            } else {
                browser = browser.replace(/\s*webview\s*/gi, ' (webview)');
            }
        }
        const country = getCountryName(event.country);
        const os = event.os ? (osMap[event.os] || event.os) : '';
        const device = event.device ? (deviceMap[event.device] || event.device) : '';
        
        let description = '';
        
        if (country) {
            description = `来自 ${country} 的访客`;
        } else {
            description = '一位访客';
        }
        
        if (os && device) {
            description += `在搭载 ${os} 的 ${device} 上`;
        } else if (os) {
            description += `在搭载 ${os} 的设备上`;
        } else if (device) {
            description += `在 ${device} 上`;
        }
        
        if (browser) {
            description += `使用 ${browser} 浏览器进行访问。`;
        } else {
            description += '进行访问。';
        }
        
        return description;
    }
    
    function initRealtimeActivity(element, embedMode) {
        element.className = 'xhhaocom-dataStatistics-v2-activity';
        showLoading(element);
        
        const realtimeUrl = '/apis/api.data.statistics.xhhao.com/v1alpha1/umami/realtime';
        
        const updateActivity = () => {
            fetch(realtimeUrl)
                .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
                .then(data => {
                    if (!data || !data.events || !Array.isArray(data.events) || data.events.length === 0) {
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

                    metricsBar.appendChild(createActivityMetric('fire', totalViews, '实时浏览量'));
                    metricsBar.appendChild(createActivityMetric('account', uniqueVisitors, '实时访客'));
                    metricsBar.appendChild(createActivityMetric('eye', activePages.size, '活跃页面数'));
                    listContainer.appendChild(metricsBar);
                    
                    const events = data.events.slice(0, MAX_ACTIVITY_EVENTS);
                    const list = document.createElement('div');
                    list.className = 'xhhaocom-dataStatistics-v2-activity-list';

                    events.forEach(event => {
                        const item = document.createElement('div');
                        item.className = 'xhhaocom-dataStatistics-v2-activity-item';
                        const time = new Date(event.createdAt);
                        const timeStr = formatTimeChinese(time);
                        const urlPath = event.urlPath || '/';
                        
                        item.innerHTML = `
                            <div class="xhhaocom-dataStatistics-v2-activity-content">
                                <div class="xhhaocom-dataStatistics-v2-activity-time-line">
                                    <span class="xhhaocom-dataStatistics-v2-activity-time">${timeStr}</span>
                                    <span class="xhhaocom-dataStatistics-v2-activity-separator">
                                        ${createIcon('eye', 14)}
                                        <span>${urlPath}</span>
                                    </span>
                                </div>
                                <div class="xhhaocom-dataStatistics-v2-activity-detail">
                                    <span class="xhhaocom-dataStatistics-v2-activity-person">
                                        ${createIcon('account', 14)}
                                    </span>
                                    <span class="xhhaocom-dataStatistics-v2-activity-text">${formatDeviceInfo(event)}</span>
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
    
    function initUptimeKumaStatus(element) {
        element.className = 'xhhaocom-dataStatistics-v2-uptime-kuma';
        showLoading(element);
        
        const statusUrl = '/apis/api.data.statistics.xhhao.com/v1alpha1/uptime-kuma/status';
        
        const updateStatus = () => {
            fetch(statusUrl)
                .then(r => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
                .then(result => {
                    element.innerHTML = '';

                    const status = result?.status;
                    const statusPageUrl = result?.statusPageUrl || '';
                    const hasLink = Boolean(statusPageUrl);

                    const wrapper = document.createElement(hasLink ? 'a' : 'div');
                    wrapper.className = 'xhhaocom-dataStatistics-v2-uptime-kuma__content';
                    wrapper.title = '查看我的项目状态';
                    wrapper.dataset.tipTitle = '查看我的项目状态';
                    if (hasLink) {
                        wrapper.href = statusPageUrl;
                        wrapper.target = '_blank';
                        wrapper.rel = 'noopener noreferrer';
                    } else {
                        wrapper.classList.add('is-static');
                    }

                    const statusDot = document.createElement('span');
                    statusDot.className = 'xhhaocom-dataStatistics-v2-uptime-kuma-dot';
                    statusDot.title = '查看我的项目状态';
                    statusDot.dataset.tipTitle = '查看我的项目状态';

                    const statusText = document.createElement('span');
                    statusText.className = 'xhhaocom-dataStatistics-v2-uptime-kuma-text';

                    let statusClass = 'loading';
                    let text = '加载中';

                    if (status === 0) {
                        statusClass = 'error';
                        text = '全部业务异常';
                        wrapper.classList.add('xhhaocom-dataStatistics-v2-uptime-kuma__content--error');
                    } else if (status === 1) {
                        statusClass = 'success';
                        text = '所有业务正常';
                        wrapper.classList.add('xhhaocom-dataStatistics-v2-uptime-kuma__content--success');
                    } else if (status === 2) {
                        statusClass = 'warning';
                        text = '部分业务异常';
                        wrapper.classList.add('xhhaocom-dataStatistics-v2-uptime-kuma__content--warning');
                    } else {
                        wrapper.classList.add('xhhaocom-dataStatistics-v2-uptime-kuma__content--muted');
                    }

                    statusDot.classList.add(`xhhaocom-dataStatistics-v2-uptime-kuma-dot--${statusClass}`);
                    statusText.textContent = text;

                    wrapper.appendChild(statusDot);
                    wrapper.appendChild(statusText);
                    element.appendChild(wrapper);
                })
                .catch(err => {
                    console.error('[Uptime Kuma Status]', err);
                    element.innerHTML = '<div class="xhhaocom-dataStatistics-v2-uptime-kuma-error">加载失败</div>';
                });
        };
        
        updateStatus();
        const interval = setInterval(updateStatus, 60000); 
        element.setAttribute('data-cleanup', interval);
    }
    
    function init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', init);
            return;
        }
        
        const selectors = [
            '.xhhaocom-dataStatistics-v2-traffic',
            '.xhhaocom-dataStatistics-v2-activity',
            '.xhhaocom-dataStatistics-v2-uptime-kuma'
        ];

        selectors.forEach(selector => {
            document.querySelectorAll(selector).forEach(element => {
                const className = element.className;
                let componentType = '';
                
                if (className.includes('traffic')) componentType = 'traffic';
                else if (className.includes('activity')) componentType = 'activity';
                else if (className.includes('uptime-kuma')) componentType = 'uptime-kuma';

                if (componentType && !element.hasAttribute('data-initialized')) {
                    element.setAttribute('data-initialized', 'true');
                    if (componentType === 'traffic') {
                        initTrafficStats(element, detectEmbedMode(element));
                    } else if (componentType === 'activity') {
                        initRealtimeActivity(element, detectEmbedMode(element));
                    } else if (componentType === 'uptime-kuma') {
                        initUptimeKumaStatus(element);
                    }
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
