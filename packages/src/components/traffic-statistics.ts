import { LitElement, html, nothing, svg } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip
} from 'chart.js';
import { fetchUmamiPageviewsTrend, fetchUmamiRealtime, fetchUmamiVisits } from '../api';
import { ThemeController } from '../theme-controller';
import {
  computeDeltaPercent,
  extractPrevValue,
  extractValue,
  formatDuration,
  formatExact,
  formatNumber,
  formatTime24,
  formatTrendAxisLabel,
  hexToRgba,
  isValidHexColor,
  TRAFFIC_PERIODS
} from '../utils';
import type { PageviewsTrendData, RealtimeData, TrafficData, TrafficType } from '../types';
import { trafficStyles } from '../styles/traffic-styles';

Chart.register(
  LineController,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Filler,
  Tooltip
);

const VALID_TYPES = new Set<TrafficType>(['daily', 'weekly', 'monthly', 'quarterly', 'yearly']);

const ICONS = {
  chart: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  visits: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  visitors: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  fire: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  bolt: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  refresh: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><polyline points="21 3 21 9 15 9"/></svg>`
};

interface DisplayNumbers {
  pageviews: number;
  visits: number;
  visitors: number;
}

@customElement('traffic-statistics')
export class TrafficStatistics extends LitElement {
  static styles = trafficStyles;

  @property({ type: String, attribute: 'data-type' })
  dataType: TrafficType = 'weekly';

  @property({ type: String, attribute: 'accent-color' })
  accentColor = '';

  @state() private activeType: TrafficType = 'weekly';
  @state() private loading = true;
  @state() private switching = false;
  @state() private refreshing = false;
  @state() private error: string | null = null;
  @state() private visitData: TrafficData | null = null;
  @state() private trendData: PageviewsTrendData | null = null;
  @state() private realtimeData: RealtimeData | null = null;
  @state() private lastUpdated = '';
  @state() private animated: DisplayNumbers = { pageviews: 0, visits: 0, visitors: 0 };

  private themeController: ThemeController;
  private periodCache = new Map<TrafficType, { visits: TrafficData; trend: PageviewsTrendData | null }>();
  private trendChart: Chart | null = null;
  private pollTimer?: ReturnType<typeof setInterval>;
  private animFrameId?: number;

  constructor() {
    super();
    this.themeController = new ThemeController(this, () => {
      this.syncTrendChartTheme();
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.activeType = VALID_TYPES.has(this.dataType) ? this.dataType : 'weekly';
    if (isValidHexColor(this.accentColor)) {
      this.style.setProperty('--ds-custom-accent', this.accentColor.trim());
    }
    void this.loadInitial();
    this.pollTimer = setInterval(() => {
      void this.refreshRealtime();
    }, 30000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.trendChart?.destroy();
    this.trendChart = null;
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = undefined;
    }
    if (this.animFrameId != null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = undefined;
    }
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has('accentColor') && isValidHexColor(this.accentColor)) {
      this.style.setProperty('--ds-custom-accent', this.accentColor.trim());
      this.syncTrendChartTheme();
    }
    if (
      changed.has('dataType') &&
      VALID_TYPES.has(this.dataType) &&
      this.dataType !== this.activeType &&
      !this.visitData
    ) {
      this.activeType = this.dataType;
    }
    if (changed.has('trendData') || changed.has('loading')) {
      if (!this.loading && this.hasTrendPoints) {
        this.mountTrendChart();
      } else if (!this.hasTrendPoints && this.trendChart) {
        this.trendChart.destroy();
        this.trendChart = null;
      }
    }
  }

  private get hasTrendPoints(): boolean {
    return Boolean(
      this.trendData &&
        ((Array.isArray(this.trendData.pageviews) && this.trendData.pageviews.length > 1) ||
          (Array.isArray(this.trendData.sessions) && this.trendData.sessions.length > 1))
    );
  }

  private resolveAccentHex(): string {
    if (isValidHexColor(this.accentColor)) return this.accentColor.trim();
    const cssAccent = getComputedStyle(this).getPropertyValue('--ds-accent').trim();
    if (isValidHexColor(cssAccent)) return cssAccent;
    return this.themeController.mode === 'dark' ? '#60a5fa' : '#2563eb';
  }

  private getTrendChartColors() {
    const dark = this.themeController.mode === 'dark';
    const accent = this.resolveAccentHex();
    const secondary = dark ? '#34d399' : '#10b981';
    return {
      dark,
      accent,
      accentFill: hexToRgba(accent, dark ? 0.2 : 0.12),
      secondary,
      secondaryFill: hexToRgba(secondary, dark ? 0.14 : 0.08),
      grid: dark ? 'rgba(255, 255, 255, 0.07)' : 'rgba(113, 113, 122, 0.14)',
      tick: dark ? '#a1a1aa' : '#71717a',
      tooltipBg: dark ? '#222633' : '#18181b',
      tooltipText: dark ? '#f4f4f5' : '#fafafa',
      tooltipBorder: dark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.08)'
    };
  }

  private mountTrendChart(): void {
    const canvas = this.renderRoot.querySelector<HTMLCanvasElement>('#umami-trend-canvas');
    if (!canvas || !this.trendData) return;

    this.trendChart?.destroy();
    const colors = this.getTrendChartColors();
    const pvPoints = this.trendData.pageviews || [];
    const sessPoints = this.trendData.sessions || [];

    const xSet = new Map<string, { pv: number; sess: number }>();
    pvPoints.forEach((p) => {
      const cur = xSet.get(p.x) || { pv: 0, sess: 0 };
      cur.pv = Number(p.y) || 0;
      xSet.set(p.x, cur);
    });
    sessPoints.forEach((p) => {
      const cur = xSet.get(p.x) || { pv: 0, sess: 0 };
      cur.sess = Number(p.y) || 0;
      xSet.set(p.x, cur);
    });

    const entries = Array.from(xSet.entries()).sort((a, b) => a[0].localeCompare(b[0]));
    const labels = entries.map(([x]) => formatTrendAxisLabel(x, this.activeType));
    const pvSeries = entries.map(([, v]) => v.pv);
    const sessSeries = entries.map(([, v]) => v.sess);

    this.trendChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: '浏览量 (PV)',
            data: pvSeries,
            borderColor: colors.accent,
            backgroundColor: colors.accentFill,
            borderWidth: 2,
            fill: true,
            tension: 0.36,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: colors.accent
          },
          {
            label: '访问次数',
            data: sessSeries,
            borderColor: colors.secondary,
            backgroundColor: colors.secondaryFill,
            borderWidth: 1.8,
            fill: true,
            tension: 0.36,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: colors.secondary
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 420, easing: 'easeOutCubic' },
        interaction: { mode: 'index', intersect: false },
        scales: {
          x: {
            border: { display: false },
            grid: { display: false },
            ticks: {
              color: colors.tick,
              maxTicksLimit: 7,
              maxRotation: 0,
              font: { size: 11 }
            }
          },
          y: {
            beginAtZero: true,
            border: { display: false },
            grid: { color: colors.grid, drawTicks: false },
            ticks: {
              precision: 0,
              color: colors.tick,
              maxTicksLimit: 4,
              padding: 6,
              font: { size: 11 },
              callback: (v) => formatNumber(Number(v))
            }
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
              label: (ctx) => ` ${ctx.dataset.label}：${formatExact(Number(ctx.raw) || 0)}`
            }
          }
        }
      }
    });
  }

  private syncTrendChartTheme(): void {
    if (!this.trendChart) return;
    const colors = this.getTrendChartColors();
    const ds0 = this.trendChart.data.datasets[0];
    const ds1 = this.trendChart.data.datasets[1];
    if (ds0) {
      ds0.borderColor = colors.accent;
      ds0.backgroundColor = colors.accentFill;
    }
    if (ds1) {
      ds1.borderColor = colors.secondary;
      ds1.backgroundColor = colors.secondaryFill;
    }
    const xScale = this.trendChart.options.scales?.x;
    const yScale = this.trendChart.options.scales?.y;
    if (xScale?.ticks) xScale.ticks.color = colors.tick;
    if (yScale?.ticks) yScale.ticks.color = colors.tick;
    if (yScale?.grid) yScale.grid.color = colors.grid;
    const tip = this.trendChart.options.plugins?.tooltip;
    if (tip) {
      tip.backgroundColor = colors.tooltipBg;
      tip.titleColor = colors.tooltipText;
      tip.bodyColor = colors.tooltipText;
      tip.borderColor = colors.tooltipBorder;
    }
    this.trendChart.update('none');
  }

  private animateTo(target: DisplayNumbers): void {
    if (this.animFrameId != null) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = undefined;
    }

    const reducedMotion =
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reducedMotion) {
      this.animated = { ...target };
      return;
    }

    const from = { ...this.animated };
    const start = performance.now();
    const duration = 380;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      this.animated = {
        pageviews: Math.round(from.pageviews + (target.pageviews - from.pageviews) * eased),
        visits: Math.round(from.visits + (target.visits - from.visits) * eased),
        visitors: Math.round(from.visitors + (target.visitors - from.visitors) * eased)
      };
      if (progress < 1) {
        this.animFrameId = requestAnimationFrame(tick);
      } else {
        this.animFrameId = undefined;
      }
    };

    this.animFrameId = requestAnimationFrame(tick);
  }

  private applyVisitData(data: TrafficData | null): void {
    this.visitData = data;
    if (!data) return;
    this.animateTo({
      pageviews: extractValue(data.pageviews),
      visits: extractValue(data.visits),
      visitors: extractValue(data.visitors)
    });
  }

  private async loadInitial(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      const [visits, trend, realtime] = await Promise.all([
        fetchUmamiVisits(this.activeType),
        fetchUmamiPageviewsTrend(this.activeType).catch(() => null),
        fetchUmamiRealtime().catch(() => null)
      ]);
      this.periodCache.set(this.activeType, { visits, trend });
      this.realtimeData = realtime;
      this.trendData = trend;
      this.lastUpdated = formatTime24(new Date());
      this.applyVisitData(visits);
    } catch (err) {
      this.error = err instanceof Error ? err.message : '加载失败';
    } finally {
      this.loading = false;
    }
  }

  private async handlePeriodChange(nextType: TrafficType): Promise<void> {
    if (nextType === this.activeType) return;
    this.activeType = nextType;

    const cached = this.periodCache.get(nextType);
    if (cached) {
      this.applyVisitData(cached.visits);
      this.trendData = cached.trend;
      return;
    }

    this.switching = true;
    try {
      const [visits, trend] = await Promise.all([
        fetchUmamiVisits(nextType),
        fetchUmamiPageviewsTrend(nextType).catch(() => null)
      ]);
      this.periodCache.set(nextType, { visits, trend });
      if (this.activeType === nextType) {
        this.applyVisitData(visits);
        this.trendData = trend;
        this.lastUpdated = formatTime24(new Date());
      }
    } catch (err) {
      console.error('[TrafficStatistics] switch period error:', err);
    } finally {
      this.switching = false;
    }
  }

  private async refreshRealtime(manual = false): Promise<void> {
    if (manual) this.refreshing = true;
    try {
      const [realtime, visits, trend] = await Promise.all([
        fetchUmamiRealtime().catch(() => this.realtimeData),
        manual ? fetchUmamiVisits(this.activeType).catch(() => this.visitData) : Promise.resolve(this.visitData),
        manual ? fetchUmamiPageviewsTrend(this.activeType).catch(() => this.trendData) : Promise.resolve(this.trendData)
      ]);
      this.realtimeData = realtime;
      this.lastUpdated = formatTime24(new Date());
      if (manual && visits) {
        this.periodCache.set(this.activeType, { visits, trend });
        this.applyVisitData(visits);
        this.trendData = trend;
      }
    } finally {
      if (manual) this.refreshing = false;
    }
  }

  private renderDeltaBadge(current: number, key: 'pageviews' | 'visits' | 'visitors') {
    const prev = extractPrevValue(this.visitData, key);
    const delta = computeDeltaPercent(current, prev);
    if (delta === null) return nothing;
    const rounded = Math.abs(delta) >= 10 ? Math.round(delta) : Number(delta.toFixed(1));
    if (rounded === 0) {
      return html`<span class="kpi__delta kpi__delta--flat">0%</span>`;
    }
    const isUp = rounded > 0;
    return html`
      <span class="kpi__delta ${isUp ? 'kpi__delta--up' : 'kpi__delta--down'}" title="较上一统计周期环比变化">
        ${isUp ? '↑' : '↓'} ${Math.abs(rounded)}%
      </span>
    `;
  }

  render() {
    if (this.loading) {
      return html`
        <div class="card-shell">
          <div class="skeleton-wrap" aria-busy="true" aria-label="访问统计加载中">
            <div class="ds-skeleton" style="width:150px;height:16px"></div>
            <div class="skeleton-grid">
              <div class="ds-skeleton" style="height:94px"></div>
              <div class="ds-skeleton" style="height:94px"></div>
              <div class="ds-skeleton" style="height:94px"></div>
              <div class="ds-skeleton" style="height:94px"></div>
            </div>
          </div>
        </div>
      `;
    }

    if (this.error) {
      return html`
        <div class="card-shell">
          <div class="state-box state-box--error">
            <span>访问统计加载失败，请检查 Umami 配置（${this.error}）</span>
            <button type="button" class="ds-btn-ghost" @click=${() => this.loadInitial()}>重新加载</button>
          </div>
        </div>
      `;
    }

    const rawPageviews = this.visitData ? extractValue(this.visitData.pageviews) : 0;
    const rawVisits = this.visitData ? extractValue(this.visitData.visits) : 0;
    const rawVisitors = this.visitData ? extractValue(this.visitData.visitors) : 0;
    const rawBounces = this.visitData?.bounces != null ? extractValue(this.visitData.bounces) : null;
    const rawTotalTime = this.visitData?.totaltime != null ? extractValue(this.visitData.totaltime) : null;

    const bounceRate =
      rawBounces !== null && rawVisits > 0
        ? `${Math.min(100, Math.round((rawBounces / rawVisits) * 100))}%`
        : null;
    const avgDuration =
      rawTotalTime !== null && rawVisits > 0
        ? formatDuration(rawTotalTime / rawVisits)
        : null;

    const realtimeViews = Number(this.realtimeData?.totals?.views) || 0;
    const realtimeVisitors = Number(this.realtimeData?.totals?.visitors) || 0;
    const hasRealtime = realtimeViews > 0 || realtimeVisitors > 0;

    const pvPerVisit = rawVisits > 0 ? (rawPageviews / rawVisits).toFixed(1) : null;
    const visitsPerVisitor = rawVisitors > 0 ? (rawVisits / rawVisitors).toFixed(1) : null;

    return html`
      <div class="card-shell">
        <header class="header">
          <div class="title-group">
            <span class="title">访问统计</span>
            ${hasRealtime
              ? html`
                  <span class="live-pill">
                    <span class="live-pill__dot"></span>
                    <span>${formatNumber(realtimeVisitors)} 人在线</span>
                  </span>
                `
              : nothing}
          </div>

          <div class="controls">
            ${this.lastUpdated
              ? html`<span class="updated-at" title="最近更新时间">${this.lastUpdated}</span>`
              : nothing}
            <div class="ds-segmented" role="tablist" aria-label="统计周期">
              ${TRAFFIC_PERIODS.map(
                (p) => html`
                  <button
                    type="button"
                    role="tab"
                    class="ds-segmented__btn ${this.activeType === p.value ? 'is-active' : ''}"
                    aria-selected=${this.activeType === p.value}
                    @click=${() => this.handlePeriodChange(p.value)}
                  >
                    ${p.shortLabel}
                  </button>
                `
              )}
            </div>
            <button
              type="button"
              class="ds-btn-icon ${this.refreshing ? 'is-spinning' : ''}"
              title="刷新数据"
              aria-label="刷新数据"
              @click=${() => this.refreshRealtime(true)}
            >
              ${ICONS.refresh}
            </button>
          </div>
        </header>

        <div class="grid ${this.switching ? 'is-switching' : ''}">
          <div class="kpi">
            <div class="kpi__top">
              <span class="kpi__label">页面浏览量</span>
              <span class="kpi__icon">${ICONS.chart}</span>
            </div>
            <div class="kpi__bottom">
              <div class="kpi__value-row">
                <span class="kpi__value" title=${formatExact(rawPageviews)}>${formatNumber(this.animated.pageviews)}</span>
                ${this.renderDeltaBadge(rawPageviews, 'pageviews')}
              </div>
              <span class="kpi__sub">${pvPerVisit ? `单次浏览 ${pvPerVisit} 页` : 'PV 累计'}</span>
            </div>
          </div>

          <div class="kpi">
            <div class="kpi__top">
              <span class="kpi__label">访问次数</span>
              <span class="kpi__icon">${ICONS.visits}</span>
            </div>
            <div class="kpi__bottom">
              <div class="kpi__value-row">
                <span class="kpi__value" title=${formatExact(rawVisits)}>${formatNumber(this.animated.visits)}</span>
                ${this.renderDeltaBadge(rawVisits, 'visits')}
              </div>
              <span class="kpi__sub">${visitsPerVisitor ? `人均回访 ${visitsPerVisitor} 次` : 'Visits 累计'}</span>
            </div>
          </div>

          <div class="kpi">
            <div class="kpi__top">
              <span class="kpi__label">独立访客</span>
              <span class="kpi__icon">${ICONS.visitors}</span>
            </div>
            <div class="kpi__bottom">
              <div class="kpi__value-row">
                <span class="kpi__value" title=${formatExact(rawVisitors)}>${formatNumber(this.animated.visitors)}</span>
                ${this.renderDeltaBadge(rawVisitors, 'visitors')}
              </div>
              <span class="kpi__sub">UV 去重访客</span>
            </div>
          </div>

          ${hasRealtime
            ? html`
                <div class="kpi kpi--live">
                  <div class="kpi__top">
                    <span class="kpi__label">实时浏览量</span>
                    <span class="kpi__icon">${ICONS.fire}</span>
                  </div>
                  <div class="kpi__bottom">
                    <div class="kpi__value-row">
                      <span class="kpi__value" title=${formatExact(realtimeViews)}>${formatNumber(realtimeViews)}</span>
                      <span class="kpi__beacon" title="每 30 秒自动刷新"></span>
                    </div>
                    <span class="kpi__sub">近 30 分钟</span>
                  </div>
                </div>

                <div class="kpi kpi--live">
                  <div class="kpi__top">
                    <span class="kpi__label">实时在线</span>
                    <span class="kpi__icon">${ICONS.bolt}</span>
                  </div>
                  <div class="kpi__bottom">
                    <div class="kpi__value-row">
                      <span class="kpi__value" title=${formatExact(realtimeVisitors)}>${formatNumber(realtimeVisitors)}</span>
                      <span class="kpi__beacon" title="每 30 秒自动刷新"></span>
                    </div>
                    <span class="kpi__sub">当前活跃访客</span>
                  </div>
                </div>
              `
            : nothing}
        </div>

        ${bounceRate || avgDuration
          ? html`
              <div class="secondary-bar">
                ${bounceRate ? html`<span>跳出率 <strong>${bounceRate}</strong></span>` : nothing}
                ${avgDuration ? html`<span>平均停留时长 <strong>${avgDuration}</strong></span>` : nothing}
              </div>
            `
          : nothing}

        ${this.hasTrendPoints
          ? html`
              <div class="trend-wrap">
                <div class="trend-head">
                  <span>访问趋势曲线</span>
                  <div class="trend-legend">
                    <span class="trend-legend__item">
                      <span class="trend-legend__dot" style="background:var(--ds-accent)"></span>
                      <span>浏览量 (PV)</span>
                    </span>
                    <span class="trend-legend__item">
                      <span class="trend-legend__dot" style="background:var(--ds-live)"></span>
                      <span>访问次数</span>
                    </span>
                  </div>
                </div>
                <div class="trend-canvas-box">
                  <canvas id="umami-trend-canvas"></canvas>
                </div>
              </div>
            `
          : nothing}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'traffic-statistics': TrafficStatistics;
  }
}
