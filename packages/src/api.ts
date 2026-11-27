import type {
  TrafficData,
  PageviewsTrendData,
  UmamiMetricItem,
  UmamiMetricType,
  RealtimeData,
  UptimeStatus,
  GithubConfig,
  ChartData,
  TrafficType
} from './types';

const API_BASE = '/apis/api.data.statistics.xhhao.com/v1alpha1';

let githubConfigCache: GithubConfig | null = null;

async function safeFetch<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json();
}

export async function fetchUmamiVisits(type: TrafficType = 'weekly'): Promise<TrafficData> {
  return safeFetch<TrafficData>(`${API_BASE}/umami/visits?type=${encodeURIComponent(type)}`);
}

export async function fetchUmamiPageviewsTrend(type: TrafficType = 'weekly'): Promise<PageviewsTrendData> {
  return safeFetch<PageviewsTrendData>(`${API_BASE}/umami/pageviews?type=${encodeURIComponent(type)}`);
}

export async function fetchUmamiMetrics(
  type: TrafficType = 'monthly',
  metricType: UmamiMetricType = 'referrer',
  limit = 8
): Promise<UmamiMetricItem[]> {
  return safeFetch<UmamiMetricItem[]>(
    `${API_BASE}/umami/metrics?type=${encodeURIComponent(type)}&metricType=${encodeURIComponent(metricType)}&limit=${limit}`
  );
}

export async function fetchUmamiRealtime(): Promise<RealtimeData> {
  return safeFetch<RealtimeData>(`${API_BASE}/umami/realtime`);
}

export async function fetchUptimeStatus(): Promise<UptimeStatus> {
  return safeFetch<UptimeStatus>(`${API_BASE}/uptime/status`);
}

export async function fetchGithubConfig(): Promise<GithubConfig> {
  if (githubConfigCache) {
    return githubConfigCache;
  }
  const config = await safeFetch<GithubConfig>(`${API_BASE}/github/config`);
  githubConfigCache = config;
  return config;
}

export async function fetchChartData(): Promise<ChartData> {
  return safeFetch<ChartData>(`${API_BASE}/chart/data`);
}
