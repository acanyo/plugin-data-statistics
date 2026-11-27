import { LitElement, html, nothing, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  Chart,
  DoughnutController,
  ArcElement,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Filler,
  CategoryScale,
  LinearScale,
  Tooltip
} from 'chart.js';
import type { Plugin } from 'chart.js';
import { fetchChartData } from '../api';
import { ThemeController } from '../theme-controller';
import {
  formatDateYMD,
  formatExact,
  formatNumber,
  formatPercent,
  hexToRgba,
  isValidHexColor
} from '../utils';
import type { ChartData, MonthlyTrendData } from '../types';
import { siteChartsStyles } from '../styles/site-charts-styles';

Chart.register(
  DoughnutController,
  ArcElement,
  BarController,
  BarElement,
  LineController,
  LineElement,
  PointElement,
  Filler,
  CategoryScale,
  LinearScale,
  Tooltip
);

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const WEEKDAY_NAMES = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const MONTH_NAMES = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];

const PALETTE_LIGHT = [
  '#2563eb', '#0ea5e9', '#10b981', '#8b5cf6', '#f59e0b',
  '#ec4899', '#14b8a6', '#6366f1', '#64748b', '#06b6d4'
];

const PALETTE_DARK = [
  '#60a5fa', '#38bdf8', '#34d399', '#a78bfa', '#fbbf24',
  '#f472b6', '#2dd4bf', '#818cf8', '#94a3b8', '#22d3ee'
];

