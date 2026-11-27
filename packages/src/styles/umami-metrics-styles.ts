import { css } from 'lit';
import { sharedTokenStyles } from './tokens';

export const umamiMetricsStyles = [
  sharedTokenStyles,
  css`
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
