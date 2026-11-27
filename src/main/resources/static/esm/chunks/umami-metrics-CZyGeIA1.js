import { i as u, a as b, x as n, n as h, r as c, t as x } from "./lit-DwgqLyPI.js";
import { s as f, T as g, o as y, d as w } from "./tokens-Dvt0CGho.js";
import { i as p, p as _, T as k, a as $, c as P, f as C } from "./utils-DiE0_EyB.js";
const D = [
  f,
  u`
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

    .heading {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--ds-text-primary);
      letter-spacing: -0.01em;
    }

    .subtitle {
      font-size: 12px;
      color: var(--ds-text-muted);
    }

    .dim-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      padding: 10px 20px;
      background: var(--ds-surface-subtle);
      border-bottom: 1px solid var(--ds-border-subtle);
    }

    .dim-tabs {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px;
    }

    .dim-tab {
      appearance: none;
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
      color: var(--ds-text-secondary);
      padding: 4px 10px;
      border-radius: 999px;
      font-family: inherit;
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
      transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
    }

    .dim-tab:hover {
      border-color: var(--ds-border-strong);
      color: var(--ds-text-primary);
    }

    .dim-tab.is-active {
      background: var(--ds-accent-soft);
      border-color: var(--ds-accent-border);
      color: var(--ds-accent);
      font-weight: 600;
    }

    .body {
      padding: 16px 20px 20px;
      transition: opacity 0.18s ease;
    }

    .body.is-loading {
      opacity: 0.55;
    }

    .list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .row {
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 7px 8px;
      margin: 0 -8px;
      border-radius: 7px;
      transition: background 0.15s ease;
    }

    .row:hover {
      background: var(--ds-surface-hover);
    }

    .row__meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      font-size: 12.5px;
    }

    .row__label {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      font-weight: 500;
      color: var(--ds-text-primary);
    }

    .row__rank {
      font-size: 11px;
      font-weight: 600;
      color: var(--ds-text-muted);
      font-variant-numeric: tabular-nums;
      min-width: 18px;
    }

    .row__name {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .row__name.is-mono {
      font-family: var(--ds-font-mono);
      font-size: 12px;
    }

    .row__vals {
      display: inline-flex;
      align-items: baseline;
      gap: 8px;
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
    }

    .row__count {
      font-weight: 600;
      color: var(--ds-text-primary);
      font-size: 12.5px;
    }

    .row__pct {
      font-size: 11px;
      color: var(--ds-text-muted);
      min-width: 36px;
      text-align: right;
    }

    .row__track {
      width: 100%;
      height: 5px;
      border-radius: 999px;
      background: var(--ds-bar-track);
      overflow: hidden;
    }

    .row__fill {
      height: 100%;
      border-radius: 999px;
      background: var(--ds-bar-fill);
      transition: width 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .state-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      min-height: 128px;
      padding: 20px;
      font-size: 13px;
      color: var(--ds-text-muted);
      text-align: center;
    }

    .state-box--error {
      color: var(--ds-error-text);
      background: var(--ds-error-bg);
    }

    .skeleton-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    @media (max-width: 768px) {
      .header,
      .dim-bar {
        padding: 12px 16px;
      }

      .body {
        padding: 14px 16px 16px;
      }
    }
  `
];
var M = Object.defineProperty, S = Object.getOwnPropertyDescriptor, o = (t, r, e, i) => {
  for (var s = i > 1 ? void 0 : i ? S(r, e) : r, l = t.length - 1, d; l >= 0; l--)
    (d = t[l]) && (s = (i ? d(r, e, s) : d(s)) || s);
  return i && s && M(r, e, s), s;
};
const z = /* @__PURE__ */ new Set(["daily", "weekly", "monthly", "quarterly", "yearly"]), T = [
  { value: "referrer", label: "来源渠道" },
  { value: "country", label: "国家地区" },
  { value: "browser", label: "浏览器" },
  { value: "os", label: "操作系统" },
  { value: "url", label: "热门页面" }
];
let a = class extends b {
  constructor() {
    super(), this.dataType = "monthly", this.accentColor = "", this.activePeriod = "monthly", this.activeDimension = "referrer", this.loading = !0, this.switching = !1, this.error = null, this.items = [], this.cache = /* @__PURE__ */ new Map(), new g(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.activePeriod = z.has(this.dataType) ? this.dataType : "monthly", p(this.accentColor) && this.style.setProperty("--ds-custom-accent", this.accentColor.trim()), this.stopVisibility = y(this, () => {
      this.loadMetrics(!0);
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.stopVisibility?.(), this.stopVisibility = void 0;
  }
  updated(t) {
    t.has("accentColor") && p(this.accentColor) && this.style.setProperty("--ds-custom-accent", this.accentColor.trim());
  }
  get cacheKey() {
    return `${this.activePeriod}:${this.activeDimension}`;
  }
  async loadMetrics(t = !1) {
    const r = this.cacheKey, e = this.cache.get(r);
    if (e) {
      this.items = e, this.loading = !1, this.error = null;
      return;
    }
    t ? this.loading = !0 : this.switching = !0, this.error = null;
    try {
      const i = await w(this.activePeriod, this.activeDimension, 8), s = Array.isArray(i) ? i : [];
      this.cache.set(r, s), this.cacheKey === r && (this.items = s);
    } catch (i) {
      this.error = i instanceof Error ? i.message : "加载失败";
    } finally {
      this.loading = !1, this.switching = !1;
    }
  }
  handlePeriodChange(t) {
    t !== this.activePeriod && (this.activePeriod = t, this.loadMetrics(!1));
  }
  handleDimensionChange(t) {
    t !== this.activeDimension && (this.activeDimension = t, this.loadMetrics(!1));
  }
  formatItemLabel(t) {
    return !t || t.trim() === "" ? this.activeDimension === "referrer" ? "直接访问" : "未知" : this.activeDimension === "country" ? _(t) || t : this.activeDimension === "os" && t === "Mac OS" ? "macOS" : t;
  }
  render() {
    const t = this.items.reduce((e, i) => e + (Number(i.y) || 0), 0), r = Math.max(...this.items.map((e) => Number(e.y) || 0), 1);
    return n`
      <div class="card-shell">
        <header class="header">
          <div class="heading">
            <span class="title">访客画像分析</span>
            <span class="subtitle">按来源渠道、地区、浏览器与访问页面透视读者构成</span>
          </div>

          <div class="ds-segmented" role="tablist" aria-label="统计周期">
            ${k.map(
      (e) => n`
                <button
                  type="button"
                  role="tab"
                  class="ds-segmented__btn ${this.activePeriod === e.value ? "is-active" : ""}"
                  aria-selected=${this.activePeriod === e.value}
                  @click=${() => this.handlePeriodChange(e.value)}
                >
                  ${e.shortLabel}
                </button>
              `
    )}
          </div>
        </header>

        <div class="dim-bar">
          <div class="dim-tabs" role="tablist" aria-label="画像维度">
            ${T.map(
      (e) => n`
                <button
                  type="button"
                  role="tab"
                  class="dim-tab ${this.activeDimension === e.value ? "is-active" : ""}"
                  aria-selected=${this.activeDimension === e.value}
                  @click=${() => this.handleDimensionChange(e.value)}
                >
                  ${e.label}
                </button>
              `
    )}
          </div>
        </div>

        <div class="body ${this.switching ? "is-loading" : ""}">
          ${this.loading ? n`
                <div class="skeleton-list" aria-busy="true">
                  <div class="ds-skeleton" style="height:28px"></div>
                  <div class="ds-skeleton" style="height:28px"></div>
                  <div class="ds-skeleton" style="height:28px"></div>
                  <div class="ds-skeleton" style="height:28px"></div>
                </div>
              ` : this.error ? n`
                  <div class="state-box state-box--error">
                    <span>访客画像加载失败（${this.error}）</span>
                    <button type="button" class="ds-btn-ghost" @click=${() => this.loadMetrics(!0)}>
                      重新加载
                    </button>
                  </div>
                ` : this.items.length === 0 ? n`<div class="state-box">当前周期暂无该维度数据</div>` : n`
                    <ul class="list">
                      ${this.items.map((e, i) => {
      const s = Number(e.y) || 0, l = this.formatItemLabel(e.x), d = Math.max(4, Math.round(s / r * 100)), m = Math.max(0.38, 1 - i * 0.08), v = this.activeDimension === "url" || this.activeDimension === "referrer";
      return n`
                          <li class="row">
                            <div class="row__meta">
                              <span class="row__label">
                                <span class="row__rank">${String(i + 1).padStart(2, "0")}</span>
                                <span class="row__name ${v ? "is-mono" : ""}" title=${l}>${l}</span>
                              </span>
                              <span class="row__vals">
                                <span class="row__count" title=${$(s)}>${P(s)}</span>
                                <span class="row__pct">${C(s, t)}</span>
                              </span>
                            </div>
                            <div class="row__track">
                              <div class="row__fill" style="width:${d}%;opacity:${m.toFixed(2)}"></div>
                            </div>
                          </li>
                        `;
    })}
                    </ul>
                  `}
        </div>
      </div>
    `;
  }
};
a.styles = D;
o([
  h({ type: String, attribute: "data-type" })
], a.prototype, "dataType", 2);
o([
  h({ type: String, attribute: "accent-color" })
], a.prototype, "accentColor", 2);
o([
  c()
], a.prototype, "activePeriod", 2);
o([
  c()
], a.prototype, "activeDimension", 2);
o([
  c()
], a.prototype, "loading", 2);
o([
  c()
], a.prototype, "switching", 2);
o([
  c()
], a.prototype, "error", 2);
o([
  c()
], a.prototype, "items", 2);
a = o([
  x("umami-metrics")
], a);
export {
  a as UmamiMetrics
};
