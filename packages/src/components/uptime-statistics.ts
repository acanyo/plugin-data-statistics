import { LitElement, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { fetchUptimeStatus } from '../api';
import { ThemeController } from '../theme-controller';
import { observeOnceVisible } from '../visibility';
import type { UptimeStatus } from '../types';
import { uptimeStyles } from '../styles/uptime-styles';

@customElement('uptime-statistics')
export class UptimeStatistics extends LitElement {
  static styles = uptimeStyles;

  @state() private loading = true;
  @state() private error = false;
  @state() private statusData: UptimeStatus | null = null;

  private pollTimer?: ReturnType<typeof setInterval>;
  private stopVisibility?: () => void;

  constructor() {
    super();
    new ThemeController(this);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.stopVisibility = observeOnceVisible(this, () => {
      void this.loadStatus();
      this.pollTimer = setInterval(() => {
        void this.loadStatus(false);
      }, 60000);
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopVisibility?.();
    this.stopVisibility = undefined;
    if (this.pollTimer) {
      clearInterval(this.pollTimer);
      this.pollTimer = undefined;
    }
  }

  private async loadStatus(initial = true): Promise<void> {
    if (initial) this.loading = true;
    try {
      this.statusData = await fetchUptimeStatus();
      this.error = false;
    } catch {
      if (initial) this.error = true;
    } finally {
      this.loading = false;
    }
  }

  render() {
    if (this.loading) {
      return html`
        <span class="pill is-static" data-tip="正在检测服务状态">
          <span class="dot dot--loading"></span>
          <span class="label">检测中…</span>
        </span>
      `;
    }

    if (this.error || !this.statusData) {
      return html`
        <span class="pill pill--err-box is-static" data-tip="无法连接到 Uptime Kuma 服务">
          <span class="dot dot--error"></span>
          <span class="label">状态获取失败</span>
        </span>
      `;
    }

    if (this.statusData.status < 0) {
      return nothing;
    }

    const map: Record<number, { variant: string; text: string }> = {
      0: { variant: 'error', text: '全部业务异常' },
      1: { variant: 'success', text: '所有业务正常' },
      2: { variant: 'warning', text: '部分业务异常' }
    };
    const cfg = map[this.statusData.status] || { variant: 'loading', text: '状态未知' };
    const url = this.statusData.statusPageUrl || '';

    if (url) {
      return html`
        <a
          class="pill pill--${cfg.variant}"
          href=${url}
          target="_blank"
          rel="noopener noreferrer"
          data-tip="点击查看服务监控详情"
        >
          <span class="dot dot--${cfg.variant}"></span>
          <span class="label">${cfg.text}</span>
        </a>
      `;
    }

    return html`
      <span class="pill pill--${cfg.variant} is-static" data-tip="服务状态监控">
        <span class="dot dot--${cfg.variant}"></span>
        <span class="label">${cfg.text}</span>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uptime-statistics': UptimeStatistics;
  }
}
