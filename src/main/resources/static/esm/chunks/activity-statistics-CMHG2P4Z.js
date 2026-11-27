import { i as F, a as T, x as a, E as x, b as n, r as m, t as S } from "./lit-DwgqLyPI.js";
import { s as D, T as B, o as E, c as M } from "./tokens-Dvt0CGho.js";
import { n as h, a as y, c as u, g as V, m as P, o as O } from "./utils-DiE0_EyB.js";
const N = [
  D,
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
      gap: 10px;
    }

    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--ds-text-primary);
      letter-spacing: -0.01em;
    }

    .live-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 2px 8px;
      border-radius: 999px;
      background: var(--ds-live-soft);
      font-size: 11.5px;
      font-weight: 500;
      color: var(--ds-live-text);
    }

    .live-badge__dot {
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
    }

    /* Segmented 3-Metric Strip */
    .metrics {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      background: var(--ds-surface-subtle);
      border-bottom: 1px solid var(--ds-border);
    }

    .metric {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 18px;
      min-width: 0;
    }

    .metric + .metric {
      border-left: 1px solid var(--ds-border);
    }

    .metric__icon {
      width: 28px;
      height: 28px;
      border-radius: 7px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--ds-surface);
      border: 1px solid var(--ds-border);
      color: var(--ds-text-secondary);
      flex-shrink: 0;
    }

    .metric__icon svg {
      width: 14px;
      height: 14px;
    }

    .metric__content {
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }

    .metric__value {
      font-size: 17px;
      font-weight: 700;
      color: var(--ds-text-primary);
      line-height: 1.2;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
    }

    .metric__label {
      font-size: 11.5px;
      color: var(--ds-text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Timeline Event Stream */
    .list {
      display: flex;
      flex-direction: column;
      max-height: 380px;
      overflow-y: auto;
      overscroll-behavior: contain;
    }

    .list::-webkit-scrollbar {
      width: 5px;
    }

    .list::-webkit-scrollbar-thumb {
      background: var(--ds-scrollbar-thumb);
      border-radius: 999px;
    }

    .list::-webkit-scrollbar-thumb:hover {
      background: var(--ds-scrollbar-thumb-hover);
    }

    .item {
      position: relative;
      display: grid;
      grid-template-columns: 16px minmax(0, 1fr);
      gap: 12px;
      padding: 11px 20px;
      border-bottom: 1px solid var(--ds-border-subtle);
      transition: background 0.15s ease;
    }

    .item:last-child {
      border-bottom: none;
    }

    .item:hover {
      background: var(--ds-surface-hover);
    }

    .item__rail {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 6px;
    }

    .item__rail::after {
      content: '';
      position: absolute;
      top: 16px;
      bottom: -17px;
      width: 1px;
      background: var(--ds-border);
    }

    .item:last-child .item__rail::after {
      display: none;
    }

    .item__node {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--ds-border-strong);
      z-index: 1;
      flex-shrink: 0;
    }

    .item:first-child .item__node {
      background: var(--ds-live);
      box-shadow: 0 0 0 3px var(--ds-live-soft);
    }

    .item__body {
      display: flex;
      flex-direction: column;
      gap: 5px;
      min-width: 0;
    }

    .item__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      min-width: 0;
    }

    .item__left {
      display: flex;
      align-items: center;
      gap: 9px;
      min-width: 0;
      flex: 1;
    }

    .item__time {
      font-family: var(--ds-font-mono);
      font-size: 12px;
      font-variant-numeric: tabular-nums;
      color: var(--ds-text-muted);
      flex-shrink: 0;
    }

    .item__path {
      display: inline-block;
      max-width: 100%;
      padding: 1px 7px;
      border-radius: 5px;
      background: var(--ds-code-bg);
      color: var(--ds-code-text);
      font-family: var(--ds-font-mono);
      font-size: 12px;
      line-height: 1.5;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: background 0.15s ease, color 0.15s ease;
    }

    .item:hover .item__path {
      background: var(--ds-accent-soft);
      color: var(--ds-accent);
    }

    .item__ago {
      font-size: 11px;
      color: var(--ds-text-muted);
      white-space: nowrap;
      flex-shrink: 0;
    }

    .item__meta {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px 6px;
      font-size: 12px;
      color: var(--ds-text-secondary);
    }

    .item__device-icon {
      display: inline-flex;
      color: var(--ds-text-muted);
      flex-shrink: 0;
    }

    .item__device-icon svg {
      width: 13px;
      height: 13px;
    }

    .item__dot {
      color: var(--ds-text-muted);
      opacity: 0.55;
      user-select: none;
    }

    .skeleton-wrap {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px 20px 20px;
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

      .metric {
        padding: 10px 12px;
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
      }

      .metric__value {
        font-size: 16px;
      }

      .item {
        padding: 10px 16px;
        gap: 10px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .live-badge__dot {
        animation: none;
      }
    }
  `
];
var A = Object.defineProperty, I = Object.getOwnPropertyDescriptor, v = (e, i, s, l) => {
  for (var r = l > 1 ? void 0 : l ? I(i, s) : i, c = e.length - 1, p; c >= 0; c--)
    (p = e[c]) && (r = (l ? p(i, s, r) : p(r)) || r);
  return l && r && A(i, s, r), r;
};
const R = 30, d = {
  fire: n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  users: n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  eye: n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  desktop: n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  mobile: n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  globe: n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  refresh: n`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><polyline points="21 3 21 9 15 9"/></svg>`
};
let o = class extends T {
  constructor() {
    super(), this.loading = !0, this.refreshing = !1, this.error = null, this.data = null, this.deviceFilter = "all", new B(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.stopVisibility = E(this, () => {
      this.loadData(), this.pollTimer = setInterval(() => {
        this.loadData(!1);
      }, 3e4);
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.stopVisibility?.(), this.stopVisibility = void 0, this.pollTimer && (clearInterval(this.pollTimer), this.pollTimer = void 0);
  }
  async loadData(e = !0, i = !1) {
    e && (this.loading = !0), i && (this.refreshing = !0), this.error = null;
    try {
      this.data = await M();
    } catch (s) {
      (e || i) && (this.error = s instanceof Error ? s.message : "加载失败");
    } finally {
      this.loading = !1, this.refreshing = !1;
    }
  }
  render() {
    if (this.loading)
      return a`
        <div class="card-shell">
          <div class="skeleton-wrap" aria-busy="true" aria-label="实时动态加载中">
            <div class="ds-skeleton" style="width:160px;height:16px"></div>
            <div class="ds-skeleton" style="height:56px"></div>
            <div class="ds-skeleton" style="height:44px"></div>
            <div class="ds-skeleton" style="height:44px"></div>
          </div>
        </div>
      `;
    if (this.error)
      return a`
        <div class="card-shell">
          <div class="state-box state-box--error">
            <span>实时动态加载失败（${this.error}）</span>
            <button type="button" class="ds-btn-ghost" @click=${() => this.loadData(!0)}>重新加载</button>
          </div>
        </div>
      `;
    const e = (this.data?.events || []).slice(0, R);
    if (e.length === 0)
      return a`
        <div class="card-shell">
          <div class="state-box">近 30 分钟暂无访客活动</div>
        </div>
      `;
    const i = this.data?.totals || { views: 0, visitors: 0 }, s = Number(i.views) || 0, l = Number(i.visitors) || 0, r = new Set(e.map((t) => t.urlPath).filter(Boolean)).size, c = e.filter((t) => h(t.device) === "desktop").length, p = e.filter((t) => h(t.device) === "mobile").length, k = this.deviceFilter === "all" ? e : e.filter((t) => h(t.device) === this.deviceFilter);
    return a`
      <div class="card-shell">
        <header class="header">
          <div class="title-group">
            <span class="title">近 30 分钟网站动态</span>
            <span class="live-badge">
              <span class="live-badge__dot"></span>
              <span>实时监测</span>
            </span>
          </div>

          <div class="controls">
            ${c > 0 && p > 0 ? a`
                  <div class="ds-segmented" role="tablist" aria-label="设备筛选">
                    <button
                      type="button"
                      role="tab"
                      class="ds-segmented__btn ${this.deviceFilter === "all" ? "is-active" : ""}"
                      aria-selected=${this.deviceFilter === "all"}
                      @click=${() => {
      this.deviceFilter = "all";
    }}
                    >
                      全部 (${e.length})
                    </button>
                    <button
                      type="button"
                      role="tab"
                      class="ds-segmented__btn ${this.deviceFilter === "desktop" ? "is-active" : ""}"
                      aria-selected=${this.deviceFilter === "desktop"}
                      @click=${() => {
      this.deviceFilter = "desktop";
    }}
                    >
                      桌面 (${c})
                    </button>
                    <button
                      type="button"
                      role="tab"
                      class="ds-segmented__btn ${this.deviceFilter === "mobile" ? "is-active" : ""}"
                      aria-selected=${this.deviceFilter === "mobile"}
                      @click=${() => {
      this.deviceFilter = "mobile";
    }}
                    >
                      移动 (${p})
                    </button>
                  </div>
                ` : x}

            <button
              type="button"
              class="ds-btn-icon ${this.refreshing ? "is-spinning" : ""}"
              title="刷新实时动态"
              aria-label="刷新实时动态"
              @click=${() => this.loadData(!1, !0)}
            >
              ${d.refresh}
            </button>
          </div>
        </header>

        <div class="metrics">
          <div class="metric">
            <span class="metric__icon">${d.fire}</span>
            <div class="metric__content">
              <span class="metric__value" title=${y(s)}>${u(s)}</span>
              <span class="metric__label">实时浏览量</span>
            </div>
          </div>
          <div class="metric">
            <span class="metric__icon">${d.users}</span>
            <div class="metric__content">
              <span class="metric__value" title=${y(l)}>${u(l)}</span>
              <span class="metric__label">实时访客</span>
            </div>
          </div>
          <div class="metric">
            <span class="metric__icon">${d.eye}</span>
            <div class="metric__content">
              <span class="metric__value">${u(r)}</span>
              <span class="metric__label">活跃页面</span>
            </div>
          </div>
        </div>

        <div class="list">
          ${k.map((t) => {
      const b = new Date(t.createdAt), w = V(b), g = P(b), f = t.urlPath || "/", $ = O(t), _ = h(t.device), C = _ === "desktop" ? d.desktop : _ === "mobile" ? d.mobile : d.globe;
      return a`
              <div class="item">
                <div class="item__rail" aria-hidden="true">
                  <span class="item__node"></span>
                </div>
                <div class="item__body">
                  <div class="item__top">
                    <div class="item__left">
                      <span class="item__time">${w}</span>
                      <span class="item__path" title=${f}>${f}</span>
                    </div>
                    ${g ? a`<span class="item__ago">${g}</span>` : x}
                  </div>
                  <div class="item__meta">
                    <span class="item__device-icon">${C}</span>
                    ${$.map(
        (z, j) => a`
                        ${j > 0 ? a`<span class="item__dot">·</span>` : x}
                        <span>${z}</span>
                      `
      )}
                  </div>
                </div>
              </div>
            `;
    })}
        </div>
      </div>
    `;
  }
};
o.styles = N;
v([
  m()
], o.prototype, "loading", 2);
v([
  m()
], o.prototype, "refreshing", 2);
v([
  m()
], o.prototype, "error", 2);
v([
  m()
], o.prototype, "data", 2);
v([
  m()
], o.prototype, "deviceFilter", 2);
o = v([
  S("activity-statistics")
], o);
export {
  o as ActivityStatistics
};
