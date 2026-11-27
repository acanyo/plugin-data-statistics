import type { ReactiveController, ReactiveControllerHost } from 'lit';
import type { ThemeMode } from './types';

export function detectThemeMode(host?: HTMLElement): ThemeMode {
  if (typeof document === 'undefined') return 'light';

  const html = document.documentElement;
  const explicitLight =
    html.getAttribute('data-color-scheme') === 'light' ||
    html.getAttribute('data-theme') === 'light' ||
    html.getAttribute('theme') === 'light' ||
    html.classList.contains('light');
  if (explicitLight) return 'light';

  const explicitDark =
    html.classList.contains('dark') ||
    /\bdark\b/.test(html.className) ||
    html.getAttribute('data-color-scheme') === 'dark' ||
    html.getAttribute('data-theme') === 'dark' ||
    html.getAttribute('theme') === 'dark' ||
    Boolean(host?.closest('[data-theme="dark"], [data-color-scheme="dark"], [theme="dark"]'));
  if (explicitDark) return 'dark';

  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return 'light';
}

/**
 * Reactive controller that keeps each Lit Web Component's Shadow DOM theme
 * synchronized with Halo themes (html.dark / data-theme / data-color-scheme)
 * and OS prefers-color-scheme changes.
 */
export class ThemeController implements ReactiveController {
  private host: ReactiveControllerHost & HTMLElement;
  private observer?: MutationObserver;
  private mediaQuery?: MediaQueryList;
  private onChange?: (mode: ThemeMode) => void;
  public mode: ThemeMode = 'light';

  constructor(host: ReactiveControllerHost & HTMLElement, onChange?: (mode: ThemeMode) => void) {
    this.host = host;
    this.onChange = onChange;
    this.host.addController(this);
  }

  private sync = () => {
    const next = detectThemeMode(this.host);
    const changed = next !== this.mode || this.host.getAttribute('data-ds-theme') !== next;
    this.mode = next;
    this.host.setAttribute('data-ds-theme', next);
    if (changed) {
      this.host.requestUpdate();
      this.onChange?.(next);
    }
  };

  hostConnected(): void {
    this.sync();

    if (typeof MutationObserver !== 'undefined') {
      this.observer = new MutationObserver(this.sync);
      this.observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class', 'data-theme', 'data-color-scheme', 'theme']
      });
    }

    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.mediaQuery.addEventListener?.('change', this.sync);
    }
  }

  hostDisconnected(): void {
    this.observer?.disconnect();
    this.observer = undefined;
    this.mediaQuery?.removeEventListener?.('change', this.sync);
    this.mediaQuery = undefined;
  }
}
