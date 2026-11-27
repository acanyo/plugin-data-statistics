import { css } from 'lit';
import { sharedTokenStyles } from './tokens';

export const githubStyles = [
  sharedTokenStyles,
  css`
    :host {
      display: block;
      width: 100%;
      margin: 16px 0;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
      width: 100%;
    }

    .grid.is-single {
      grid-template-columns: minmax(0, 1fr);
    }

    .card {
      display: flex;
      flex-direction: column;
      border-radius: var(--ds-radius-card);
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
      box-shadow: var(--ds-shadow), var(--ds-inner-highlight);
      overflow: hidden;
      min-width: 0;
    }

    .card--full {
      grid-column: 1 / -1;
    }

    .card__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 16px;
      border-bottom: 1px solid var(--ds-border-subtle);
      background: var(--ds-surface-subtle);
    }

    .card__title {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--ds-text-primary);
    }

    .card__user {
      font-family: var(--ds-font-mono);
      font-size: 11px;
      color: var(--ds-text-muted);
    }

    .card__body {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 14px;
      min-height: 132px;
    }

    .card__img {
      display: block;
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      opacity: 0;
      transition: opacity 0.25s ease;
    }

    .card__img.is-loaded {
      opacity: 1;
    }

    .card__skeleton {
      position: absolute;
      inset: 14px;
      border-radius: 8px;
    }

    .state-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      min-height: 112px;
      padding: 18px;
      border-radius: 12px;
      border: 1px solid var(--ds-border);
      background: var(--ds-surface);
      font-size: 13px;
      color: var(--ds-text-muted);
      text-align: center;
    }

    .state-box--error {
      background: var(--ds-error-bg);
      border-color: var(--ds-error-border);
      color: var(--ds-error-text);
    }

    .card__error {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      font-size: 12.5px;
      color: var(--ds-error-text);
      padding: 12px;
      text-align: center;
    }

    @media (max-width: 768px) {
      .grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `
];
