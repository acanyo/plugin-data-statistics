import type { ActivityEvent, TrafficData, TrafficType, UmamiStatField } from './types';

export const TRAFFIC_PERIODS: Array<{ value: TrafficType; label: string; shortLabel: string }> = [
  { value: 'daily', label: '今日概览', shortLabel: '今日' },
  { value: 'weekly', label: '近 7 天', shortLabel: '7 天' },
  { value: 'monthly', label: '近 30 天', shortLabel: '30 天' },
  { value: 'quarterly', label: '近 90 天', shortLabel: '90 天' },
  { value: 'yearly', label: '近一年', shortLabel: '1 年' }
];

export function formatNumber(num: number): string {
  const value = Number(num) || 0;
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toLocaleString('zh-CN');
}

export function formatExact(num: number): string {
  return (Number(num) || 0).toLocaleString('zh-CN');
}

export function formatPercent(part: number, total: number): string {
  if (!total) return '0%';
  const pct = (part / total) * 100;
  return pct >= 10 ? `${Math.round(pct)}%` : `${pct.toFixed(1)}%`;
}

export function formatDuration(seconds: number): string {
  const s = Math.max(0, Math.round(seconds || 0));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  if (m < 60) return rem > 0 ? `${m}m ${rem}s` : `${m}m`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}

export function extractValue(data: UmamiStatField | undefined | null): number {
  if (data == null) return 0;
  if (typeof data === 'object' && 'value' in data) {
    return parseInt(String(data.value), 10) || 0;
  }
  return parseInt(String(data), 10) || 0;
}

export function extractPrevValue(
  visitData: TrafficData | null,
  key: 'pageviews' | 'visits' | 'visitors' | 'bounces' | 'totaltime'
): number | null {
  if (!visitData) return null;
  const field = visitData[key];
  if (field && typeof field === 'object' && 'prev' in field && typeof field.prev === 'number') {
    return field.prev;
  }
  const comp = visitData.comparison?.[key];
  if (typeof comp === 'number' && Number.isFinite(comp)) {
    return comp;
  }
  return null;
}

export function computeDeltaPercent(current: number, previous: number | null): number | null {
  if (previous == null || previous <= 0) return null;
  return ((current - previous) / previous) * 100;
}

export function formatDateYMD(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatTime24(date: Date): string {
  if (Number.isNaN(date.valueOf())) return '--:--:--';
  const hh = String(date.getHours()).padStart(2, '0');
  const mm = String(date.getMinutes()).padStart(2, '0');
  const ss = String(date.getSeconds()).padStart(2, '0');
  return `${hh}:${mm}:${ss}`;
}

export function formatRelativeTime(date: Date): string {
  if (Number.isNaN(date.valueOf())) return '';
  const diffSec = Math.max(0, Math.floor((Date.now() - date.getTime()) / 1000));
  if (diffSec < 60) return '刚刚';
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)} 分钟前`;
  return `${Math.floor(diffSec / 3600)} 小时前`;
}

export function formatTrendAxisLabel(rawX: string, period: TrafficType): string {
  const d = new Date(rawX);
  if (Number.isNaN(d.valueOf())) {
    return rawX.length > 10 ? rawX.slice(5, 10) : rawX;
  }
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  const hh = String(d.getHours()).padStart(2, '0');
  if (period === 'daily') return `${hh}:00`;
  if (period === 'yearly') return `${d.getFullYear()}-${mm}`;
  return `${mm}-${dd}`;
}

const regionDisplay =
  typeof Intl !== 'undefined' && typeof Intl.DisplayNames === 'function'
    ? new Intl.DisplayNames(['zh-CN'], { type: 'region' })
    : null;

const specialRegionMap: Record<string, string> = {
  HK: '中国香港',
  MO: '中国澳门',
  TW: '中国台湾'
};

export function getCountryName(code = ''): string {
  const normalized = String(code || '').toUpperCase();
  if (!normalized) return '';

  let result = normalized;
  if (regionDisplay) {
    try {
      const localized = regionDisplay.of(normalized);
      if (localized && localized !== normalized) {
        result = localized;
      }
    } catch {
      // ignore invalid region code
    }
  }

  if (specialRegionMap[normalized]) {
    if (!result.includes('中国')) {
      result = specialRegionMap[normalized];
    } else {
      const trimmed = result.replace(/^中国/, '');
      result = `中国${trimmed}`;
    }
  }

  return result;
}

export function normalizeDeviceCategory(device?: string): 'desktop' | 'mobile' | 'other' {
  const d = (device || '').toLowerCase();
  if (d === 'desktop' || d === 'laptop') return 'desktop';
  if (d === 'mobile' || d === 'tablet') return 'mobile';
  return 'other';
}

export function buildVisitorTags(event: ActivityEvent): string[] {
  const osMap: Record<string, string> = {
    'Mac OS': 'macOS',
    Windows: 'Windows',
    Android: 'Android',
    iOS: 'iOS',
    Linux: 'Linux'
  };
  const deviceMap: Record<string, string> = {
    desktop: '桌面端',
    mobile: '移动端',
    tablet: '平板',
    laptop: '笔记本'
  };

  let browser = event.browser || '';
  if (browser && browser.toLowerCase().includes('webview')) {
    if (!browser.includes('(') || !browser.includes(')')) {
      browser = browser.replace(/\s*webview\s*/gi, ' (WebView)');
    }
  }

  const country = getCountryName(event.country);
  const os = event.os ? osMap[event.os] || event.os : '';
  const device = event.device ? deviceMap[event.device] || event.device : '';

  const parts: string[] = [];
  if (country) parts.push(country);
  if (os) parts.push(os);
  if (device) parts.push(device);
  if (browser) parts.push(browser);

  return parts.length > 0 ? parts : ['访客访问'];
}

export function isValidHexColor(color: string): boolean {
  return /^#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/.test((color || '').trim());
}

export function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace('#', '').trim();
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean;
  if (full.length !== 6) return `rgba(37, 99, 235, ${alpha})`;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
