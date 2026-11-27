export type StatisticsVariant = 'traffic' | 'activity' | 'metrics' | 'uptime';
export type TrafficType = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
export type UmamiMetricType = 'referrer' | 'country' | 'browser' | 'os' | 'device' | 'url';
export type ThemeMode = 'light' | 'dark';

export type UmamiStatField = { value: number; prev?: number } | number;

export interface TrafficData {
  pageviews: UmamiStatField;
  visits: UmamiStatField;
  visitors: UmamiStatField;
  bounces?: UmamiStatField;
  totaltime?: UmamiStatField;
  comparison?: {
    pageviews?: number;
    visits?: number;
    visitors?: number;
    bounces?: number;
    totaltime?: number;
  };
}

export interface PageviewsPoint {
  x: string;
  y: number;
}

export interface PageviewsTrendData {
  pageviews: PageviewsPoint[];
  sessions: PageviewsPoint[];
}

export interface UmamiMetricItem {
  x: string;
  y: number;
}

export interface RealtimeData {
  totals: {
    views: number;
    visitors: number;
  };
  events: ActivityEvent[];
}

export interface ActivityEvent {
  createdAt: string;
  urlPath: string;
  browser?: string;
  os?: string;
  device?: string;
  country?: string;
}

export interface UptimeStatus {
  status: 0 | 1 | 2;
  statusPageUrl?: string;
}

export interface GithubConfig {
  proxyUrl: string;
  graphProxyUrl: string;
  username: string;
}

export interface SiteSummary {
  totalPosts?: number;
  totalViews?: number;
  totalUpvotes?: number;
  totalComments?: number;
  totalTags?: number;
  totalCategories?: number;
  runningDays?: number;
  siteStartDate?: string;
}

export interface MonthlyTrendData {
  month: string;
  articleCount: number;
  momentCount: number;
  total: number;
}

export interface ChartData {
  enableMomentHeatmap?: boolean;
  accentColor?: string;
  summary?: SiteSummary;
  tags: TagData[];
  categories: CategoryData[];
  articles: ArticleData[];
  monthlyTrend?: MonthlyTrendData[];
  comments: CommentData[];
  top10Articles: TopArticleData[];
}

export interface TagData {
  name?: string;
  count?: number;
  total?: number;
  permalink?: string;
  spec?: { displayName?: string };
  metadata?: { name?: string };
  status?: { visiblePostCount?: number; permalink?: string };
}

export interface CategoryData {
  name?: string;
  total?: number;
  count?: number;
  permalink?: string;
  spec?: { displayName?: string };
  metadata?: { name?: string };
  status?: { visiblePostCount?: number; permalink?: string };
}

export interface ArticleData {
  name?: string;
  date?: string;
  total?: number;
  count?: number;
  articleTotal?: number;
  momentTotal?: number;
}

export interface CommentData {
  name?: string;
  username?: string;
  email?: string;
  count?: number;
}

export interface TopArticleData {
  name?: string;
  views?: number;
  count?: number;
  permalink?: string;
}
