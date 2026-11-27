import { css } from 'lit';
import { sharedTokenStyles } from './tokens';

export const activityStyles = [
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
      gap: 10px;
    }

    .title {
      font-size: 14px;
      font-weight: 600;
      color: var(--ds-text-primary);
      letter-spacing: -0.01em;
    }

    .live-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 2px 8px;
      border-radius: 999px;
      background: var(--ds-live-soft);
      font-size: 11.5px;
      font-weight: 500;
      color: var(--ds-live-text);
    }

    .live-badge__dot {
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
    }

    /* Segmented 3-Metric Strip */
    .metrics {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      background: var(--ds-surface-subtle);
      border-bottom: 1px solid var(--ds-border);
    }

    .metric {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 18px;
      min-width: 0;
    }

    .metric + .metric {
      border-left: 1px solid var(--ds-border);
    }

    .metric__icon {
      width: 28px;
      height: 28px;
      border-radius: 7px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background: var(--ds-surface);
      border: 1px solid var(--ds-border);
      color: var(--ds-text-secondary);
      flex-shrink: 0;
    }

    .metric__icon svg {
      width: 14px;
      height: 14px;
    }

    .metric__content {
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }

    .metric__value {
      font-size: 17px;
      font-weight: 700;
      color: var(--ds-text-primary);
      line-height: 1.2;
      letter-spacing: -0.02em;
      font-variant-numeric: tabular-nums;
    }

    .metric__label {
      font-size: 11.5px;
      color: var(--ds-text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* Timeline Event Stream */
    .list {
      display: flex;
      flex-direction: column;
      max-height: 380px;
      overflow-y: auto;
      overscroll-behavior: contain;
    }

    .list::-webkit-scrollbar {
      width: 5px;
    }

    .list::-webkit-scrollbar-thumb {
      background: var(--ds-scrollbar-thumb);
      border-radius: 999px;
    }

    .list::-webkit-scrollbar-thumb:hover {
      background: var(--ds-scrollbar-thumb-hover);
    }

    .item {
      position: relative;
      display: grid;
      grid-template-columns: 16px minmax(0, 1fr);
      gap: 12px;
      padding: 11px 20px;
      border-bottom: 1px solid var(--ds-border-subtle);
      transition: background 0.15s ease;
    }

    .item:last-child {
      border-bottom: none;
    }

    .item:hover {
      background: var(--ds-surface-hover);
    }

    .item__rail {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 6px;
    }

    .item__rail::after {
      content: '';
      position: absolute;
      top: 16px;
      bottom: -17px;
      width: 1px;
      background: var(--ds-border);
    }

    .item:last-child .item__rail::after {
      display: none;
    }

    .item__node {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--ds-border-strong);
      z-index: 1;
      flex-shrink: 0;
    }

    .item:first-child .item__node {
      background: var(--ds-live);
      box-shadow: 0 0 0 3px var(--ds-live-soft);
    }

    .item__body {
      display: flex;
      flex-direction: column;
      gap: 5px;
      min-width: 0;
    }

    .item__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      min-width: 0;
    }

    .item__left {
      display: flex;
      align-items: center;
      gap: 9px;
      min-width: 0;
      flex: 1;
    }

    .item__time {
      font-family: var(--ds-font-mono);
      font-size: 12px;
      font-variant-numeric: tabular-nums;
      color: var(--ds-text-muted);
      flex-shrink: 0;
    }

    .item__path {
      display: inline-block;
      max-width: 100%;
      padding: 1px 7px;
      border-radius: 5px;
      background: var(--ds-code-bg);
      color: var(--ds-code-text);
      font-family: var(--ds-font-mono);
      font-size: 12px;
      line-height: 1.5;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      transition: background 0.15s ease, color 0.15s ease;
    }

    .item:hover .item__path {
      background: var(--ds-accent-soft);
      color: var(--ds-accent);
    }

    .item__ago {
      font-size: 11px;
      color: var(--ds-text-muted);
      white-space: nowrap;
      flex-shrink: 0;
    }

    .item__meta {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 5px 6px;
      font-size: 12px;
      color: var(--ds-text-secondary);
    }

    .item__device-icon {
      display: inline-flex;
      color: var(--ds-text-muted);
      flex-shrink: 0;
    }

    .item__device-icon svg {
      width: 13px;
      height: 13px;
    }

    .item__dot {
      color: var(--ds-text-muted);
      opacity: 0.55;
      user-select: none;
    }

    .skeleton-wrap {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding: 16px 20px 20px;
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

      .metric {
        padding: 10px 12px;
        flex-direction: column;
        align-items: flex-start;
        gap: 6px;
      }

      .metric__value {
        font-size: 16px;
      }

      .item {
        padding: 10px 16px;
        gap: 10px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .live-badge__dot {
        animation: none;
      }
    }
  `
];
