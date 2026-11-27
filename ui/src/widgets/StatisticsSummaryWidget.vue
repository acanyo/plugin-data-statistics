<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { axiosInstance } from "@halo-dev/api-client";
import MdiChartBoxOutline from "~icons/mdi/chart-box-outline";
import MdiArrowRight from "~icons/mdi/arrow-right";

const API_BASE = "/apis/api.data.statistics.xhhao.com/v1alpha1";
const router = useRouter();

const loading = ref(true);
const posts = ref(0);
const views = ref(0);
const comments = ref(0);
const runningDays = ref(0);
const weeklyPv = ref<number | null>(null);
const online = ref<number | null>(null);

function formatNum(num: number): string {
  const n = Number(num) || 0;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return n.toLocaleString("zh-CN");
}

onMounted(async () => {
  try {
    const [chartRes, visitsRes, realtimeRes] = await Promise.allSettled([
      axiosInstance.get(`${API_BASE}/chart/data`),
      axiosInstance.get(`${API_BASE}/umami/visits`, { params: { type: "weekly" } }),
      axiosInstance.get(`${API_BASE}/umami/realtime`)
    ]);

    if (chartRes.status === "fulfilled" && chartRes.value.data?.summary) {
      const s = chartRes.value.data.summary;
      posts.value = s.totalPosts ?? 0;
      views.value = s.totalViews ?? 0;
      comments.value = s.totalComments ?? 0;
      runningDays.value = s.runningDays ?? 0;
    }

    if (visitsRes.status === "fulfilled" && visitsRes.value.data?.pageviews != null) {
      const pv = visitsRes.value.data.pageviews;
      weeklyPv.value = typeof pv === "object" ? Number(pv.value) || 0 : Number(pv) || 0;
    }

    if (realtimeRes.status === "fulfilled" && realtimeRes.value.data?.totals) {
      online.value = Number(realtimeRes.value.data.totals.visitors) || 0;
    }
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="ds-widget">
    <div class="ds-widget__head">
      <div class="ds-widget__title-box">
        <MdiChartBoxOutline class="ds-widget__icon" />
        <span class="ds-widget__title">数据看板概览</span>
      </div>
      <button type="button" class="ds-widget__link" @click="router.push('/data-statistics')">
        <span>查看详情</span>
        <MdiArrowRight />
      </button>
    </div>

    <div v-if="loading" class="ds-widget__loading">加载统计数据…</div>
    <div v-else class="ds-widget__grid">
      <div class="ds-widget__item">
        <span class="ds-widget__label">已发布文章</span>
        <strong class="ds-widget__val">{{ formatNum(posts) }}</strong>
      </div>
      <div class="ds-widget__item">
        <span class="ds-widget__label">全站总阅读</span>
        <strong class="ds-widget__val">{{ formatNum(views) }}</strong>
      </div>
      <div class="ds-widget__item">
        <span class="ds-widget__label">累计评论</span>
        <strong class="ds-widget__val">{{ formatNum(comments) }}</strong>
      </div>
      <div class="ds-widget__item">
        <span class="ds-widget__label">已运行天数</span>
        <strong class="ds-widget__val">{{ runningDays }} 天</strong>
      </div>
      <div v-if="weeklyPv !== null" class="ds-widget__item">
        <span class="ds-widget__label">近 7 天 PV</span>
        <strong class="ds-widget__val">{{ formatNum(weeklyPv) }}</strong>
      </div>
      <div v-if="online !== null" class="ds-widget__item is-live">
        <span class="ds-widget__label">当前在线</span>
        <strong class="ds-widget__val">{{ online }}</strong>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ds-widget {
  height: 100%;
  background: #ffffff;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  box-sizing: border-box;
}

.ds-widget__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.ds-widget__title-box {
  display: flex;
  align-items: center;
  gap: 7px;
}

.ds-widget__icon {
  width: 18px;
  height: 18px;
  color: #2563eb;
}

.ds-widget__title {
  font-size: 14px;
  font-weight: 600;
  color: #09090b;
}

.ds-widget__link {
  appearance: none;
  border: none;
  background: transparent;
  display: inline-flex;
  align-items: center;
  gap: 3px;
  font-size: 12px;
  font-weight: 500;
  color: #2563eb;
  cursor: pointer;
}

.ds-widget__link:hover {
  text-decoration: underline;
}

.ds-widget__loading {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12.5px;
  color: #71717a;
}

.ds-widget__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  flex: 1;
}

.ds-widget__item {
  border: 1px solid #e4e4e7;
  background: #fafafa;
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2px;
}

.ds-widget__label {
  font-size: 11.5px;
  color: #71717a;
}

.ds-widget__val {
  font-size: 19px;
  font-weight: 700;
  color: #09090b;
  font-variant-numeric: tabular-nums;
}

.ds-widget__item.is-live .ds-widget__val {
  color: #059669;
}
</style>
