import { css } from 'lit';

/**
 * Shared Shadow DOM Design Tokens (Editorial Telemetry / Linear Precision)
 * External Halo themes can override any --ds-* variable directly on the host tag.
 */
export const sharedTokenStyles = css`
  :host {
    --ds-font-sans: -apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
    --ds-font-mono: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Monaco, Consolas, monospace;

    /* Surface, Radii & Depth */
    --ds-radius-card: 14px;
    --ds-radius-panel: 10px;
    --ds-surface: #ffffff;
    --ds-surface-subtle: #fafafa;
    --ds-surface-hover: #f4f4f5;
    --ds-surface-elevated: #ffffff;
    --ds-border: rgba(9, 9, 11, 0.08);
    --ds-border-subtle: rgba(9, 9, 11, 0.05);
    --ds-border-strong: rgba(9, 9, 11, 0.16);
    --ds-shadow: 0 1px 2px rgba(9, 9, 11, 0.03), 0 6px 20px -10px rgba(9, 9, 11, 0.06);
    --ds-inner-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.85);

    /* Typography */
    --ds-text-primary: #09090b;
    --ds-text-secondary: #52525b;
    --ds-text-muted: #71717a;

    /* Accent & Semantic (Inherits global --ds-custom-accent from plugin settings if set) */
    --ds-accent: var(--ds-custom-accent, #2563eb);
    --ds-accent-soft: color-mix(in srgb, var(--ds-accent) 9%, transparent);
    --ds-accent-border: color-mix(in srgb, var(--ds-accent) 24%, transparent);

    --ds-live: #10b981;
    --ds-live-soft: rgba(16, 185, 129, 0.1);
    --ds-live-text: #059669;
    --ds-warning: #f59e0b;
    --ds-warning-text: #d97706;
    --ds-error: #ef4444;
    --ds-error-bg: #fef2f2;
    --ds-error-border: #fecaca;
    --ds-error-text: #dc2626;

    /* Controls & Viz */
    --ds-segment-bg: #f4f4f5;
    --ds-segment-active-bg: #ffffff;
    --ds-segment-active-shadow: 0 1px 2px rgba(9, 9, 11, 0.08);
    --ds-bar-track: #f1f5f9;
    --ds-bar-fill: var(--ds-accent);
    --ds-code-bg: #f4f4f5;
    --ds-code-text: #18181b;
    --ds-tooltip-bg: #18181b;
    --ds-tooltip-text: #fafafa;
    --ds-tooltip-border: rgba(255, 255, 255, 0.08);
    --ds-scrollbar-thumb: rgba(113, 113, 122, 0.28);
    --ds-scrollbar-thumb-hover: rgba(113, 113, 122, 0.48);
    --ds-skeleton-base: #f4f4f5;
    --ds-skeleton-shine: #e4e4e7;

    /* Heatmap Scale (Light — dynamically derived from --ds-accent) */
    --ds-heatmap-ring: rgba(9, 9, 11, 0.055);
    --ds-heatmap-l0: #f3f4f6;
    --ds-heatmap-l1: color-mix(in srgb, var(--ds-accent) 18%, #ffffff);
    --ds-heatmap-l2: color-mix(in srgb, var(--ds-accent) 42%, #ffffff);
    --ds-heatmap-l3: color-mix(in srgb, var(--ds-accent) 72%, #ffffff);
    --ds-heatmap-l4: var(--ds-accent);
    --ds-heatmap-hover-ring: color-mix(in srgb, var(--ds-accent) 68%, transparent);

    font-family: var(--ds-font-sans);
    color: var(--ds-text-primary);
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
  }

  :host([data-ds-theme='dark']) {
    --ds-surface: #0e1015;
    --ds-surface-subtle: #14171f;
    --ds-surface-hover: #1c202b;
    --ds-surface-elevated: #181b24;
    --ds-border: rgba(255, 255, 255, 0.09);
    --ds-border-subtle: rgba(255, 255, 255, 0.05);
    --ds-border-strong: rgba(255, 255, 255, 0.16);
    --ds-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    --ds-inner-highlight: inset 0 1px 0 rgba(255, 255, 255, 0.04);

    --ds-text-primary: #f4f4f5;
    --ds-text-secondary: #a1a1aa;
    --ds-text-muted: #71717a;

    --ds-accent: var(--ds-custom-accent, #60a5fa);
    --ds-accent-soft: color-mix(in srgb, var(--ds-accent) 16%, transparent);
    --ds-accent-border: color-mix(in srgb, var(--ds-accent) 30%, transparent);

    --ds-live: #34d399;
    --ds-live-soft: rgba(52, 211, 153, 0.12);
    --ds-live-text: #34d399;
    --ds-warning: #fbbf24;
    --ds-warning-text: #fbbf24;
    --ds-error: #f87171;
    --ds-error-bg: rgba(239, 68, 68, 0.1);
    --ds-error-border: rgba(239, 68, 68, 0.28);
    --ds-error-text: #fca5a5;

    --ds-segment-bg: rgba(255, 255, 255, 0.05);
    --ds-segment-active-bg: #222633;
    --ds-segment-active-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);
    --ds-bar-track: rgba(255, 255, 255, 0.06);
    --ds-bar-fill: var(--ds-accent);
    --ds-code-bg: rgba(255, 255, 255, 0.07);
    --ds-code-text: #e4e4e7;
    --ds-tooltip-bg: #222633;
    --ds-tooltip-text: #f4f4f5;
    --ds-tooltip-border: rgba(255, 255, 255, 0.12);
    --ds-scrollbar-thumb: rgba(161, 161, 170, 0.28);
    --ds-scrollbar-thumb-hover: rgba(161, 161, 170, 0.48);
    --ds-skeleton-base: #181b23;
    --ds-skeleton-shine: #232836;

    --ds-heatmap-ring: rgba(255, 255, 255, 0.05);
    --ds-heatmap-l0: rgba(255, 255, 255, 0.05);
    --ds-heatmap-l1: color-mix(in srgb, var(--ds-accent) 26%, #0e1015);
    --ds-heatmap-l2: color-mix(in srgb, var(--ds-accent) 48%, #0e1015);
    --ds-heatmap-l3: color-mix(in srgb, var(--ds-accent) 74%, #0e1015);
    --ds-heatmap-l4: var(--ds-accent);
    --ds-heatmap-hover-ring: color-mix(in srgb, var(--ds-accent) 80%, #ffffff);
  }

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  @keyframes ds-shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  @keyframes ds-pulse {
    0%, 100% {
      opacity: 1;
      box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.45);
    }
    50% {
      opacity: 0.78;
      box-shadow: 0 0 0 4px rgba(16, 185, 129, 0);
    }
  }

  @keyframes ds-spin {
    to { transform: rotate(360deg); }
  }

  .ds-skeleton {
    border-radius: 8px;
    background: linear-gradient(
      90deg,
      var(--ds-skeleton-base) 25%,
      var(--ds-skeleton-shine) 50%,
      var(--ds-skeleton-base) 75%
    );
    background-size: 200% 100%;
    animation: ds-shimmer 1.4s ease-in-out infinite;
  }

  .ds-btn-ghost {
    appearance: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 5px 10px;
    border-radius: 7px;
    border: 1px solid var(--ds-border);
    background: var(--ds-surface);
    color: var(--ds-text-secondary);
    font-family: inherit;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  }

  .ds-btn-ghost:hover {
    background: var(--ds-surface-hover);
    border-color: var(--ds-border-strong);
    color: var(--ds-text-primary);
  }

  .ds-btn-ghost:focus-visible,
  .ds-btn-icon:focus-visible,
  .ds-segmented__btn:focus-visible {
    outline: 2px solid var(--ds-accent-border);
    outline-offset: 1px;
  }

  .ds-btn-icon {
    appearance: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    padding: 0;
    border-radius: 6px;
    border: 1px solid var(--ds-border);
    background: var(--ds-surface-subtle);
    color: var(--ds-text-muted);
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
  }

  .ds-btn-icon:hover {
    background: var(--ds-surface-hover);
    border-color: var(--ds-border-strong);
    color: var(--ds-text-primary);
  }

  .ds-btn-icon svg {
    width: 13px;
    height: 13px;
  }

  .ds-btn-icon.is-spinning svg {
    animation: ds-spin 0.7s linear infinite;
  }

  .ds-segmented {
    display: inline-flex;
    align-items: center;
    padding: 2px;
    border-radius: 8px;
    background: var(--ds-segment-bg);
    border: 1px solid var(--ds-border-subtle);
    gap: 2px;
  }

  .ds-segmented__btn {
    appearance: none;
    border: none;
    background: transparent;
    padding: 3px 9px;
    border-radius: 6px;
    font-family: inherit;
    font-size: 11.5px;
    font-weight: 500;
    color: var(--ds-text-muted);
    cursor: pointer;
    white-space: nowrap;
    transition: background 0.15s ease, color 0.15s ease, box-shadow 0.15s ease;
  }

  .ds-segmented__btn:hover {
    color: var(--ds-text-primary);
  }

  .ds-segmented__btn.is-active {
    background: var(--ds-segment-active-bg);
    color: var(--ds-text-primary);
    font-weight: 600;
    box-shadow: var(--ds-segment-active-shadow);
  }

  @media (prefers-reduced-motion: reduce) {
    .ds-skeleton,
    .ds-btn-icon.is-spinning svg {
      animation: none !important;
    }
  }
`;
