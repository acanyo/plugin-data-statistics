(function() {
    'use strict';

    const { showLoading, safeFetch } = window.xhhaocomDataStatisticsV2Utils || {};

    function initUptimeKumaStatus(element) {
        element.className = 'xhhaocom-dataStatistics-v2-uptime-kuma';
        if (showLoading) showLoading(element);

        const statusUrl = '/apis/api.data.statistics.xhhao.com/v1alpha1/uptime/status';

        const updateStatus = () => {
            if (!safeFetch) return;
            safeFetch(statusUrl)
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

                    const statusConfig = {
                        0: { class: 'error', text: '全部业务异常', wrapperClass: 'error' },
                        1: { class: 'success', text: '所有业务正常', wrapperClass: 'success' },
                        2: { class: 'warning', text: '部分业务异常', wrapperClass: 'warning' }
                    };

                    const config = statusConfig[status] || { class: 'loading', text: '加载中', wrapperClass: 'muted' };
                    
                    statusDot.classList.add(`xhhaocom-dataStatistics-v2-uptime-kuma-dot--${config.class}`);
                    statusText.textContent = config.text;
                    wrapper.classList.add(`xhhaocom-dataStatistics-v2-uptime-kuma__content--${config.wrapperClass}`);

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

    window.xhhaocomDataStatisticsV2Uptime = {
        initUptimeKumaStatus
    };
})();
