import { upgradeLegacyPlaceholders } from './legacy-upgrade';

type LoaderFn = () => Promise<unknown>;

const COMPONENT_LOADERS: Record<string, LoaderFn> = {
  'site-charts': () => import('./components/site-charts'),
  'traffic-statistics': () => import('./components/traffic-statistics'),
  'activity-statistics': () => import('./components/activity-statistics'),
  'umami-metrics': () => import('./components/umami-metrics'),
  'uptime-statistics': () => import('./components/uptime-statistics'),
  'github-statistics': () => import('./components/github-statistics')
};

const loadedTags = new Set<string>();
let scheduled = false;

export function scanAndLoad(root: ParentNode = document): void {
  upgradeLegacyPlaceholders(root);

  for (const [tag, load] of Object.entries(COMPONENT_LOADERS)) {
    if (loadedTags.has(tag)) continue;
    if (root.querySelector(tag)) {
      loadedTags.add(tag);
      void load().catch((err) => {
        loadedTags.delete(tag);
        console.error(`[data-statistics] Failed to load <${tag}>:`, err);
      });
    }
  }
}

function scheduleScan(): void {
  if (scheduled) return;
  scheduled = true;
  queueMicrotask(() => {
    scheduled = false;
    scanAndLoad(document);
  });
}

function boot(): void {
  scanAndLoad(document);

  if (typeof MutationObserver === 'undefined') return;
  const target = document.body || document.documentElement;
  if (!target) return;

  const observer = new MutationObserver(() => {
    scheduleScan();
  });

  observer.observe(target, {
    childList: true,
    subtree: true
  });
}

declare global {
  interface Window {
    xhhaocomDataStatisticsV2Init?: () => void;
  }
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.xhhaocomDataStatisticsV2Init = () => scanAndLoad(document);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
}
