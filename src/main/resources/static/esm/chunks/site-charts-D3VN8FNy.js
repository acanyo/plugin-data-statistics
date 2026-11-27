import { i as at, a as st, E as k, x as d, b as J, n as et, r as N, t as nt } from "./lit-DwgqLyPI.js";
import { s as it, T as ot, o as rt, f as lt } from "./tokens-Dvt0CGho.js";
import { l as dt } from "./chart-loader-Cl6oPrA-.js";
import { i as Q, h as S, f as tt, a as H, b as j, c as B } from "./utils-DiE0_EyB.js";
const ct = [
  it,
  at`
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
      grid-template-rows: repeat(7, var(--hm-cell, 12px));
      row-gap: var(--hm-gap, 3px);
      padding-right: 4px;
      font-size: 10.5px;
      color: var(--ds-text-muted);
      align-items: center;
      justify-items: end;
    }

    .heatmap__weekday {
      height: var(--hm-cell, 12px);
      line-height: var(--hm-cell, 12px);
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
      grid-template-rows: repeat(7, var(--hm-cell, 12px));
      row-gap: var(--hm-gap, 3px);
    }

    .heatmap__day {
      width: var(--hm-cell, 12px);
      height: var(--hm-cell, 12px);
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
var pt = Object.defineProperty, ht = Object.getOwnPropertyDescriptor, M = (t, e, i, s) => {
  for (var n = s > 1 ? void 0 : s ? ht(e, i) : e, c = t.length - 1, a; c >= 0; c--)
    (a = t[c]) && (n = (s ? a(e, i, n) : a(n)) || n);
  return s && n && pt(e, i, n), n;
};
const W = 1440 * 60 * 1e3, mt = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"], ut = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"], gt = [
  "#2563eb",
  "#0ea5e9",
  "#10b981",
  "#8b5cf6",
  "#f59e0b",
  "#ec4899",
  "#14b8a6",
  "#6366f1",
  "#64748b",
  "#06b6d4"
], vt = [
  "#60a5fa",
  "#38bdf8",
  "#34d399",
  "#a78bfa",
  "#fbbf24",
  "#f472b6",
  "#2dd4bf",
  "#818cf8",
  "#94a3b8",
  "#22d3ee"
], U = {
  article: J`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  eye: J`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  comment: J`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
  clock: J`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  download: J`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="13" height="13"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`
};
let T = class extends st {
  constructor() {
    super(), this.dataTypes = "overview,tags,categories,articles,monthlyTrend,comments,topArticles", this.accentColor = "", this.compact = !1, this.loading = !0, this.exporting = !1, this.error = null, this.chartData = null, this.activeTagIndex = null, this.pinnedTagIndex = null, this.categoriesExpanded = !1, this.heatmapFilter = "all", this.heatmapCellPx = 12, this.tooltip = {
      visible: !1,
      below: !1,
      x: -9999,
      y: -9999,
      dateLabel: "",
      detail: ""
    }, this.tagsChart = null, this.monthlyChart = null, this.commentsChart = null, this.chartMountSeq = 0, this.observedHeatmapEl = null, this.themeController = new ot(this, () => {
      this.syncChartThemes();
    });
  }
  connectedCallback() {
    super.connectedCallback(), this.applyAccentOverride(), this.stopVisibility = rt(this, () => {
      this.loadData();
    });
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this.stopVisibility?.(), this.stopVisibility = void 0, this.chartMountSeq += 1, this.destroyCharts(), this.heatmapResizeObserver?.disconnect(), this.heatmapResizeObserver = void 0, this.observedHeatmapEl = null;
  }
  updated(t) {
    t.has("accentColor") && (this.applyAccentOverride(), this.syncChartThemes()), (t.has("chartData") || t.has("dataTypes") || t.has("loading")) && !this.loading && this.chartData && (this.applyAccentOverride(), this.mountCharts(), this.attachHeatmapObserver());
  }
  applyAccentOverride() {
    const t = Q(this.accentColor) ? this.accentColor.trim() : Q(this.chartData?.accentColor || "") ? this.chartData.accentColor.trim() : "";
    t && t.toLowerCase() !== "#2563eb" && this.style.setProperty("--ds-custom-accent", t);
  }
  resolveAccentHex() {
    if (Q(this.accentColor)) return this.accentColor.trim();
    const t = getComputedStyle(this).getPropertyValue("--ds-accent").trim();
    return Q(t) ? t : this.themeController.mode === "dark" ? "#60a5fa" : "#2563eb";
  }
  get enabledTypes() {
    const t = (this.dataTypes || "").trim();
    return t ? t.split(",").map((e) => e.trim()).filter(Boolean) : ["overview", "tags", "categories", "articles", "monthlyTrend", "comments", "topArticles"];
  }
  get palette() {
    const t = this.themeController.mode === "dark" ? vt : gt;
    return [this.resolveAccentHex(), ...t.slice(1)];
  }
  get normalizedTags() {
    return (this.chartData?.tags || []).map((e) => ({
      name: e.name ?? e.spec?.displayName ?? e.metadata?.name ?? "未命名标签",
      count: Number(e.count ?? e.total ?? e.status?.visiblePostCount ?? 0),
      permalink: e.permalink ?? e.status?.permalink
    })).filter((e) => e.count > 0).sort((e, i) => i.count - e.count);
  }
  get normalizedCategories() {
    return (this.chartData?.categories || []).map((e) => ({
      name: e.name ?? e.spec?.displayName ?? e.metadata?.name ?? "未命名分类",
      count: Number(e.total ?? e.count ?? e.status?.visiblePostCount ?? 0),
      permalink: e.permalink ?? e.status?.permalink
    })).filter((e) => e.count > 0).sort((e, i) => i.count - e.count);
  }
  get normalizedComments() {
    return (this.chartData?.comments || []).map((e) => ({
      name: e.username || e.name || e.email || "匿名访客",
      count: Number(e.count ?? 0)
    })).filter((e) => e.count > 0).sort((e, i) => i.count - e.count).slice(0, 10);
  }
  get normalizedTopArticles() {
    return (this.chartData?.top10Articles || []).map((e) => ({
      name: e.name || "未命名文章",
      views: Number(e.views ?? e.count ?? 0),
      permalink: e.permalink
    })).filter((e) => e.views > 0).sort((e, i) => i.views - e.views).slice(0, 10);
  }
  get normalizedMonthlyTrend() {
    if (Array.isArray(this.chartData?.monthlyTrend) && this.chartData.monthlyTrend.length > 0)
      return this.chartData.monthlyTrend;
    const t = /* @__PURE__ */ new Map(), e = /* @__PURE__ */ new Date(), i = [];
    for (let s = 11; s >= 0; s--) {
      const n = new Date(e.getFullYear(), e.getMonth() - s, 1), c = `${n.getFullYear()}-${String(n.getMonth() + 1).padStart(2, "0")}`;
      i.push(c), t.set(c, { articleCount: 0, momentCount: 0 });
    }
    return (this.chartData?.articles || []).forEach((s) => {
      const n = s.date || s.name;
      if (!n) return;
      const c = new Date(n);
      if (Number.isNaN(c.valueOf())) return;
      const a = `${c.getFullYear()}-${String(c.getMonth() + 1).padStart(2, "0")}`, y = t.get(a);
      y && (y.articleCount += Number(s.articleTotal ?? s.total ?? s.count ?? 0), y.momentCount += Number(s.momentTotal ?? 0));
    }), i.map((s) => {
      const n = t.get(s);
      return { month: s, articleCount: n.articleCount, momentCount: n.momentCount, total: n.articleCount + n.momentCount };
    });
  }
  async loadData() {
    this.loading = !0, this.error = null;
    try {
      this.chartData = await lt();
    } catch (t) {
      this.error = t instanceof Error ? t.message : "请求失败";
    } finally {
      this.loading = !1;
    }
  }
  destroyCharts() {
    this.tagsChart?.destroy(), this.tagsChart = null, this.monthlyChart?.destroy(), this.monthlyChart = null, this.commentsChart?.destroy(), this.commentsChart = null;
  }
  getChartColors() {
    const t = this.themeController.mode === "dark", e = this.resolveAccentHex();
    return {
      dark: t,
      accent: e,
      accentSoft: S(e, t ? 0.22 : 0.14),
      palette: this.palette,
      surfaceSubtle: t ? "#14171f" : "#fafafa",
      grid: t ? "rgba(255, 255, 255, 0.07)" : "rgba(113, 113, 122, 0.14)",
      tick: t ? "#a1a1aa" : "#71717a",
      textPrimary: t ? "#f4f4f5" : "#09090b",
      tooltipBg: t ? "#222633" : "#18181b",
      tooltipText: t ? "#f4f4f5" : "#fafafa",
      tooltipBorder: t ? "rgba(255, 255, 255, 0.12)" : "rgba(255, 255, 255, 0.08)"
    };
  }
  async mountCharts() {
    const t = ++this.chartMountSeq;
    this.destroyCharts();
    const e = this.renderRoot.querySelector("#tags-canvas"), i = this.renderRoot.querySelector("#monthly-trend-canvas"), s = this.renderRoot.querySelector("#comments-canvas"), n = this.normalizedTags, c = this.normalizedMonthlyTrend, a = this.normalizedComments;
    if (!(!!(e && n.length > 0) || !!(i && c.length > 0) || !!(s && a.length > 0))) return;
    const C = await dt();
    if (t !== this.chartMountSeq || !this.isConnected) return;
    const l = this.getChartColors();
    if (e && n.length > 0) {
      const w = n.reduce((p, o) => p + o.count, 0);
      this.tagsChart = new C(e, {
        type: "doughnut",
        data: {
          labels: n.map((p) => p.name),
          datasets: [
            {
              data: n.map((p) => p.count),
              backgroundColor: n.map((p, o) => l.palette[o % l.palette.length]),
              borderWidth: 2,
              borderColor: l.surfaceSubtle,
              hoverOffset: 4
            }
          ]
        },
        options: {
          responsive: !0,
          maintainAspectRatio: !1,
          cutout: "68%",
          animation: { duration: 520, easing: "easeOutCubic" },
          plugins: {
            tooltip: {
              enabled: !0,
              backgroundColor: l.tooltipBg,
              titleColor: l.tooltipText,
              bodyColor: l.tooltipText,
              borderColor: l.tooltipBorder,
              borderWidth: 1,
              padding: 10,
              cornerRadius: 8,
              displayColors: !0,
              callbacks: {
                label: (p) => {
                  const o = Number(p.raw) || 0;
                  return ` ${p.label}：${o} 篇 (${tt(o, w)})`;
                }
              }
            }
          },
          onHover: (p, o) => {
            e.style.cursor = o.length > 0 ? "pointer" : "default", this.activeTagIndex = o.length > 0 ? o[0].index : null;
          },
          onClick: (p, o) => {
            if (o.length > 0) {
              const m = o[0].index;
              this.pinnedTagIndex = this.pinnedTagIndex === m ? null : m;
            } else
              this.pinnedTagIndex = null;
          }
        }
      });
    }
    if (i && c.length > 0) {
      const w = !!this.chartData?.enableMomentHeatmap && c.some((o) => o.momentCount > 0), p = [
        {
          label: "文章发布",
          data: c.map((o) => o.articleCount),
          borderColor: l.accent,
          backgroundColor: l.accentSoft,
          borderWidth: 2,
          fill: !0,
          tension: 0.35,
          pointRadius: 3,
          pointHoverRadius: 5,
          pointBackgroundColor: l.accent
        }
      ];
      if (w) {
        const o = l.dark ? "#34d399" : "#10b981";
        p.push({
          label: "瞬间发布",
          data: c.map((m) => m.momentCount),
          borderColor: o,
          backgroundColor: S(o, l.dark ? 0.16 : 0.1),
          borderWidth: 1.8,
          fill: !0,
          tension: 0.35,
          pointRadius: 2.5,
          pointHoverRadius: 4.5,
          pointBackgroundColor: o
        });
      }
      this.monthlyChart = new C(i, {
        type: "line",
        data: {
          labels: c.map((o) => `${Number(o.month.slice(5, 7))}月`),
          datasets: p
        },
        options: {
          responsive: !0,
          maintainAspectRatio: !1,
          animation: { duration: 480, easing: "easeOutCubic" },
          interaction: { mode: "index", intersect: !1 },
          scales: {
            x: {
              border: { display: !1 },
              grid: { display: !1 },
              ticks: { color: l.tick, font: { size: 11.5 } }
            },
            y: {
              beginAtZero: !0,
              border: { display: !1 },
              grid: { color: l.grid, drawTicks: !1 },
              ticks: { precision: 0, color: l.tick, maxTicksLimit: 5, font: { size: 11.5 } }
            }
          },
          plugins: {
            tooltip: {
              backgroundColor: l.tooltipBg,
              titleColor: l.tooltipText,
              bodyColor: l.tooltipText,
              borderColor: l.tooltipBorder,
              borderWidth: 1,
              cornerRadius: 8,
              padding: 10,
              callbacks: {
                title: (o) => {
                  const m = o[0]?.dataIndex ?? 0;
                  return c[m]?.month || "";
                },
                label: (o) => ` ${o.dataset.label}：${o.raw} 条`
              }
            }
          }
        }
      });
    }
    if (s && a.length > 0) {
      const w = (o) => a.map((m, x) => x === 0 ? o : x < 3 ? S(o, 0.72) : S(o, 0.35)), p = {
        id: "dsBarValueLabels",
        afterDatasetsDraw: (o) => {
          const { ctx: m } = o, x = o.getDatasetMeta(0), V = this.getChartColors();
          m.save(), m.font = "600 11.5px -apple-system, BlinkMacSystemFont, Inter, sans-serif", m.textBaseline = "middle", m.textAlign = "left", x.data.forEach((R, h) => {
            const $ = a[h]?.count;
            $ != null && (m.fillStyle = h < 3 ? V.textPrimary : V.tick, m.fillText(String($), R.x + 8, R.y));
          }), m.restore();
        }
      };
      this.commentsChart = new C(s, {
        type: "bar",
        plugins: [p],
        data: {
          labels: a.map((o) => o.name.length > 14 ? `${o.name.slice(0, 14)}…` : o.name),
          datasets: [
            {
              label: "评论数",
              data: a.map((o) => o.count),
              backgroundColor: w(l.accent),
              hoverBackgroundColor: l.accent,
              borderRadius: 5,
              borderSkipped: !1,
              barThickness: 18,
              maxBarThickness: 22
            }
          ]
        },
        options: {
          indexAxis: "y",
          responsive: !0,
          maintainAspectRatio: !1,
          layout: { padding: { right: 34 } },
          animation: { duration: 500, easing: "easeOutCubic" },
          interaction: { mode: "index", axis: "y", intersect: !1 },
          scales: {
            x: {
              beginAtZero: !0,
              border: { display: !1 },
              grid: { color: l.grid, drawTicks: !1 },
              ticks: { precision: 0, color: l.tick, padding: 6, font: { size: 11.5 } }
            },
            y: {
              border: { display: !1 },
              grid: { display: !1 },
              ticks: { color: l.textPrimary, padding: 8, font: { size: 12, weight: "bold" } }
            }
          },
          plugins: {
            tooltip: {
              backgroundColor: l.tooltipBg,
              titleColor: l.tooltipText,
              bodyColor: l.tooltipText,
              borderColor: l.tooltipBorder,
              borderWidth: 1,
              cornerRadius: 8,
              padding: 10,
              displayColors: !1,
              callbacks: {
                title: (o) => a[o[0]?.dataIndex ?? 0]?.name || "",
                label: (o) => `评论 ${H(Number(o.raw) || 0)} 条`
              }
            }
          },
          onHover: (o, m) => {
            s.style.cursor = m.length > 0 ? "pointer" : "default";
          }
        }
      });
    }
  }
  syncChartThemes() {
    const t = this.getChartColors();
    if (this.tagsChart) {
      const e = this.normalizedTags, i = this.tagsChart.data.datasets[0];
      i.backgroundColor = e.map((n, c) => t.palette[c % t.palette.length]), i.borderColor = t.surfaceSubtle;
      const s = this.tagsChart.options.plugins?.tooltip;
      s && (s.backgroundColor = t.tooltipBg, s.titleColor = t.tooltipText, s.bodyColor = t.tooltipText, s.borderColor = t.tooltipBorder), this.tagsChart.update("none");
    }
    if (this.monthlyChart) {
      const e = this.monthlyChart.data.datasets[0];
      e && (e.borderColor = t.accent, e.backgroundColor = t.accentSoft);
      const i = this.monthlyChart.options.scales?.x, s = this.monthlyChart.options.scales?.y;
      i?.ticks && (i.ticks.color = t.tick), s?.ticks && (s.ticks.color = t.tick), s?.grid && (s.grid.color = t.grid), this.monthlyChart.update("none");
    }
    if (this.commentsChart) {
      const e = this.normalizedComments, i = this.commentsChart.data.datasets[0];
      i.backgroundColor = e.map((c, a) => a === 0 ? t.accent : a < 3 ? S(t.accent, 0.72) : S(t.accent, 0.35)), i.hoverBackgroundColor = t.accent;
      const s = this.commentsChart.options.scales?.x, n = this.commentsChart.options.scales?.y;
      s?.grid && (s.grid.color = t.grid), s?.ticks && (s.ticks.color = t.tick), n?.ticks && (n.ticks.color = t.textPrimary), this.commentsChart.update("none");
    }
  }
  attachHeatmapObserver() {
    const t = this.renderRoot.querySelector(".heatmap-scroll");
    if (!t || t === this.observedHeatmapEl) return;
    this.heatmapResizeObserver?.disconnect(), this.observedHeatmapEl = t;
    const e = () => {
      const i = t.getBoundingClientRect();
      if (i.width <= 0) return;
      if (window.innerWidth <= 768) {
        this.heatmapCellPx = 11;
        return;
      }
      const s = 53, n = 24, c = 3, a = i.width - n - 8, y = Math.floor((a - (s - 1) * c) / s);
      this.heatmapCellPx = Math.max(9, Math.min(14, y));
    };
    this.heatmapResizeObserver = new ResizeObserver(e), this.heatmapResizeObserver.observe(t), e();
  }
  /* ========================================================================
     High-DPI 2x Canvas PNG Export (Zero External Dependencies)
     ======================================================================== */
  exportSummaryPng() {
    if (!(!this.chartData || this.exporting)) {
      this.exporting = !0;
      try {
        const t = this.themeController.mode === "dark", e = this.resolveAccentHex(), i = 2, s = 920, n = 650, c = document.createElement("canvas");
        c.width = s * i, c.height = n * i;
        const a = c.getContext("2d");
        if (!a) return;
        a.scale(i, i);
        const y = t ? "#090a0e" : "#f8fafc", C = t ? "#0e1015" : "#ffffff", l = t ? "#14171f" : "#fafafa", w = t ? "rgba(255,255,255,0.1)" : "#e4e4e7", p = t ? "#f4f4f5" : "#09090b", o = t ? "#a1a1aa" : "#71717a", m = "-apple-system, BlinkMacSystemFont, 'Inter', 'PingFang SC', sans-serif", x = (u, f, _, A, K) => {
          a.beginPath(), a.roundRect(u, f, _, A, K);
        };
        a.fillStyle = y, a.fillRect(0, 0, s, n), x(24, 24, s - 48, n - 48, 16), a.fillStyle = C, a.fill(), a.strokeStyle = w, a.lineWidth = 1, a.stroke();
        const V = document.title ? document.title.slice(0, 32) : "站点数据统计";
        a.fillStyle = p, a.font = `700 18px ${m}`, a.fillText(V, 52, 66), a.fillStyle = o, a.font = `400 12px ${m}`, a.fillText(`数据快照 · ${j(/* @__PURE__ */ new Date())}`, 52, 86), x(s - 170, 48, 118, 26, 13), a.fillStyle = S(e, t ? 0.2 : 0.1), a.fill(), a.fillStyle = e, a.font = `600 11.5px ${m}`, a.textAlign = "center", a.fillText("Halo Data Stats", s - 111, 65), a.textAlign = "left";
        const R = this.chartData.summary, h = [
          { label: "已发布文章", value: B(R?.totalPosts ?? this.normalizedTopArticles.length) },
          { label: "全站总阅读", value: B(R?.totalViews ?? this.normalizedTopArticles.reduce((u, f) => u + f.views, 0)) },
          { label: "累计评论", value: B(R?.totalComments ?? this.normalizedComments.reduce((u, f) => u + f.count, 0)) },
          { label: "已运行天数", value: `${R?.runningDays ?? 0} 天` }
        ], $ = (s - 104 - 36) / 4;
        h.forEach((u, f) => {
          const _ = 52 + f * ($ + 12);
          x(_, 108, $, 74, 10), a.fillStyle = l, a.fill(), a.strokeStyle = w, a.stroke(), a.fillStyle = o, a.font = `500 11.5px ${m}`, a.fillText(u.label, _ + 16, 133), a.fillStyle = p, a.font = `700 22px ${m}`, a.fillText(u.value, _ + 16, 164);
        }), x(52, 200, s - 104, 156, 10), a.fillStyle = l, a.fill(), a.strokeStyle = w, a.stroke(), a.fillStyle = p, a.font = `600 13px ${m}`, a.fillText("近一年创作热力图", 70, 226);
        const P = /* @__PURE__ */ new Map();
        (this.chartData.articles || []).forEach((u) => {
          const f = u.date || u.name;
          if (!f) return;
          const _ = new Date(f);
          if (Number.isNaN(_.valueOf())) return;
          const A = j(_), K = u.total != null ? Number(u.total) : Number(u.articleTotal ?? u.count ?? 0);
          P.set(A, (P.get(A) || 0) + K);
        });
        const D = Math.max(...Array.from(P.values()), 1), Z = t ? ["rgba(255,255,255,0.06)", S(e, 0.28), S(e, 0.5), S(e, 0.74), e] : ["#f1f5f9", S(e, 0.2), S(e, 0.45), S(e, 0.72), e], I = /* @__PURE__ */ new Date();
        I.setHours(0, 0, 0, 0);
        const O = new Date(I.getTime() - 364 * W), X = new Date(O);
        X.setDate(X.getDate() - (X.getDay() + 6) % 7);
        const q = 11, G = 3.5;
        for (let u = 0; u < 53; u++)
          for (let f = 0; f < 7; f++) {
            const _ = new Date(X.getTime() + (u * 7 + f) * W);
            if (_ < O || _ > I) continue;
            const A = P.get(j(_)) || 0, K = A === 0 ? 0 : Math.min(4, Math.ceil(A / D * 4));
            a.fillStyle = Z[K], x(70 + u * (q + G), 244 + f * (q + G), q, q, 2.5), a.fill();
          }
        const r = 374, g = 224, v = 340, b = 52 + v + 16, F = s - 104 - v - 16;
        x(52, r, v, g, 10), a.fillStyle = l, a.fill(), a.strokeStyle = w, a.stroke(), a.fillStyle = p, a.font = `600 13px ${m}`, a.fillText("分类分布 Top 5", 70, r + 28);
        const z = this.normalizedCategories.slice(0, 5), E = Math.max(...z.map((u) => u.count), 1);
        z.forEach((u, f) => {
          const _ = r + 58 + f * 32;
          a.fillStyle = p, a.font = `500 12px ${m}`, a.fillText(u.name.slice(0, 14), 70, _), a.fillStyle = o, a.textAlign = "right", a.fillText(`${u.count} 篇`, 52 + v - 18, _), a.textAlign = "left";
          const A = v - 36;
          x(70, _ + 7, A, 5, 2.5), a.fillStyle = t ? "rgba(255,255,255,0.07)" : "#e2e8f0", a.fill(), x(70, _ + 7, Math.max(8, u.count / E * A), 5, 2.5), a.fillStyle = S(e, Math.max(0.45, 1 - f * 0.12)), a.fill();
        }), x(b, r, F, g, 10), a.fillStyle = l, a.fill(), a.strokeStyle = w, a.stroke(), a.fillStyle = p, a.font = `600 13px ${m}`, a.fillText("热门文章 Top 5", b + 18, r + 28), this.normalizedTopArticles.slice(0, 5).forEach((u, f) => {
          const _ = r + 58 + f * 32;
          x(b + 18, _ - 12, 20, 18, 5), a.fillStyle = f === 0 ? e : S(e, t ? 0.2 : 0.1), a.fill(), a.fillStyle = f === 0 ? "#ffffff" : e, a.font = `600 10.5px ${m}`, a.textAlign = "center", a.fillText(`0${f + 1}`, b + 28, _ + 1), a.textAlign = "left", a.fillStyle = p, a.font = `500 12px ${m}`;
          const A = u.name.length > 24 ? `${u.name.slice(0, 24)}…` : u.name;
          a.fillText(A, b + 46, _ + 1), a.fillStyle = o, a.textAlign = "right", a.fillText(B(u.views), b + F - 18, _ + 1), a.textAlign = "left";
        });
        const L = document.createElement("a");
        L.download = `site-statistics-${j(/* @__PURE__ */ new Date())}.png`, L.href = c.toDataURL("image/png"), L.click();
      } finally {
        this.exporting = !1;
      }
    }
  }
  handleLegendHover(t) {
    if (this.activeTagIndex = t, !this.tagsChart) return;
    const e = t ?? this.pinnedTagIndex;
    this.tagsChart.setActiveElements(e !== null ? [{ datasetIndex: 0, index: e }] : []), this.tagsChart.update("none");
  }
  handleLegendClick(t) {
    this.pinnedTagIndex = this.pinnedTagIndex === t ? null : t, this.tagsChart && (this.tagsChart.setActiveElements(
      this.pinnedTagIndex !== null ? [{ datasetIndex: 0, index: this.pinnedTagIndex }] : []
    ), this.tagsChart.update("none"));
  }
  clearPinnedTag() {
    this.pinnedTagIndex = null, this.activeTagIndex = null, this.tagsChart && (this.tagsChart.setActiveElements([]), this.tagsChart.update("none"));
  }
  handleHeatmapCellEnter(t, e, i, s, n) {
    const c = t.currentTarget, a = this.renderRoot.querySelector(".heatmap-card");
    if (!a || !c) return;
    let y = "无发布记录";
    this.heatmapFilter === "articles" ? y = s.articleTotal > 0 ? `${s.articleTotal} 篇文章` : "无文章发布" : this.heatmapFilter === "moments" ? y = s.momentTotal > 0 ? `${s.momentTotal} 条瞬间` : "无瞬间发布" : n ? s.articleTotal > 0 && s.momentTotal > 0 ? y = `${s.articleTotal} 篇文章 · ${s.momentTotal} 条瞬间` : s.articleTotal > 0 ? y = `${s.articleTotal} 篇文章` : s.momentTotal > 0 && (y = `${s.momentTotal} 条瞬间`) : s.articleTotal > 0 && (y = `${s.articleTotal} 篇文章`);
    const C = a.getBoundingClientRect(), l = c.getBoundingClientRect(), w = 156;
    let p = l.left - C.left + l.width / 2 - w / 2, o = l.top - C.top - 56, m = !1;
    p = Math.max(4, Math.min(p, Math.max(4, C.width - w - 4))), o < 0 && (o = l.bottom - C.top + 10, m = !0), this.tooltip = {
      visible: !0,
      below: m,
      x: Math.round(p),
      y: Math.round(o),
      dateLabel: `${e} · ${i}`,
      detail: y
    };
  }
  handleHeatmapLeave() {
    this.tooltip.visible && (this.tooltip = { ...this.tooltip, visible: !1 });
  }
  /* ========================================================================
     Section Renderers
     ======================================================================== */
  renderOverviewStrip() {
    if (!this.enabledTypes.includes("overview") && !this.enabledTypes.includes("summary"))
      return k;
    const t = this.chartData?.summary, e = t?.totalPosts ?? this.normalizedTopArticles.length, i = t?.totalViews ?? this.normalizedTopArticles.reduce((c, a) => c + a.views, 0), s = t?.totalComments ?? this.normalizedComments.reduce((c, a) => c + a.count, 0), n = t?.runningDays ?? 0;
    return d`
      <div class="overview-wrap" aria-label="站内数据概览">
        <div class="overview-bar">
          <span class="overview-bar__title">
            全站内容概览${t?.siteStartDate ? ` · 始于 ${t.siteStartDate}` : ""}
          </span>
          <button
            type="button"
            class="ds-btn-ghost"
            ?disabled=${this.exporting}
            @click=${() => this.exportSummaryPng()}
          >
            ${U.download}
            <span>${this.exporting ? "生成中…" : "导出长图"}</span>
          </button>
        </div>
        <div class="overview-strip">
          <div class="overview-cell">
            <span class="overview-icon">${U.article}</span>
            <div class="overview-body">
              <span class="overview-val" title=${H(e)}>${B(e)}</span>
              <span class="overview-label">已发布文章</span>
            </div>
          </div>
          <div class="overview-cell">
            <span class="overview-icon">${U.eye}</span>
            <div class="overview-body">
              <span class="overview-val" title="${H(i)} 次阅读">${B(i)}</span>
              <span class="overview-label">全站总阅读</span>
            </div>
          </div>
          <div class="overview-cell">
            <span class="overview-icon">${U.comment}</span>
            <div class="overview-body">
              <span class="overview-val" title=${H(s)}>${B(s)}</span>
              <span class="overview-label">累计评论</span>
            </div>
          </div>
          <div class="overview-cell">
            <span class="overview-icon">${U.clock}</span>
            <div class="overview-body">
              <span class="overview-val">${n > 0 ? `${H(n)} 天` : `${this.normalizedTags.length}`}</span>
              <span class="overview-label">${n > 0 ? "已稳定运行" : "活跃标签"}</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }
  renderTaxonomySection() {
    const t = this.enabledTypes, e = t.includes("tags"), i = t.includes("categories");
    if (!e && !i) return k;
    const s = this.normalizedTags, n = this.normalizedCategories, c = s.reduce((h, $) => h + $.count, 0), a = n.reduce((h, $) => h + $.count, 0), y = Math.max(...n.map((h) => h.count), 1), C = Math.max(0, (this.chartData?.tags?.length || 0) - s.length), l = Math.max(0, (this.chartData?.categories?.length || 0) - n.length), w = this.activeTagIndex ?? this.pinnedTagIndex, p = w !== null ? s[w] : null, o = s.slice(0, 7), m = this.categoriesExpanded ? n : n.slice(0, 6), x = (e && s.length > 0 ? 1 : 0) + (i && n.length > 0 ? 1 : 0);
    return d`
      <section class="section">
        <header class="section__header">
          <div class="section__heading">
            <div class="section__title">${e && i ? "标签与分类分布" : e ? "标签分布统计" : "分类分布统计"}</div>
            <div class="section__subtitle">${e && i ? "站内已使用标签与分类的文章归属占比" : e ? "按文章关联数量排序的标签分布" : "按文章数量排序的分类占比"}</div>
          </div>
          <div class="section__right">
            ${e ? d`<span class="stat-pill">标签 <strong>${s.length}</strong></span>` : k}
            ${i ? d`<span class="stat-pill">分类 <strong>${n.length}</strong></span>` : k}
          </div>
        </header>

        <div class="section__body">
          ${x === 0 ? d`<div class="state-card">暂无标签或分类数据</div>` : d`
                <div class="taxonomy-grid ${x === 1 ? "is-single" : ""}">
                  ${e && s.length > 0 ? d`
                        <div class="panel">
                          <div class="panel__head">
                            <span class="panel__title">标签分布</span>
                            <div class="panel__meta">
                              ${this.pinnedTagIndex !== null ? d`
                                    <button type="button" class="text-link-btn" @click=${this.clearPinnedTag}>
                                      取消锁定
                                    </button>
                                  ` : k}
                              <span class="panel__badge">
                                ${s.length} 个已使用${C > 0 ? ` · ${C} 个未使用` : ""}
                              </span>
                            </div>
                          </div>

                          <div class="donut-layout">
                            <div class="donut-stage">
                              <canvas id="tags-canvas"></canvas>
                              <div class="donut-center">
                                <span class="donut-total">
                                  ${p ? B(p.count) : B(s.length)}
                                </span>
                                <span class="donut-caption">
                                  ${p ? p.name : "活跃标签"}
                                </span>
                                ${p ? d`<span class="donut-sub">${tt(p.count, c)}</span>` : k}
                              </div>
                            </div>

                            <ul class="legend ${w !== null ? "has-focus" : ""}">
                              ${o.map((h, $) => {
      const P = this.palette[$ % this.palette.length], D = this.activeTagIndex === $, Z = this.pinnedTagIndex === $;
      return d`
                                  <li
                                    class="legend__item ${D ? "is-active" : ""} ${Z ? "is-pinned" : ""}"
                                    @mouseenter=${() => this.handleLegendHover($)}
                                    @mouseleave=${() => this.handleLegendHover(null)}
                                    @click=${() => this.handleLegendClick($)}
                                  >
                                    <span class="legend__left">
                                      <span class="legend__dot" style="background:${P}"></span>
                                      ${h.permalink ? d`
                                            <a
                                              class="entity-link"
                                              href=${h.permalink}
                                              title=${h.name}
                                              @click=${(I) => I.stopPropagation()}
                                            >
                                              <span class="legend__label">${h.name}</span>
                                              <span class="entity-link__arrow">↗</span>
                                            </a>
                                          ` : d`<span class="legend__label" title=${h.name}>${h.name}</span>`}
                                    </span>
                                    <span class="legend__right">
                                      <span class="legend__count">${h.count}</span>
                                      <span class="legend__pct">${tt(h.count, c)}</span>
                                    </span>
                                  </li>
                                `;
    })}
                              ${s.length > 7 ? d`<li class="legend__more">其余 ${s.length - 7} 个标签已归入图表展示</li>` : k}
                            </ul>
                          </div>
                        </div>
                      ` : k}
                  ${i && n.length > 0 ? d`
                        <div class="panel">
                          <div class="panel__head">
                            <span class="panel__title">分类占比</span>
                            <span class="panel__badge">
                              ${n.length} 个已使用${l > 0 ? ` · ${l} 个未使用` : ""}
                            </span>
                          </div>

                          <ul class="dist-list">
                            ${m.map((h, $) => {
      const P = Math.max(4, Math.round(h.count / y * 100)), D = Math.max(0.42, 1 - $ * 0.08);
      return d`
                                <li class="dist-item">
                                  <div class="dist-meta">
                                    ${h.permalink ? d`
                                          <a class="entity-link dist-name" href=${h.permalink} title=${h.name}>
                                            <span class="dist-name">${h.name}</span>
                                            <span class="entity-link__arrow">↗</span>
                                          </a>
                                        ` : d`<span class="dist-name" title=${h.name}>${h.name}</span>`}
                                    <span class="dist-values">
                                      <span class="dist-count">${h.count} 篇</span>
                                      <span class="dist-pct">${tt(h.count, a)}</span>
                                    </span>
                                  </div>
                                  <div class="dist-track">
                                    <div class="dist-fill" style="width:${P}%;opacity:${D.toFixed(2)}"></div>
                                  </div>
                                </li>
                              `;
    })}
                          </ul>

                          <div class="panel__footer">
                            <span>分类关联总计 ${H(a)} 篇</span>
                            ${n.length > 6 ? d`
                                  <button
                                    type="button"
                                    class="text-link-btn"
                                    @click=${() => {
      this.categoriesExpanded = !this.categoriesExpanded;
    }}
                                  >
                                    ${this.categoriesExpanded ? "收起" : `展开全部 (${n.length})`}
                                  </button>
                                ` : k}
                          </div>
                        </div>
                      ` : k}
                </div>
              `}
        </div>
      </section>
    `;
  }
  renderHeatmapSection() {
    if (!this.enabledTypes.includes("articles")) return k;
    const t = !!this.chartData?.enableMomentHeatmap, e = /* @__PURE__ */ new Map();
    (this.chartData?.articles || []).forEach((r) => {
      const g = r.date || r.name;
      if (!g) return;
      const v = new Date(g);
      if (Number.isNaN(v.valueOf())) return;
      v.setHours(0, 0, 0, 0);
      const b = j(v), F = Number(r.articleTotal ?? r.total ?? r.count ?? 0), z = Number(r.momentTotal ?? 0), E = r.total != null ? Number(r.total) : F + z, Y = Number.isFinite(E) ? E : F + z, L = e.get(b) || { total: 0, articleTotal: 0, momentTotal: 0 };
      e.set(b, {
        total: L.total + Y,
        articleTotal: L.articleTotal + F,
        momentTotal: L.momentTotal + z
      });
    });
    const i = /* @__PURE__ */ new Date();
    i.setHours(0, 0, 0, 0);
    const s = new Date(i.getTime() - 364 * W);
    let n = !1, c = 0, a = 0, y = 0, C = 0, l = 0, w = "", p = 0, o = 0;
    const m = (r) => this.heatmapFilter === "articles" ? r.articleTotal : this.heatmapFilter === "moments" ? r.momentTotal : r.total;
    for (let r = s.getTime(); r <= i.getTime(); r += W) {
      const g = j(new Date(r)), v = e.get(g);
      v && (c += v.articleTotal, a += v.momentTotal, v.momentTotal > 0 && (n = !0));
      const b = v ? m(v) : 0;
      b > 0 ? (y += b, C += 1, o += 1, o > p && (p = o), b > l && (l = b, w = g)) : o = 0;
    }
    const x = new Date(s), V = (x.getDay() + 6) % 7;
    x.setDate(x.getDate() - V);
    const R = Math.floor((i.getTime() - x.getTime()) / W) + 1, h = Math.ceil(R / 7), $ = Array.from({ length: h }, (r, g) => new Date(x.getTime() + g * 7 * W)), P = [], D = new Date(s.getFullYear(), s.getMonth(), 1), Z = new Date(i.getFullYear(), i.getMonth(), 1);
    for (; D <= Z; ) {
      const r = new Date(D), g = new Date(D.getFullYear(), D.getMonth() + 1, 0), v = r < s ? new Date(s) : r, b = g > i ? new Date(i) : g, F = Math.floor((v.getTime() - x.getTime()) / W), z = Math.floor((b.getTime() - x.getTime()) / W), E = Math.max(0, Math.min(h - 1, Math.floor(F / 7))), Y = Math.max(E + 1, Math.min(h, Math.floor(z / 7) + 1));
      P.push({ label: ut[D.getMonth()], start: E, end: Y }), D.setMonth(D.getMonth() + 1);
    }
    const I = [];
    let O = 0;
    P.forEach((r) => {
      const g = Math.max(O, r.start), v = Math.min(h, Math.max(g + 1, r.end));
      if (g >= h) return;
      g > O && I.push({ label: "", span: g - O, placeholder: !0 });
      const b = Math.max(1, v - g);
      I.push({ label: b >= 2 ? r.label : "", span: b }), O = v;
    }), O < h && I.push({ label: "", span: h - O, placeholder: !0 });
    const X = (r) => {
      if (!r || !l) return 0;
      if (l <= 1) return r > 0 ? 4 : 0;
      if (l === 2) return r === 1 ? 2 : 4;
      const g = Math.max(1, Math.ceil(l * 0.25)), v = Math.max(g + 1, Math.ceil(l * 0.5)), b = Math.max(v + 1, Math.ceil(l * 0.75));
      return r >= b ? 4 : r >= v ? 3 : r >= g ? 2 : 1;
    }, q = t && n, G = `repeat(${h}, ${this.heatmapCellPx}px)`;
    return d`
      <section class="section">
        <header class="section__header">
          <div class="section__heading">
            <div class="section__title">创作活跃度</div>
            ${this.compact ? k : d`
                  <div class="section__subtitle">
                    ${t ? "近一年文章与瞬间的每日发布热力矩阵" : "近一年每日文章发布热力矩阵"}
                  </div>
                `}
          </div>
          ${q ? d`
                <div class="ds-segmented" role="tablist" aria-label="热力图数据类型筛选">
                  ${["all", "articles", "moments"].map(
      (r) => d`
                      <button
                        type="button"
                        role="tab"
                        class="ds-segmented__btn ${this.heatmapFilter === r ? "is-active" : ""}"
                        aria-selected=${this.heatmapFilter === r}
                        @click=${() => {
        this.heatmapFilter = r;
      }}
                      >
                        ${r === "all" ? "全部" : r === "articles" ? "文章" : "瞬间"}
                      </button>
                    `
    )}
                </div>
              ` : k}
        </header>

        ${e.size === 0 ? d`<div class="section__body"><div class="state-card">暂无发布记录</div></div>` : d`
              ${this.compact ? k : d`
                    <div class="heatmap-stats-strip">
                      ${q && this.heatmapFilter === "all" ? d`
                            <span class="heatmap-stat-cell">文章 <strong>${H(c)}</strong></span>
                            <span class="heatmap-stat-cell">瞬间 <strong>${H(a)}</strong></span>
                          ` : d`
                            <span class="heatmap-stat-cell">
                              ${this.heatmapFilter === "moments" ? "近一年瞬间" : "近一年发布"}
                              <strong>${H(y)}</strong>
                            </span>
                          `}
                      <span class="heatmap-stat-cell">活跃 <strong>${C}</strong> 天</span>
                      <span class="heatmap-stat-cell">最长连更 <strong>${p}</strong> 天</span>
                      <span class="heatmap-stat-cell" title=${w ? `峰值日期：${w}` : ""}>
                        单日峰值 <strong>${l}</strong>
                      </span>
                    </div>
                  `}

              <div class="section__body">
                <div class="heatmap-scroll">
                  <div
                    class="heatmap-card"
                    style="--hm-cell:${this.heatmapCellPx}px;--hm-gap:3px"
                    @mouseleave=${this.handleHeatmapLeave}
                  >
                    ${this.tooltip.visible ? d`
                          <div
                            class="heatmap__tooltip ${this.tooltip.below ? "is-below" : ""}"
                            style="transform:translate(${this.tooltip.x}px, ${this.tooltip.y}px)"
                          >
                            <strong>${this.tooltip.dateLabel}</strong>
                            <span>${this.tooltip.detail}</span>
                          </div>
                        ` : k}

                    <div class="heatmap">
                      <div class="heatmap__weekdays">
                        ${["一", "二", "三", "四", "五", "六", "日"].map((r, g) => d`<div class="heatmap__weekday ${g === 0 || g === 2 || g === 4 || g === 6 ? "" : "is-hidden"}">${r}</div>`)}
                      </div>

                      <div class="heatmap__months" style="grid-template-columns:${G}">
                        ${I.map(
      (r) => d`
                            <div class="heatmap__month" style="grid-column:span ${r.span}">
                              ${r.label}
                            </div>
                          `
    )}
                      </div>

                      <div class="heatmap__grid" style="grid-template-columns:${G}">
                        ${$.map(
      (r) => d`
                            <div class="heatmap__column">
                              ${Array.from({ length: 7 }, (g, v) => {
        const b = new Date(r.getTime() + v * W);
        if (!(b >= s && b <= i))
          return d`<div class="heatmap__day is-outside"></div>`;
        const z = j(b), E = e.get(z) || { total: 0, articleTotal: 0, momentTotal: 0 }, Y = m(E), L = X(Y), u = mt[b.getDay()];
        return d`
                                  <div
                                    class="heatmap__day"
                                    data-level=${L}
                                    tabindex="0"
                                    aria-label="${z} ${u}: ${Y}"
                                    @mouseenter=${(f) => this.handleHeatmapCellEnter(f, z, u, E, t)}
                                    @focus=${(f) => this.handleHeatmapCellEnter(f, z, u, E, t)}
                                    @mouseleave=${this.handleHeatmapLeave}
                                    @blur=${this.handleHeatmapLeave}
                                  ></div>
                                `;
      })}
                            </div>
                          `
    )}
                      </div>

                      <div class="heatmap__footer">
                        <span class="heatmap__range">${j(s)} 至 ${j(i)}</span>
                        <div class="heatmap__legend">
                          <span>少</span>
                          ${[0, 1, 2, 3, 4].map(
      (r) => d`<span class="heatmap__legend-dot" data-level=${r}></span>`
    )}
                          <span>多</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `}
      </section>
    `;
  }
  renderMonthlyTrendSection() {
    if (!this.enabledTypes.includes("monthlyTrend")) return k;
    const t = this.normalizedMonthlyTrend, e = t.reduce((s, n) => s + n.total, 0), i = !!this.chartData?.enableMomentHeatmap && t.some((s) => s.momentCount > 0);
    return d`
      <section class="section">
        <header class="section__header">
          <div class="section__heading">
            <div class="section__title">月度创作趋势</div>
            ${this.compact ? k : d`<div class="section__subtitle">近 12 个月内容发布节奏变化</div>`}
          </div>
          <div class="section__right">
            <span class="trend-dot-label">
              <span class="trend-dot" style="background:var(--ds-accent)"></span>文章
            </span>
            ${i ? d`
                  <span class="trend-dot-label">
                    <span class="trend-dot" style="background:var(--ds-live)"></span>瞬间
                  </span>
                ` : k}
            <span class="stat-pill">近 12 月 <strong>${H(e)}</strong></span>
          </div>
        </header>
        <div class="section__body">
          <div class="canvas-wrap" style="height:${this.compact ? 168 : 200}px">
            <canvas id="monthly-trend-canvas"></canvas>
          </div>
        </div>
      </section>
    `;
  }
  renderCommentsSection() {
    if (!this.enabledTypes.includes("comments")) return k;
    const t = this.normalizedComments, e = t.reduce((s, n) => s + n.count, 0), i = Math.max(180, t.length * 34 + 32);
    return d`
      <section class="section">
        <header class="section__header">
          <div class="section__heading">
            <div class="section__title">评论活跃榜</div>
            <div class="section__subtitle">按评论次数排名的站内活跃读者</div>
          </div>
          ${t.length > 0 ? d`
                <div class="section__right">
                  <span class="stat-pill">Top <strong>${t.length}</strong></span>
                  <span class="stat-pill">累计 <strong>${H(e)}</strong> 条</span>
                </div>
              ` : k}
        </header>
        <div class="section__body">
          ${t.length === 0 ? d`<div class="state-card">暂无评论数据</div>` : d`
                <div class="canvas-wrap" style="height:${i}px">
                  <canvas id="comments-canvas"></canvas>
                </div>
              `}
        </div>
      </section>
    `;
  }
  renderTopArticlesSection() {
    if (!this.enabledTypes.includes("topArticles")) return k;
    const t = this.normalizedTopArticles, e = t.reduce((s, n) => s + n.views, 0), i = Math.max(...t.map((s) => s.views), 1);
    return d`
      <section class="section">
        <header class="section__header">
          <div class="section__heading">
            <div class="section__title">热门文章排行</div>
            <div class="section__subtitle">按累计阅读量排序的站内热门内容，点击标题可直达阅读</div>
          </div>
          ${t.length > 0 ? d`
                <div class="section__right">
                  <span class="stat-pill">Top <strong>${t.length}</strong></span>
                  <span class="stat-pill">总阅读 <strong>${B(e)}</strong></span>
                </div>
              ` : k}
        </header>
        <div class="section__body">
          ${t.length === 0 ? d`<div class="state-card">暂无热门文章数据</div>` : d`
                <ol class="rank-list">
                  ${t.map((s, n) => {
      const c = n + 1, a = Math.max(4, Math.round(s.views / i * 100)), y = n < 3 ? 1 : Math.max(0.36, 0.72 - (n - 3) * 0.05), C = c === 1 ? "is-first" : c <= 3 ? "is-top" : "";
      return d`
                      <li class="rank-item">
                        <span class="rank-num ${C}">
                          ${String(c).padStart(2, "0")}
                        </span>
                        <div class="rank-main">
                          ${s.permalink ? d`
                                <a class="entity-link rank-title" href=${s.permalink} title=${s.name}>
                                  <span class="rank-title">${s.name}</span>
                                  <span class="entity-link__arrow">↗</span>
                                </a>
                              ` : d`<div class="rank-title" title=${s.name}>${s.name}</div>`}
                          <div class="rank-track">
                            <div class="rank-fill" style="width:${a}%;opacity:${y.toFixed(2)}"></div>
                          </div>
                        </div>
                        <div class="rank-value" title="${H(s.views)} 次阅读">
                          <span class="rank-views">${B(s.views)}</span>
                          <span class="rank-unit">阅读</span>
                        </div>
                      </li>
                    `;
    })}
                </ol>
              `}
        </div>
      </section>
    `;
  }
  render() {
    return this.loading ? d`
        <div class="skeleton-shell" aria-busy="true" aria-label="站内图表加载中">
          <div class="skeleton-top">
            <div class="ds-skeleton" style="width:140px;height:16px"></div>
            <div class="ds-skeleton" style="width:90px;height:14px"></div>
          </div>
          <div class="skeleton-grid">
            <div class="ds-skeleton" style="height:196px"></div>
            <div class="ds-skeleton" style="height:196px"></div>
          </div>
        </div>
      ` : this.error ? d`
        <div class="state-card state-card--error">
          <span>获取图表数据失败：${this.error}</span>
          <button type="button" class="ds-btn-ghost" @click=${() => this.loadData()}>重新加载</button>
        </div>
      ` : d`
      <div class="board">
        ${this.renderOverviewStrip()}
        ${this.renderTaxonomySection()}
        ${this.renderHeatmapSection()}
        ${this.renderMonthlyTrendSection()}
        ${this.renderCommentsSection()}
        ${this.renderTopArticlesSection()}
      </div>
    `;
  }
};
T.styles = ct;
M([
  et({ type: String, attribute: "data-types" })
], T.prototype, "dataTypes", 2);
M([
  et({ type: String, attribute: "accent-color" })
], T.prototype, "accentColor", 2);
M([
  et({ type: Boolean, reflect: !0 })
], T.prototype, "compact", 2);
M([
  N()
], T.prototype, "loading", 2);
M([
  N()
], T.prototype, "exporting", 2);
M([
  N()
], T.prototype, "error", 2);
M([
  N()
], T.prototype, "chartData", 2);
M([
  N()
], T.prototype, "activeTagIndex", 2);
M([
  N()
], T.prototype, "pinnedTagIndex", 2);
M([
  N()
], T.prototype, "categoriesExpanded", 2);
M([
  N()
], T.prototype, "heatmapFilter", 2);
M([
  N()
], T.prototype, "heatmapCellPx", 2);
M([
  N()
], T.prototype, "tooltip", 2);
T = M([
  nt("site-charts")
], T);
export {
  T as SiteCharts
};
