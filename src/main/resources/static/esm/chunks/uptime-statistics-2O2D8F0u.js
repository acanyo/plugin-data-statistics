import { i as c, a as u, x as i, r as d, t as b } from "./lit-DwgqLyPI.js";
import { s as v, T as h, o as x, e as f } from "./tokens-Dvt0CGho.js";
const g = [
  v,
  c`
    :host {
      display: inline-flex;
      align-items: center;
      vertical-align: middle;
    }

    .pill {
      position: relative;
      display: inline-flex;
      align-items: center;
      gap: 7px;
      padding: 4px 10px;
      border-radius: 999px;
      border: 1px solid var(--ds-border);
      background: var(--ds-surface-subtle);
      color: var(--ds-text-primary);
      text-decoration: none;
      white-space: nowrap;
      cursor: pointer;
      transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
    }

    .pill:hover,
    .pill:focus-visible {
      border-color: var(--ds-border-strong);
      background: var(--ds-surface-hover);
      outline: none;
    }

    .pill.is-static {
      cursor: default;
    }

    .pill::after {
      content: attr(data-tip);
      position: absolute;
      bottom: 100%;
      margin-bottom: 8px;
      left: 50%;
      transform: translateX(-50%) translateY(3px);
      padding: 5px 10px;
      border-radius: 6px;
      background: var(--ds-tooltip-bg);
      color: var(--ds-tooltip-text);
      border: 1px solid var(--ds-tooltip-border);
      font-size: 11.5px;
      font-weight: 500;
      white-space: nowrap;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.15s ease, transform 0.15s ease;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
      z-index: 50;
    }

    .pill:hover::after,
    .pill:focus-visible::after {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      flex-shrink: 0;
    }

    .dot--loading {
      background: var(--ds-text-muted);
    }

    .dot--success {
      background: var(--ds-live);
      animation: ds-pulse 2.2s ease-in-out infinite;
    }

    .dot--warning {
      background: var(--ds-warning);
      box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.22);
    }

    .dot--error {
      background: var(--ds-error);
      box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.22);
    }

    .label {
      font-size: 12.5px;
      font-weight: 500;
      line-height: 1.3;
      color: var(--ds-text-primary);
      transition: color 0.15s ease;
    }

    .pill--success:hover .label { color: var(--ds-live-text); }
    .pill--warning:hover .label { color: var(--ds-warning-text); }
    .pill--error:hover .label { color: var(--ds-error-text); }

    .pill--err-box {
      color: var(--ds-error-text);
      border-color: var(--ds-error-border);
      background: var(--ds-error-bg);
    }

    @media (prefers-reduced-motion: reduce) {
      .dot--success {
        animation: none;
      }
    }
  `
];
var m = Object.defineProperty, w = Object.getOwnPropertyDescriptor, l = (r, t, s, o) => {
  for (var a = o > 1 ? void 0 : o ? w(t, s) : t, n = r.length - 1, p; n >= 0; n--)
    (p = r[n]) && (a = (o ? p(t, s, a) : p(a)) || a);
  return o && a && m(t, s, a), a;
};
let e = class extends u {
  constructor() {
    super(), this.loading = !0, this.error = !1, this.statusData = null, new h(this);
  }
  connectedCallback() {
    super.connectedCallback(), this.stopVisibility = x(this, () => {
      this.loadStatus(), this.pollTimer = setInterval(() => {
        this.loadStatus(!1);
      }, 6e4);
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.stopVisibility?.(), this.stopVisibility = void 0, this.pollTimer && (clearInterval(this.pollTimer), this.pollTimer = void 0);
  }
  async loadStatus(r = !0) {
    r && (this.loading = !0);
    try {
      this.statusData = await f(), this.error = !1;
    } catch {
      r && (this.error = !0);
    } finally {
      this.loading = !1;
    }
  }
  render() {
    if (this.loading)
      return i`
        <span class="pill is-static" data-tip="正在检测服务状态">
          <span class="dot dot--loading"></span>
          <span class="label">检测中…</span>
        </span>
      `;
    if (this.error || !this.statusData)
      return i`
        <span class="pill pill--err-box is-static" data-tip="无法连接到 Uptime Kuma 服务">
          <span class="dot dot--error"></span>
          <span class="label">状态获取失败</span>
        </span>
      `;
    const t = {
      0: { variant: "error", text: "全部业务异常" },
      1: { variant: "success", text: "所有业务正常" },
      2: { variant: "warning", text: "部分业务异常" }
    }[this.statusData.status] || { variant: "loading", text: "状态未知" }, s = this.statusData.statusPageUrl || "";
    return s ? i`
        <a
          class="pill pill--${t.variant}"
          href=${s}
          target="_blank"
          rel="noopener noreferrer"
          data-tip="点击查看服务监控详情"
        >
          <span class="dot dot--${t.variant}"></span>
          <span class="label">${t.text}</span>
        </a>
      ` : i`
      <span class="pill pill--${t.variant} is-static" data-tip="服务状态监控">
        <span class="dot dot--${t.variant}"></span>
        <span class="label">${t.text}</span>
      </span>
    `;
  }
};
e.styles = g;
l([
  d()
], e.prototype, "loading", 2);
l([
  d()
], e.prototype, "error", 2);
l([
  d()
], e.prototype, "statusData", 2);
e = l([
  b("uptime-statistics")
], e);
export {
  e as UptimeStatistics
};
