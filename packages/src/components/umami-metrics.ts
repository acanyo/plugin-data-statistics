import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { fetchUmamiMetrics } from '../api';
import { ThemeController } from '../theme-controller';
import { observeOnceVisible } from '../visibility';
import {
  formatExact,
  formatNumber,
  formatPercent,
  getCountryName,
  isValidHexColor,
  TRAFFIC_PERIODS
} from '../utils';
import type { TrafficType, UmamiMetricItem, UmamiMetricType } from '../types';
import { umamiMetricsStyles } from '../styles/umami-metrics-styles';

const VALID_TYPES = new Set<TrafficType>(['daily', 'weekly', 'monthly', 'quarterly', 'yearly']);

const DIMENSIONS: Array<{ value: UmamiMetricType; label: string }> = [
  { value: 'referrer', label: '来源渠道' },
  { value: 'country', label: '国家地区' },
  { value: 'browser', label: '浏览器' },
  { value: 'os', label: '操作系统' },
  { value: 'url', label: '热门页面' }
];

@customElement('umami-metrics')
export class UmamiMetrics extends LitElement {
  static styles = umamiMetricsStyles;

  @property({ type: String, attribute: 'data-type' })
  dataType: TrafficType = 'monthly';

  @property({ type: String, attribute: 'accent-color' })
  accentColor = '';

  @state() private activePeriod: TrafficType = 'monthly';
  @state() private activeDimension: UmamiMetricType = 'referrer';
  @state() private loading = true;
  @state() private switching = false;
  @state() private error: string | null = null;
  @state() private items: UmamiMetricItem[] = [];

  private cache = new Map<string, UmamiMetricItem[]>();
  private stopVisibility?: () => void;

  constructor() {
    super();
    new ThemeController(this);
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.activePeriod = VALID_TYPES.has(this.dataType) ? this.dataType : 'monthly';
    if (isValidHexColor(this.accentColor)) {
      this.style.setProperty('--ds-custom-accent', this.accentColor.trim());
    }
    this.stopVisibility = observeOnceVisible(this, () => {
      void this.loadMetrics(true);
    });
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.stopVisibility?.();
    this.stopVisibility = undefined;
  }

  protected updated(changed: Map<string, unknown>): void {
    if (changed.has('accentColor') && isValidHexColor(this.accentColor)) {
      this.style.setProperty('--ds-custom-accent', this.accentColor.trim());
    }
  }

  private get cacheKey(): string {
    return `${this.activePeriod}:${this.activeDimension}`;
  }

  private async loadMetrics(initial = false): Promise<void> {
    const key = this.cacheKey;
    const cached = this.cache.get(key);
    if (cached) {
      this.items = cached;
      this.loading = false;
      this.error = null;
      return;
    }

    if (initial) {
      this.loading = true;
    } else {
      this.switching = true;
    }
    this.error = null;

    try {
      const res = await fetchUmamiMetrics(this.activePeriod, this.activeDimension, 8);
      const list = Array.isArray(res) ? res : [];
      this.cache.set(key, list);
      if (this.cacheKey === key) {
        this.items = list;
      }
    } catch (err) {
      this.error = err instanceof Error ? err.message : '加载失败';
    } finally {
      this.loading = false;
      this.switching = false;
    }
  }

  private handlePeriodChange(period: TrafficType): void {
    if (period === this.activePeriod) return;
    this.activePeriod = period;
    void this.loadMetrics(false);
  }

  private handleDimensionChange(dim: UmamiMetricType): void {
    if (dim === this.activeDimension) return;
    this.activeDimension = dim;
    void this.loadMetrics(false);
  }

  private formatItemLabel(raw: string): string {
    if (!raw || raw.trim() === '') {
      return this.activeDimension === 'referrer' ? '直接访问' : '未知';
    }
    if (this.activeDimension === 'country') {
      return getCountryName(raw) || raw;
    }
    if (this.activeDimension === 'os' && raw === 'Mac OS') {
      return 'macOS';
    }
    return raw;
  }

  render() {
    const total = this.items.reduce((sum, i) => sum + (Number(i.y) || 0), 0);
    const maxVal = Math.max(...this.items.map((i) => Number(i.y) || 0), 1);

    return html`
      <div class="card-shell">
        <header class="header">
          <div class="heading">
            <span class="title">访客画像分析</span>
            <span class="subtitle">按来源渠道、地区、浏览器与访问页面透视读者构成</span>
          </div>

          <div class="ds-segmented" role="tablist" aria-label="统计周期">
            ${TRAFFIC_PERIODS.map(
              (p) => html`
                <button
                  type="button"
                  role="tab"
                  class="ds-segmented__btn ${this.activePeriod === p.value ? 'is-active' : ''}"
                  aria-selected=${this.activePeriod === p.value}
                  @click=${() => this.handlePeriodChange(p.value)}
                >
                  ${p.shortLabel}
                </button>
              `
            )}
          </div>
        </header>

        <div class="dim-bar">
          <div class="dim-tabs" role="tablist" aria-label="画像维度">
            ${DIMENSIONS.map(
              (d) => html`
                <button
                  type="button"
                  role="tab"
                  class="dim-tab ${this.activeDimension === d.value ? 'is-active' : ''}"
                  aria-selected=${this.activeDimension === d.value}
                  @click=${() => this.handleDimensionChange(d.value)}
                >
                  ${d.label}
                </button>
              `
            )}
          </div>
        </div>

        <div class="body ${this.switching ? 'is-loading' : ''}">
          ${this.loading
            ? html`
                <div class="skeleton-list" aria-busy="true">
                  <div class="ds-skeleton" style="height:28px"></div>
                  <div class="ds-skeleton" style="height:28px"></div>
                  <div class="ds-skeleton" style="height:28px"></div>
                  <div class="ds-skeleton" style="height:28px"></div>
                </div>
              `
            : this.error
              ? html`
                  <div class="state-box state-box--error">
                    <span>访客画像加载失败（${this.error}）</span>
                    <button type="button" class="ds-btn-ghost" @click=${() => this.loadMetrics(true)}>
                      重新加载
                    </button>
                  </div>
                `
              : this.items.length === 0
                ? html`<div class="state-box">当前周期暂无该维度数据</div>`
                : html`
                    <ul class="list">
                      ${this.items.map((item, idx) => {
                        const val = Number(item.y) || 0;
                        const label = this.formatItemLabel(item.x);
                        const widthPct = Math.max(4, Math.round((val / maxVal) * 100));
                        const opacity = Math.max(0.38, 1 - idx * 0.08);
                        const isMono = this.activeDimension === 'url' || this.activeDimension === 'referrer';

                        return html`
                          <li class="row">
                            <div class="row__meta">
                              <span class="row__label">
                                <span class="row__rank">${String(idx + 1).padStart(2, '0')}</span>
                                <span class="row__name ${isMono ? 'is-mono' : ''}" title=${label}>${label}</span>
                              </span>
                              <span class="row__vals">
                                <span class="row__count" title=${formatExact(val)}>${formatNumber(val)}</span>
                                <span class="row__pct">${formatPercent(val, total)}</span>
                              </span>
                            </div>
                            <div class="row__track">
                              <div class="row__fill" style="width:${widthPct}%;opacity:${opacity.toFixed(2)}"></div>
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
}

declare global {
  interface HTMLElementTagNameMap {
    'umami-metrics': UmamiMetrics;
  }
}
