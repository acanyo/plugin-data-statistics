<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { axiosInstance } from "@halo-dev/api-client";
import { VPageHeader, VButton, VSpace, Toast } from "@halo-dev/components";
import MdiChartBoxOutline from "~icons/mdi/chart-box-outline";
import MdiRefresh from "~icons/mdi/refresh";
import MdiCogOutline from "~icons/mdi/cog-outline";

interface SiteSummary {
  totalPosts: number;
  totalViews: number;
  totalUpvotes: number;
  totalComments: number;
  totalTags: number;
  totalCategories: number;
  runningDays: number;
  siteStartDate?: string;
}

interface ChartDataResponse {
  summary?: SiteSummary;
  tags: Array<{ name: string; count: number; permalink?: string }>;
  categories: Array<{ name: string; total: number; permalink?: string }>;
  monthlyTrend?: Array<{ month: string; articleCount: number; momentCount: number; total: number }>;
  comments: Array<{ username: string; count: number }>;
  top10Articles: Array<{ name: string; views: number; permalink?: string }>;
}

interface UmamiMetricItem {
  x: string;
  y: number;
}

const API_BASE = "/apis/api.data.statistics.xhhao.com/v1alpha1";
const router = useRouter();

const periods = [
  { value: "daily", label: "今日" },
  { value: "weekly", label: "7 天" },
  { value: "monthly", label: "30 天" },
  { value: "quarterly", label: "90 天" },
  { value: "yearly", label: "1 年" }
];

const metricDims = [
  { value: "referrer", label: "来源渠道" },
  { value: "country", label: "国家地区" },
  { value: "browser", label: "浏览器" },
  { value: "os", label: "操作系统" },
  { value: "url", label: "热门页面" }
];

const loading = ref(true);
const clearingCache = ref(false);
const chartData = ref<ChartDataResponse | null>(null);

const activePeriod = ref("monthly");
const umamiStats = ref<Record<string, any> | null>(null);
const umamiRealtime = ref<Record<string, any> | null>(null);
const umamiError = ref(false);

const activeMetricDim = ref("referrer");
const umamiMetrics = ref<UmamiMetricItem[]>([]);
const loadingMetrics = ref(false);

const uptimeData = ref<{ status: number; statusPageUrl?: string } | null>(null);

function extractVal(field: any): number {
  if (field == null) return 0;
  if (typeof field === "object" && "value" in field) return Number(field.value) || 0;
  return Number(field) || 0;
}

function formatNum(num: number): string {
  const n = Number(num) || 0;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString("zh-CN");
}

function formatDuration(seconds: number): string {
  const s = Math.max(0, Math.round(seconds || 0));
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return rem > 0 ? `${m}m ${rem}s` : `${m}m`;
}

async function fetchSiteData() {
  const { data } = await axiosInstance.get<ChartDataResponse>(`${API_BASE}/chart/data`);
  chartData.value = data;
}

async function fetchUmamiData() {
  umamiError.value = false;
  try {
    const [statsRes, realtimeRes] = await Promise.all([
      axiosInstance.get(`${API_BASE}/umami/visits`, { params: { type: activePeriod.value } }),
      axiosInstance.get(`${API_BASE}/umami/realtime`).catch(() => ({ data: null }))
    ]);
    umamiStats.value = statsRes.data;
    umamiRealtime.value = realtimeRes.data;
  } catch {
    umamiError.value = true;
    umamiStats.value = null;
  }
}

async function fetchMetrics() {
  loadingMetrics.value = true;
  try {
    const { data } = await axiosInstance.get<UmamiMetricItem[]>(`${API_BASE}/umami/metrics`, {
      params: { type: activePeriod.value, metricType: activeMetricDim.value, limit: 8 }
    });
    umamiMetrics.value = Array.isArray(data) ? data : [];
  } catch {
    umamiMetrics.value = [];
  } finally {
    loadingMetrics.value = false;
  }
}

async function fetchUptime() {
  try {
    const { data } = await axiosInstance.get(`${API_BASE}/uptime/status`);
    uptimeData.value = data;
  } catch {
    uptimeData.value = null;
  }
}

async function loadAll() {
  loading.value = true;
  await Promise.allSettled([fetchSiteData(), fetchUmamiData(), fetchMetrics(), fetchUptime()]);
  loading.value = false;
}

