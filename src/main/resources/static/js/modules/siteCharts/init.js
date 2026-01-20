import { DEFAULT_CHART_TYPES, BAR_SOFT_COLORS, BAR_STRONG_COLORS } from './constants.js';
import { renderTaxonomyCharts, renderArticleHeatmap, renderCommentChart, renderTopArticles } from './chartRenderers.js';
import { fetchChartData } from './api.js';
import { disposeCharts, registerCharts } from './chartManager.js';

export function renderCharts(container, data) {
    disposeCharts(container);
    container.innerHTML = '';

    const dataTypes = container.getAttribute('data-types');
    const enabledTypes = dataTypes ? dataTypes.split(',').map(t => t.trim()).filter(Boolean) : 
        DEFAULT_CHART_TYPES;

    const charts = [];

    if (enabledTypes.includes('tags') || enabledTypes.includes('categories')) {
        const tags = enabledTypes.includes('tags') ? data.tags : null;
        const categories = enabledTypes.includes('categories') ? data.categories : null;
        charts.push(...renderTaxonomyCharts(container, tags, categories));
    }

    if (enabledTypes.includes('articles')) {
        charts.push(...renderArticleHeatmap(container, data.articles));
    }

    if (enabledTypes.includes('comments')) {
        charts.push(...renderCommentChart(container, data.comments, BAR_SOFT_COLORS, BAR_STRONG_COLORS));
    }

    if (enabledTypes.includes('topArticles')) {
        charts.push(...renderTopArticles(container, data.top10Articles, BAR_SOFT_COLORS, BAR_STRONG_COLORS));
    }

    registerCharts(container, charts);

    if (container.children.length === 0) {
        container.innerHTML = '<div class="xhhaocom-chartboard-empty">暂无可展示的数据</div>';
    }
}

export async function fetchAndRender(container) {
    container.classList.add('xhhaocom-chartboard');
    container.innerHTML = '<div class="xhhaocom-chartboard-loading">数据加载中…</div>';

    try {
        const data = await fetchChartData();
        renderCharts(container, data || {});
    } catch (error) {
        console.error('[ChartBoard] fetch error:', error);
        container.innerHTML = `<div class="xhhaocom-chartboard-error">获取图表数据失败：${error.message}</div>`;
    }
}

export function waitForChart(callback, maxAttempts = 50) {
    if (typeof Chart !== 'undefined') {
        callback();
        return;
    }
    
    if (maxAttempts <= 0) {
        console.error('[ChartBoard] Chart.js 加载超时');
        return;
    }
    
    setTimeout(() => waitForChart(callback, maxAttempts - 1), 100);
}

export function init() {
    waitForChart(() => {
        document.querySelectorAll('.xhhaocom-chartboard').forEach(container => {
            if (!container.hasAttribute('data-initialized')) {
                container.setAttribute('data-initialized', 'true');
                fetchAndRender(container);
            }
        });
    });
}

export function setupMutationObserver() {
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(() => {
            init();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
}
