import { css } from 'lit';
import { sharedTokenStyles } from './tokens';

export const siteChartsStyles = [
  sharedTokenStyles,
  css`
    :host {
      display: block;
      width: 100%;
      margin: 12px 0;
    }

    :host([compact]) {
      margin: 0;
    }

    .board {
      display: flex;
      flex-direction: column;
      gap: 14px;
      width: 100%;
    }

    /* Site Pulse Overview Strip */
    .overview-wrap {
      border-radius: var(--ds-radius-card);
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
      box-shadow: var(--ds-shadow), var(--ds-inner-highlight);
      overflow: hidden;
    }

    .overview-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding: 10px 18px;
      border-bottom: 1px solid var(--ds-border-subtle);
      background: var(--ds-surface-subtle);
    }

    .overview-bar__title {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--ds-text-secondary);
    }

    .overview-strip {
      display: grid;
      grid-template-columns: repeat(4, minmax(0, 1fr));
    }

    .overview-cell {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 18px;
      min-width: 0;
      transition: background 0.15s ease;
    }

    .overview-cell + .overview-cell {
      border-left: 1px solid var(--ds-border);
    }

    .overview-cell:hover {
      background: var(--ds-surface-subtle);
    }

    .entity-link {
      color: inherit;
      text-decoration: none;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      min-width: 0;
      max-width: 100%;
    }

    .entity-link:hover {
      color: var(--ds-accent);
    }

    .entity-link__arrow {
      font-size: 11px;
      opacity: 0;
      transform: translateX(-2px);
      transition: opacity 0.15s ease, transform 0.15s ease;
      flex-shrink: 0;
    }

    .entity-link:hover .entity-link__arrow,
    .rank-item:hover .entity-link__arrow,
    .dist-item:hover .entity-link__arrow,
    .legend__item:hover .entity-link__arrow {
      opacity: 0.7;
      transform: translateX(0);
    }

    .overview-icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: var(--ds-surface-subtle);
      border: 1px solid var(--ds-border);
      color: var(--ds-accent);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .overview-icon svg {
      width: 15px;
      height: 15px;
    }

    .overview-body {
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }

    .overview-val {
      font-size: 19px;
      font-weight: 700;
      color: var(--ds-text-primary);
      line-height: 1.2;
      letter-spacing: -0.025em;
      font-variant-numeric: tabular-nums;
    }

    .overview-label {
      font-size: 11.5px;
      color: var(--ds-text-muted);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    /* States */
    .state-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      padding: 28px 20px;
      border-radius: 12px;
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
      font-size: 13px;
      color: var(--ds-text-muted);
      text-align: center;
    }

    .state-card--error {
      background: var(--ds-error-bg);
      border-color: var(--ds-error-border);
      color: var(--ds-error-text);
    }

    .skeleton-shell {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 18px 20px;
      border-radius: 12px;
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
    }

    .skeleton-top {
      display: flex;
      justify-content: space-between;
      gap: 12px;
    }

    .skeleton-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }

    /* Section Frame */
    .section {
      border-radius: var(--ds-radius-card);
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
      box-shadow: var(--ds-shadow), var(--ds-inner-highlight);
      overflow: hidden;
    }

    .section__header {
      padding: 13px 18px;
      border-bottom: 1px solid var(--ds-border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px 14px;
    }

    :host([compact]) .section__header {
      padding: 10px 14px;
    }

    .section__heading {
      display: flex;
      flex-direction: column;
      gap: 1px;
      min-width: 0;
    }

    .section__title {
      font-size: 13.5px;
      font-weight: 600;
      color: var(--ds-text-primary);
      letter-spacing: -0.015em;
      line-height: 1.4;
    }

    .section__subtitle {
      font-size: 11.5px;
      color: var(--ds-text-muted);
      line-height: 1.4;
    }

    .section__right {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 8px 12px;
    }

    .trend-dot-label {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      font-size: 11.5px;
      color: var(--ds-text-secondary);
    }

    .trend-dot {
      width: 7px;
      height: 7px;
      border-radius: 2px;
      flex-shrink: 0;
    }

    .stat-pill {
      display: inline-flex;
      align-items: baseline;
      gap: 4px;
      font-size: 11.5px;
      color: var(--ds-text-muted);
    }

    .stat-pill strong {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--ds-text-primary);
      font-variant-numeric: tabular-nums;
    }

    .section__body {
      padding: 16px 18px 18px;
    }

    :host([compact]) .section__body {
      padding: 12px 14px 14px;
    }

    /* Taxonomy Grid */
    .taxonomy-grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 16px;
    }

    .taxonomy-grid.is-single {
      grid-template-columns: minmax(0, 1fr);
    }

    .panel {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 16px;
      border-radius: 10px;
      border: 1px solid var(--ds-border);
      background: var(--ds-surface-subtle);
      min-width: 0;
    }

    .panel__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .panel__title {
      font-size: 13px;
      font-weight: 600;
      color: var(--ds-text-primary);
    }

    .panel__meta {
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }

    .panel__badge {
      font-size: 11.5px;
      color: var(--ds-text-muted);
      font-variant-numeric: tabular-nums;
    }

    /* Tags Donut */
    .donut-layout {
      display: flex;
      align-items: center;
      gap: 18px;
      flex: 1;
      min-height: 192px;
    }

    .donut-stage {
      position: relative;
      width: 158px;
      height: 158px;
      flex-shrink: 0;
    }

    .donut-stage canvas {
      width: 100% !important;
      height: 100% !important;
      display: block;
    }

    .donut-center {
      position: absolute;
      inset: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      pointer-events: none;
      text-align: center;
      padding: 18px;
    }

    .donut-total {
      font-size: 20px;
      font-weight: 700;
      color: var(--ds-text-primary);
      letter-spacing: -0.02em;
      line-height: 1.15;
      font-variant-numeric: tabular-nums;
    }

    .donut-caption {
      font-size: 11px;
      color: var(--ds-text-muted);
      margin-top: 2px;
      max-width: 88px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .donut-sub {
      font-size: 10.5px;
      color: var(--ds-accent);
      font-weight: 600;
      margin-top: 1px;
      font-variant-numeric: tabular-nums;
    }

    .legend {
      flex: 1;
      min-width: 0;
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .legend.has-focus .legend__item:not(.is-active):not(.is-pinned) {
      opacity: 0.45;
    }

    .legend__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 4px 7px;
      border-radius: 6px;
      font-size: 12.5px;
      color: var(--ds-text-secondary);
      cursor: pointer;
      user-select: none;
      transition: background 0.15s ease, color 0.15s ease, opacity 0.15s ease;
    }

    .legend__item:hover,
    .legend__item.is-active {
      background: var(--ds-surface-hover);
      color: var(--ds-text-primary);
    }

    .legend__item.is-pinned {
      background: var(--ds-accent-soft);
      color: var(--ds-text-primary);
    }

    .legend__left {
      display: flex;
      align-items: center;
      gap: 7px;
      min-width: 0;
    }

    .legend__dot {
      width: 8px;
      height: 8px;
      border-radius: 2px;
      flex-shrink: 0;
    }

    .legend__label {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-weight: 500;
    }

    .legend__right {
      display: inline-flex;
      align-items: baseline;
      gap: 6px;
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
    }

    .legend__count {
      font-weight: 600;
      color: var(--ds-text-primary);
      font-size: 12px;
    }

    .legend__pct {
      font-size: 11px;
      color: var(--ds-text-muted);
      min-width: 32px;
      text-align: right;
    }

    .legend__more {
      padding: 4px 7px 0;
      font-size: 11.5px;
      color: var(--ds-text-muted);
    }

    /* Categories Distribution Bars */
    .dist-list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .dist-item {
      display: flex;
      flex-direction: column;
      gap: 5px;
      padding: 5px 7px;
      margin: 0 -7px;
      border-radius: 7px;
      transition: background 0.15s ease;
    }

    .dist-item:hover {
      background: var(--ds-surface-hover);
    }

    .dist-item:hover .dist-fill {
      opacity: 1 !important;
    }

    .dist-meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-size: 12.5px;
    }

    .dist-name {
      color: var(--ds-text-primary);
      font-weight: 500;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .dist-values {
      display: inline-flex;
      align-items: baseline;
      gap: 6px;
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
    }

    .dist-count {
      font-size: 12px;
      font-weight: 600;
      color: var(--ds-text-primary);
    }

    .dist-pct {
      font-size: 11px;
      color: var(--ds-text-muted);
      min-width: 34px;
      text-align: right;
    }

    .dist-track {
      width: 100%;
      height: 6px;
      border-radius: 999px;
      background: var(--ds-bar-track);
      overflow: hidden;
    }

    .dist-fill {
      height: 100%;
      border-radius: 999px;
      background: var(--ds-bar-fill);
      transition: width 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease;
    }

    .panel__footer {
      margin-top: auto;
      padding-top: 8px;
      border-top: 1px solid var(--ds-border-subtle);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 11.5px;
      color: var(--ds-text-muted);
    }

    .text-link-btn {
      appearance: none;
      border: none;
      background: transparent;
      padding: 0;
      font-family: inherit;
      font-size: 11.5px;
      font-weight: 500;
      color: var(--ds-accent);
      cursor: pointer;
    }

    .text-link-btn:hover {
      text-decoration: underline;
    }

    /* Heatmap Telemetry Ribbon (lightweight inline metrics) */
    .heatmap-stats-strip {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 6px 0;
      padding: 8px 18px;
      background: var(--ds-surface-subtle);
      border-bottom: 1px solid var(--ds-border-subtle);
    }

    .heatmap-stat-cell {
      position: relative;
      display: inline-flex;
      align-items: baseline;
      gap: 4px;
      padding: 0 12px;
      font-size: 11.5px;
      color: var(--ds-text-muted);
    }

    .heatmap-stat-cell:first-child {
      padding-left: 0;
    }

    .heatmap-stat-cell + .heatmap-stat-cell::before {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      width: 1px;
      height: 11px;
      background: var(--ds-border);
      transform: translateY(-50%);
    }

    .heatmap-stat-cell strong {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--ds-text-primary);
      font-variant-numeric: tabular-nums;
    }

    .heatmap-scroll {
      width: 100%;
      overflow-x: auto;
      overflow-y: visible;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
      scrollbar-color: var(--ds-scrollbar-thumb) transparent;
      padding-bottom: 4px;
    }

    .heatmap-scroll::-webkit-scrollbar {
      height: 5px;
    }

    .heatmap-scroll::-webkit-scrollbar-thumb {
      background: var(--ds-scrollbar-thumb);
      border-radius: 999px;
    }

    .heatmap-card {
      position: relative;
      width: 100%;
      min-width: max-content;
    }

    .heatmap {
      display: grid;
      grid-template-columns: auto 1fr;
      grid-template-rows: auto 1fr auto;
      gap: 6px 8px;
      /* Reserve room for the hover scale so the rightmost/topmost cells are not
         clipped and no extra scrollbar is created by the enlarged cell. */
      padding: 6px;
    }

    .heatmap__months {
      grid-column: 2;
      grid-row: 1;
      display: grid;
      column-gap: var(--hm-gap, 3px);
      font-size: 11px;
      color: var(--ds-text-muted);
      line-height: 1.2;
    }

    .heatmap__month {
      text-align: left;
      white-space: nowrap;
    }

    .heatmap__weekdays {
      grid-column: 1;
      grid-row: 2;
      display: grid;
      grid-template-rows: repeat(7, 1fr);
      row-gap: var(--hm-gap, 3px);
      padding-right: 4px;
      font-size: 10.5px;
      color: var(--ds-text-muted);
      align-items: center;
      justify-items: end;
    }

    .heatmap__weekday {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    .heatmap__weekday.is-hidden {
      visibility: hidden;
    }

    .heatmap__grid {
      grid-column: 2;
      grid-row: 2;
      display: grid;
      column-gap: var(--hm-gap, 3px);
    }

    .heatmap__column {
      display: grid;
      grid-template-rows: repeat(7, auto);
      row-gap: var(--hm-gap, 3px);
    }

    .heatmap__day {
      width: 100%;
      aspect-ratio: 1;
      border-radius: 2.5px;
      background: var(--ds-heatmap-l0);
      box-shadow: inset 0 0 0 1px var(--ds-heatmap-ring);
      transition: transform 0.12s ease, box-shadow 0.12s ease;
      cursor: pointer;
      outline: none;
    }

    .heatmap__day[data-level='0'] { background: var(--ds-heatmap-l0); }
    .heatmap__day[data-level='1'] { background: var(--ds-heatmap-l1); }
    .heatmap__day[data-level='2'] { background: var(--ds-heatmap-l2); }
    .heatmap__day[data-level='3'] { background: var(--ds-heatmap-l3); }
    .heatmap__day[data-level='4'] { background: var(--ds-heatmap-l4); }

    .heatmap__day:not(.is-outside):hover,
    .heatmap__day:not(.is-outside):focus-visible {
      transform: scale(1.2);
      box-shadow: 0 0 0 1.5px var(--ds-heatmap-hover-ring);
      z-index: 2;
    }

    .heatmap__day.is-outside {
      background: transparent;
      box-shadow: none;
      cursor: default;
      pointer-events: none;
    }

    .heatmap__footer {
      grid-column: 2;
      grid-row: 3;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-top: 6px;
    }

    .heatmap__range {
      font-size: 11.5px;
      color: var(--ds-text-muted);
      font-variant-numeric: tabular-nums;
    }

    .heatmap__legend {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 11.5px;
      color: var(--ds-text-muted);
      margin-left: auto;
    }

    .heatmap__legend-dot {
      width: 10px;
      height: 10px;
      border-radius: 2px;
      box-shadow: inset 0 0 0 1px var(--ds-heatmap-ring);
    }

    .heatmap__legend-dot[data-level='0'] { background: var(--ds-heatmap-l0); }
    .heatmap__legend-dot[data-level='1'] { background: var(--ds-heatmap-l1); }
    .heatmap__legend-dot[data-level='2'] { background: var(--ds-heatmap-l2); }
    .heatmap__legend-dot[data-level='3'] { background: var(--ds-heatmap-l3); }
    .heatmap__legend-dot[data-level='4'] { background: var(--ds-heatmap-l4); }

    .heatmap__tooltip {
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      flex-direction: column;
      gap: 2px;
      background: var(--ds-tooltip-bg);
      border: 1px solid var(--ds-tooltip-border);
      border-radius: 8px;
      padding: 7px 11px;
      font-size: 12px;
      line-height: 1.45;
      color: var(--ds-tooltip-text);
      box-shadow: 0 10px 24px rgba(0, 0, 0, 0.25);
      pointer-events: none;
      white-space: nowrap;
      z-index: 30;
    }

    .heatmap__tooltip::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: -5px;
      width: 8px;
      height: 8px;
      background: var(--ds-tooltip-bg);
      border-right: 1px solid var(--ds-tooltip-border);
      border-bottom: 1px solid var(--ds-tooltip-border);
      transform: translateX(-50%) rotate(45deg);
    }

    .heatmap__tooltip.is-below::after {
      bottom: auto;
      top: -5px;
      transform: translateX(-50%) rotate(225deg);
    }

    .heatmap__tooltip strong {
      font-weight: 600;
      font-variant-numeric: tabular-nums;
    }

    .heatmap__tooltip span {
      opacity: 0.85;
    }

    /* Bar Chart Canvas */
    .canvas-wrap {
      position: relative;
      width: 100%;
    }

    .canvas-wrap canvas {
      width: 100% !important;
      height: 100% !important;
      display: block;
    }

    /* Ranked Leaderboard */
    .rank-list {
      margin: 0;
      padding: 0;
      list-style: none;
      display: flex;
      flex-direction: column;
    }

    .rank-item {
      display: grid;
      grid-template-columns: 28px minmax(0, 1fr) auto;
      align-items: center;
      gap: 12px;
      padding: 10px 8px;
      border-bottom: 1px solid var(--ds-border-subtle);
      border-radius: 7px;
      transition: background 0.15s ease;
    }

    .rank-item:last-child {
      border-bottom: none;
    }

    .rank-item:hover {
      background: var(--ds-surface-hover);
    }

    .rank-item:hover .rank-fill {
      opacity: 1 !important;
    }

    .rank-num {
      width: 24px;
      height: 24px;
      border-radius: 6px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 11.5px;
      font-weight: 600;
      font-variant-numeric: tabular-nums;
      color: var(--ds-text-muted);
      background: var(--ds-surface-subtle);
      border: 1px solid var(--ds-border);
    }

    .rank-num.is-top {
      color: var(--ds-accent);
      background: var(--ds-accent-soft);
      border-color: var(--ds-accent-border);
    }

    .rank-num.is-first {
      color: #ffffff;
      background: var(--ds-accent);
      border-color: var(--ds-accent);
    }

    .rank-main {
      display: flex;
      flex-direction: column;
      gap: 5px;
      min-width: 0;
    }

    .rank-title {
      font-size: 13px;
      font-weight: 500;
      color: var(--ds-text-primary);
      line-height: 1.4;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .rank-track {
      width: 100%;
      height: 4px;
      border-radius: 999px;
      background: var(--ds-bar-track);
      overflow: hidden;
    }

    .rank-fill {
      height: 100%;
      border-radius: 999px;
      background: var(--ds-bar-fill);
      transition: width 0.45s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.15s ease;
    }

    .rank-value {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      flex-shrink: 0;
      font-variant-numeric: tabular-nums;
    }

    .rank-views {
      font-size: 13px;
      font-weight: 600;
      color: var(--ds-text-primary);
      line-height: 1.3;
    }

    .rank-unit {
      font-size: 11px;
      color: var(--ds-text-muted);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .board {
        gap: 14px;
      }

      .overview-strip {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      .overview-cell {
        padding: 12px 14px;
      }

      .overview-cell:nth-child(3) {
        border-left: none;
      }

      .overview-cell:nth-child(n + 3) {
        border-top: 1px solid var(--ds-border);
      }

      .section__header {
        padding: 12px 16px;
      }

      .section__body {
        padding: 14px 16px 16px;
      }

      .heatmap-stat-cell {
        padding: 8px 12px;
      }

      .taxonomy-grid,
      .skeleton-grid {
        grid-template-columns: minmax(0, 1fr);
      }

      .donut-layout {
        flex-direction: column;
        align-items: stretch;
        gap: 14px;
      }

      .donut-stage {
        margin: 0 auto;
      }

      .rank-item {
        gap: 10px;
        padding: 9px 4px;
      }

      .rank-title {
        white-space: normal;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      .dist-fill,
      .rank-fill,
      .heatmap__day {
        transition: none;
      }
    }
  `
];
