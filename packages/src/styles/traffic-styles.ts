import { css } from 'lit';
import { sharedTokenStyles } from './tokens';

export const trafficStyles = [
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

    .title-group {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--ds-text-primary);
      letter-spacing: -0.01em;
    }

    .live-pill {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      padding: 2px 8px;
      border-radius: 999px;
      background: var(--ds-live-soft);
      font-size: 11px;
      font-weight: 500;
      color: var(--ds-live-text);
    }

    .live-pill__dot {
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
      flex-wrap: wrap;
    }

    .updated-at {
      font-size: 11px;
      font-family: var(--ds-font-mono);
      font-variant-numeric: tabular-nums;
      color: var(--ds-text-muted);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(142px, 1fr));
      gap: 12px;
      padding: 16px 20px 20px;
      transition: opacity 0.2s ease;
    }

    .grid.is-switching {
      opacity: 0.6;
    }

    .kpi {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 10px;
      padding: 14px 16px;
      border-radius: 10px;
      border: 1px solid var(--ds-border);
      background: var(--ds-surface-subtle);
      overflow: hidden;
      transition: border-color 0.15s ease, background 0.15s ease;
    }

    .kpi--live::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--ds-live), transparent);
      opacity: 0.85;
    }

    .kpi:hover {
      border-color: var(--ds-border-strong);
      background: var(--ds-surface-hover);
    }

    .kpi__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .kpi__label {
      font-size: 12.5px;
      font-weight: 500;
      color: var(--ds-text-secondary);
    }

    .kpi__icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 26px;
      height: 26px;
      border-radius: 6px;
      background: var(--ds-surface);
      border: 1px solid var(--ds-border);
      color: var(--ds-text-muted);
      flex-shrink: 0;
    }

    .kpi--live .kpi__icon {
      background: var(--ds-live-soft);
      border-color: transparent;
      color: var(--ds-live-text);
    }

    .kpi__icon svg {
      width: 14px;
      height: 14px;
    }

    .kpi__bottom {
      display: flex;
      flex-direction: column;
      gap: 3px;
    }

    .kpi__value-row {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      gap: 6px;
    }

    .kpi__delta {
      display: inline-flex;
      align-items: center;
      gap: 2px;
      padding: 1px 6px;
      border-radius: 999px;
      font-size: 10.5px;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      white-space: nowrap;
    }

    .kpi__delta--up {
      color: var(--ds-live-text);
      background: var(--ds-live-soft);
    }

    .kpi__delta--down {
      color: var(--ds-error-text);
      background: var(--ds-error-bg);
    }

    .kpi__delta--flat {
      color: var(--ds-text-muted);
      background: var(--ds-surface-hover);
    }

    .secondary-bar {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px 18px;
      padding: 9px 20px;
      border-top: 1px solid var(--ds-border-subtle);
      background: var(--ds-surface-subtle);
      font-size: 12px;
      color: var(--ds-text-muted);
    }

    .secondary-bar strong {
      color: var(--ds-text-primary);
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }

    .trend-wrap {
      padding: 14px 20px 18px;
      border-top: 1px solid var(--ds-border-subtle);
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .trend-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-size: 12px;
      color: var(--ds-text-muted);
    }

    .trend-legend {
      display: inline-flex;
      align-items: center;
      gap: 14px;
    }

    .trend-legend__item {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11.5px;
      color: var(--ds-text-secondary);
    }

    .trend-legend__dot {
      width: 8px;
      height: 8px;
      border-radius: 2px;
    }

    .trend-canvas-box {
      position: relative;
      width: 100%;
      height: 176px;
    }

    .trend-canvas-box canvas {
      width: 100% !important;
      height: 100% !important;
      display: block;
    }

    .kpi__value {
      font-size: 25px;
      font-weight: 700;
      color: var(--ds-text-primary);
      line-height: 1.15;
      letter-spacing: -0.025em;
      font-variant-numeric: tabular-nums;
    }

    .kpi__sub {
      font-size: 11px;
      color: var(--ds-text-muted);
      font-variant-numeric: tabular-nums;
    }

    .kpi__beacon {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--ds-live);
      flex-shrink: 0;
      animation: ds-pulse 2.2s ease-in-out infinite;
    }

    .skeleton-wrap {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 16px 20px 20px;
    }

    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(136px, 1fr));
      gap: 12px;
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

      .updated-at {
        display: none;
      }

      .grid {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
        padding: 14px 16px 16px;
      }

      .kpi {
        padding: 12px 14px;
        gap: 8px;
      }

      .kpi__value {
        font-size: 21px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .live-pill__dot,
      .kpi__beacon {
        animation: none;
      }
    }
  `
];
