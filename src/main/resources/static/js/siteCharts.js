(function () {
    'use strict';

    const API_ENDPOINT = '/apis/api.data.statistics.xhhao.com/v1alpha1/chart/data';
        const COLOR_PALETTE = [
        '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
        '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#0ea5e9'
    ];
        const DAY_IN_MS = 24 * 60 * 60 * 1000;

    const chartRegistry = new Map();

    function ready(fn) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', fn);
        } else {
            fn();
        }
    }

    function formatNumber(num) {
        const value = Number(num) || 0;
        if (value >= 1_000_000) return (value / 1_000_000).toFixed(1) + 'M';
        if (value >= 1_000) return (value / 1_000).toFixed(1) + 'K';
        return value.toString();
    }

    function safeGet(target, path, fallback = undefined) {
        return path.split('.').reduce((acc, key) => {
            if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
                return acc[key];
            }
            return undefined;
        }, target) ?? fallback;
    }

    function disposeCharts(container) {
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

    function createSection(container, title, subtitle) {
        const section = document.createElement('section');
        section.className = 'xhhaocom-chartboard-section';

        const header = document.createElement('header');
        header.className = 'xhhaocom-chartboard-section__header';
        header.innerHTML = `
            <div class="xhhaocom-chartboard-section__title">${title}</div>
            ${subtitle ? `<div class="xhhaocom-chartboard-section__subtitle">${subtitle}</div>` : ''}
        `;
        section.appendChild(header);

        const body = document.createElement('div');
        body.className = 'xhhaocom-chartboard-section__body';
        section.appendChild(body);

        container.appendChild(section);
        return body;
    }

    function buildCanvasCard(body, hint) {
        const card = document.createElement('div');
        card.className = 'xhhaocom-chartboard-card';

        const canvasWrapper = document.createElement('div');
        canvasWrapper.className = 'xhhaocom-chartboard-card__canvas';
        const canvas = document.createElement('canvas');
        canvasWrapper.appendChild(canvas);

        card.appendChild(canvasWrapper);

        if (hint) {
            const footer = document.createElement('footer');
            footer.className = 'xhhaocom-chartboard-card__footer';
            footer.textContent = hint;
            card.appendChild(footer);
        }

        body.appendChild(card);
        return canvas;
    }

    function formatDateYMD(date) {
        return date.toISOString().slice(0, 10);
    }

    function renderTaxonomyCharts(container, tags, categories) {
        const section = createSection(
            container,
            '标签与分类统计',
            '展示全部标签和分类的文章数量占比'
        );

        const cards = [];

        const tagData = (tags || [])
            .map(tag => ({
                name:
                    tag?.name ??
                    safeGet(tag, 'spec.displayName') ??
                    safeGet(tag, 'metadata.name') ??
                    '未命名标签',
                count: Number(
                    tag?.count ??
                    tag?.total ??
                    safeGet(tag, 'status.visiblePostCount', 0)
                )
            }))
            .filter(item => item.count > 0)
            .sort((a, b) => b.count - a.count);

        const categoryData = (categories || [])
            .map(category => ({
                name:
                    category?.name ??
                    safeGet(category, 'spec.displayName') ??
                    safeGet(category, 'metadata.name') ??
                    '未命名分类',
                count: Number(
                    category?.total ??
                    category?.count ??
                    safeGet(category, 'status.visiblePostCount', 0)
                )
            }))
            .filter(item => item.count > 0)
            .sort((a, b) => b.count - a.count);

        if (!tagData.length && !categoryData.length) {
            section.innerHTML = '<div class="xhhaocom-chartboard-empty">暂无标签或分类数据</div>';
            return [];
        }

        const charts = [];

        if (tagData.length) {
            const unusedTags = (tags?.length || 0) - tagData.length;
            const tagFootnote = unusedTags > 0
                ? `已使用标签 ${tagData.length} 个（另有 ${unusedTags} 个未使用）`
                : `已使用标签 ${tagData.length} 个`;
            const canvas = buildCanvasCard(section, tagFootnote);
            const card = canvas.closest('.xhhaocom-chartboard-card');
            if (card) {
                card.classList.add('xhhaocom-chartboard-card--animated');
            }
            const chart = new Chart(canvas, {
                type: 'doughnut',
                data: {
                    labels: tagData.map(item => item.name),
                    datasets: [{
                        data: tagData.map(item => item.count),
                        backgroundColor: tagData.map((_, index) => COLOR_PALETTE[index % COLOR_PALETTE.length]),
                        borderWidth: 2,
                        borderColor: '#ffffff',
                        cutout: '55%',
                        hoverOffset: 8,
                        hoverBorderWidth: 3
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    animation: {
                        animateRotate: true,
                        animateScale: true,
                        duration: 1200,
                        easing: 'easeOutQuart'
                    },
                    interaction: {
                        intersect: false,
                        mode: 'point'
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            enabled: true,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 12,
                            cornerRadius: 8,
                            displayColors: true,
                            callbacks: {
                                label: context => `${context.label}: ${context.raw} 篇文章`
                            }
                        }
                    },
                    onHover: (event, activeElements) => {
                        canvas.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
                    }
                }
            });

            chart.canvas.style.height = '220px';
            chart.canvas.style.maxHeight = '220px';
            chart.resize();

            charts.push(chart);
            if (card) {
                cards.push(card);
            }
        }

        if (categoryData.length) {
            const unusedCategories = (categories?.length || 0) - categoryData.length;
            const categoryFootnote = unusedCategories > 0
                ? `已使用分类 ${categoryData.length} 个（另有 ${unusedCategories} 个未使用）`
                : `已使用分类 ${categoryData.length} 个`;
            const canvas = buildCanvasCard(section, categoryFootnote);
            const card = canvas.closest('.xhhaocom-chartboard-card');
            if (card) {
                card.classList.add('xhhaocom-chartboard-card--animated');
            }
            
            // 按数量排序用于折线图显示
            const sortedData = [...categoryData].sort((a, b) => a.count - b.count);
            
            const chart = new Chart(canvas, {
                type: 'line',
                data: {
                    labels: sortedData.map(item => item.name),
                    datasets: [{
                        label: '文章数量',
                        data: sortedData.map(item => item.count),
                        borderColor: COLOR_PALETTE[0],
                        backgroundColor: COLOR_PALETTE[0] + '20',
                        borderWidth: 3,
                        fill: true,
                        tension: 0.4,
                        pointRadius: 5,
                        pointHoverRadius: 8,
                        pointBackgroundColor: COLOR_PALETTE[0],
                        pointBorderColor: '#ffffff',
                        pointBorderWidth: 2,
                        pointHoverBackgroundColor: COLOR_PALETTE[0],
                        pointHoverBorderColor: '#ffffff',
                        pointHoverBorderWidth: 3
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    animation: {
                        duration: 1500,
                        easing: 'easeOutQuart'
                    },
                    interaction: {
                        intersect: false,
                        mode: 'index'
                    },
                    scales: {
                        x: {
                            beginAtZero: false,
                            grid: {
                                display: false
                            },
                            ticks: {
                                font: {
                                    size: 11
                                },
                                maxRotation: 45,
                                minRotation: 0
                            }
                        },
                        y: {
                            beginAtZero: true,
                            grid: {
                                color: 'rgba(0, 0, 0, 0.05)',
                                drawBorder: false
                            },
                            ticks: {
                                font: {
                                    size: 11
                                },
                                callback: value => Number(value)
                            }
                        }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            enabled: true,
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 12,
                            cornerRadius: 8,
                            displayColors: true,
                            callbacks: {
                                label: context => `${context.label}: ${context.raw} 篇文章`
                            }
                        }
                    },
                    onHover: (event, activeElements) => {
                        canvas.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
                    }
                }
            });
            charts.push(chart);
            if (card) {
                cards.push(card);
            }
        }

        if (cards.length === 1) {
            cards[0].style.gridColumn = 'span 2';
        }

        return charts;
    }

    function renderArticleHeatmap(container, articles) {
        const chartArea = createSection(
            container,
            '文章发布趋势',
            '按日期统计文章发布数量'
        );

        const dataMap = new Map();
        (articles || []).forEach(article => {
            const rawDate = article.date || article.name;
            if (!rawDate) {
                return;
            }
            const date = new Date(rawDate);
            if (Number.isNaN(date.valueOf())) {
                return;
            }
            date.setHours(0, 0, 0, 0);
            const key = formatDateYMD(date);
            const total = Number(article.total ?? article.count ?? 0);
            dataMap.set(key, (dataMap.get(key) || 0) + total);
        });

        if (!dataMap.size) {
            chartArea.innerHTML = '<div class="xhhaocom-chartboard-empty">暂无文章数据</div>';
            return [];
        }

        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const end = new Date(now);
        const start = new Date(end.getTime() - 364 * DAY_IN_MS);

        const firstMonday = new Date(start);
        const offsetToMonday = (firstMonday.getDay() + 6) % 7;
        firstMonday.setDate(firstMonday.getDate() - offsetToMonday);

        const totalDays = Math.floor((end - firstMonday) / DAY_IN_MS) + 1;
        const weeksCount = Math.ceil(totalDays / 7);
        const weeks = Array.from({ length: weeksCount }, (_, index) =>
            new Date(firstMonday.getTime() + index * 7 * DAY_IN_MS)
        );

        const maxValue = Math.max(...dataMap.values(), 0);

        const card = document.createElement('div');
        card.className = 'xhhaocom-chartboard-card xhhaocom-chartboard-card--heatmap';
        card.style.gridColumn = '1 / -1';

        const heatmap = document.createElement('div');
        heatmap.className = 'xhhaocom-chartboard-heatmap';

        const tooltip = document.createElement('div');
        tooltip.className = 'xhhaocom-chartboard-heatmap__tooltip';
        tooltip.style.display = 'none';
        card.appendChild(tooltip);

        const monthsRow = document.createElement('div');
        monthsRow.className = 'xhhaocom-chartboard-heatmap__months';
        monthsRow.style.gridTemplateColumns = `repeat(${weeksCount}, var(--chartboard-heatmap-cell-width))`;

        const weekdaysCol = document.createElement('div');
        weekdaysCol.className = 'xhhaocom-chartboard-heatmap__weekdays';
        const weekdayLabels = ['一', '二', '三', '四', '五', '六', '日'];
        weekdayLabels.forEach(day => {
            const label = document.createElement('div');
            label.className = 'xhhaocom-chartboard-heatmap__weekday';
            label.textContent = day;
            weekdaysCol.appendChild(label);
        });

        const grid = document.createElement('div');
        grid.className = 'xhhaocom-chartboard-heatmap__grid';
        grid.style.gridTemplateColumns = `repeat(${weeksCount}, var(--chartboard-heatmap-cell-width))`;

        const computeLevel = value => {
            if (!value || !maxValue) {
                return 0;
            }
            if (maxValue <= 1) {
                return value > 0 ? 1 : 0;
            }
            const q1 = Math.max(1, Math.ceil(maxValue * 0.25));
            const q2 = Math.max(q1 + 1, Math.ceil(maxValue * 0.5));
            const q3 = Math.max(q2 + 1, Math.ceil(maxValue * 0.75));
            if (value >= q3) return 4;
            if (value >= q2) return 3;
            if (value >= q1) return 2;
            return 1;
        };

        const showTooltip = (event, dateKey, value) => {
            tooltip.innerHTML = `<strong>${dateKey}</strong><span>${value ? `发布 ${value} 篇文章` : '无文章发布'}</span>`;
            tooltip.style.display = 'flex';

            const cardRect = card.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();

            let left = event.clientX - cardRect.left + 12;
            let top = event.clientY - cardRect.top - tooltipRect.height - 10;

            if (left + tooltipRect.width > cardRect.width) {
                left = cardRect.width - tooltipRect.width - 8;
            }
            if (top < 0) {
                top = event.clientY - cardRect.top + 12;
            }

            tooltip.style.transform = `translate(${Math.round(left)}px, ${Math.round(top)}px)`;
        };

        const hideTooltip = () => {
            tooltip.style.display = 'none';
            tooltip.style.transform = 'translate(-9999px, -9999px)';
        };

        const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
        let monthSegments = [];
        {
            const cursor = new Date(start.getFullYear(), start.getMonth(), 1);
            const lastMonth = new Date(end.getFullYear(), end.getMonth(), 1);

            while (cursor <= lastMonth) {
                const monthStart = new Date(cursor);
                const monthEnd = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0);

                const effectiveStart = monthStart < start ? new Date(start) : monthStart;
                const effectiveEnd = monthEnd > end ? new Date(end) : monthEnd;

                const startOffsetDays = Math.floor((effectiveStart - firstMonday) / DAY_IN_MS);
                const endOffsetDays = Math.floor((effectiveEnd - firstMonday) / DAY_IN_MS);
                const startWeek = Math.max(0, Math.min(weeksCount - 1, Math.floor(startOffsetDays / 7)));
                const endWeekExclusive = Math.max(startWeek + 1, Math.min(weeksCount, Math.floor(endOffsetDays / 7) + 1));

                monthSegments.push({
                    label: monthNames[cursor.getMonth()],
                    start: startWeek,
                    end: endWeekExclusive
                });

                cursor.setMonth(cursor.getMonth() + 1);
            }
        }

        if (monthSegments.length) {
            const normalized = [];
            let cursorIndex = 0;
            monthSegments.forEach(segment => {
                let start = Math.max(cursorIndex, segment.start);
                let end = Math.max(start + 1, segment.end);

                start = Math.min(start, weeksCount - 1);
                end = Math.min(end, weeksCount);
                if (start >= weeksCount) {
                    return;
                }

                normalized.push({
                    label: segment.label,
                    start,
                    end
                });
                cursorIndex = end;
            });
            monthSegments = normalized;
        }

        weeks.forEach((weekStart, weekIndex) => {
            const column = document.createElement('div');
            column.className = 'xhhaocom-chartboard-heatmap__column';

            for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
                const day = new Date(weekStart.getTime() + dayIndex * DAY_IN_MS);
                const cell = document.createElement('div');
                cell.className = 'xhhaocom-chartboard-heatmap__day';

                const dayKey = formatDateYMD(day);
                const isWithinRange = day >= start && day <= end;

                if (!isWithinRange) {
                    cell.classList.add('is-outside');
                } else {
                    const value = dataMap.get(dayKey) || 0;
                    const level = computeLevel(value);
                    cell.dataset.level = level.toString();
                    cell.dataset.value = value.toString();
                    cell.dataset.date = dayKey;

                    const handleMouseMove = event => showTooltip(event, dayKey, value);
                    cell.addEventListener('mouseenter', handleMouseMove);
                    cell.addEventListener('mousemove', handleMouseMove);
                    cell.addEventListener('mouseleave', hideTooltip);
                }

                column.appendChild(cell);
            }

            grid.appendChild(column);
        });

        card.addEventListener('mouseleave', hideTooltip);

        let cursor = 0;
        monthSegments.forEach(segment => {
            if (segment.start > cursor) {
                const filler = document.createElement('div');
                filler.className = 'xhhaocom-chartboard-heatmap__month is-placeholder';
                filler.style.gridColumn = `span ${segment.start - cursor}`;
                monthsRow.appendChild(filler);
            }

            const span = Math.max(1, segment.end - segment.start);
            const label = document.createElement('div');
            label.className = 'xhhaocom-chartboard-heatmap__month';
            label.textContent = segment.label;
            label.style.gridColumn = `span ${span}`;
            monthsRow.appendChild(label);

            cursor = segment.end;
        });

        if (cursor < weeksCount) {
            const filler = document.createElement('div');
            filler.className = 'xhhaocom-chartboard-heatmap__month is-placeholder';
            filler.style.gridColumn = `span ${weeksCount - cursor}`;
            monthsRow.appendChild(filler);
        }

        heatmap.appendChild(weekdaysCol);
        heatmap.appendChild(monthsRow);
        heatmap.appendChild(grid);

        const footerRow = document.createElement('div');
        footerRow.className = 'xhhaocom-chartboard-heatmap__footer';

        const dateRange = document.createElement('div');
        dateRange.className = 'xhhaocom-chartboard-heatmap__date-range';
        dateRange.textContent = `${formatDateYMD(start)} 至 ${formatDateYMD(end)}`;
        footerRow.appendChild(dateRange);

        const legend = document.createElement('div');
        legend.className = 'xhhaocom-chartboard-heatmap__legend';
        const legendLabelMin = document.createElement('span');
        legendLabelMin.textContent = '较少';
        legend.appendChild(legendLabelMin);
        [0, 1, 2, 3, 4].forEach(level => {
            const dot = document.createElement('span');
            dot.className = 'xhhaocom-chartboard-heatmap__legend-dot';
            dot.dataset.level = level.toString();
            legend.appendChild(dot);
        });
        const legendLabelMax = document.createElement('span');
        legendLabelMax.textContent = '较多';
        legend.appendChild(legendLabelMax);
        footerRow.appendChild(legend);

        heatmap.appendChild(footerRow);
        card.appendChild(heatmap);

        chartArea.appendChild(card);

        return [];
    }

    const BAR_SOFT_COLORS = [
        'rgba(255, 99, 132, 0.22)',
        'rgba(255, 159, 64, 0.22)',
        'rgba(255, 205, 86, 0.22)',
        'rgba(75, 192, 192, 0.22)',
        'rgba(54, 162, 235, 0.22)',
        'rgba(153, 102, 255, 0.22)',
        'rgba(201, 203, 207, 0.22)',
        'rgba(236, 72, 153, 0.22)',
        'rgba(16, 185, 129, 0.22)',
        'rgba(14, 165, 233, 0.22)'
    ];

    const BAR_STRONG_COLORS = [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
        'rgb(236, 72, 153)',
        'rgb(16, 185, 129)',
        'rgb(14, 165, 233)'
    ];

    function createBarColors(length) {
        return Array.from({ length }, (_, index) => ({
            background: BAR_SOFT_COLORS[index % BAR_SOFT_COLORS.length],
            border: BAR_STRONG_COLORS[index % BAR_STRONG_COLORS.length]
        }));
    }

    function renderCommentChart(container, comments) {
        const chartArea = createSection(
            container,
            '评论活跃用户',
            '按评论作者统计评论数量'
        );
        if (!comments?.length) {
            chartArea.innerHTML = '<div class="xhhaocom-chartboard-empty">暂无评论数据</div>';
            return [];
        }

        const normalized = comments
            .map(comment => ({
                name: comment?.username || comment?.name || comment?.email || '匿名',
                count: Number(comment?.count ?? 0)
            }))
            .filter(item => item.count > 0)
            .sort((a, b) => b.count - a.count)
            .slice(0, 10);

        if (!normalized.length) {
            chartArea.innerHTML = '<div class="xhhaocom-chartboard-empty">暂无评论数据</div>';
            return [];
        }

        const canvas = buildCanvasCard(chartArea, `活跃评论用户 Top ${normalized.length}`);
        const card = canvas.closest('.xhhaocom-chartboard-card');
        if (card) {
            card.classList.add('xhhaocom-chartboard-card--animated');
        }

        const barColors = createBarColors(normalized.length);

        const chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: normalized.map(item => item.name),
                datasets: [{
                    label: '评论数量',
                    data: normalized.map(item => item.count),
                    backgroundColor: barColors.map(item => item.background),
                    borderColor: barColors.map(item => item.border),
                    borderWidth: 1.5,
                    borderRadius: {
                        topLeft: 14,
                        topRight: 14,
                        bottomLeft: 14,
                        bottomRight: 14
                    },
                    barPercentage: 0.65,
                    categoryPercentage: 0.6
                }]
            },
            options: {
                maintainAspectRatio: false,
                animation: {
                    duration: 1400,
                    easing: 'easeOutQuart'
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(148, 163, 184, 0.18)',
                            drawBorder: false,
                            borderDash: [4, 4]
                        },
                        ticks: {
                            precision: 0,
                            font: { size: 12 }
                        }
                    },
                    x: {
                        grid: {
                            drawBorder: false
                        },
                        ticks: {
                            font: { size: 12 },
                            autoSkip: false
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.88)',
                        cornerRadius: 8,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            title: items => items[0]?.label || '',
                            label: context => `评论 ${context.raw} 次`
                        }
                    }
                },
                onHover: (event, activeElements) => {
                    canvas.style.cursor = activeElements.length ? 'pointer' : 'default';
                }
            }
        });

        return [chart];
    }

    function renderTopArticles(container, articles) {
        const chartArea = createSection(
            container,
            '热门文章 Top10',
            '按访问量排序的热门文章'
        );
        if (!articles?.length) {
            chartArea.innerHTML = '<div class="xhhaocom-chartboard-empty">暂无热门文章数据</div>';
            return [];
        }

        const normalized = articles
            .map(item => ({
                name: item.name || '未命名文章',
                views: Number(item.views ?? item.count ?? 0)
            }))
            .filter(item => item.views > 0)
            .sort((a, b) => b.views - a.views)
            .slice(0, 10);

        if (!normalized.length) {
            chartArea.innerHTML = '<div class="xhhaocom-chartboard-empty">暂无热门文章数据</div>';
            return [];
        }

        const canvas = buildCanvasCard(chartArea, `热门文章 Top ${normalized.length}`);
        const card = canvas.closest('.xhhaocom-chartboard-card');
        if (card) {
            card.classList.add('xhhaocom-chartboard-card--animated');
        }

        const articleColors = createBarColors(normalized.length);

        const chart = new Chart(canvas, {
            type: 'bar',
            data: {
                labels: normalized.map(item => item.name.length > 16 ? item.name.slice(0, 16) + '…' : item.name),
                datasets: [{
                    label: '访问量',
                    data: normalized.map(item => item.views),
                    backgroundColor: articleColors.map(item => item.background),
                    borderColor: articleColors.map(item => item.border),
                    borderWidth: 1.5,
                    borderRadius: {
                        topLeft: 14,
                        topRight: 14,
                        bottomLeft: 14,
                        bottomRight: 14
                    },
                    barPercentage: 0.65,
                    categoryPercentage: 0.6
                }]
            },
            options: {
                maintainAspectRatio: false,
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                },
                interaction: {
                    mode: 'index',
                    intersect: false
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(148, 163, 184, 0.18)',
                            drawBorder: false,
                            borderDash: [4, 4]
                        },
                        ticks: {
                            callback: value => formatNumber(value),
                            font: { size: 12 }
                        }
                    },
                    x: {
                        grid: {
                            drawBorder: false
                        },
                        ticks: {
                            font: { size: 12 },
                            autoSkip: false
                        }
                    }
                },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(15, 23, 42, 0.88)',
                        cornerRadius: 8,
                        padding: 12,
                        displayColors: false,
                        callbacks: {
                            title: items => items[0]?.label || '',
                            label: context => `访问量 ${formatNumber(context.raw)}`
                        }
                    }
                },
                onHover: (event, activeElements) => {
                    canvas.style.cursor = activeElements.length ? 'pointer' : 'default';
                }
            }
        });

        return [chart];
    }

    function renderCharts(container, data) {
        disposeCharts(container);
        container.innerHTML = '';

        // 获取要渲染的图表类型
        const dataTypes = container.getAttribute('data-types');
        const enabledTypes = dataTypes ? dataTypes.split(',').map(t => t.trim()).filter(Boolean) : 
            ['tags', 'categories', 'articles', 'comments', 'topArticles'];

        const charts = [];

        // 根据选择的类型渲染对应的图表
        if (enabledTypes.includes('tags') || enabledTypes.includes('categories')) {
            const tags = enabledTypes.includes('tags') ? data.tags : null;
            const categories = enabledTypes.includes('categories') ? data.categories : null;
            charts.push(...renderTaxonomyCharts(container, tags, categories));
        }

        if (enabledTypes.includes('articles')) {
            charts.push(...renderArticleHeatmap(container, data.articles));
        }

        if (enabledTypes.includes('comments')) {
            charts.push(...renderCommentChart(container, data.comments));
        }

        if (enabledTypes.includes('topArticles')) {
            charts.push(...renderTopArticles(container, data.top10Articles));
        }

        if (!charts.length) {
            container.innerHTML = '<div class="xhhaocom-chartboard-empty">暂无可展示的数据</div>';
        } else {
            chartRegistry.set(container, charts);
        }
    }

    function fetchAndRender(container) {
        container.classList.add('xhhaocom-chartboard');
        container.innerHTML = '<div class="xhhaocom-chartboard-loading">数据加载中…</div>';

        fetch(API_ENDPOINT)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }
                return response.json();
            })
            .then(data => renderCharts(container, data || {}))
            .catch(error => {
                console.error('[ChartBoard] fetch error:', error);
                container.innerHTML = `<div class="xhhaocom-chartboard-error">获取图表数据失败：${error.message}</div>`;
            });
    }

    function waitForChart(callback, maxAttempts = 50) {
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

    function init() {
        waitForChart(() => {
            document.querySelectorAll('.xhhaocom-chartboard').forEach(container => {
                if (!container.hasAttribute('data-initialized')) {
                    container.setAttribute('data-initialized', 'true');
                    fetchAndRender(container);
                }
            });
        });
    }

    ready(init);

    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(() => {
            init();
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }
})();

