const chartRegistry = new Map();

export function registerCharts(container, charts) {
    const actualCharts = charts.filter(chart => chart && typeof chart.destroy === 'function');
    if (actualCharts.length > 0) {
        chartRegistry.set(container, actualCharts);
    }
}

export function disposeCharts(container) {
    const charts = chartRegistry.get(container);
    if (charts) {
        charts.forEach(instance => {
            if (instance?.destroy) {
                instance.destroy();
            }
        });
        chartRegistry.delete(container);
    }
}

export function getCharts(container) {
    return chartRegistry.get(container) || [];
}
