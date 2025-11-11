/**
 * 数据统计图表自动初始化系统
 * 使用方法：
 * <div class="xhhaocom-dataStatistics-visit" type="day"></div>
 * <div class="xhhaocom-dataStatistics-tag"></div>
 * <div class="xhhaocom-dataStatistics-category"></div>
 * <div class="xhhaocom-dataStatistics-article"></div>
 * <div class="xhhaocom-dataStatistics-comment"></div>
 * <div class="xhhaocom-dataStatistics-popular"></div>
 * <div class="xhhaocom-dataStatistics-realtime"></div>
 */

(function() {
    'use strict';

    // 确保 ECharts 已加载
    if (typeof echarts === 'undefined') {
        console.error('ECharts 未加载，请先引入 echarts.min.js');
        return;
    }

    // 图表实例存储
    const chartInstances = new Map();
    
    // 等待 DOM 加载完成
    function initAutoCharts() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAutoCharts);
            return;
        }

        // 扫描所有统计组件
        const components = document.querySelectorAll('[class*="xhhaocom-dataStatistics-"]');
        components.forEach((element, index) => {
            const className = element.className;
            const type = element.getAttribute('type') || 'weekly';
            
            // 提取组件类型
            let componentType = '';
            if (className.includes('xhhaocom-dataStatistics-visit')) {
                componentType = 'visit';
            } else if (className.includes('xhhaocom-dataStatistics-tag')) {
                componentType = 'tag';
            } else if (className.includes('xhhaocom-dataStatistics-category')) {
                componentType = 'category';
            } else if (className.includes('xhhaocom-dataStatistics-article')) {
                componentType = 'article';
            } else if (className.includes('xhhaocom-dataStatistics-comment')) {
                componentType = 'comment';
            } else if (className.includes('xhhaocom-dataStatistics-popular')) {
                componentType = 'popular';
            } else if (className.includes('xhhaocom-dataStatistics-realtime')) {
                componentType = 'realtime';
            }

            if (componentType) {
                initChartComponent(element, componentType, type, index);
            }
        });
    }

    // 初始化图表组件
    function initChartComponent(element, componentType, type, index) {
        // 确保元素有高度
        if (!element.style.height) {
            element.style.height = '400px';
            element.style.width = '100%';
        }

        // 添加加载提示
        element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;">加载中...</div>';

        const chartId = `xhhaocom-chart-${componentType}-${index}`;
        element.setAttribute('data-chart-id', chartId);

        switch (componentType) {
            case 'visit':
                initVisitChart(element, type, chartId);
                break;
            case 'tag':
                initTagChart(element, chartId);
                break;
            case 'category':
                initCategoryChart(element, chartId);
                break;
            case 'article':
                initArticleChart(element, chartId);
                break;
            case 'comment':
                initCommentChart(element, chartId);
                break;
            case 'popular':
                initPopularChart(element, chartId);
                break;
            case 'realtime':
                initRealtimeChart(element, chartId);
                break;
        }
    }

    // 通用 resize 处理
    function setupResize(chart) {
        const resizeHandler = () => chart.resize();
        window.addEventListener('resize', resizeHandler);
        return resizeHandler;
    }

    // 初始化访问统计图表
    function initVisitChart(element, type, chartId) {
        const url = `/apis/api.data.statistics.xhhao.com/v1alpha1/umami/visits?type=${type || 'weekly'}`;
        
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (!data) {
                    element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;">暂无数据</div>';
                    return;
                }

                const chart = echarts.init(element);
                chartInstances.set(chartId, chart);

                // 处理汇总数据
                if (data.pageviews !== undefined && typeof data.pageviews === 'string') {
                    const pageviews = parseInt(data.pageviews) || 0;
                    const visits = parseInt(data.visits) || 0;
                    
                    chart.setOption({
                        title: { text: '访问统计', left: 'center', top: 10 },
                        tooltip: { trigger: 'axis' },
                        xAxis: { type: 'category', data: ['页面浏览量', '访问次数'] },
                        yAxis: { type: 'value' },
                        series: [{
                            type: 'bar',
                            data: [pageviews, visits],
                            itemStyle: { color: '#5470c6', borderRadius: [8, 8, 0, 0] },
                            label: { show: true, position: 'top' }
                        }]
                    });
                } else {
                    // 处理时间序列数据
                    const pageviewsData = data.pageviews || [];
                    chart.setOption({
                        title: { text: '访问统计', left: 'center', top: 10 },
                        tooltip: { trigger: 'axis' },
                        xAxis: { type: 'category', data: pageviewsData.map(d => d.x || d.t) },
                        yAxis: { type: 'value' },
                        series: [{
                            type: 'line',
                            smooth: true,
                            data: pageviewsData.map(d => d.y || d.value),
                            areaStyle: { color: 'rgba(84, 112, 198, 0.2)' }
                        }]
                    });
                }

                setupResize(chart);
            })
            .catch(error => {
                console.error('加载访问统计失败:', error);
                element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#f56565;">加载失败</div>';
            });
    }

    // 初始化标签统计图表
    function initTagChart(element, chartId) {
        fetch('/apis/api.data.statistics.xhhao.com/v1alpha1/chart/data')
            .then(response => response.json())
            .then(data => {
                if (!data || !data.tags) {
                    element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;">暂无数据</div>';
                    return;
                }

                const chart = echarts.init(element);
                chartInstances.set(chartId, chart);

                const tagData = data.tags.slice(0, 10).map(tag => ({
                    value: tag.count || 0,
                    name: tag.name || '未知'
                }));

                chart.setOption({
                    title: { text: '标签统计', left: 'center', top: 10 },
                    tooltip: { trigger: 'item', formatter: '{b}<br/>文章数: {c} ({d}%)' },
                    series: [{
                        type: 'pie',
                        radius: ['45%', '75%'],
                        data: tagData,
                        emphasis: { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
                    }]
                });

                chart.on('click', function(params) {
                    if (params.data && params.data.name) {
                        window.open('/tags/' + encodeURIComponent(params.data.name), '_blank');
                    }
                });

                setupResize(chart);
            })
            .catch(error => {
                console.error('加载标签统计失败:', error);
                element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#f56565;">加载失败</div>';
            });
    }

    // 初始化分类统计图表
    function initCategoryChart(element, chartId) {
        fetch('/apis/api.data.statistics.xhhao.com/v1alpha1/chart/data')
            .then(response => response.json())
            .then(data => {
                if (!data || !data.categories) {
                    element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;">暂无数据</div>';
                    return;
                }

                const chart = echarts.init(element);
                chartInstances.set(chartId, chart);

                const categoryNames = data.categories.map(cat => cat.name || '未知');
                const categoryValues = data.categories.map(cat => cat.total || 0);

                chart.setOption({
                    title: { text: '分类统计', left: 'center', top: 10 },
                    tooltip: { trigger: 'axis' },
                    xAxis: { type: 'category', data: categoryNames },
                    yAxis: { type: 'value' },
                    series: [{
                        type: 'line',
                        smooth: true,
                        data: categoryValues,
                        areaStyle: { color: 'rgba(84, 112, 198, 0.2)' }
                    }]
                });

                setupResize(chart);
            })
            .catch(error => {
                console.error('加载分类统计失败:', error);
                element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#f56565;">加载失败</div>';
            });
    }

    // 初始化文章统计图表
    function initArticleChart(element, chartId) {
        fetch('/apis/api.data.statistics.xhhao.com/v1alpha1/chart/data')
            .then(response => response.json())
            .then(data => {
                if (!data || !data.articles) {
                    element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;">暂无数据</div>';
                    return;
                }

                const chart = echarts.init(element);
                chartInstances.set(chartId, chart);

                const articleData = data.articles.map(article => {
                    let dateStr = article.name || article.date;
                    if (dateStr && dateStr.includes('T')) {
                        dateStr = dateStr.split('T')[0];
                    }
                    return [dateStr, article.total || 0];
                });

                const currentYear = new Date().getFullYear();
                const lastYear = currentYear - 1;

                chart.setOption({
                    title: { text: '文章发布日历', left: 'center', top: 10 },
                    tooltip: { position: 'top' },
                    visualMap: {
                        min: 0,
                        max: 10,
                        type: 'piecewise',
                        orient: 'horizontal',
                        left: 'center',
                        top: 50,
                        pieces: [
                            { min: 9, max: 10, color: '#0a2463' },
                            { min: 7, max: 8, color: '#1e3a8a' },
                            { min: 5, max: 6, color: '#3b82f6' },
                            { min: 3, max: 4, color: '#60a5fa' },
                            { min: 1, max: 2, color: '#93c5fd' },
                            { min: 0, max: 0, color: '#dbeafe' }
                        ]
                    },
                    calendar: {
                        top: 100,
                        left: 30,
                        right: 30,
                        cellSize: ['auto', 13],
                        range: [lastYear + '-01-01', echarts.time.format(new Date(), '{yyyy}-{MM}-{dd}', false)],
                        itemStyle: { borderWidth: 0.5, borderColor: '#fff' },
                        dayLabel: { nameMap: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] },
                        monthLabel: { nameMap: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
                        yearLabel: { show: false }
                    },
                    series: [{
                        type: 'heatmap',
                        coordinateSystem: 'calendar',
                        data: articleData
                    }]
                });

                setupResize(chart);
            })
            .catch(error => {
                console.error('加载文章统计失败:', error);
                element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#f56565;">加载失败</div>';
            });
    }

    // 初始化评论统计图表
    function initCommentChart(element, chartId) {
        fetch('/apis/api.data.statistics.xhhao.com/v1alpha1/chart/data')
            .then(response => response.json())
            .then(data => {
                if (!data || !data.comments) {
                    element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;">暂无数据</div>';
                    return;
                }

                const chart = echarts.init(element);
                chartInstances.set(chartId, chart);

                const comments = data.comments.slice(0, 10);
                const users = comments.map(comment => {
                    let name = comment.username || comment.email || '未知用户';
                    if (name.includes('@')) name = name.split('@')[0];
                    if (name.length > 15) name = name.substring(0, 15) + '...';
                    return name;
                });

                const commentData = [];
                comments.forEach((comment, index) => {
                    const count = comment.count || 0;
                    for (let i = 0; i < 20; ++i) {
                        commentData.push([index, count + (Math.random() - 0.5) * 5, count]);
                    }
                });

                chart.setOption({
                    title: { text: '评论者排行 Top 10', left: 'center', top: 10 },
                    tooltip: { trigger: 'item' },
                    xAxis: { type: 'category', data: users, axisLabel: { rotate: 45 } },
                    yAxis: { type: 'value', name: '评论数' },
                    series: [{
                        type: 'scatter',
                        data: commentData,
                        symbolSize: function(data) { return Math.sqrt(data[2]) * 2; }
                    }]
                });

                setupResize(chart);
            })
            .catch(error => {
                console.error('加载评论统计失败:', error);
                element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#f56565;">加载失败</div>';
            });
    }

    // 初始化热门文章图表
    function initPopularChart(element, chartId) {
        fetch('/apis/api.data.statistics.xhhao.com/v1alpha1/chart/data')
            .then(response => response.json())
            .then(data => {
                if (!data || !data.top10Articles) {
                    element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;">暂无数据</div>';
                    return;
                }

                const chart = echarts.init(element);
                chartInstances.set(chartId, chart);

                const articles = data.top10Articles.map(article => article.name || '未知文章');
                const views = data.top10Articles.map(article => article.views || 0);

                chart.setOption({
                    title: { text: '热门文章 Top 10', left: 'center', top: 10 },
                    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
                    xAxis: {
                        type: 'category',
                        data: articles.map(title => title.length > 12 ? title.substring(0, 12) + '...' : title),
                        axisLabel: { rotate: 45 }
                    },
                    yAxis: { type: 'value' },
                    series: [{
                        type: 'bar',
                        data: views,
                        itemStyle: { color: '#5470c6', borderRadius: [8, 8, 0, 0] },
                        label: { show: true, position: 'top' }
                    }]
                });

                setupResize(chart);
            })
            .catch(error => {
                console.error('加载热门文章失败:', error);
                element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#f56565;">加载失败</div>';
            });
    }

    // 初始化实时统计图表
    function initRealtimeChart(element, chartId) {
        const url = '/apis/api.data.statistics.xhhao.com/v1alpha1/umami/realtime';
        
        function loadRealtime() {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    if (!data) {
                        element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#999;">暂无数据</div>';
                        return;
                    }

                    let chart = chartInstances.get(chartId);
                    if (!chart) {
                        chart = echarts.init(element);
                        chartInstances.set(chartId, chart);
                        setupResize(chart);
                    }

                    // 处理实时数据
                    if (data.data && Array.isArray(data.data)) {
                        const times = data.data.map(item => item.x || item.t);
                        const pageviews = data.data.map(item => item.y || item.value);
                        const visitors = new Array(data.data.length).fill(data.visitors || 0);

                        chart.setOption({
                            title: { text: 'Realtime Statistics', left: 'center', top: 10 },
                            tooltip: { trigger: 'axis' },
                            legend: { data: ['Pageviews', 'Visitors'], top: 40 },
                            xAxis: { type: 'category', data: times },
                            yAxis: { type: 'value' },
                            series: [
                                { name: 'Pageviews', type: 'line', data: pageviews },
                                { name: 'Visitors', type: 'line', data: visitors }
                            ]
                        });
                    } else if (data.pageviews !== undefined || data.visitors !== undefined) {
                        const pageviews = parseInt(data.pageviews) || 0;
                        const visitors = parseInt(data.visitors) || 0;

                        chart.setOption({
                            title: { text: 'Realtime Statistics', left: 'center', top: 10 },
                            tooltip: { trigger: 'axis' },
                            xAxis: { type: 'category', data: ['Pageviews', 'Visitors'] },
                            yAxis: { type: 'value' },
                            series: [{
                                type: 'bar',
                                data: [pageviews, visitors],
                                itemStyle: { color: '#fac858', borderRadius: [8, 8, 0, 0] },
                                label: { show: true, position: 'top' }
                            }]
                        });
                    }
                })
                .catch(error => {
                    console.error('加载实时统计失败:', error);
                    element.innerHTML = '<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#f56565;">加载失败</div>';
                });
        }

        loadRealtime();
        // 每30秒刷新一次
        setInterval(loadRealtime, 30000);
    }

    // 自动初始化
    initAutoCharts();

    // 导出全局函数供手动调用
    window.xhhaocomDataStatisticsInit = initAutoCharts;
})();