async function handleClearCache() {
  clearingCache.value = true;
  try {
    await axiosInstance.post(`${API_BASE}/chart/cache/clear`);
    await loadAll();
    Toast.success("统计缓存已清除并重新拉取最新数据");
  } catch {
    Toast.error("清除缓存失败");
  } finally {
    clearingCache.value = false;
  }
}

function handlePeriodSwitch(p: string) {
  if (activePeriod.value === p) return;
  activePeriod.value = p;
  void fetchUmamiData();
  void fetchMetrics();
}

function handleDimSwitch(dim: string) {
  if (activeMetricDim.value === dim) return;
  activeMetricDim.value = dim;
  void fetchMetrics();
}

const monthlyTrend = computed(() => chartData.value?.monthlyTrend || []);
const maxMonthly = computed(() => Math.max(...monthlyTrend.value.map(m => m.total), 1));
const topArticles = computed(() => (chartData.value?.top10Articles || []).filter(a => a.views > 0).slice(0, 10));
const maxArticleViews = computed(() => Math.max(...topArticles.value.map(a => a.views), 1));
const topCategories = computed(() =>
  (chartData.value?.categories || []).filter(c => c.total > 0).sort((a, b) => b.total - a.total).slice(0, 8)
);
const maxCatTotal = computed(() => Math.max(...topCategories.value.map(c => c.total), 1));
const metricsMax = computed(() => Math.max(...umamiMetrics.value.map(i => Number(i.y) || 0), 1));
const metricsTotal = computed(() => umamiMetrics.value.reduce((s, i) => s + (Number(i.y) || 0), 0));

const umamiKpis = computed(() => {
  if (!umamiStats.value) return null;
  const pv = extractVal(umamiStats.value.pageviews);
  const visits = extractVal(umamiStats.value.visits);
  const visitors = extractVal(umamiStats.value.visitors);
  const bounces = umamiStats.value.bounces != null ? extractVal(umamiStats.value.bounces) : null;
  const totaltime = umamiStats.value.totaltime != null ? extractVal(umamiStats.value.totaltime) : null;
  const online = Number(umamiRealtime.value?.totals?.visitors) || 0;
  return {
    pv,
    visits,
    visitors,
    online,
    bounceRate: bounces !== null && visits > 0 ? `${Math.min(100, Math.round((bounces / visits) * 100))}%` : "--",
    avgDuration: totaltime !== null && visits > 0 ? formatDuration(totaltime / visits) : "--"
  };
});

const uptimeLabel = computed(() => {
  if (!uptimeData.value) return null;
  if (uptimeData.value.status === 1) return { cls: "is-ok", text: "所有业务正常" };
  if (uptimeData.value.status === 2) return { cls: "is-warn", text: "部分业务异常" };
  return { cls: "is-err", text: "全部业务异常" };
});

onMounted(() => {
  void loadAll();
});
</script>

