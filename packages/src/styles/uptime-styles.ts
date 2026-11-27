import { css } from 'lit';
import { sharedTokenStyles } from './tokens';

export const uptimeStyles = [
  sharedTokenStyles,
  css`
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
