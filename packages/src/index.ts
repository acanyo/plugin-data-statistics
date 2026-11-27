// Export Lit Web Components
export { TrafficStatistics } from './components/traffic-statistics';
export { ActivityStatistics } from './components/activity-statistics';
export { UmamiMetrics } from './components/umami-metrics';
export { UptimeStatistics } from './components/uptime-statistics';
export { SiteCharts } from './components/site-charts';
export { GithubStatistics } from './components/github-statistics';
export { upgradeLegacyPlaceholders } from './legacy-upgrade';

// Export Types
export type {
  StatisticsVariant,
  TrafficType,
  UmamiMetricType,
  ThemeMode,
  TrafficData,
  PageviewsPoint,
  PageviewsTrendData,
  UmamiMetricItem,
  RealtimeData,
  ActivityEvent,
  UptimeStatus,
  GithubConfig,
  SiteSummary,
  MonthlyTrendData,
  ChartData,
  TagData,
  CategoryData,
  ArticleData,
  CommentData,
  TopArticleData
} from './types';

// Auto-register Custom Elements & legacy div upgrade observer
import './components/traffic-statistics';
import './components/activity-statistics';
import './components/umami-metrics';
import './components/uptime-statistics';
import './components/site-charts';
import './components/github-statistics';
import './legacy-upgrade';