<template>
  <VPageHeader title="数据看板">
    <template #icon>
      <MdiChartBoxOutline class="mr-2 self-center" />
    </template>
    <template #actions>
      <VSpace>
        <a
          v-if="uptimeLabel"
          :href="uptimeData?.statusPageUrl || undefined"
          target="_blank"
          rel="noopener noreferrer"
          class="ds-admin-uptime"
        >
          <span class="ds-admin-uptime__dot" :class="uptimeLabel.cls" />
          <span>{{ uptimeLabel.text }}</span>
        </a>
        <VButton size="sm" :loading="clearingCache" @click="handleClearCache">
          <template #icon>
            <MdiRefresh class="h-4 w-4" />
          </template>
          清除缓存并刷新
        </VButton>
        <VButton size="sm" type="secondary" @click="router.push('/plugins/data-statistics?tab=basics')">
          <template #icon>
            <MdiCogOutline class="h-4 w-4" />
          </template>
          插件设置
        </VButton>
      </VSpace>
    </template>
  </VPageHeader>

  <div class="ds-admin">
    <!-- Top Site Summary -->
    <div class="ds-admin-kpis">
      <div class="ds-admin-kpi">
        <span class="ds-admin-kpi__label">已发布文章</span>
        <span class="ds-admin-kpi__val">{{ formatNum(chartData?.summary?.totalPosts ?? 0) }}</span>
        <span class="ds-admin-kpi__sub">
          标签 {{ chartData?.summary?.totalTags ?? 0 }} · 分类 {{ chartData?.summary?.totalCategories ?? 0 }}
        </span>
      </div>
      <div class="ds-admin-kpi">
        <span class="ds-admin-kpi__label">全站总阅读</span>
        <span class="ds-admin-kpi__val">{{ formatNum(chartData?.summary?.totalViews ?? 0) }}</span>
        <span class="ds-admin-kpi__sub">点赞 {{ formatNum(chartData?.summary?.totalUpvotes ?? 0) }}</span>
      </div>
      <div class="ds-admin-kpi">
        <span class="ds-admin-kpi__label">累计评论</span>
        <span class="ds-admin-kpi__val">{{ formatNum(chartData?.summary?.totalComments ?? 0) }}</span>
        <span class="ds-admin-kpi__sub">全站互动记录</span>
      </div>
      <div class="ds-admin-kpi">
        <span class="ds-admin-kpi__label">已稳定运行</span>
        <span class="ds-admin-kpi__val">{{ chartData?.summary?.runningDays ?? 0 }} 天</span>
        <span class="ds-admin-kpi__sub">
          {{ chartData?.summary?.siteStartDate ? `始于 ${chartData.summary.siteStartDate}` : "自动按首篇推算" }}
        </span>
      </div>
    </div>

    <!-- Umami Traffic + Visitor Profile -->
    <div class="ds-admin-card">
      <div class="ds-admin-card__head">
        <div>
          <div class="ds-admin-card__title">Umami 流量与访客画像</div>
          <div class="ds-admin-card__sub">支持按周期查看核心流量指标与读者来源构成</div>
        </div>
        <div class="ds-admin-seg">
          <button
            v-for="p in periods"
            :key="p.value"
            type="button"
            class="ds-admin-seg__btn"
            :class="{ 'is-active': activePeriod === p.value }"
            @click="handlePeriodSwitch(p.value)"
          >
            {{ p.label }}
          </button>
        </div>
      </div>

      <div v-if="umamiError || !umamiKpis" class="ds-admin-empty">
        暂未获取到 Umami 数据，请前往「插件设置 → umami 设置」检查站点地址与凭据。
      </div>
      <template v-else>
        <div class="ds-admin-umami-strip">
          <div class="ds-admin-uitem"><span>浏览量 (PV)</span><strong>{{ formatNum(umamiKpis.pv) }}</strong></div>
          <div class="ds-admin-uitem"><span>访问次数</span><strong>{{ formatNum(umamiKpis.visits) }}</strong></div>
          <div class="ds-admin-uitem"><span>独立访客 (UV)</span><strong>{{ formatNum(umamiKpis.visitors) }}</strong></div>
          <div class="ds-admin-uitem"><span>跳出率</span><strong>{{ umamiKpis.bounceRate }}</strong></div>
          <div class="ds-admin-uitem"><span>平均停留</span><strong>{{ umamiKpis.avgDuration }}</strong></div>
          <div class="ds-admin-uitem is-live"><span>实时在线</span><strong>{{ umamiKpis.online }}</strong></div>
        </div>

        <div class="ds-admin-metrics-box">
          <div class="ds-admin-dims">
            <button
              v-for="d in metricDims"
              :key="d.value"
              type="button"
              class="ds-admin-dim"
              :class="{ 'is-active': activeMetricDim === d.value }"
              @click="handleDimSwitch(d.value)"
            >
              {{ d.label }}
            </button>
          </div>
          <div v-if="loadingMetrics" class="ds-admin-empty">加载画像维度中…</div>
          <div v-else-if="umamiMetrics.length === 0" class="ds-admin-empty">当前周期暂无该维度数据</div>
          <div v-else class="ds-admin-bars">
            <div v-for="(item, idx) in umamiMetrics" :key="`${item.x}-${idx}`" class="ds-admin-bar-row">
              <div class="ds-admin-bar-meta">
                <span class="ds-admin-bar-name">{{ item.x || (activeMetricDim === "referrer" ? "直接访问" : "未知") }}</span>
                <span class="ds-admin-bar-val">
                  {{ formatNum(item.y) }}
                  <em>{{ metricsTotal ? Math.round((item.y / metricsTotal) * 100) : 0 }}%</em>
                </span>
              </div>
              <div class="ds-admin-track">
                <div class="ds-admin-fill" :style="{ width: `${Math.max(4, Math.round((item.y / metricsMax) * 100))}%` }" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- Monthly Trend + Split Top Articles & Categories -->
    <div v-if="monthlyTrend.length > 0" class="ds-admin-card">
      <div class="ds-admin-card__head">
        <div>
          <div class="ds-admin-card__title">近 12 个月创作趋势</div>
          <div class="ds-admin-card__sub">按月统计站内内容输出节奏</div>
        </div>
      </div>
      <div class="ds-admin-monthly">
        <div v-for="m in monthlyTrend" :key="m.month" class="ds-admin-mcol" :title="`${m.month}：${m.total} 篇`">
          <span class="ds-admin-mval">{{ m.total > 0 ? m.total : "" }}</span>
          <div class="ds-admin-mbar-wrap">
            <div
              class="ds-admin-mbar"
              :style="{ height: `${m.total > 0 ? Math.max(8, Math.round((m.total / maxMonthly) * 100)) : 3}%`, opacity: m.total > 0 ? 1 : 0.2 }"
            />
          </div>
          <span class="ds-admin-mlabel">{{ Number(m.month.slice(5, 7)) }}月</span>
        </div>
      </div>
    </div>

    <div class="ds-admin-split">
      <div class="ds-admin-card">
        <div class="ds-admin-card__head">
          <div class="ds-admin-card__title">热门文章 Top 10</div>
        </div>
        <div v-if="loading" class="ds-admin-empty">加载中…</div>
        <div v-else-if="topArticles.length === 0" class="ds-admin-empty">暂无文章阅读数据</div>
        <div v-else class="ds-admin-bars ds-admin-card__body">
          <div v-for="(art, idx) in topArticles" :key="art.name" class="ds-admin-bar-row">
            <div class="ds-admin-bar-meta">
              <a
                v-if="art.permalink"
                :href="art.permalink"
                target="_blank"
                rel="noopener noreferrer"
                class="ds-admin-bar-name ds-admin-link"
              >
                <span class="ds-admin-rank">{{ String(idx + 1).padStart(2, "0") }}</span>
                {{ art.name }}
              </a>
              <span v-else class="ds-admin-bar-name">
                <span class="ds-admin-rank">{{ String(idx + 1).padStart(2, "0") }}</span>
                {{ art.name }}
              </span>
              <span class="ds-admin-bar-val">{{ formatNum(art.views) }}</span>
            </div>
            <div class="ds-admin-track">
              <div class="ds-admin-fill" :style="{ width: `${Math.max(4, Math.round((art.views / maxArticleViews) * 100))}%` }" />
            </div>
          </div>
        </div>
      </div>

      <div class="ds-admin-card">
        <div class="ds-admin-card__head">
          <div class="ds-admin-card__title">分类占比分布</div>
        </div>
        <div v-if="loading" class="ds-admin-empty">加载中…</div>
        <div v-else-if="topCategories.length === 0" class="ds-admin-empty">暂无分类数据</div>
        <div v-else class="ds-admin-bars ds-admin-card__body">
          <div v-for="cat in topCategories" :key="cat.name" class="ds-admin-bar-row">
            <div class="ds-admin-bar-meta">
              <span class="ds-admin-bar-name">{{ cat.name }}</span>
              <span class="ds-admin-bar-val">{{ cat.total }} 篇</span>
            </div>
            <div class="ds-admin-track">
              <div class="ds-admin-fill" :style="{ width: `${Math.max(4, Math.round((cat.total / maxCatTotal) * 100))}%` }" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ds-admin {
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
}

