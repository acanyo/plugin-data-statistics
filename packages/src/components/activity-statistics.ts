import { LitElement, html, nothing, svg } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { fetchUmamiRealtime } from '../api';
import { ThemeController } from '../theme-controller';
import { observeOnceVisible } from '../visibility';
import {
  buildVisitorTags,
  formatExact,
  formatNumber,
  formatRelativeTime,
  formatTime24,
  normalizeDeviceCategory
} from '../utils';
import type { RealtimeData } from '../types';
import { activityStyles } from '../styles/activity-styles';

type DeviceFilter = 'all' | 'desktop' | 'mobile';
const MAX_EVENTS = 30;

const ICONS = {
  fire: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  users: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
  eye: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  desktop: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
  mobile: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>`,
  globe: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
  refresh: svg`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-2.64-6.36"/><polyline points="21 3 21 9 15 9"/></svg>`
};

@customElement('activity-statistics')
export class ActivityStatistics extends LitElement {
  static styles = activityStyles;

  @state() private loading = true;
  @state() private refreshing = false;
  @state() private error: string | null = null;
  @state() private data: RealtimeData | null = null;
  @state() private deviceFilter: DeviceFilter = 'all';

  private pollTimer?: ReturnType<typeof setInterval>;
  private stopVisibility?: () => void;

  constructor() {
    super();
    new ThemeController(this);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.stopVisibility = observeOnceVisible(this, () => {
      void this.loadData();
      this.pollTimer = setInterval(() => {
        void this.loadData(false);
      }, 30000);
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

  private async loadData(initial = true, manual = false): Promise<void> {
    if (initial) this.loading = true;
    if (manual) this.refreshing = true;
    this.error = null;
    try {
      this.data = await fetchUmamiRealtime();
    } catch (err) {
      if (initial || manual) {
        this.error = err instanceof Error ? err.message : '加载失败';
      }
    } finally {
      this.loading = false;
      this.refreshing = false;
    }
  }

  render() {
    if (this.loading) {
      return html`
        <div class="card-shell">
          <div class="skeleton-wrap" aria-busy="true" aria-label="实时动态加载中">
            <div class="ds-skeleton" style="width:160px;height:16px"></div>
            <div class="ds-skeleton" style="height:56px"></div>
            <div class="ds-skeleton" style="height:44px"></div>
            <div class="ds-skeleton" style="height:44px"></div>
          </div>
        </div>
      `;
    }

    if (this.error) {
      return html`
        <div class="card-shell">
          <div class="state-box state-box--error">
            <span>实时动态加载失败（${this.error}）</span>
            <button type="button" class="ds-btn-ghost" @click=${() => this.loadData(true)}>重新加载</button>
          </div>
        </div>
      `;
    }

    const allEvents = (this.data?.events || []).slice(0, MAX_EVENTS);
    if (allEvents.length === 0) {
      return html`
        <div class="card-shell">
          <div class="state-box">近 30 分钟暂无访客活动</div>
        </div>
      `;
    }

    const totals = this.data?.totals || { views: 0, visitors: 0 };
    const totalViews = Number(totals.views) || 0;
    const uniqueVisitors = Number(totals.visitors) || 0;
    const activePages = new Set(allEvents.map((e) => e.urlPath).filter(Boolean)).size;

    const desktopCount = allEvents.filter((e) => normalizeDeviceCategory(e.device) === 'desktop').length;
    const mobileCount = allEvents.filter((e) => normalizeDeviceCategory(e.device) === 'mobile').length;

    const filteredEvents =
      this.deviceFilter === 'all'
        ? allEvents
        : allEvents.filter((e) => normalizeDeviceCategory(e.device) === this.deviceFilter);

    return html`
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
            ${desktopCount > 0 && mobileCount > 0
              ? html`
                  <div class="ds-segmented" role="tablist" aria-label="设备筛选">
                    <button
                      type="button"
                      role="tab"
                      class="ds-segmented__btn ${this.deviceFilter === 'all' ? 'is-active' : ''}"
                      aria-selected=${this.deviceFilter === 'all'}
                      @click=${() => {
                        this.deviceFilter = 'all';
                      }}
                    >
                      全部 (${allEvents.length})
                    </button>
                    <button
                      type="button"
                      role="tab"
                      class="ds-segmented__btn ${this.deviceFilter === 'desktop' ? 'is-active' : ''}"
                      aria-selected=${this.deviceFilter === 'desktop'}
                      @click=${() => {
                        this.deviceFilter = 'desktop';
                      }}
                    >
                      桌面 (${desktopCount})
                    </button>
                    <button
                      type="button"
                      role="tab"
                      class="ds-segmented__btn ${this.deviceFilter === 'mobile' ? 'is-active' : ''}"
                      aria-selected=${this.deviceFilter === 'mobile'}
                      @click=${() => {
                        this.deviceFilter = 'mobile';
                      }}
                    >
                      移动 (${mobileCount})
                    </button>
                  </div>
                `
              : nothing}

            <button
              type="button"
              class="ds-btn-icon ${this.refreshing ? 'is-spinning' : ''}"
              title="刷新实时动态"
              aria-label="刷新实时动态"
              @click=${() => this.loadData(false, true)}
            >
              ${ICONS.refresh}
            </button>
          </div>
        </header>

        <div class="metrics">
          <div class="metric">
            <span class="metric__icon">${ICONS.fire}</span>
            <div class="metric__content">
              <span class="metric__value" title=${formatExact(totalViews)}>${formatNumber(totalViews)}</span>
              <span class="metric__label">实时浏览量</span>
            </div>
          </div>
          <div class="metric">
            <span class="metric__icon">${ICONS.users}</span>
            <div class="metric__content">
              <span class="metric__value" title=${formatExact(uniqueVisitors)}>${formatNumber(uniqueVisitors)}</span>
              <span class="metric__label">实时访客</span>
            </div>
          </div>
          <div class="metric">
            <span class="metric__icon">${ICONS.eye}</span>
            <div class="metric__content">
              <span class="metric__value">${formatNumber(activePages)}</span>
              <span class="metric__label">活跃页面</span>
            </div>
          </div>
        </div>

        <div class="list">
          ${filteredEvents.map((ev) => {
            const d = new Date(ev.createdAt);
            const timeStr = formatTime24(d);
            const ago = formatRelativeTime(d);
            const path = ev.urlPath || '/';
            const tags = buildVisitorTags(ev);
            const devKind = normalizeDeviceCategory(ev.device);
            const icon = devKind === 'desktop' ? ICONS.desktop : devKind === 'mobile' ? ICONS.mobile : ICONS.globe;

            return html`
              <div class="item">
                <div class="item__rail" aria-hidden="true">
                  <span class="item__node"></span>
                </div>
                <div class="item__body">
                  <div class="item__top">
                    <div class="item__left">
                      <span class="item__time">${timeStr}</span>
                      <span class="item__path" title=${path}>${path}</span>
                    </div>
                    ${ago ? html`<span class="item__ago">${ago}</span>` : nothing}
                  </div>
                  <div class="item__meta">
                    <span class="item__device-icon">${icon}</span>
                    ${tags.map(
                      (tag, idx) => html`
                        ${idx > 0 ? html`<span class="item__dot">·</span>` : nothing}
                        <span>${tag}</span>
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
}

declare global {
  interface HTMLElementTagNameMap {
    'activity-statistics': ActivityStatistics;
  }
}