const OVERVIEW_ICONS = {
  article: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  eye: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  comment: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  clock: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  download: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`
};

type HeatmapFilter = 'all' | 'articles' | 'moments';

interface NormalizedTaxonomy {
  name: string;
  count: number;
  permalink?: string;
}

interface DayRecord {
  total: number;
  articleTotal: number;
  momentTotal: number;
}

interface TooltipState {
  visible: boolean;
  below: boolean;
  x: number;
  y: number;
  dateLabel: string;
  detail: string;
}

@customElement('site-charts')
export class SiteCharts extends LitElement {
  static styles = siteChartsStyles;

  @property({ type: String, attribute: 'data-types' })
  dataTypes = 'overview,tags,categories,articles,monthlyTrend,comments,topArticles';

  @property({ type: String, attribute: 'accent-color' })
  accentColor = '';

  @property({ type: Boolean, reflect: true })
  compact = false;

  @state() private loading = true;
  @state() private exporting = false;
  @state() private error: string | null = null;
  @state() private chartData: ChartData | null = null;

  @state() private activeTagIndex: number | null = null;
  @state() private pinnedTagIndex: number | null = null;
  @state() private categoriesExpanded = false;
  @state() private heatmapFilter: HeatmapFilter = 'all';
  @state() private heatmapCellPx = 12;
  @state() private tooltip: TooltipState = {
    visible: false,
    below: false,
    x: -9999,
    y: -9999,
    dateLabel: '',
    detail: ''
  };

  private themeController: ThemeController;
  private tagsChart: Chart | null = null;
  private monthlyChart: Chart | null = null;
  private commentsChart: Chart | null = null;
  private heatmapResizeObserver?: ResizeObserver;
  private observedHeatmapEl: Element | null = null;

  constructor() {
    super();
    this.themeController = new ThemeController(this, () => {
      this.syncChartThemes();
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.applyAccentOverride();
    void this.loadData();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.destroyCharts();
    this.heatmapResizeObserver?.disconnect();
    this.heatmapResizeObserver = undefined;
    this.observedHeatmapEl = null;
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has('accentColor')) {
      this.applyAccentOverride();
      this.syncChartThemes();
    }
    if (changed.has('chartData') || changed.has('dataTypes') || changed.has('loading')) {
      if (!this.loading && this.chartData) {
        this.applyAccentOverride();
        this.mountCharts();
        this.attachHeatmapObserver();
      }
    }
  }

  private applyAccentOverride(): void {
    const custom = isValidHexColor(this.accentColor)
      ? this.accentColor.trim()
      : isValidHexColor(this.chartData?.accentColor || '')
        ? this.chartData!.accentColor!.trim()
        : '';
    if (custom && custom.toLowerCase() !== '#2563eb') {
      this.style.setProperty('--ds-custom-accent', custom);
    }
  }

  private resolveAccentHex(): string {
    if (isValidHexColor(this.accentColor)) return this.accentColor.trim();
    const cssAccent = getComputedStyle(this).getPropertyValue('--ds-accent').trim();
    if (isValidHexColor(cssAccent)) return cssAccent;
    return this.themeController.mode === 'dark' ? '#60a5fa' : '#2563eb';
  }

  private get enabledTypes(): string[] {
    const raw = (this.dataTypes || '').trim();
    if (!raw) {
      return ['overview', 'tags', 'categories', 'articles', 'monthlyTrend', 'comments', 'topArticles'];
    }
    return raw.split(',').map((t) => t.trim()).filter(Boolean);
  }

  private get palette(): string[] {
    const base = this.themeController.mode === 'dark' ? PALETTE_DARK : PALETTE_LIGHT;
    const accent = this.resolveAccentHex();
    return [accent, ...base.slice(1)];
  }

  private get normalizedTags(): NormalizedTaxonomy[] {
    const tags = this.chartData?.tags || [];
    return tags
      .map((tag) => ({
        name: tag.name ?? tag.spec?.displayName ?? tag.metadata?.name ?? '未命名标签',
        count: Number(tag.count ?? tag.total ?? tag.status?.visiblePostCount ?? 0),
        permalink: tag.permalink ?? tag.status?.permalink
      }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count);
  }

  private get normalizedCategories(): NormalizedTaxonomy[] {
    const categories = this.chartData?.categories || [];
    return categories
      .map((category) => ({
        name: category.name ?? category.spec?.displayName ?? category.metadata?.name ?? '未命名分类',
        count: Number(category.total ?? category.count ?? category.status?.visiblePostCount ?? 0),
        permalink: category.permalink ?? category.status?.permalink
      }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count);
  }

  private get normalizedComments(): Array<{ name: string; count: number }> {
    const comments = this.chartData?.comments || [];
    return comments
      .map((c) => ({
        name: c.username || c.name || c.email || '匿名访客',
        count: Number(c.count ?? 0)
      }))
      .filter((item) => item.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }

  private get normalizedTopArticles(): Array<{ name: string; views: number; permalink?: string }> {
    const articles = this.chartData?.top10Articles || [];
    return articles
      .map((a) => ({
        name: a.name || '未命名文章',
        views: Number(a.views ?? a.count ?? 0),
        permalink: a.permalink
      }))
      .filter((item) => item.views > 0)
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);
  }

  private get normalizedMonthlyTrend(): MonthlyTrendData[] {
    if (Array.isArray(this.chartData?.monthlyTrend) && this.chartData.monthlyTrend.length > 0) {
      return this.chartData.monthlyTrend;
    }
    // Fallback client-side derivation from daily articles
    const map = new Map<string, { articleCount: number; momentCount: number }>();
    const now = new Date();
    const keys: string[] = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      keys.push(ym);
      map.set(ym, { articleCount: 0, momentCount: 0 });
    }
    (this.chartData?.articles || []).forEach((a) => {
      const rawDate = a.date || a.name;
      if (!rawDate) return;
      const d = new Date(rawDate);
      if (Number.isNaN(d.valueOf())) return;
      const ym = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const bucket = map.get(ym);
      if (!bucket) return;
      bucket.articleCount += Number(a.articleTotal ?? a.total ?? a.count ?? 0);
      bucket.momentCount += Number(a.momentTotal ?? 0);
    });
    return keys.map((month) => {
      const b = map.get(month)!;
      return { month, articleCount: b.articleCount, momentCount: b.momentCount, total: b.articleCount + b.momentCount };
    });
  }

  private async loadData(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      this.chartData = await fetchChartData();
    } catch (err) {
      this.error = err instanceof Error ? err.message : '请求失败';
    } finally {
      this.loading = false;
    }
  }

  private destroyCharts(): void {
    this.tagsChart?.destroy();
    this.tagsChart = null;
    this.monthlyChart?.destroy();
    this.monthlyChart = null;
    this.commentsChart?.destroy();
    this.commentsChart = null;
  }

  private getChartColors() {
    const dark = this.themeController.mode === 'dark';
    const accent = this.resolveAccentHex();
    return {
      dark,
      accent,
      accentSoft: hexToRgba(accent, dark ? 0.22 : 0.14),
      palette: this.palette,
      surfaceSubtle: dark ? '#14171f' : '#fafafa',
      grid: dark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(113, 113, 122, 0.14)',
      tick: dark ? '#a1a1aa' : '#71717a',
      textPrimary: dark ? '#f4f4f5' : '#09090b',
      tooltipBg: dark ? '#222633' : '#18181b',
      tooltipText: dark ? '#f4f4f5' : '#fafafa',
      tooltipBorder: dark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)'
    };
  }

  private mountCharts(): void {
    this.destroyCharts();
    const colors = this.getChartColors();

    // 1. Tags Doughnut
    const tagsCanvas = this.renderRoot.querySelector<HTMLCanvasElement>('#tags-canvas');
    const tags = this.normalizedTags;
    if (tagsCanvas && tags.length > 0) {
      const totalTagPosts = tags.reduce((sum, item) => sum + item.count, 0);
      this.tagsChart = new Chart(tagsCanvas, {
        type: 'doughnut',
        data: {
          labels: tags.map((t) => t.name),
          datasets: [
            {
              data: tags.map((t) => t.count),
              backgroundColor: tags.map((_, i) => colors.palette[i % colors.palette.length]),
              borderWidth: 2,
              borderColor: colors.surfaceSubtle,
              hoverOffset: 4
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '68%',
          animation: { duration: 520, easing: 'easeOutCubic' },
          plugins: {
            tooltip: {
              enabled: true,
              backgroundColor: colors.tooltipBg,
              titleColor: colors.tooltipText,
              bodyColor: colors.tooltipText,
              borderColor: colors.tooltipBorder,
              borderWidth: 1,
              padding: 10,
              cornerRadius: 8,
              displayColors: true,
              callbacks: {
                label: (ctx) => {
                  const val = Number(ctx.raw) || 0;
                  return ` ${ctx.label}：${val} 篇 (${formatPercent(val, totalTagPosts)})`;
                }
              }
            }
          },
          onHover: (_event, activeElements) => {
            tagsCanvas.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
            this.activeTagIndex = activeElements.length > 0 ? activeElements[0].index : null;
          },
          onClick: (_event, activeElements) => {
            if (activeElements.length > 0) {
              const idx = activeElements[0].index;
              this.pinnedTagIndex = this.pinnedTagIndex === idx ? null : idx;
            } else {
              this.pinnedTagIndex = null;
            }
          }
        }
      });
    }

    // 2. Monthly Publishing Trend Area Chart
    const monthlyCanvas = this.renderRoot.querySelector<HTMLCanvasElement>('#monthly-trend-canvas');
    const monthly = this.normalizedMonthlyTrend;
    if (monthlyCanvas && monthly.length > 0) {
      const hasMoments = Boolean(this.chartData?.enableMomentHeatmap) && monthly.some((m) => m.momentCount > 0);
      const datasets = [
        {
          label: '文章发布',
          data: monthly.map((m) => m.articleCount),
          borderColor: colors.accent,
          backgroundColor: colors.accentSoft,
          borderWidth: 2,
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: colors.accent
        }
      ];
      if (hasMoments) {
        const secondary = colors.dark ? '#34d399' : '#10b981';
        datasets.push({
          label: '瞬间发布',
          data: monthly.map((m) => m.momentCount),
          borderColor: secondary,
          backgroundColor: hexToRgba(secondary, colors.dark ? 0.16 : 0.1),
          borderWidth: 1.8,
          fill: true,
          tension: 0.35,
          pointRadius: 2.5,
          pointHoverRadius: 4.5,
          pointBackgroundColor: secondary
        });
      }

      this.monthlyChart = new Chart(monthlyCanvas, {
        type: 'line',
        data: {
          labels: monthly.map((m) => `${Number(m.month.slice(5, 7))}月`),
          datasets
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          animation: { duration: 480, easing: 'easeOutCubic' },
          interaction: { mode: 'index', intersect: false },
          scales: {
            x: {
              border: { display: false },
              grid: { display: false },
              ticks: { color: colors.tick, font: { size: 11.5 } }
            },
            y: {
              beginAtZero: true,
              border: { display: false },
              grid: { color: colors.grid, drawTicks: false },
              ticks: { precision: 0, color: colors.tick, maxTicksLimit: 5, font: { size: 11.5 } }
            }
          },
          plugins: {
            tooltip: {
              backgroundColor: colors.tooltipBg,
              titleColor: colors.tooltipText,
              bodyColor: colors.tooltipText,
              borderColor: colors.tooltipBorder,
              borderWidth: 1,
              cornerRadius: 8,
              padding: 10,
              callbacks: {
                title: (items) => {
                  const idx = items[0]?.dataIndex ?? 0;
                  return monthly[idx]?.month || '';
                },
                label: (ctx) => ` ${ctx.dataset.label}：${ctx.raw} 条`
              }
            }
          }
        }
      });
    }

    // 3. Comments Horizontal Bar with right-end direct value labels
    const commentsCanvas = this.renderRoot.querySelector<HTMLCanvasElement>('#comments-canvas');
    const comments = this.normalizedComments;
    if (commentsCanvas && comments.length > 0) {
      const buildFills = (accent: string) =>
        comments.map((_, i) => {
          if (i === 0) return accent;
          if (i < 3) return hexToRgba(accent, 0.72);
          return hexToRgba(accent, 0.35);
        });

      const directValuePlugin: Plugin<'bar'> = {
        id: 'dsBarValueLabels',
        afterDatasetsDraw: (chart) => {
          const { ctx } = chart;
          const meta = chart.getDatasetMeta(0);
          const tk = this.getChartColors();
          ctx.save();
          ctx.font = '600 11.5px -apple-system, BlinkMacSystemFont, Inter, sans-serif';
          ctx.textBaseline = 'middle';
          ctx.textAlign = 'left';
          meta.data.forEach((barEl, i) => {
            const val = comments[i]?.count;
            if (val == null) return;
            ctx.fillStyle = i < 3 ? tk.textPrimary : tk.tick;
            ctx.fillText(String(val), barEl.x + 8, barEl.y);
          });
          ctx.restore();
        }
      };

      this.commentsChart = new Chart(commentsCanvas, {
        type: 'bar',
        plugins: [directValuePlugin],
        data: {
          labels: comments.map((c) => (c.name.length > 14 ? `${c.name.slice(0, 14)}…` : c.name)),
          datasets: [
            {
              label: '评论数',
              data: comments.map((c) => c.count),
              backgroundColor: buildFills(colors.accent),
              hoverBackgroundColor: colors.accent,
              borderRadius: 5,
              borderSkipped: false,
              barThickness: 18,
              maxBarThickness: 22
            }
          ]
        },
        options: {
          indexAxis: 'y',
          responsive: true,
          maintainAspectRatio: false,
          layout: { padding: { right: 34 } },
          animation: { duration: 500, easing: 'easeOutCubic' },
          interaction: { mode: 'index', axis: 'y', intersect: false },
          scales: {
            x: {
              beginAtZero: true,
              border: { display: false },
              grid: { color: colors.grid, drawTicks: false },
              ticks: { precision: 0, color: colors.tick, padding: 6, font: { size: 11.5 } }
            },
            y: {
              border: { display: false },
              grid: { display: false },
              ticks: { color: colors.textPrimary, padding: 8, font: { size: 12, weight: 'bold' } }
            }
          },
          plugins: {
            tooltip: {
              backgroundColor: colors.tooltipBg,
              titleColor: colors.tooltipText,
              bodyColor: colors.tooltipText,
              borderColor: colors.tooltipBorder,
              borderWidth: 1,
              cornerRadius: 8,
              padding: 10,
              displayColors: false,
              callbacks: {
                title: (items) => comments[items[0]?.dataIndex ?? 0]?.name || '',
                label: (ctx) => `评论 ${formatExact(Number(ctx.raw) || 0)} 条`
              }
            }
          },
          onHover: (_event, activeElements) => {
            commentsCanvas.style.cursor = activeElements.length > 0 ? 'pointer' : 'default';
          }
        }
      });
    }
  }

  private syncChartThemes(): void {
    const colors = this.getChartColors();

    if (this.tagsChart) {
      const tags = this.normalizedTags;
      const ds = this.tagsChart.data.datasets[0];
      ds.backgroundColor = tags.map((_, i) => colors.palette[i % colors.palette.length]);
      ds.borderColor = colors.surfaceSubtle;
      const tip = this.tagsChart.options.plugins?.tooltip;
      if (tip) {
        tip.backgroundColor = colors.tooltipBg;
        tip.titleColor = colors.tooltipText;
        tip.bodyColor = colors.tooltipText;
        tip.borderColor = colors.tooltipBorder;
      }
      this.tagsChart.update('none');
    }

    if (this.monthlyChart) {
      const ds0 = this.monthlyChart.data.datasets[0];
      if (ds0) {
        ds0.borderColor = colors.accent;
        ds0.backgroundColor = colors.accentSoft;
      }
      const xScale = this.monthlyChart.options.scales?.x;
      const yScale = this.monthlyChart.options.scales?.y;
      if (xScale?.ticks) xScale.ticks.color = colors.tick;
      if (yScale?.ticks) yScale.ticks.color = colors.tick;
      if (yScale?.grid) yScale.grid.color = colors.grid;
      this.monthlyChart.update('none');
    }

    if (this.commentsChart) {
      const comments = this.normalizedComments;
      const ds = this.commentsChart.data.datasets[0];
      ds.backgroundColor = comments.map((_, i) => {
        if (i === 0) return colors.accent;
        if (i < 3) return hexToRgba(colors.accent, 0.72);
        return hexToRgba(colors.accent, 0.35);
      });
      ds.hoverBackgroundColor = colors.accent;
      const xScale = this.commentsChart.options.scales?.x;
      const yScale = this.commentsChart.options.scales?.y;
      if (xScale?.grid) xScale.grid.color = colors.grid;
      if (xScale?.ticks) xScale.ticks.color = colors.tick;
      if (yScale?.ticks) yScale.ticks.color = colors.textPrimary;
      this.commentsChart.update('none');
    }
  }

  private attachHeatmapObserver(): void {
    const scrollEl = this.renderRoot.querySelector('.heatmap-scroll');
    if (!scrollEl || scrollEl === this.observedHeatmapEl) return;

    this.heatmapResizeObserver?.disconnect();
    this.observedHeatmapEl = scrollEl;

    const recalc = () => {
      const rect = scrollEl.getBoundingClientRect();
      if (rect.width <= 0) return;
      if (window.innerWidth <= 768) {
        this.heatmapCellPx = 11;
        return;
      }
      const weeksCount = 53;
      const weekdayWidth = 24;
      const gap = 3;
      const available = rect.width - weekdayWidth - 8;
      const cell = Math.floor((available - (weeksCount - 1) * gap) / weeksCount);
      this.heatmapCellPx = Math.max(9, Math.min(14, cell));
    };

    this.heatmapResizeObserver = new ResizeObserver(recalc);
    this.heatmapResizeObserver.observe(scrollEl);
    recalc();
  }

  /* ========================================================================
     High-DPI 2x Canvas PNG Export (Zero External Dependencies)
     ======================================================================== */

  private exportSummaryPng(): void {
    if (!this.chartData || this.exporting) return;
    this.exporting = true;

    try {
      const dark = this.themeController.mode === 'dark';
      const accent = this.resolveAccentHex();
      const dpr = 2;
      const width = 920;
      const height = 650;

      const canvas = document.createElement('canvas');
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      ctx.scale(dpr, dpr);

      const bg = dark ? '#090a0e' : '#f8fafc';
      const surface = dark ? '#0e1015' : '#ffffff';
      const subtle = dark ? '#14171f' : '#fafafa';
      const border = dark ? 'rgba(255,255,255,0.1)' : '#e4e4e7';
      const textPrimary = dark ? '#f4f4f5' : '#09090b';
      const textMuted = dark ? '#a1a1aa' : '#71717a';
      const font = "-apple-system, BlinkMacSystemFont, 'Inter', 'PingFang SC', sans-serif";

      const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
        ctx.beginPath();
        ctx.roundRect(x, y, w, h, r);
      };

      // Canvas backdrop
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);

      // Outer Frame
      roundRect(24, 24, width - 48, height - 48, 16);
      ctx.fillStyle = surface;
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Header
      const siteTitle = document.title ? document.title.slice(0, 32) : '站点数据统计';
      ctx.fillStyle = textPrimary;
      ctx.font = `700 18px ${font}`;
      ctx.fillText(siteTitle, 52, 66);

      ctx.fillStyle = textMuted;
      ctx.font = `400 12px ${font}`;
      ctx.fillText(`数据快照 · ${formatDateYMD(new Date())}`, 52, 86);

      // Accent pill top right
      roundRect(width - 170, 48, 118, 26, 13);
      ctx.fillStyle = hexToRgba(accent, dark ? 0.2 : 0.1);
      ctx.fill();
      ctx.fillStyle = accent;
      ctx.font = `600 11.5px ${font}`;
      ctx.textAlign = 'center';
      ctx.fillText('Halo Data Stats', width - 111, 65);
      ctx.textAlign = 'left';

      // 4 KPI Cards
      const summary = this.chartData.summary;
      const kpis = [
        { label: '已发布文章', value: formatNumber(summary?.totalPosts ?? this.normalizedTopArticles.length) },
        { label: '全站总阅读', value: formatNumber(summary?.totalViews ?? this.normalizedTopArticles.reduce((s, a) => s + a.views, 0)) },
        { label: '累计评论', value: formatNumber(summary?.totalComments ?? this.normalizedComments.reduce((s, c) => s + c.count, 0)) },
        { label: '已运行天数', value: `${summary?.runningDays ?? 0} 天` }
      ];
      const cardW = (width - 104 - 36) / 4;
      kpis.forEach((k, i) => {
        const cx = 52 + i * (cardW + 12);
        roundRect(cx, 108, cardW, 74, 10);
        ctx.fillStyle = subtle;
        ctx.fill();
        ctx.strokeStyle = border;
        ctx.stroke();

        ctx.fillStyle = textMuted;
        ctx.font = `500 11.5px ${font}`;
        ctx.fillText(k.label, cx + 16, 133);

        ctx.fillStyle = textPrimary;
        ctx.font = `700 22px ${font}`;
        ctx.fillText(k.value, cx + 16, 164);
      });

      // Heatmap Panel
      roundRect(52, 200, width - 104, 156, 10);
      ctx.fillStyle = subtle;
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.stroke();

      ctx.fillStyle = textPrimary;
      ctx.font = `600 13px ${font}`;
      ctx.fillText('近一年创作热力图', 70, 226);

      const dataMap = new Map<string, number>();
      (this.chartData.articles || []).forEach((a) => {
        const rawDate = a.date || a.name;
        if (!rawDate) return;
        const d = new Date(rawDate);
        if (Number.isNaN(d.valueOf())) return;
        const key = formatDateYMD(d);
        const val = a.total != null ? Number(a.total) : Number(a.articleTotal ?? a.count ?? 0);
        dataMap.set(key, (dataMap.get(key) || 0) + val);
      });
      const maxDay = Math.max(...Array.from(dataMap.values()), 1);
      const hmColors = dark
        ? ['rgba(255,255,255,0.06)', hexToRgba(accent, 0.28), hexToRgba(accent, 0.5), hexToRgba(accent, 0.74), accent]
        : ['#f1f5f9', hexToRgba(accent, 0.2), hexToRgba(accent, 0.45), hexToRgba(accent, 0.72), accent];

      const end = new Date();
      end.setHours(0, 0, 0, 0);
      const start = new Date(end.getTime() - 364 * DAY_IN_MS);
      const firstMonday = new Date(start);
      firstMonday.setDate(firstMonday.getDate() - ((firstMonday.getDay() + 6) % 7));

      const cell = 11;
      const gap = 3.5;
      for (let w = 0; w < 53; w++) {
        for (let d = 0; d < 7; d++) {
          const cur = new Date(firstMonday.getTime() + (w * 7 + d) * DAY_IN_MS);
          if (cur < start || cur > end) continue;
          const v = dataMap.get(formatDateYMD(cur)) || 0;
          const level = v === 0 ? 0 : Math.min(4, Math.ceil((v / maxDay) * 4));
          ctx.fillStyle = hmColors[level];
          roundRect(70 + w * (cell + gap), 244 + d * (cell + gap), cell, cell, 2.5);
          ctx.fill();
        }
      }

      // Bottom Split: Top Categories (Left) + Top 5 Articles (Right)
      const splitY = 374;
      const splitH = 224;
      const leftW = 340;
      const rightX = 52 + leftW + 16;
      const rightW = width - 104 - leftW - 16;

      roundRect(52, splitY, leftW, splitH, 10);
      ctx.fillStyle = subtle;
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.stroke();

      ctx.fillStyle = textPrimary;
      ctx.font = `600 13px ${font}`;
      ctx.fillText('分类分布 Top 5', 70, splitY + 28);

      const topCats = this.normalizedCategories.slice(0, 5);
      const maxCat = Math.max(...topCats.map((c) => c.count), 1);
      topCats.forEach((c, i) => {
        const y = splitY + 58 + i * 32;
        ctx.fillStyle = textPrimary;
        ctx.font = `500 12px ${font}`;
        ctx.fillText(c.name.slice(0, 14), 70, y);

        ctx.fillStyle = textMuted;
        ctx.textAlign = 'right';
        ctx.fillText(`${c.count} 篇`, 52 + leftW - 18, y);
        ctx.textAlign = 'left';

        const trackW = leftW - 36;
        roundRect(70, y + 7, trackW, 5, 2.5);
        ctx.fillStyle = dark ? 'rgba(255,255,255,0.07)' : '#e2e8f0';
        ctx.fill();

        roundRect(70, y + 7, Math.max(8, (c.count / maxCat) * trackW), 5, 2.5);
        ctx.fillStyle = hexToRgba(accent, Math.max(0.45, 1 - i * 0.12));
        ctx.fill();
      });

      // Top 5 Articles
      roundRect(rightX, splitY, rightW, splitH, 10);
      ctx.fillStyle = subtle;
      ctx.fill();
      ctx.strokeStyle = border;
      ctx.stroke();

      ctx.fillStyle = textPrimary;
      ctx.font = `600 13px ${font}`;
      ctx.fillText('热门文章 Top 5', rightX + 18, splitY + 28);

      const topArts = this.normalizedTopArticles.slice(0, 5);
      topArts.forEach((a, i) => {
        const y = splitY + 58 + i * 32;
        roundRect(rightX + 18, y - 12, 20, 18, 5);
        ctx.fillStyle = i === 0 ? accent : hexToRgba(accent, dark ? 0.2 : 0.1);
        ctx.fill();
        ctx.fillStyle = i === 0 ? '#ffffff' : accent;
        ctx.font = `600 10.5px ${font}`;
        ctx.textAlign = 'center';
        ctx.fillText(`0${i + 1}`, rightX + 28, y + 1);
        ctx.textAlign = 'left';

        ctx.fillStyle = textPrimary;
        ctx.font = `500 12px ${font}`;
        const title = a.name.length > 24 ? `${a.name.slice(0, 24)}…` : a.name;
        ctx.fillText(title, rightX + 46, y + 1);

        ctx.fillStyle = textMuted;
        ctx.textAlign = 'right';
        ctx.fillText(formatNumber(a.views), rightX + rightW - 18, y + 1);
        ctx.textAlign = 'left';
      });

      const link = document.createElement('a');
      link.download = `site-statistics-${formatDateYMD(new Date())}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      this.exporting = false;
    }
  }

  private handleLegendHover(index: number | null): void {
    this.activeTagIndex = index;
    if (!this.tagsChart) return;
    const highlight = index ?? this.pinnedTagIndex;
    this.tagsChart.setActiveElements(highlight !== null ? [{ datasetIndex: 0, index: highlight }] : []);
    this.tagsChart.update('none');
  }

  private handleLegendClick(index: number): void {
    this.pinnedTagIndex = this.pinnedTagIndex === index ? null : index;
    if (!this.tagsChart) return;
    this.tagsChart.setActiveElements(
      this.pinnedTagIndex !== null ? [{ datasetIndex: 0, index: this.pinnedTagIndex }] : []
    );
    this.tagsChart.update('none');
  }

  private clearPinnedTag(): void {
    this.pinnedTagIndex = null;
    this.activeTagIndex = null;
    if (this.tagsChart) {
      this.tagsChart.setActiveElements([]);
      this.tagsChart.update('none');
    }
  }

  private handleHeatmapCellEnter(
    e: Event,
    dateKey: string,
    weekday: string,
    val: DayRecord,
    enableMoments: boolean
  ): void {
    const target = e.currentTarget as HTMLElement;
    const card = this.renderRoot.querySelector<HTMLElement>('.heatmap-card');
    if (!card || !target) return;

    let detail = '无发布记录';
    if (this.heatmapFilter === 'articles') {
      detail = val.articleTotal > 0 ? `${val.articleTotal} 篇文章` : '无文章发布';
    } else if (this.heatmapFilter === 'moments') {
      detail = val.momentTotal > 0 ? `${val.momentTotal} 条瞬间` : '无瞬间发布';
    } else if (enableMoments) {
      if (val.articleTotal > 0 && val.momentTotal > 0) {
        detail = `${val.articleTotal} 篇文章 · ${val.momentTotal} 条瞬间`;
      } else if (val.articleTotal > 0) {
        detail = `${val.articleTotal} 篇文章`;
      } else if (val.momentTotal > 0) {
        detail = `${val.momentTotal} 条瞬间`;
      }
    } else if (val.articleTotal > 0) {
      detail = `${val.articleTotal} 篇文章`;
    }

    const cardRect = card.getBoundingClientRect();
    const cellRect = target.getBoundingClientRect();
    const approxWidth = 156;
    let x = cellRect.left - cardRect.left + cellRect.width / 2 - approxWidth / 2;
    let y = cellRect.top - cardRect.top - 56;
    let below = false;

    x = Math.max(4, Math.min(x, Math.max(4, cardRect.width - approxWidth - 4)));
    if (y < 0) {
      y = cellRect.bottom - cardRect.top + 10;
      below = true;
    }

    this.tooltip = {
      visible: true,
      below,
      x: Math.round(x),
      y: Math.round(y),
      dateLabel: `${dateKey} · ${weekday}`,
      detail
    };
  }

  private handleHeatmapLeave(): void {
    if (this.tooltip.visible) {
      this.tooltip = { ...this.tooltip, visible: false };
    }
  }

  /* ========================================================================
     Section Renderers
     ======================================================================== */

  private renderOverviewStrip() {
    if (!this.enabledTypes.includes('overview') && !this.enabledTypes.includes('summary')) {
      return nothing;
    }
    const summary = this.chartData?.summary;

    const totalPosts = summary?.totalPosts ?? this.normalizedTopArticles.length;
    const totalViews =
      summary?.totalViews ?? this.normalizedTopArticles.reduce((s, a) => s + a.views, 0);
    const totalComments =
      summary?.totalComments ?? this.normalizedComments.reduce((s, c) => s + c.count, 0);
    const runningDays = summary?.runningDays ?? 0;

    return html`
      <div class="overview-wrap" aria-label="站内数据概览">
        <div class="overview-bar">
          <span class="overview-bar__title">
            全站内容概览${summary?.siteStartDate ? ` · 始于 ${summary.siteStartDate}` : ''}
          </span>
          <button
            type="button"
            class="ds-btn-ghost"
            ?disabled=${this.exporting}
            @click=${() => this.exportSummaryPng()}
          >
            ${OVERVIEW_ICONS.download}
            <span>${this.exporting ? '生成中…' : '导出长图'}</span>
          </button>
        </div>
        <div class="overview-strip">
          <div class="overview-cell">
            <span class="overview-icon">${OVERVIEW_ICONS.article}</span>
            <div class="overview-body">
              <span class="overview-val" title=${formatExact(totalPosts)}>${formatNumber(totalPosts)}</span>
              <span class="overview-label">已发布文章</span>
            </div>
          </div>
          <div class="overview-cell">
            <span class="overview-icon">${OVERVIEW_ICONS.eye}</span>
            <div class="overview-body">
              <span class="overview-val" title="${formatExact(totalViews)} 次阅读">${formatNumber(totalViews)}</span>
              <span class="overview-label">全站总阅读</span>
            </div>
          </div>
          <div class="overview-cell">
            <span class="overview-icon">${OVERVIEW_ICONS.comment}</span>
            <div class="overview-body">
              <span class="overview-val" title=${formatExact(totalComments)}>${formatNumber(totalComments)}</span>
              <span class="overview-label">累计评论</span>
            </div>
          </div>
          <div class="overview-cell">
            <span class="overview-icon">${OVERVIEW_ICONS.clock}</span>
            <div class="overview-body">
              <span class="overview-val">${runningDays > 0 ? `${formatExact(runningDays)} 天` : `${this.normalizedTags.length}`}</span>
              <span class="overview-label">${runningDays > 0 ? '已稳定运行' : '活跃标签'}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private renderTaxonomySection() {
    const enabled = this.enabledTypes;
    const showTags = enabled.includes('tags');
    const showCategories = enabled.includes('categories');
    if (!showTags && !showCategories) return nothing;

    const tags = this.normalizedTags;
    const categories = this.normalizedCategories;
    const totalTagPosts = tags.reduce((s, t) => s + t.count, 0);
    const totalCatPosts = categories.reduce((s, c) => s + c.count, 0);
    const maxCatCount = Math.max(...categories.map((c) => c.count), 1);

    const unusedTags = Math.max(0, (this.chartData?.tags?.length || 0) - tags.length);
    const unusedCats = Math.max(0, (this.chartData?.categories?.length || 0) - categories.length);

    const focusedIdx = this.activeTagIndex ?? this.pinnedTagIndex;
    const focusedTag = focusedIdx !== null ? tags[focusedIdx] : null;
    const visibleTags = tags.slice(0, 7);
    const visibleCategories = this.categoriesExpanded ? categories : categories.slice(0, 6);
    const panelCount = (showTags && tags.length > 0 ? 1 : 0) + (showCategories && categories.length > 0 ? 1 : 0);

    const title = showTags && showCategories ? '标签与分类分布' : showTags ? '标签分布统计' : '分类分布统计';
    const subtitle =
      showTags && showCategories
        ? '站内已使用标签与分类的文章归属占比'
        : showTags
          ? '按文章关联数量排序的标签分布'
          : '按文章数量排序的分类占比';

    return html`
      <section class="section">
        <header class="section__header">
          <div class="section__heading">
            <div class="section__title">${title}</div>
            <div class="section__subtitle">${subtitle}</div>
          </div>
          <div class="section__right">
            ${showTags ? html`<span class="stat-pill">标签 <strong>${tags.length}</strong></span>` : nothing}
            ${showCategories ? html`<span class="stat-pill">分类 <strong>${categories.length}</strong></span>` : nothing}
          </div>
        </header>

        <div class="section__body">
          ${panelCount === 0
            ? html`<div class="state-card">暂无标签或分类数据</div>`
            : html`
                <div class="taxonomy-grid ${panelCount === 1 ? 'is-single' : ''}">
                  ${showTags && tags.length > 0
                    ? html`
                        <div class="panel">
                          <div class="panel__head">
                            <span class="panel__title">标签分布</span>
                            <div class="panel__meta">
                              ${this.pinnedTagIndex !== null
                                ? html`
                                    <button type="button" class="text-link-btn" @click=${this.clearPinnedTag}>
                                      取消锁定
                                    </button>
                                  `
                                : nothing}
                              <span class="panel__badge">
                                ${tags.length} 个已使用${unusedTags > 0 ? ` · ${unusedTags} 个未使用` : ''}
                              </span>
                            </div>
                          </div>

                          <div class="donut-layout">
                            <div class="donut-stage">
                              <canvas id="tags-canvas"></canvas>
                              <div class="donut-center">
                                <span class="donut-total">
                                  ${focusedTag ? formatNumber(focusedTag.count) : formatNumber(tags.length)}
                                </span>
                                <span class="donut-caption">
                                  ${focusedTag ? focusedTag.name : '活跃标签'}
                                </span>
                                ${focusedTag
                                  ? html`<span class="donut-sub">${formatPercent(focusedTag.count, totalTagPosts)}</span>`
                                  : nothing}
                              </div>
                            </div>

                            <ul class="legend ${focusedIdx !== null ? 'has-focus' : ''}">
                              ${visibleTags.map((item, idx) => {
                                const color = this.palette[idx % this.palette.length];
                                const isActive = this.activeTagIndex === idx;
                                const isPinned = this.pinnedTagIndex === idx;
                                return html`
                                  <li
                                    class="legend__item ${isActive ? 'is-active' : ''} ${isPinned ? 'is-pinned' : ''}"
                                    @mouseenter=${() => this.handleLegendHover(idx)}
                                    @mouseleave=${() => this.handleLegendHover(null)}
                                    @click=${() => this.handleLegendClick(idx)}
                                  >
                                    <span class="legend__left">
                                      <span class="legend__dot" style="background:${color}"></span>
                                      ${item.permalink
                                        ? html`
                                            <a
                                              class="entity-link"
                                              href=${item.permalink}
                                              title=${item.name}
                                              @click=${(e: Event) => e.stopPropagation()}
                                            >
                                              <span class="legend__label">${item.name}</span>
                                              <span class="entity-link__arrow">↗</span>
                                            </a>
                                          `
                                        : html`<span class="legend__label" title=${item.name}>${item.name}</span>`}
                                    </span>
                                    <span class="legend__right">
                                      <span class="legend__count">${item.count}</span>
                                      <span class="legend__pct">${formatPercent(item.count, totalTagPosts)}</span>
                                    </span>
                                  </li>
                                `;
                              })}
                              ${tags.length > 7
                                ? html`<li class="legend__more">其余 ${tags.length - 7} 个标签已归入图表展示</li>`
                                : nothing}
                            </ul>
                          </div>
                        </div>
                      `
                    : nothing}
                  ${showCategories && categories.length > 0
                    ? html`
                        <div class="panel">
                          <div class="panel__head">
                            <span class="panel__title">分类占比</span>
                            <span class="panel__badge">
                              ${categories.length} 个已使用${unusedCats > 0 ? ` · ${unusedCats} 个未使用` : ''}
                            </span>
                          </div>

                          <ul class="dist-list">
                            ${visibleCategories.map((item, idx) => {
                              const widthPct = Math.max(4, Math.round((item.count / maxCatCount) * 100));
                              const opacity = Math.max(0.42, 1 - idx * 0.08);
                              return html`
                                <li class="dist-item">
                                  <div class="dist-meta">
                                    ${item.permalink
                                      ? html`
                                          <a class="entity-link dist-name" href=${item.permalink} title=${item.name}>
                                            <span class="dist-name">${item.name}</span>
                                            <span class="entity-link__arrow">↗</span>
                                          </a>
                                        `
                                      : html`<span class="dist-name" title=${item.name}>${item.name}</span>`}
                                    <span class="dist-values">
                                      <span class="dist-count">${item.count} 篇</span>
                                      <span class="dist-pct">${formatPercent(item.count, totalCatPosts)}</span>
                                    </span>
                                  </div>
                                  <div class="dist-track">
                                    <div class="dist-fill" style="width:${widthPct}%;opacity:${opacity.toFixed(2)}"></div>
                                  </div>
                                </li>
                              `;
                            })}
                          </ul>

                          <div class="panel__footer">
                            <span>分类关联总计 ${formatExact(totalCatPosts)} 篇</span>
                            ${categories.length > 6
                              ? html`
                                  <button
                                    type="button"
                                    class="text-link-btn"
                                    @click=${() => {
                                      this.categoriesExpanded = !this.categoriesExpanded;
                                    }}
                                  >
                                    ${this.categoriesExpanded ? '收起' : `展开全部 (${categories.length})`}
                                  </button>
                                `
                              : nothing}
                          </div>
                        </div>
                      `
                    : nothing}
                </div>
              `}
        </div>
      </section>
    `;
  }

  private renderHeatmapSection() {
    if (!this.enabledTypes.includes('articles')) return nothing;

    const enableMoments = Boolean(this.chartData?.enableMomentHeatmap);
    const dataMap = new Map<string, DayRecord>();

    (this.chartData?.articles || []).forEach((article) => {
      const rawDate = article.date || article.name;
      if (!rawDate) return;
      const d = new Date(rawDate);
      if (Number.isNaN(d.valueOf())) return;
      d.setHours(0, 0, 0, 0);
      const key = formatDateYMD(d);
      const articleTotal = Number(article.articleTotal ?? article.total ?? article.count ?? 0);
      const momentTotal = Number(article.momentTotal ?? 0);
      const rawTotal = article.total != null ? Number(article.total) : articleTotal + momentTotal;
      const total = Number.isFinite(rawTotal) ? rawTotal : articleTotal + momentTotal;
      const current = dataMap.get(key) || { total: 0, articleTotal: 0, momentTotal: 0 };
      dataMap.set(key, {
        total: current.total + total,
        articleTotal: current.articleTotal + articleTotal,
        momentTotal: current.momentTotal + momentTotal
      });
    });

    const end = new Date();
    end.setHours(0, 0, 0, 0);
    const start = new Date(end.getTime() - 364 * DAY_IN_MS);

    let hasAnyMoments = false;
    let totalArticles = 0;
    let totalMoments = 0;
    let filteredTotal = 0;
    let activeDays = 0;
    let maxVal = 0;
    let peakDate = '';
    let longestStreak = 0;
    let currentStreak = 0;

    const getMetricValue = (rec: DayRecord): number => {
      if (this.heatmapFilter === 'articles') return rec.articleTotal;
      if (this.heatmapFilter === 'moments') return rec.momentTotal;
      return rec.total;
    };

    for (let t = start.getTime(); t <= end.getTime(); t += DAY_IN_MS) {
      const key = formatDateYMD(new Date(t));
      const rec = dataMap.get(key);
      if (rec) {
        totalArticles += rec.articleTotal;
        totalMoments += rec.momentTotal;
        if (rec.momentTotal > 0) hasAnyMoments = true;
      }
      const val = rec ? getMetricValue(rec) : 0;
      if (val > 0) {
        filteredTotal += val;
        activeDays += 1;
        currentStreak += 1;
        if (currentStreak > longestStreak) longestStreak = currentStreak;
        if (val > maxVal) {
          maxVal = val;
          peakDate = key;
        }
      } else {
        currentStreak = 0;
      }
    }

    const firstMonday = new Date(start);
    const offsetToMonday = (firstMonday.getDay() + 6) % 7;
    firstMonday.setDate(firstMonday.getDate() - offsetToMonday);
    const totalDays = Math.floor((end.getTime() - firstMonday.getTime()) / DAY_IN_MS) + 1;
    const weeksCount = Math.ceil(totalDays / 7);
    const weeks = Array.from({ length: weeksCount }, (_, i) => new Date(firstMonday.getTime() + i * 7 * DAY_IN_MS));

    const rawSegments: Array<{ label: string; start: number; end: number }> = [];
    const cursorDate = new Date(start.getFullYear(), start.getMonth(), 1);
    const lastMonth = new Date(end.getFullYear(), end.getMonth(), 1);
    while (cursorDate <= lastMonth) {
      const mStart = new Date(cursorDate);
      const mEnd = new Date(cursorDate.getFullYear(), cursorDate.getMonth() + 1, 0);
      const effStart = mStart < start ? new Date(start) : mStart;
      const effEnd = mEnd > end ? new Date(end) : mEnd;
      const sOff = Math.floor((effStart.getTime() - firstMonday.getTime()) / DAY_IN_MS);
      const eOff = Math.floor((effEnd.getTime() - firstMonday.getTime()) / DAY_IN_MS);
      const sWeek = Math.max(0, Math.min(weeksCount - 1, Math.floor(sOff / 7)));
      const eWeek = Math.max(sWeek + 1, Math.min(weeksCount, Math.floor(eOff / 7) + 1));
      rawSegments.push({ label: MONTH_NAMES[cursorDate.getMonth()], start: sWeek, end: eWeek });
      cursorDate.setMonth(cursorDate.getMonth() + 1);
    }

    const monthSegments: Array<{ label: string; span: number; placeholder?: boolean }> = [];
    let colCursor = 0;
    rawSegments.forEach((seg) => {
      const s = Math.max(colCursor, seg.start);
      const e = Math.min(weeksCount, Math.max(s + 1, seg.end));
      if (s >= weeksCount) return;
      if (s > colCursor) {
        monthSegments.push({ label: '', span: s - colCursor, placeholder: true });
      }
      const span = Math.max(1, e - s);
      monthSegments.push({ label: span >= 2 ? seg.label : '', span });
      colCursor = e;
    });
    if (colCursor < weeksCount) {
      monthSegments.push({ label: '', span: weeksCount - colCursor, placeholder: true });
    }

    const computeLevel = (val: number): number => {
      if (!val || !maxVal) return 0;
      if (maxVal <= 1) return val > 0 ? 4 : 0;
      if (maxVal === 2) return val === 1 ? 2 : 4;
      const q1 = Math.max(1, Math.ceil(maxVal * 0.25));
      const q2 = Math.max(q1 + 1, Math.ceil(maxVal * 0.5));
      const q3 = Math.max(q2 + 1, Math.ceil(maxVal * 0.75));
      if (val >= q3) return 4;
      if (val >= q2) return 3;
      if (val >= q1) return 2;
      return 1;
    };

    const showFilter = enableMoments && hasAnyMoments;
    const gridTemplate = `repeat(${weeksCount}, ${this.heatmapCellPx}px)`;

    return html`
      <section class="section">
        <header class="section__header">
          <div class="section__heading">
            <div class="section__title">创作活跃度</div>
            ${this.compact
              ? nothing
              : html`
                  <div class="section__subtitle">
                    ${enableMoments ? '近一年文章与瞬间的每日发布热力矩阵' : '近一年每日文章发布热力矩阵'}
                  </div>
                `}
          </div>
          ${showFilter
            ? html`
                <div class="ds-segmented" role="tablist" aria-label="热力图数据类型筛选">
                  ${(['all', 'articles', 'moments'] as HeatmapFilter[]).map(
                    (f) => html`
                      <button
                        type="button"
                        role="tab"
                        class="ds-segmented__btn ${this.heatmapFilter === f ? 'is-active' : ''}"
                        aria-selected=${this.heatmapFilter === f}
                        @click=${() => {
                          this.heatmapFilter = f;
                        }}
                      >
                        ${f === 'all' ? '全部' : f === 'articles' ? '文章' : '瞬间'}
                      </button>
                    `
                  )}
                </div>
              `
            : nothing}
        </header>

        ${dataMap.size === 0
          ? html`<div class="section__body"><div class="state-card">暂无发布记录</div></div>`
          : html`
              ${this.compact
                ? nothing
                : html`
                    <div class="heatmap-stats-strip">
                      ${showFilter && this.heatmapFilter === 'all'
                        ? html`
                            <span class="heatmap-stat-cell">文章 <strong>${formatExact(totalArticles)}</strong></span>
                            <span class="heatmap-stat-cell">瞬间 <strong>${formatExact(totalMoments)}</strong></span>
                          `
                        : html`
                            <span class="heatmap-stat-cell">
                              ${this.heatmapFilter === 'moments' ? '近一年瞬间' : '近一年发布'}
                              <strong>${formatExact(filteredTotal)}</strong>
                            </span>
                          `}
                      <span class="heatmap-stat-cell">活跃 <strong>${activeDays}</strong> 天</span>
                      <span class="heatmap-stat-cell">最长连更 <strong>${longestStreak}</strong> 天</span>
                      <span class="heatmap-stat-cell" title=${peakDate ? `峰值日期：${peakDate}` : ''}>
                        单日峰值 <strong>${maxVal}</strong>
                      </span>
                    </div>
                  `}

              <div class="section__body">
                <div class="heatmap-scroll">
                  <div
                    class="heatmap-card"
                    style="--hm-cell:${this.heatmapCellPx}px;--hm-gap:3px"
                    @mouseleave=${this.handleHeatmapLeave}
                  >
                    ${this.tooltip.visible
                      ? html`
                          <div
                            class="heatmap__tooltip ${this.tooltip.below ? 'is-below' : ''}"
                            style="transform:translate(${this.tooltip.x}px, ${this.tooltip.y}px)"
                          >
                            <strong>${this.tooltip.dateLabel}</strong>
                            <span>${this.tooltip.detail}</span>
                          </div>
                        `
                      : nothing}

                    <div class="heatmap">
                      <div class="heatmap__weekdays">
                        ${['一', '二', '三', '四', '五', '六', '日'].map((label, idx) => {
                          const visible = idx === 0 || idx === 2 || idx === 4 || idx === 6;
                          return html`<div class="heatmap__weekday ${visible ? '' : 'is-hidden'}">${label}</div>`;
                        })}
                      </div>

                      <div class="heatmap__months" style="grid-template-columns:${gridTemplate}">
                        ${monthSegments.map(
                          (seg) => html`
                            <div class="heatmap__month" style="grid-column:span ${seg.span}">
                              ${seg.label}
                            </div>
                          `
                        )}
                      </div>

                      <div class="heatmap__grid" style="grid-template-columns:${gridTemplate}">
                        ${weeks.map(
                          (weekStart) => html`
                            <div class="heatmap__column">
                              ${Array.from({ length: 7 }, (_, dayIdx) => {
                                const day = new Date(weekStart.getTime() + dayIdx * DAY_IN_MS);
                                const isWithin = day >= start && day <= end;
                                if (!isWithin) {
                                  return html`<div class="heatmap__day is-outside"></div>`;
                                }
                                const key = formatDateYMD(day);
                                const rec = dataMap.get(key) || { total: 0, articleTotal: 0, momentTotal: 0 };
                                const val = getMetricValue(rec);
                                const level = computeLevel(val);
                                const weekday = WEEKDAY_NAMES[day.getDay()];
                                return html`
                                  <div
                                    class="heatmap__day"
                                    data-level=${level}
                                    tabindex="0"
                                    aria-label="${key} ${weekday}: ${val}"
                                    @mouseenter=${(e: Event) =>
                                      this.handleHeatmapCellEnter(e, key, weekday, rec, enableMoments)}
                                    @focus=${(e: Event) =>
                                      this.handleHeatmapCellEnter(e, key, weekday, rec, enableMoments)}
                                    @mouseleave=${this.handleHeatmapLeave}
                                    @blur=${this.handleHeatmapLeave}
                                  ></div>
                                `;
                              })}
                            </div>
                          `
                        )}
                      </div>

                      <div class="heatmap__footer">
                        <span class="heatmap__range">${formatDateYMD(start)} 至 ${formatDateYMD(end)}</span>
                        <div class="heatmap__legend">
                          <span>少</span>
                          ${[0, 1, 2, 3, 4].map(
                            (l) => html`<span class="heatmap__legend-dot" data-level=${l}></span>`
                          )}
                          <span>多</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `}
      </section>
    `;
  }

  private renderMonthlyTrendSection() {
    if (!this.enabledTypes.includes('monthlyTrend')) return nothing;
    const monthly = this.normalizedMonthlyTrend;
    const total = monthly.reduce((s, m) => s + m.total, 0);
    const hasMoments = Boolean(this.chartData?.enableMomentHeatmap) && monthly.some((m) => m.momentCount > 0);

    return html`
      <section class="section">
        <header class="section__header">
          <div class="section__heading">
            <div class="section__title">月度创作趋势</div>
            ${this.compact ? nothing : html`<div class="section__subtitle">近 12 个月内容发布节奏变化</div>`}
          </div>
          <div class="section__right">
            <span class="trend-dot-label">
              <span class="trend-dot" style="background:var(--ds-accent)"></span>文章
            </span>
            ${hasMoments
              ? html`
                  <span class="trend-dot-label">
                    <span class="trend-dot" style="background:var(--ds-live)"></span>瞬间
                  </span>
                `
              : nothing}
            <span class="stat-pill">近 12 月 <strong>${formatExact(total)}</strong></span>
          </div>
        </header>
        <div class="section__body">
          <div class="canvas-wrap" style="height:${this.compact ? 168 : 200}px">
            <canvas id="monthly-trend-canvas"></canvas>
          </div>
        </div>
      </section>
    `;
  }

  private renderCommentsSection() {
    if (!this.enabledTypes.includes('comments')) return nothing;
    const comments = this.normalizedComments;
    const total = comments.reduce((s, c) => s + c.count, 0);
    const height = Math.max(180, comments.length * 34 + 32);

    return html`
      <section class="section">
        <header class="section__header">
          <div class="section__heading">
            <div class="section__title">评论活跃榜</div>
            <div class="section__subtitle">按评论次数排名的站内活跃读者</div>
          </div>
          ${comments.length > 0
            ? html`
                <div class="section__right">
                  <span class="stat-pill">Top <strong>${comments.length}</strong></span>
                  <span class="stat-pill">累计 <strong>${formatExact(total)}</strong> 条</span>
                </div>
              `
            : nothing}
        </header>
        <div class="section__body">
          ${comments.length === 0
            ? html`<div class="state-card">暂无评论数据</div>`
            : html`
                <div class="canvas-wrap" style="height:${height}px">
                  <canvas id="comments-canvas"></canvas>
                </div>
              `}
        </div>
      </section>
    `;
  }

  private renderTopArticlesSection() {
    if (!this.enabledTypes.includes('topArticles')) return nothing;
    const articles = this.normalizedTopArticles;
    const totalViews = articles.reduce((s, a) => s + a.views, 0);
    const maxViews = Math.max(...articles.map((a) => a.views), 1);

    return html`
      <section class="section">
        <header class="section__header">
          <div class="section__heading">
            <div class="section__title">热门文章排行</div>
            <div class="section__subtitle">按累计阅读量排序的站内热门内容，点击标题可直达阅读</div>
          </div>
          ${articles.length > 0
            ? html`
                <div class="section__right">
                  <span class="stat-pill">Top <strong>${articles.length}</strong></span>
                  <span class="stat-pill">总阅读 <strong>${formatNumber(totalViews)}</strong></span>
                </div>
              `
            : nothing}
        </header>
        <div class="section__body">
          ${articles.length === 0
            ? html`<div class="state-card">暂无热门文章数据</div>`
            : html`
                <ol class="rank-list">
                  ${articles.map((item, idx) => {
                    const rank = idx + 1;
                    const widthPct = Math.max(4, Math.round((item.views / maxViews) * 100));
                    const opacity = idx < 3 ? 1 : Math.max(0.36, 0.72 - (idx - 3) * 0.05);
                    const rankClass = rank === 1 ? 'is-first' : rank <= 3 ? 'is-top' : '';
                    return html`
                      <li class="rank-item">
                        <span class="rank-num ${rankClass}">
                          ${String(rank).padStart(2, '0')}
                        </span>
                        <div class="rank-main">
                          ${item.permalink
                            ? html`
                                <a class="entity-link rank-title" href=${item.permalink} title=${item.name}>
                                  <span class="rank-title">${item.name}</span>
                                  <span class="entity-link__arrow">↗</span>
                                </a>
                              `
                            : html`<div class="rank-title" title=${item.name}>${item.name}</div>`}
                          <div class="rank-track">
                            <div class="rank-fill" style="width:${widthPct}%;opacity:${opacity.toFixed(2)}"></div>
                          </div>
                        </div>
                        <div class="rank-value" title="${formatExact(item.views)} 次阅读">
                          <span class="rank-views">${formatNumber(item.views)}</span>
                          <span class="rank-unit">阅读</span>
                        </div>
                      </li>
                    `;
                  })}
                </ol>
              `}
        </div>
      </section>
    `;
  }

  render() {
    if (this.loading) {
      return html`
        <div class="skeleton-shell" aria-busy="true" aria-label="站内图表加载中">
          <div class="skeleton-top">
            <div class="ds-skeleton" style="width:140px;height:16px"></div>
            <div class="ds-skeleton" style="width:90px;height:14px"></div>
          </div>
          <div class="skeleton-grid">
            <div class="ds-skeleton" style="height:196px"></div>
            <div class="ds-skeleton" style="height:196px"></div>
          </div>
        </div>
      `;
    }

    if (this.error) {
      return html`
        <div class="state-card state-card--error">
          <span>获取图表数据失败：${this.error}</span>
          <button type="button" class="ds-btn-ghost" @click=${() => this.loadData()}>重新加载</button>
        </div>
      `;
    }

    return html`
      <div class="board">
        ${this.renderOverviewStrip()}
        ${this.renderTaxonomySection()}
        ${this.renderHeatmapSection()}
        ${this.renderMonthlyTrendSection()}
        ${this.renderCommentsSection()}
        ${this.renderTopArticlesSection()}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'site-charts': SiteCharts;
  }
}