.ds-admin-uptime {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid #e4e4e7;
  background: #fafafa;
  font-size: 12px;
  font-weight: 500;
  color: #27272a;
  text-decoration: none;
}

.ds-admin-uptime__dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
}

.ds-admin-uptime__dot.is-ok { background: #10b981; }
.ds-admin-uptime__dot.is-warn { background: #f59e0b; }
.ds-admin-uptime__dot.is-err { background: #ef4444; }

.ds-admin-kpis {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.ds-admin-kpi {
  background: #ffffff;
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  padding: 16px 18px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ds-admin-kpi__label {
  font-size: 12px;
  color: #71717a;
  font-weight: 500;
}

.ds-admin-kpi__val {
  font-size: 24px;
  font-weight: 700;
  color: #09090b;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.ds-admin-kpi__sub {
  font-size: 11.5px;
  color: #71717a;
}

.ds-admin-card {
  background: #ffffff;
  border: 1px solid #e4e4e7;
  border-radius: 10px;
  overflow: hidden;
}

.ds-admin-card__head {
  padding: 14px 18px;
  border-bottom: 1px solid #f1f1f4;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.ds-admin-card__title {
  font-size: 14px;
  font-weight: 600;
  color: #09090b;
}

.ds-admin-card__sub {
  font-size: 12px;
  color: #71717a;
  margin-top: 2px;
}

.ds-admin-card__body {
  padding: 16px 18px;
}

.ds-admin-seg {
  display: inline-flex;
  padding: 2px;
  border-radius: 8px;
  background: #f4f4f5;
  gap: 2px;
}

.ds-admin-seg__btn {
  border: none;
  background: transparent;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  color: #52525b;
  cursor: pointer;
}

.ds-admin-seg__btn.is-active {
  background: #ffffff;
  color: #09090b;
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
}

.ds-admin-umami-strip {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  background: #fafafa;
  border-bottom: 1px solid #f1f1f4;
}

.ds-admin-uitem {
  padding: 12px 16px;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.ds-admin-uitem + .ds-admin-uitem {
  border-left: 1px solid #e4e4e7;
}

.ds-admin-uitem span {
  font-size: 11.5px;
  color: #71717a;
}

.ds-admin-uitem strong {
  font-size: 18px;
  font-weight: 700;
  color: #09090b;
  font-variant-numeric: tabular-nums;
}

.ds-admin-uitem.is-live strong {
  color: #059669;
}

.ds-admin-metrics-box {
  padding: 14px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ds-admin-dims {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.ds-admin-dim {
  border: 1px solid #e4e4e7;
  background: #ffffff;
  color: #52525b;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
}

.ds-admin-dim.is-active {
  background: rgba(37, 99, 235, 0.08);
  border-color: rgba(37, 99, 235, 0.24);
  color: #2563eb;
  font-weight: 600;
}

.ds-admin-bars {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.ds-admin-bar-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ds-admin-bar-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 12.5px;
}

.ds-admin-bar-name {
  color: #18181b;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ds-admin-link {
  text-decoration: none;
}

.ds-admin-link:hover {
  color: #2563eb;
}

.ds-admin-rank {
  display: inline-block;
  width: 22px;
  font-size: 11px;
  font-weight: 600;
  color: #2563eb;
  font-variant-numeric: tabular-nums;
}

.ds-admin-bar-val {
  font-size: 12px;
  font-weight: 600;
  color: #27272a;
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}

.ds-admin-bar-val em {
  font-style: normal;
  font-weight: 400;
  color: #71717a;
  margin-left: 6px;
}

.ds-admin-track {
  height: 5px;
  border-radius: 999px;
  background: #f1f5f9;
  overflow: hidden;
}

.ds-admin-fill {
  height: 100%;
  border-radius: 999px;
  background: #2563eb;
}

.ds-admin-monthly {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: 8px;
  padding: 18px 20px 14px;
  height: 170px;
  align-items: end;
}

.ds-admin-mcol {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  height: 100%;
}

.ds-admin-mval {
  font-size: 11px;
  color: #71717a;
  font-variant-numeric: tabular-nums;
  min-height: 15px;
}

.ds-admin-mbar-wrap {
  flex: 1;
  width: 100%;
  max-width: 28px;
  display: flex;
  align-items: flex-end;
}

.ds-admin-mbar {
  width: 100%;
  border-radius: 4px 4px 0 0;
  background: #2563eb;
}

.ds-admin-mlabel {
  font-size: 11px;
  color: #71717a;
}

.ds-admin-split {
  display: grid;
  grid-template-columns: 3fr 2fr;
  gap: 16px;
}

.ds-admin-empty {
  padding: 28px 16px;
  text-align: center;
  font-size: 13px;
  color: #71717a;
}

@media (max-width: 960px) {
  .ds-admin-kpis {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .ds-admin-umami-strip {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .ds-admin-split {
    grid-template-columns: 1fr;
  }
}
</style>
