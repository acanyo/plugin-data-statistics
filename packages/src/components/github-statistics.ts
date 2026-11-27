import { LitElement, html, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { fetchGithubConfig } from '../api';
import { ThemeController } from '../theme-controller';
import type { GithubConfig } from '../types';
import { githubStyles } from '../styles/github-styles';

type GithubCardType = 'graph' | 'stats' | 'pin' | 'top-langs';

const TYPE_ORDER: GithubCardType[] = ['graph', 'stats', 'pin', 'top-langs'];
const TYPE_TITLES: Record<GithubCardType, string> = {
  graph: 'GitHub 活跃热力图',
  stats: 'GitHub 贡献统计',
  pin: 'GitHub 仓库展示',
  'top-langs': '常用开发语言'
};

@customElement('github-statistics')
export class GithubStatistics extends LitElement {
  static styles = githubStyles;

  @property({ type: String, attribute: 'data-types' })
  dataTypes = 'graph';

  @property({ type: String, attribute: 'stats-locale' })
  statsLocale = '';

  @property({ type: String, attribute: 'stats-show-icons' })
  statsShowIcons = '';

  @property({ type: String, attribute: 'stats-theme' })
  statsTheme = '';

  @property({ type: String, attribute: 'pin-repo' })
  pinRepo = '';

  @property({ type: String, attribute: 'top-langs-layout' })
  topLangsLayout = '';

  @property({ type: String, attribute: 'top-langs-hide-progress' })
  topLangsHideProgress = '';

  @property({ type: String, attribute: 'top-langs-stats-format' })
  topLangsStatsFormat = '';

  @property({ type: String, attribute: 'graph-theme' })
  graphTheme = 'minimal';

  @state() private loading = true;
  @state() private error: string | null = null;
  @state() private config: GithubConfig | null = null;
  @state() private imageStates: Record<string, 'loading' | 'loaded' | 'error'> = {};
  @state() private retryTokens: Record<string, number> = {};

  constructor() {
    super();
    new ThemeController(this);
  }

  connectedCallback(): void {
    super.connectedCallback();
    void this.loadConfig();
  }

  private get orderedTypes(): GithubCardType[] {
    const raw = (this.dataTypes || 'graph')
      .split(',')
      .map((t) => t.trim())
      .filter((t): t is GithubCardType => TYPE_ORDER.includes(t as GithubCardType));

    const unique = Array.from(new Set(raw));
    return unique.sort((a, b) => TYPE_ORDER.indexOf(a) - TYPE_ORDER.indexOf(b));
  }

  private async loadConfig(): Promise<void> {
    this.loading = true;
    this.error = null;
    try {
      const cfg = await fetchGithubConfig();
      if (!cfg?.username) {
        throw new Error('GitHub 用户名未配置');
      }
      this.config = cfg;
    } catch (err) {
      this.error = err instanceof Error ? err.message : '加载 GitHub 配置失败';
    } finally {
      this.loading = false;
    }
  }

  private buildImageUrl(type: GithubCardType): string {
    if (!this.config) return '';
    const params = new URLSearchParams();
    params.append('username', this.config.username);

    let url = '';
    if (type === 'graph') {
      params.append('theme', this.graphTheme || 'minimal');
      url = `${this.config.graphProxyUrl}graph?${params.toString()}`;
    } else if (type === 'stats') {
      if (this.statsLocale) params.append('locale', this.statsLocale);
      if (this.statsShowIcons) params.append('show_icons', this.statsShowIcons);
      if (this.statsTheme) params.append('theme', this.statsTheme);
      url = `${this.config.proxyUrl}api?${params.toString()}`;
    } else if (type === 'pin') {
      if (this.pinRepo) params.append('repo', this.pinRepo);
      url = `${this.config.proxyUrl}api/pin/?${params.toString()}`;
    } else if (type === 'top-langs') {
      if (this.topLangsLayout) params.append('layout', this.topLangsLayout);
      if (this.topLangsHideProgress) params.append('hide_progress', this.topLangsHideProgress);
      if (this.topLangsStatsFormat) params.append('stats_format', this.topLangsStatsFormat);
      url = `${this.config.proxyUrl}api/top-langs/?${params.toString()}`;
    }

    const retry = this.retryTokens[type];
    if (retry) {
      url += `&_r=${retry}`;
    }
    return url;
  }

  private setCardState(type: GithubCardType, next: 'loading' | 'loaded' | 'error'): void {
    this.imageStates = { ...this.imageStates, [type]: next };
  }

  private handleRetryCard(type: GithubCardType): void {
    this.retryTokens = { ...this.retryTokens, [type]: (this.retryTokens[type] || 0) + 1 };
    this.setCardState(type, 'loading');
  }

  render() {
    if (this.loading) {
      return html`
        <div class="state-box" aria-busy="true">
          <div class="ds-skeleton" style="width:100%;height:140px"></div>
        </div>
      `;
    }

    if (this.error || !this.config) {
      return html`
        <div class="state-box state-box--error">
          <span>${this.error || 'GitHub 配置不可用'}</span>
          <button type="button" class="ds-btn-ghost" @click=${() => this.loadConfig()}>重新加载</button>
        </div>
      `;
    }

    const types = this.orderedTypes;
    if (types.length === 0) {
      return html`<div class="state-box">未选择 GitHub 统计模块</div>`;
    }

    const nonGraphCount = types.filter((t) => t !== 'graph').length;
    const isSingle = nonGraphCount <= 1;

    return html`
      <div class="grid ${isSingle ? 'is-single' : ''}">
        ${types.map((type) => {
          const status = this.imageStates[type] || 'loading';
          const src = this.buildImageUrl(type);
          const isFull = type === 'graph' || isSingle;

          return html`
            <div class="card ${isFull ? 'card--full' : ''}">
              <div class="card__head">
                <span class="card__title">${TYPE_TITLES[type]}</span>
                <span class="card__user">@${this.config!.username}</span>
              </div>
              <div class="card__body">
                ${status === 'loading'
                  ? html`<div class="ds-skeleton card__skeleton"></div>`
                  : nothing}
                ${status === 'error'
                  ? html`
                      <div class="card__error">
                        <span>图片加载失败，请检查代理地址配置</span>
                        <button type="button" class="ds-btn-ghost" @click=${() => this.handleRetryCard(type)}>
                          重试
                        </button>
                      </div>
                    `
                  : html`
                      <img
                        class="card__img ${status === 'loaded' ? 'is-loaded' : ''}"
                        src=${src}
                        alt=${TYPE_TITLES[type]}
                        loading="lazy"
                        @load=${() => this.setCardState(type, 'loaded')}
                        @error=${() => this.setCardState(type, 'error')}
                      />
                    `}
              </div>
            </div>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'github-statistics': GithubStatistics;
  }
}
