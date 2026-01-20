(function() {
    'use strict';

    const modulesPath = '/plugins/plugin-data-statistics/assets/static/js/modules/dataStatistics';

    function loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    const moduleFiles = [
        'utils.js',
        'i18n.js',
        'constants.js',
        'formatters.js',
        'dom.js',
        'traffic.js',
        'activity.js',
        'uptime.js',
        'github.js'
    ];

    Promise.all(moduleFiles.map(file => loadScript(modulesPath + file)))
        .then(() => {
            const indexScript = document.createElement('script');
            indexScript.src = '/plugins/plugin-data-statistics/assets/static/js/index.js';
            document.head.appendChild(indexScript);
        })
        .catch(err => {
            console.error('[Data Statistics] Failed to load modules:', err);
        });
})();
