function onReady(callback: () => void): void {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', callback, { once: true });
    return;
  }
  callback();
}

function copyAttributeIfPresent(
  source: HTMLElement,
  target: HTMLElement,
  sourceName: string,
  targetName = sourceName
): void {
  const value = source.getAttribute(sourceName);
  if (value) {
    target.setAttribute(targetName, value);
  }
}

function replaceWithComponent(source: HTMLElement, target: HTMLElement): void {
  if (!source.isConnected) return;
  source.replaceWith(target);
}

function upgradeTraffic(root: ParentNode): void {
  root.querySelectorAll<HTMLElement>('.xhhaocom-dataStatistics-v2-traffic').forEach((element) => {
    const replacement = document.createElement('traffic-statistics');
    copyAttributeIfPresent(element, replacement, 'data-type');
    replaceWithComponent(element, replacement);
  });
}

function upgradeActivity(root: ParentNode): void {
  root.querySelectorAll<HTMLElement>('.xhhaocom-dataStatistics-v2-activity').forEach((element) => {
    replaceWithComponent(element, document.createElement('activity-statistics'));
  });
}

function upgradeUptime(root: ParentNode): void {
  root.querySelectorAll<HTMLElement>('.xhhaocom-dataStatistics-v2-uptime-kuma').forEach((element) => {
    replaceWithComponent(element, document.createElement('uptime-statistics'));
  });
}

function upgradeSiteCharts(root: ParentNode): void {
  root.querySelectorAll<HTMLElement>('.xhhaocom-chartboard').forEach((element) => {
    const replacement = document.createElement('site-charts');
    copyAttributeIfPresent(element, replacement, 'data-types');
    if (element.hasAttribute('compact')) {
      replacement.setAttribute('compact', '');
    }
    replaceWithComponent(element, replacement);
  });
}

function upgradeGithubContainers(root: ParentNode): void {
  root.querySelectorAll<HTMLElement>('.github-statistics-container').forEach((element) => {
    const replacement = document.createElement('github-statistics');
    copyAttributeIfPresent(element, replacement, 'data-types');
    copyAttributeIfPresent(element, replacement, 'data-stats-locale', 'stats-locale');
    copyAttributeIfPresent(element, replacement, 'data-stats-show-icons', 'stats-show-icons');
    copyAttributeIfPresent(element, replacement, 'data-stats-theme', 'stats-theme');
    copyAttributeIfPresent(element, replacement, 'data-pin-repo', 'pin-repo');
    copyAttributeIfPresent(element, replacement, 'data-top-langs-layout', 'top-langs-layout');
    copyAttributeIfPresent(element, replacement, 'data-top-langs-hide-progress', 'top-langs-hide-progress');
    copyAttributeIfPresent(element, replacement, 'data-top-langs-stats-format', 'top-langs-stats-format');
    copyAttributeIfPresent(element, replacement, 'data-graph-theme', 'graph-theme');
    replaceWithComponent(element, replacement);
  });
}

function upgradeStandaloneGithub(root: ParentNode): void {
  const selector = [
    '.xhhaocom-dataStatistics-v2-github-stats',
    '.xhhaocom-dataStatistics-v2-github-pin',
    '.xhhaocom-dataStatistics-v2-github-top-langs',
    '.xhhaocom-dataStatistics-v2-github-graph'
  ].join(',');

  root.querySelectorAll<HTMLElement>(selector).forEach((element) => {
    if (!element.isConnected || element.closest('.github-statistics-container')) {
      return;
    }

    const replacement = document.createElement('github-statistics');
    if (element.classList.contains('xhhaocom-dataStatistics-v2-github-stats')) {
      replacement.setAttribute('data-types', 'stats');
      copyAttributeIfPresent(element, replacement, 'data-locale', 'stats-locale');
      copyAttributeIfPresent(element, replacement, 'data-show-icons', 'stats-show-icons');
      copyAttributeIfPresent(element, replacement, 'data-theme', 'stats-theme');
    } else if (element.classList.contains('xhhaocom-dataStatistics-v2-github-pin')) {
      replacement.setAttribute('data-types', 'pin');
      copyAttributeIfPresent(element, replacement, 'data-repo', 'pin-repo');
    } else if (element.classList.contains('xhhaocom-dataStatistics-v2-github-top-langs')) {
      replacement.setAttribute('data-types', 'top-langs');
      copyAttributeIfPresent(element, replacement, 'data-layout', 'top-langs-layout');
      copyAttributeIfPresent(element, replacement, 'data-hide-progress', 'top-langs-hide-progress');
      copyAttributeIfPresent(element, replacement, 'data-stats-format', 'top-langs-stats-format');
    } else if (element.classList.contains('xhhaocom-dataStatistics-v2-github-graph')) {
      replacement.setAttribute('data-types', 'graph');
      copyAttributeIfPresent(element, replacement, 'data-theme', 'graph-theme');
    }

    replaceWithComponent(element, replacement);
  });
}

export function upgradeLegacyPlaceholders(root: ParentNode = document): void {
  upgradeGithubContainers(root);
  upgradeStandaloneGithub(root);
  upgradeTraffic(root);
  upgradeActivity(root);
  upgradeUptime(root);
  upgradeSiteCharts(root);
}

declare global {
  interface Window {
    xhhaocomDataStatisticsV2Init?: () => void;
  }
}

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  window.xhhaocomDataStatisticsV2Init = () => upgradeLegacyPlaceholders(document);

  onReady(() => {
    upgradeLegacyPlaceholders(document);

    if (typeof MutationObserver === 'undefined' || !document.body) {
      return;
    }

    const observer = new MutationObserver(() => {
      upgradeLegacyPlaceholders(document);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}
