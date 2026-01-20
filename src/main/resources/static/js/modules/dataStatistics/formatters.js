(function() {
    'use strict';

    const { getCountryName } = window.xhhaocomDataStatisticsV2I18n || {};

    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
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
            if (!browser.includes('(') || !browser.includes(')')) {
                browser = browser.replace(/\s*webview\s*/gi, ' (webview)');
            }
        }
        
        const country = getCountryName ? getCountryName(event.country) : '';
        const os = event.os ? (osMap[event.os] || event.os) : '';
        const device = event.device ? (deviceMap[event.device] || event.device) : '';

        let description = country ? `来自 ${country} 的访客` : '一位访客';

        if (os && device) {
            description += `在搭载 ${os} 的 ${device} 上`;
        } else if (os) {
            description += `在搭载 ${os} 的设备上`;
        } else if (device) {
            description += `在 ${device} 上`;
        }

        description += browser ? `使用 ${browser} 浏览器进行访问。` : '进行访问。';

        return description;
    }

    window.xhhaocomDataStatisticsV2Formatters = {
        formatNumber,
        formatTimeChinese,
        formatDeviceInfo
    };
})();
