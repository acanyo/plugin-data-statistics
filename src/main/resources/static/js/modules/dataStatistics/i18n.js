(function() {
    'use strict';

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

    window.xhhaocomDataStatisticsV2I18n = {
        getCountryName
    };
})();
