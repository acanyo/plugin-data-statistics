(function() {
    'use strict';

    const { showLoading, safeFetch } = window.xhhaocomDataStatisticsV2Utils || {};

    let githubConfigCache = null;

    function getGithubConfig() {
        if (githubConfigCache) {
            return Promise.resolve(githubConfigCache);
        }
        if (!safeFetch) return Promise.reject(new Error('safeFetch not available'));
        return safeFetch('/apis/api.data.statistics.xhhao.com/v1alpha1/github/config')
            .then(config => {
                githubConfigCache = config;
                return config;
            });
    }

    function createGithubImage(element, imageUrl, altText, errorClass) {
        const img = document.createElement('img');
        img.src = imageUrl;
        img.alt = altText;
        img.style.maxWidth = '100%';
        img.onerror = () => {
            element.innerHTML = `<div class="${errorClass}">加载失败</div>`;
        };
        element.innerHTML = '';
        element.appendChild(img);
    }

    function initGithubPin(element) {
        element.className = 'xhhaocom-dataStatistics-v2-github-pin';
        if (showLoading) showLoading(element);

        const repo = element.getAttribute('data-repo') || '';

        getGithubConfig()
            .then(config => {
                if (!config.username) {
                    throw new Error('GitHub 用户名未配置');
                }

                const params = new URLSearchParams();
                params.append('username', config.username);
                if (repo) {
                    params.append('repo', repo);
                }

                const imageUrl = config.proxyUrl + 'api/pin/?' + params.toString();
                createGithubImage(element, imageUrl, 'GitHub Repository Stats', 'xhhaocom-dataStatistics-v2-github-error');
            })
            .catch(err => {
                console.error('[GitHub Pin]', err);
                element.innerHTML = '<div class="xhhaocom-dataStatistics-v2-github-error">加载失败</div>';
            });
    }

    function initGithubStats(element) {
        element.className = 'xhhaocom-dataStatistics-v2-github-stats';
        if (showLoading) showLoading(element);

        const locale = element.getAttribute('data-locale') || '';
        const showIcons = element.getAttribute('data-show-icons') || '';
        const theme = element.getAttribute('data-theme') || '';

        getGithubConfig()
            .then(config => {
                if (!config.username) {
                    throw new Error('GitHub 用户名未配置');
                }

                const params = new URLSearchParams();
                params.append('username', config.username);
                if (locale) params.append('locale', locale);
                if (showIcons) params.append('show_icons', showIcons);
                if (theme) params.append('theme', theme);

                const imageUrl = config.proxyUrl + 'api?' + params.toString();
                createGithubImage(element, imageUrl, 'GitHub Stats', 'xhhaocom-dataStatistics-v2-github-error');
            })
            .catch(err => {
                console.error('[GitHub Stats]', err);
                element.innerHTML = '<div class="xhhaocom-dataStatistics-v2-github-error">加载失败</div>';
            });
    }

    function initGithubTopLangs(element) {
        element.className = 'xhhaocom-dataStatistics-v2-github-top-langs';
        if (showLoading) showLoading(element);

        const layout = element.getAttribute('data-layout') || '';
        const hideProgress = element.getAttribute('data-hide-progress') || '';
        const statsFormat = element.getAttribute('data-stats-format') || '';

        getGithubConfig()
            .then(config => {
                if (!config.username) {
                    throw new Error('GitHub 用户名未配置');
                }

                const params = new URLSearchParams();
                params.append('username', config.username);
                if (layout) params.append('layout', layout);
                if (hideProgress) params.append('hide_progress', hideProgress);
                if (statsFormat) params.append('stats_format', statsFormat);

                const imageUrl = config.proxyUrl + 'api/top-langs/?' + params.toString();
                createGithubImage(element, imageUrl, 'GitHub Top Languages', 'xhhaocom-dataStatistics-v2-github-error');
            })
            .catch(err => {
                console.error('[GitHub Top Langs]', err);
                element.innerHTML = '<div class="xhhaocom-dataStatistics-v2-github-error">加载失败</div>';
            });
    }

    function initGithubGraph(element) {
        element.className = 'xhhaocom-dataStatistics-v2-github-graph';
        if (showLoading) showLoading(element);

        const theme = element.getAttribute('data-theme') || 'minimal';

        getGithubConfig()
            .then(config => {
                if (!config.username) {
                    throw new Error('GitHub 用户名未配置');
                }

                const params = new URLSearchParams();
                params.append('username', config.username);
                if (theme) {
                    params.append('theme', theme);
                }

                const imageUrl = config.graphProxyUrl + 'graph?' + params.toString();
                createGithubImage(element, imageUrl, 'GitHub Activity Graph', 'xhhaocom-dataStatistics-v2-github-error');
            })
            .catch(err => {
                console.error('[GitHub Graph]', err);
                element.innerHTML = '<div class="xhhaocom-dataStatistics-v2-github-error">加载失败</div>';
            });
    }

    function initGithubStatisticsContainer(container) {
        if (container.hasAttribute('data-initialized')) {
            return;
        }
        container.setAttribute('data-initialized', 'true');

        let types = (container.getAttribute('data-types') || 'graph').split(',').filter(Boolean);
        
        const typeOrder = ['graph', 'stats', 'pin', 'top-langs'];
        types = types.sort((a, b) => {
            const indexA = typeOrder.indexOf(a);
            const indexB = typeOrder.indexOf(b);

            if (indexA === -1) return 1;
            if (indexB === -1) return -1;
            return indexA - indexB;
        });
        
        container.innerHTML = '';

        const GITHUB_INIT_MAP = {
            'stats': initGithubStats,
            'pin': initGithubPin,
            'top-langs': initGithubTopLangs,
            'graph': initGithubGraph
        };

        types.forEach((type, index) => {
            if (index > 0) {
                const br = document.createElement('br');
                container.appendChild(br);
            }
            const element = document.createElement('div');
            const initFn = GITHUB_INIT_MAP[type];
            
            if (!initFn) {
                console.warn(`[GitHub Statistics] Unknown type: ${type}`);
                return;
            }

            if (type === 'stats') {
                const locale = container.getAttribute('data-stats-locale');
                const showIcons = container.getAttribute('data-stats-show-icons');
                const theme = container.getAttribute('data-stats-theme');
                if (locale) element.setAttribute('data-locale', locale);
                if (showIcons) element.setAttribute('data-show-icons', showIcons);
                if (theme) element.setAttribute('data-theme', theme);
            } else if (type === 'pin') {
                const repo = container.getAttribute('data-pin-repo');
                if (repo) element.setAttribute('data-repo', repo);
            } else if (type === 'top-langs') {
                const layout = container.getAttribute('data-top-langs-layout');
                const hideProgress = container.getAttribute('data-top-langs-hide-progress');
                const statsFormat = container.getAttribute('data-top-langs-stats-format');
                if (layout) element.setAttribute('data-layout', layout);
                if (hideProgress) element.setAttribute('data-hide-progress', hideProgress);
                if (statsFormat) element.setAttribute('data-stats-format', statsFormat);
            } else if (type === 'graph') {
                const theme = container.getAttribute('data-graph-theme') || 'minimal';
                element.setAttribute('data-theme', theme);
            }

            element.style.display = 'block';
            element.style.width = '100%';
            
            container.appendChild(element);
            initFn(element);
        });
    }

    window.xhhaocomDataStatisticsV2Github = {
        initGithubPin,
        initGithubStats,
        initGithubTopLangs,
        initGithubGraph,
        initGithubStatisticsContainer
    };
})();
