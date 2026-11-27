import { i as u, a as m, x as d, E as f, n, r as l, t as b } from "./lit-DwgqLyPI.js";
import { s as y, T as x, o as v, g as _ } from "./tokens-Dvt0CGho.js";
const S = [
  y,
  u`
    :host {
      display: block;
      width: 100%;
      margin: 16px 0;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
      width: 100%;
    }

    .grid.is-single {
      grid-template-columns: minmax(0, 1fr);
    }

    .card {
      display: flex;
      flex-direction: column;
      border-radius: var(--ds-radius-card);
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
      box-shadow: var(--ds-shadow), var(--ds-inner-highlight);
      overflow: hidden;
      min-width: 0;
    }

    .card--full {
      grid-column: 1 / -1;
    }

    .card__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px;
      border-bottom: 1px solid var(--ds-border-subtle);
      background: var(--ds-surface-subtle);
    }

    .card__title {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--ds-text-primary);
    }

    .card__user {
      font-family: var(--ds-font-mono);
      font-size: 11px;
      color: var(--ds-text-muted);
    }

    .card__body {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 14px;
      min-height: 132px;
    }

    .card__img {
      display: block;
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      opacity: 0;
      transition: opacity 0.25s ease;
    }

    .card__img.is-loaded {
      opacity: 1;
    }

    .card__skeleton {
      position: absolute;
      inset: 14px;
      border-radius: 8px;
    }

    .state-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      min-height: 112px;
      padding: 18px;
      border-radius: 12px;
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
      font-size: 13px;
      color: var(--ds-text-muted);
      text-align: center;
    }

    .state-box--error {
      background: var(--ds-error-bg);
      border-color: var(--ds-error-border);
      color: var(--ds-error-text);
    }

    .card__error {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      font-size: 12.5px;
      color: var(--ds-error-text);
      padding: 12px;
      text-align: center;
    }

    @media (max-width: 768px) {
      .grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `
];
var w = Object.defineProperty, T = Object.getOwnPropertyDescriptor, a = (t, s, r, e) => {
  for (var o = e > 1 ? void 0 : e ? T(s, r) : s, p = t.length - 1, c; p >= 0; p--)
    (c = t[p]) && (o = (e ? c(s, r, o) : c(o)) || o);
  return e && o && w(s, r, o), o;
};
const h = ["graph", "stats", "pin", "top-langs"], g = {
  graph: "GitHub 活跃热力图",
  stats: "GitHub 贡献统计",
  pin: "GitHub 仓库展示",
  "top-langs": "常用开发语言"
};
let i = class extends m {
  constructor() {
    super(), this.dataTypes = "graph", this.statsLocale = "", this.statsShowIcons = "", this.statsTheme = "", this.pinRepo = "", this.topLangsLayout = "", this.topLangsHideProgress = "", this.topLangsStatsFormat = "", this.graphTheme = "minimal", this.loading = !0, this.error = null, this.config = null, this.imageStates = {}, this.retryTokens = {}, new x(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.stopVisibility = v(this, () => {
      this.loadConfig();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.stopVisibility?.(), this.stopVisibility = void 0;
  }
  get orderedTypes() {
    const t = (this.dataTypes || "graph").split(",").map((r) => r.trim()).filter((r) => h.includes(r));
    return Array.from(new Set(t)).sort((r, e) => h.indexOf(r) - h.indexOf(e));
  }
  async loadConfig() {
    this.loading = !0, this.error = null;
    try {
      const t = await _();
      if (!t?.username)
        throw new Error("GitHub 用户名未配置");
      this.config = t;
    } catch (t) {
      this.error = t instanceof Error ? t.message : "加载 GitHub 配置失败";
    } finally {
      this.loading = !1;
    }
  }
  buildImageUrl(t) {
    if (!this.config) return "";
    const s = new URLSearchParams();
    s.append("username", this.config.username);
    let r = "";
    t === "graph" ? (s.append("theme", this.graphTheme || "minimal"), r = `${this.config.graphProxyUrl}graph?${s.toString()}`) : t === "stats" ? (this.statsLocale && s.append("locale", this.statsLocale), this.statsShowIcons && s.append("show_icons", this.statsShowIcons), this.statsTheme && s.append("theme", this.statsTheme), r = `${this.config.proxyUrl}api?${s.toString()}`) : t === "pin" ? (this.pinRepo && s.append("repo", this.pinRepo), r = `${this.config.proxyUrl}api/pin/?${s.toString()}`) : t === "top-langs" && (this.topLangsLayout && s.append("layout", this.topLangsLayout), this.topLangsHideProgress && s.append("hide_progress", this.topLangsHideProgress), this.topLangsStatsFormat && s.append("stats_format", this.topLangsStatsFormat), r = `${this.config.proxyUrl}api/top-langs/?${s.toString()}`);
    const e = this.retryTokens[t];
    return e && (r += `&_r=${e}`), r;
  }
  setCardState(t, s) {
    this.imageStates = { ...this.imageStates, [t]: s };
  }
  handleRetryCard(t) {
    this.retryTokens = { ...this.retryTokens, [t]: (this.retryTokens[t] || 0) + 1 }, this.setCardState(t, "loading");
  }
  render() {
    if (this.loading)
      return d`
        <div class="state-box" aria-busy="true">
          <div class="ds-skeleton" style="width:100%;height:140px"></div>
        </div>
      `;
    if (this.error || !this.config)
      return d`
        <div class="state-box state-box--error">
          <span>${this.error || "GitHub 配置不可用"}</span>
          <button type="button" class="ds-btn-ghost" @click=${() => this.loadConfig()}>重新加载</button>
        </div>
      `;
    const t = this.orderedTypes;
    if (t.length === 0)
      return d`<div class="state-box">未选择 GitHub 统计模块</div>`;
    const r = t.filter((e) => e !== "graph").length <= 1;
    return d`
      <div class="grid ${r ? "is-single" : ""}">
        ${t.map((e) => {
      const o = this.imageStates[e] || "loading", p = this.buildImageUrl(e);
      return d`
            <div class="card ${e === "graph" || r ? "card--full" : ""}">
              <div class="card__head">
                <span class="card__title">${g[e]}</span>
                <span class="card__user">@${this.config.username}</span>
              </div>
              <div class="card__body">
                ${o === "loading" ? d`<div class="ds-skeleton card__skeleton"></div>` : f}
                ${o === "error" ? d`
                      <div class="card__error">
                        <span>图片加载失败，请检查代理地址配置</span>
                        <button type="button" class="ds-btn-ghost" @click=${() => this.handleRetryCard(e)}>
                          重试
                        </button>
                      </div>
                    ` : d`
                      <img
                        class="card__img ${o === "loaded" ? "is-loaded" : ""}"
                        src=${p}
                        alt=${g[e]}
                        loading="lazy"
                        @load=${() => this.setCardState(e, "loaded")}
                        @error=${() => this.setCardState(e, "error")}
                      />
                    `}
              </div>
            </div>
          `;
    })}
      </div>
    `;
  }
};
i.styles = S;
a([
  n({ type: String, attribute: "data-types" })
], i.prototype, "dataTypes", 2);
a([
  n({ type: String, attribute: "stats-locale" })
], i.prototype, "statsLocale", 2);
a([
  n({ type: String, attribute: "stats-show-icons" })
], i.prototype, "statsShowIcons", 2);
a([
  n({ type: String, attribute: "stats-theme" })
], i.prototype, "statsTheme", 2);
a([
  n({ type: String, attribute: "pin-repo" })
], i.prototype, "pinRepo", 2);
a([
  n({ type: String, attribute: "top-langs-layout" })
], i.prototype, "topLangsLayout", 2);
a([
  n({ type: String, attribute: "top-langs-hide-progress" })
], i.prototype, "topLangsHideProgress", 2);
a([
  n({ type: String, attribute: "top-langs-stats-format" })
], i.prototype, "topLangsStatsFormat", 2);
a([
  n({ type: String, attribute: "graph-theme" })
], i.prototype, "graphTheme", 2);
a([
  l()
], i.prototype, "loading", 2);
a([
  l()
], i.prototype, "error", 2);
a([
  l()
], i.prototype, "config", 2);
a([
  l()
], i.prototype, "imageStates", 2);
a([
  l()
], i.prototype, "retryTokens", 2);
i = a([
  b("github-statistics")
], i);
export {
  i as GithubStatistics
};
