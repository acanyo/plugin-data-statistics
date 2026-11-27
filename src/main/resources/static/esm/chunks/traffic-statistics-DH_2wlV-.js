import { i as F, a as S, E as g, x as d, b as x, n as V, r as u, t as B } from "./lit-DwgqLyPI.js";
import { s as A, T as I, o as R, a as C, b as T, c as $ } from "./tokens-Dvt0CGho.js";
import { l as j } from "./chart-loader-Cl6oPrA-.js";
import { i as w, h as P, d as z, a as b, c as f, e as m, g as D, j as U, k as q, T as H, l as N } from "./utils-DiE0_EyB.js";
const O = [
  A,
  F`
    :host {
      display: block;
      width: 100%;
      margin: 16px 0;
    }

    .card-shell {
      border-radius: var(--ds-radius-card);
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
      box-shadow: var(--ds-shadow), var(--ds-inner-highlight);
      overflow: hidden;
    }

    .header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 10px 16px;
      padding: 14px 20px;
      border-bottom: 1px solid var(--ds-border-subtle);
    }

    .title-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--ds-text-primary);
      letter-spacing: -0.01em;
    }

    .live-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 2px 8px;
      border-radius: 999px;
      background: var(--ds-live-soft);
      font-size: 11px;
      font-weight: 500;
      color: var(--ds-live-text);
    }

    .live-pill__dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--ds-live);
      animation: ds-pulse 2.2s ease-in-out infinite;
    }

    .controls {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }

    .updated-at {
      font-size: 11px;
      font-family: var(--ds-font-mono);
      font-variant-numeric: tabular-nums;
      color: var(--ds-text-muted);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(142px, 1fr));
      gap: 12px;
      padding: 16px 20px 20px;
      transition: opacity 0.2s ease;
    }

    .grid.is-switching {
      opacity: 0.6;
    }

    .kpi {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
      padding: 14px 16px;
      border-radius: 10px;
      border: 1px solid var(--ds-border);
      background: var(--ds-surface-subtle);
      overflow: hidden;
      transition: border-color 0.15s ease, background 0.15s ease;
    }

    .kpi--live::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--ds-live), transparent);
      opacity: 0.85;
    }

    .kpi:hover {
      border-color: var(--ds-border-strong);
      background: var(--ds-surface-hover);
    }

    .kpi__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .kpi__label {
      font-size: 12.5px;
      font-weight: 500;
      color: var(--ds-text-secondary);
    }

    .kpi__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 6px;
      background: var(--ds-surface);
      border: 1px solid var(--ds-border);
      color: var(--ds-text-muted);
      flex-shrink: 0;
    }

    .kpi--live .kpi__icon {
      background: var(--ds-live-soft);
      border-color: transparent;
      color: var(--ds-live-text);
    }

    .kpi__icon svg {
      width: 14px;
      height: 14px;
    }

    .kpi__bottom {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .kpi__value-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 6px;
    }

    .kpi__delta {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 1px 6px;
      border-radius: 999px;
      font-size: 10.5px;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .kpi__delta--up {
      color: var(--ds-live-text);
      background: var(--ds-live-soft);
    }

    .kpi__delta--down {
      color: var(--ds-error-text);
      background: var(--ds-error-bg);
    }

    .kpi__delta--flat {
      color: var(--ds-text-muted);
      background: var(--ds-surface-hover);
    }

    .secondary-bar {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px 18px;
      padding: 9px 20px;
      border-top: 1px solid var(--ds-border-subtle);
      background: var(--ds-surface-subtle);
      font-size: 12px;
      color: var(--ds-text-muted);
    }

    .secondary-bar strong {
      color: var(--ds-text-primary);
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }

    .trend-wrap {
      padding: 14px 20px 18px;
      border-top: 1px solid var(--ds-border-subtle);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .trend-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-size: 12px;
      color: var(--ds-text-muted);
    }

    .trend-legend {
      display: inline-flex;
      align-items: center;
      gap: 14px;
    }

    .trend-legend__item {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11.5px;
      color: var(--ds-text-secondary);
    }

    .trend-legend__dot {
      width: 8px;
      height: 8px;
      border-radius: 2px;
    }

    .trend-canvas-box {
      position: relative;
      width: 100%;
      height: 176px;
    }

    .trend-canvas-box canvas {
      width: 100% !important;
      height: 100% !important;
      display: block;
    }

    .kpi__value {
      font-size: 25px;
      font-weight: 700;
      color: var(--ds-text-primary);
      line-height: 1.15;
      letter-spacing: -0.025em;
      font-variant-numeric: tabular-nums;
    }

    .kpi__sub {
      font-size: 11px;
      color: var(--ds-text-muted);
      font-variant-numeric: tabular-nums;
    }

    .kpi__beacon {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--ds-live);
      flex-shrink: 0;
      animation: ds-pulse 2.2s ease-in-out infinite;
    }

    .skeleton-wrap {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 16px 20px 20px;
    }

    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(136px, 1fr));
      gap: 12px;
    }

    .state-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      min-height: 112px;
      padding: 20px;
      font-size: 13px;
      color: var(--ds-text-muted);
      text-align: center;
    }

    .state-box--error {
      color: var(--ds-error-text);
      background: var(--ds-error-bg);
    }

    @media (max-width: 768px) {
      .header {
        padding: 12px 16px;
      }

      .updated-at {
        display: none;
      }

      .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
        padding: 14px 16px 16px;
      }

      .kpi {
        padding: 12px 14px;
        gap: 8px;
      }

      .kpi__value {
        font-size: 21px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .live-pill__dot,
      .kpi__beacon {
        animation: none;
      }
    }
  `
];
var E = Object.defineProperty, L = Object.getOwnPropertyDescriptor, p = (t, s, i, e) => {
  for (var a = e > 1 ? void 0 : e ? L(s, i) : s, o = t.length - 1, n; o >= 0; o--)
    (n = t[o]) && (a = (e ? n(s, i, a) : n(a)) || a);
  return e && a && E(s, i, a), a;
};
const M = /* @__PURE__ */ new Set(["daily", "weekly", "monthly", "quarterly", "yearly"]), k = {
  chart: x`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  visits: x`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
  visitors: x`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  fire: x`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  bolt: x`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  refresh: x`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><polyline points="21 3 21 9 15 9"/></svg>`
};
let l = class extends S {
  constructor() {
    super(), this.dataType = "weekly", this.accentColor = "", this.activeType = "weekly", this.loading = !0, this.switching = !1, this.refreshing = !1, this.error = null, this.visitData = null, this.trendData = null, this.realtimeData = null, this.lastUpdated = "", this.animated = { pageviews: 0, visits: 0, visitors: 0 }, this.periodCache = /* @__PURE__ */ new Map(), this.trendChart = null, this.chartMountSeq = 0, this.themeController = new I(this, () => {
      this.syncTrendChartTheme();
    });
  }
  connectedCallback() {
    super.connectedCallback(), this.activeType = M.has(this.dataType) ? this.dataType : "weekly", w(this.accentColor) && this.style.setProperty("--ds-custom-accent", this.accentColor.trim()), this.stopVisibility = R(this, () => {
      this.loadInitial(), this.pollTimer = setInterval(() => {
        this.refreshRealtime();
      }, 3e4);
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.stopVisibility?.(), this.stopVisibility = void 0, this.chartMountSeq += 1, this.trendChart?.destroy(), this.trendChart = null, this.pollTimer && (clearInterval(this.pollTimer), this.pollTimer = void 0), this.animFrameId != null && (cancelAnimationFrame(this.animFrameId), this.animFrameId = void 0);
  }
  updated(t) {
    t.has("accentColor") && w(this.accentColor) && (this.style.setProperty("--ds-custom-accent", this.accentColor.trim()), this.syncTrendChartTheme()), t.has("dataType") && M.has(this.dataType) && this.dataType !== this.activeType && !this.visitData && (this.activeType = this.dataType), (t.has("trendData") || t.has("loading")) && (!this.loading && this.hasTrendPoints ? this.mountTrendChart() : !this.hasTrendPoints && this.trendChart && (this.chartMountSeq += 1, this.trendChart.destroy(), this.trendChart = null));
  }
  get hasTrendPoints() {
    return !!(this.trendData && (Array.isArray(this.trendData.pageviews) && this.trendData.pageviews.length > 1 || Array.isArray(this.trendData.sessions) && this.trendData.sessions.length > 1));
  }
  resolveAccentHex() {
    if (w(this.accentColor)) return this.accentColor.trim();
    const t = getComputedStyle(this).getPropertyValue("--ds-accent").trim();
    return w(t) ? t : this.themeController.mode === "dark" ? "#60a5fa" : "#2563eb";
  }
  getTrendChartColors() {
    const t = this.themeController.mode === "dark", s = this.resolveAccentHex(), i = t ? "#34d399" : "#10b981";
    return {
      dark: t,
      accent: s,
      accentFill: P(s, t ? 0.2 : 0.12),
      secondary: i,
      secondaryFill: P(i, t ? 0.14 : 0.08),
      grid: t ? "rgba(255, 255, 255, 0.07)" : "rgba(113, 113, 122, 0.14)",
      tick: t ? "#a1a1aa" : "#71717a",
      tooltipBg: t ? "#222633" : "#18181b",
      tooltipText: t ? "#f4f4f5" : "#fafafa",
      tooltipBorder: t ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.08)"
    };
  }
  async mountTrendChart() {
    const t = ++this.chartMountSeq, s = this.renderRoot.querySelector("#umami-trend-canvas");
    if (!s || !this.trendData) return;
    this.trendChart?.destroy(), this.trendChart = null;
    const i = await j();
    if (t !== this.chartMountSeq || !this.isConnected) return;
    const e = this.getTrendChartColors(), a = this.trendData.pageviews || [], o = this.trendData.sessions || [], n = /* @__PURE__ */ new Map();
    a.forEach((r) => {
      const c = n.get(r.x) || { pv: 0, sess: 0 };
      c.pv = Number(r.y) || 0, n.set(r.x, c);
    }), o.forEach((r) => {
      const c = n.get(r.x) || { pv: 0, sess: 0 };
      c.sess = Number(r.y) || 0, n.set(r.x, c);
    });
    const h = Array.from(n.entries()).sort((r, c) => r[0].localeCompare(c[0])), v = h.map(([r]) => z(r, this.activeType)), y = h.map(([, r]) => r.pv), _ = h.map(([, r]) => r.sess);
    this.trendChart = new i(s, {
      type: "line",
      data: {
        labels: v,
        datasets: [
          {
            label: "浏览量 (PV)",
            data: y,
            borderColor: e.accent,
            backgroundColor: e.accentFill,
            borderWidth: 2,
            fill: !0,
            tension: 0.36,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: e.accent
          },
          {
            label: "访问次数",
            data: _,
            borderColor: e.secondary,
            backgroundColor: e.secondaryFill,
            borderWidth: 1.8,
            fill: !0,
            tension: 0.36,
            pointRadius: 0,
            pointHoverRadius: 4,
            pointHoverBackgroundColor: e.secondary
          }
        ]
      },
      options: {
        responsive: !0,
        maintainAspectRatio: !1,
        animation: { duration: 420, easing: "easeOutCubic" },
        interaction: { mode: "index", intersect: !1 },
        scales: {
          x: {
            border: { display: !1 },
            grid: { display: !1 },
            ticks: {
              color: e.tick,
              maxTicksLimit: 7,
              maxRotation: 0,
              font: { size: 11 }
            }
          },
          y: {
            beginAtZero: !0,
            border: { display: !1 },
            grid: { color: e.grid, drawTicks: !1 },
            ticks: {
              precision: 0,
              color: e.tick,
              maxTicksLimit: 4,
              padding: 6,
              font: { size: 11 },
              callback: (r) => f(Number(r))
            }
          }
        },
        plugins: {
          tooltip: {
            backgroundColor: e.tooltipBg,
            titleColor: e.tooltipText,
            bodyColor: e.tooltipText,
            borderColor: e.tooltipBorder,
            borderWidth: 1,
            cornerRadius: 8,
            padding: 10,
            callbacks: {
              label: (r) => ` ${r.dataset.label}：${b(Number(r.raw) || 0)}`
            }
          }
        }
      }
    });
  }
  syncTrendChartTheme() {
    if (!this.trendChart) return;
    const t = this.getTrendChartColors(), s = this.trendChart.data.datasets[0], i = this.trendChart.data.datasets[1];
    s && (s.borderColor = t.accent, s.backgroundColor = t.accentFill), i && (i.borderColor = t.secondary, i.backgroundColor = t.secondaryFill);
    const e = this.trendChart.options.scales?.x, a = this.trendChart.options.scales?.y;
    e?.ticks && (e.ticks.color = t.tick), a?.ticks && (a.ticks.color = t.tick), a?.grid && (a.grid.color = t.grid);
    const o = this.trendChart.options.plugins?.tooltip;
    o && (o.backgroundColor = t.tooltipBg, o.titleColor = t.tooltipText, o.bodyColor = t.tooltipText, o.borderColor = t.tooltipBorder), this.trendChart.update("none");
  }
  animateTo(t) {
    if (this.animFrameId != null && (cancelAnimationFrame(this.animFrameId), this.animFrameId = void 0), typeof window < "u" && typeof window.matchMedia == "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.animated = { ...t };
      return;
    }
    const i = { ...this.animated }, e = performance.now(), a = 380, o = (n) => {
      const h = Math.min(1, (n - e) / a), v = h === 1 ? 1 : 1 - Math.pow(2, -10 * h);
      this.animated = {
        pageviews: Math.round(i.pageviews + (t.pageviews - i.pageviews) * v),
        visits: Math.round(i.visits + (t.visits - i.visits) * v),
        visitors: Math.round(i.visitors + (t.visitors - i.visitors) * v)
      }, h < 1 ? this.animFrameId = requestAnimationFrame(o) : this.animFrameId = void 0;
    };
    this.animFrameId = requestAnimationFrame(o);
  }
  applyVisitData(t) {
    this.visitData = t, t && this.animateTo({
      pageviews: m(t.pageviews),
      visits: m(t.visits),
      visitors: m(t.visitors)
    });
  }
  async loadInitial() {
    this.loading = !0, this.error = null;
    try {
      const [t, s, i] = await Promise.all([
        C(this.activeType),
        T(this.activeType).catch(() => null),
        $().catch(() => null)
      ]);
      this.periodCache.set(this.activeType, { visits: t, trend: s }), this.realtimeData = i, this.trendData = s, this.lastUpdated = D(/* @__PURE__ */ new Date()), this.applyVisitData(t);
    } catch (t) {
      this.error = t instanceof Error ? t.message : "加载失败";
    } finally {
      this.loading = !1;
    }
  }
  async handlePeriodChange(t) {
    if (t === this.activeType) return;
    this.activeType = t;
    const s = this.periodCache.get(t);
    if (s) {
      this.applyVisitData(s.visits), this.trendData = s.trend;
      return;
    }
    this.switching = !0;
    try {
      const [i, e] = await Promise.all([
        C(t),
        T(t).catch(() => null)
      ]);
      this.periodCache.set(t, { visits: i, trend: e }), this.activeType === t && (this.applyVisitData(i), this.trendData = e, this.lastUpdated = D(/* @__PURE__ */ new Date()));
    } catch (i) {
      console.error("[TrafficStatistics] switch period error:", i);
    } finally {
      this.switching = !1;
    }
  }
  async refreshRealtime(t = !1) {
    t && (this.refreshing = !0);
    try {
      const [s, i, e] = await Promise.all([
        $().catch(() => this.realtimeData),
        t ? C(this.activeType).catch(() => this.visitData) : Promise.resolve(this.visitData),
        t ? T(this.activeType).catch(() => this.trendData) : Promise.resolve(this.trendData)
      ]);
      this.realtimeData = s, this.lastUpdated = D(/* @__PURE__ */ new Date()), t && i && (this.periodCache.set(this.activeType, { visits: i, trend: e }), this.applyVisitData(i), this.trendData = e);
    } finally {
      t && (this.refreshing = !1);
    }
  }
  renderDeltaBadge(t, s) {
    const i = U(this.visitData, s), e = q(t, i);
    if (e === null) return g;
    const a = Math.abs(e) >= 10 ? Math.round(e) : Number(e.toFixed(1));
    if (a === 0)
      return d`<span class="kpi__delta kpi__delta--flat">0%</span>`;
    const o = a > 0;
    return d`
      <span class="kpi__delta ${o ? "kpi__delta--up" : "kpi__delta--down"}" title="较上一统计周期环比变化">
        ${o ? "↑" : "↓"} ${Math.abs(a)}%
      </span>
    `;
  }
  render() {
    if (this.loading)
      return d`
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
    if (this.error)
      return d`
        <div class="card-shell">
          <div class="state-box state-box--error">
            <span>访问统计加载失败，请检查 Umami 配置（${this.error}）</span>
            <button type="button" class="ds-btn-ghost" @click=${() => this.loadInitial()}>重新加载</button>
          </div>
        </div>
      `;
    const t = this.visitData ? m(this.visitData.pageviews) : 0, s = this.visitData ? m(this.visitData.visits) : 0, i = this.visitData ? m(this.visitData.visitors) : 0, e = this.visitData?.bounces != null ? m(this.visitData.bounces) : null, a = this.visitData?.totaltime != null ? m(this.visitData.totaltime) : null, o = e !== null && s > 0 ? `${Math.min(100, Math.round(e / s * 100))}%` : null, n = a !== null && s > 0 ? N(a / s) : null, h = Number(this.realtimeData?.totals?.views) || 0, v = Number(this.realtimeData?.totals?.visitors) || 0, y = h > 0 || v > 0, _ = s > 0 ? (t / s).toFixed(1) : null, r = i > 0 ? (s / i).toFixed(1) : null;
    return d`
      <div class="card-shell">
        <header class="header">
          <div class="title-group">
            <span class="title">访问统计</span>
            ${y ? d`
                  <span class="live-pill">
                    <span class="live-pill__dot"></span>
                    <span>${f(v)} 人在线</span>
                  </span>
                ` : g}
          </div>

          <div class="controls">
            ${this.lastUpdated ? d`<span class="updated-at" title="最近更新时间">${this.lastUpdated}</span>` : g}
            <div class="ds-segmented" role="tablist" aria-label="统计周期">
              ${H.map(
      (c) => d`
                  <button
                    type="button"
                    role="tab"
                    class="ds-segmented__btn ${this.activeType === c.value ? "is-active" : ""}"
                    aria-selected=${this.activeType === c.value}
                    @click=${() => this.handlePeriodChange(c.value)}
                  >
                    ${c.shortLabel}
                  </button>
                `
    )}
            </div>
            <button
              type="button"
              class="ds-btn-icon ${this.refreshing ? "is-spinning" : ""}"
              title="刷新数据"
              aria-label="刷新数据"
              @click=${() => this.refreshRealtime(!0)}
            >
              ${k.refresh}
            </button>
          </div>
        </header>

        <div class="grid ${this.switching ? "is-switching" : ""}">
          <div class="kpi">
            <div class="kpi__top">
              <span class="kpi__label">页面浏览量</span>
              <span class="kpi__icon">${k.chart}</span>
            </div>
            <div class="kpi__bottom">
              <div class="kpi__value-row">
                <span class="kpi__value" title=${b(t)}>${f(this.animated.pageviews)}</span>
                ${this.renderDeltaBadge(t, "pageviews")}
              </div>
              <span class="kpi__sub">${_ ? `单次浏览 ${_} 页` : "PV 累计"}</span>
            </div>
          </div>

          <div class="kpi">
            <div class="kpi__top">
              <span class="kpi__label">访问次数</span>
              <span class="kpi__icon">${k.visits}</span>
            </div>
            <div class="kpi__bottom">
              <div class="kpi__value-row">
                <span class="kpi__value" title=${b(s)}>${f(this.animated.visits)}</span>
                ${this.renderDeltaBadge(s, "visits")}
              </div>
              <span class="kpi__sub">${r ? `人均回访 ${r} 次` : "Visits 累计"}</span>
            </div>
          </div>

          <div class="kpi">
            <div class="kpi__top">
              <span class="kpi__label">独立访客</span>
              <span class="kpi__icon">${k.visitors}</span>
            </div>
            <div class="kpi__bottom">
              <div class="kpi__value-row">
                <span class="kpi__value" title=${b(i)}>${f(this.animated.visitors)}</span>
                ${this.renderDeltaBadge(i, "visitors")}
              </div>
              <span class="kpi__sub">UV 去重访客</span>
            </div>
          </div>

          ${y ? d`
                <div class="kpi kpi--live">
                  <div class="kpi__top">
                    <span class="kpi__label">实时浏览量</span>
                    <span class="kpi__icon">${k.fire}</span>
                  </div>
                  <div class="kpi__bottom">
                    <div class="kpi__value-row">
                      <span class="kpi__value" title=${b(h)}>${f(h)}</span>
                      <span class="kpi__beacon" title="每 30 秒自动刷新"></span>
                    </div>
                    <span class="kpi__sub">近 30 分钟</span>
                  </div>
                </div>

                <div class="kpi kpi--live">
                  <div class="kpi__top">
                    <span class="kpi__label">实时在线</span>
                    <span class="kpi__icon">${k.bolt}</span>
                  </div>
                  <div class="kpi__bottom">
                    <div class="kpi__value-row">
                      <span class="kpi__value" title=${b(v)}>${f(v)}</span>
                      <span class="kpi__beacon" title="每 30 秒自动刷新"></span>
                    </div>
                    <span class="kpi__sub">当前活跃访客</span>
                  </div>
                </div>
              ` : g}
        </div>

        ${o || n ? d`
              <div class="secondary-bar">
                ${o ? d`<span>跳出率 <strong>${o}</strong></span>` : g}
                ${n ? d`<span>平均停留时长 <strong>${n}</strong></span>` : g}
              </div>
            ` : g}

        ${this.hasTrendPoints ? d`
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
            ` : g}
      </div>
    `;
  }
};
l.styles = O;
p([
  V({ type: String, attribute: "data-type" })
], l.prototype, "dataType", 2);
p([
  V({ type: String, attribute: "accent-color" })
], l.prototype, "accentColor", 2);
p([
  u()
], l.prototype, "activeType", 2);
p([
  u()
], l.prototype, "loading", 2);
p([
  u()
], l.prototype, "switching", 2);
p([
  u()
], l.prototype, "refreshing", 2);
p([
  u()
], l.prototype, "error", 2);
p([
  u()
], l.prototype, "visitData", 2);
p([
  u()
], l.prototype, "trendData", 2);
p([
  u()
], l.prototype, "realtimeData", 2);
p([
  u()
], l.prototype, "lastUpdated", 2);
p([
  u()
], l.prototype, "animated", 2);
l = p([
  B("traffic-statistics")
], l);
export {
  l as TrafficStatistics
};
