<script lang="ts" setup>
import { nodeViewProps, NodeViewWrapper } from "@halo-dev/richtext-editor";
import { reactive, computed, markRaw } from "vue";
import MdiTagMultiple from "~icons/mdi/tag-multiple";
import MdiFolderMultiple from "~icons/mdi/folder-multiple";
import MdiChartLine from "~icons/mdi/chart-line";
import MdiCommentMultiple from "~icons/mdi/comment-multiple";
import MdiFire from "~icons/mdi/fire";

const props = defineProps(nodeViewProps as any);

const chartTypeOptions = [
  { label: "标签统计", value: "tags", icon: markRaw(MdiTagMultiple) },
  { label: "分类统计", value: "categories", icon: markRaw(MdiFolderMultiple) },
  { label: "文章趋势", value: "articles", icon: markRaw(MdiChartLine) },
  { label: "评论排行", value: "comments", icon: markRaw(MdiCommentMultiple) },
  { label: "热门文章", value: "topArticles", icon: markRaw(MdiFire) }
];

const local = reactive({
  types: (props.node?.attrs?.types as string[]) || ["tags", "categories", "articles", "comments", "topArticles"]
});

function sync() {
  props.updateAttributes?.({ types: local.types });
}

function handleTypeToggle(value: string) {
  const index = local.types.indexOf(value);
  if (index > -1) {
    local.types.splice(index, 1);
  } else {
    local.types.push(value);
  }
  sync();
}

const previewCharts = computed(() => {
  const charts = [];
  if (local.types.includes("tags")) {
    charts.push({ type: "tags", title: "标签统计", isPie: true });
  }
  if (local.types.includes("categories")) {
    charts.push({ type: "categories", title: "分类统计", isLine: true });
  }
  if (local.types.includes("articles")) {
    charts.push({ type: "articles", title: "文章趋势", isHeatmap: true });
  }
  if (local.types.includes("comments")) {
    charts.push({ type: "comments", title: "评论排行", isBar: true });
  }
  if (local.types.includes("topArticles")) {
    charts.push({ type: "topArticles", title: "热门文章", isList: true });
  }
  return charts;
});
</script>

<template>
  <node-view-wrapper as="div" class="site-stats-editor">
    <div class="site-stats-editor__header">
      <span class="site-stats-editor__title">网站统计图表</span>
      <span class="site-stats-editor__subtitle">
        选择要展示的统计图表类型，发布后系统会自动从 API 获取实时数据。
      </span>
    </div>

    <div class="site-stats-editor__section">
      <label class="site-stats-editor__field-label">选择图表类型</label>
      <div class="site-stats-editor__type-grid">
        <div
          v-for="option in chartTypeOptions"
          :key="option.value"
          class="site-stats-editor__type-item"
          :class="{ 'site-stats-editor__type-item--active': local.types.includes(option.value) }"
          @click="handleTypeToggle(option.value)"
        >
          <span class="site-stats-editor__type-icon">
            <component :is="option.icon" />
          </span>
          <span class="site-stats-editor__type-label">{{ option.label }}</span>
        </div>
      </div>
    </div>

    <div v-if="previewCharts.length > 0" class="site-stats-editor__preview">
      <div v-for="chart in previewCharts" :key="chart.type" class="site-stats-editor__preview-chart">
        <div class="site-stats-editor__chart-title">{{ chart.title }}</div>
        <div v-if="chart.isPie" class="site-stats-editor__chart-pie">
          <div class="site-stats-editor__chart-slice site-stats-editor__chart-slice--a"></div>
          <div class="site-stats-editor__chart-slice site-stats-editor__chart-slice--b"></div>
          <div class="site-stats-editor__chart-slice site-stats-editor__chart-slice--c"></div>
        </div>
        <div v-else-if="chart.isLine" class="site-stats-editor__chart-line">
          <span class="site-stats-editor__chart-line-bg"></span>
          <span class="site-stats-editor__chart-line-plot"></span>
        </div>
        <div v-else-if="chart.isHeatmap" class="site-stats-editor__chart-heatmap">
          <div class="site-stats-editor__heatmap-grid">
            <span v-for="i in 35" :key="i" class="site-stats-editor__heatmap-cell" :style="{ opacity: Math.random() * 0.5 + 0.3 }"></span>
          </div>
        </div>
        <div v-else-if="chart.isBar" class="site-stats-editor__chart-bar">
          <div v-for="i in 3" :key="i" class="site-stats-editor__bar-item" :style="{ width: `${60 + i * 10}%` }"></div>
        </div>
        <div v-else-if="chart.isList" class="site-stats-editor__preview-list">
          <ul>
            <li v-for="item in 3" :key="item">
              <span class="site-stats-editor__list-index">{{ item }}</span>
              <span class="site-stats-editor__list-title">示例文章标题 {{ item }}</span>
              <span class="site-stats-editor__list-value">1,2{{ item }}0</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div v-else class="site-stats-editor__empty">
      <span class="site-stats-editor__empty-icon">📊</span>
      <span class="site-stats-editor__empty-text">请至少选择一个图表类型</span>
    </div>
  </node-view-wrapper>
</template>

<style scoped>
.site-stats-editor {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 16px;
  background: linear-gradient(180deg, #ffffff 0%, #fafbfc 100%);
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  max-width: 520px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.site-stats-editor__header {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding-bottom: 4px;
  border-bottom: 1px solid #f3f4f6;
}

.site-stats-editor__title {
  font-size: 15px;
  font-weight: 600;
  color: #111827;
  letter-spacing: -0.01em;
}

.site-stats-editor__subtitle {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.6;
}

.site-stats-editor__section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.site-stats-editor__field-label {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 2px;
}

.site-stats-editor__type-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.site-stats-editor__type-item {
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  position: relative;
  overflow: hidden;
}

.site-stats-editor__type-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(59, 130, 246, 0.02));
  opacity: 0;
  transition: opacity 0.2s ease;
}

.site-stats-editor__type-item:hover {
  border-color: #3b82f6;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.12);
}

.site-stats-editor__type-item:hover::before {
  opacity: 1;
}

.site-stats-editor__type-item--active {
  border-color: #3b82f6;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(59, 130, 246, 0.05));
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

.site-stats-editor__type-item--active::before {
  opacity: 1;
}

.site-stats-editor__type-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: #6b7280;
  position: relative;
  z-index: 1;
  transition: color 0.2s ease, transform 0.2s ease;
}

.site-stats-editor__type-icon svg {
  width: 22px;
  height: 22px;
}

.site-stats-editor__type-item:hover .site-stats-editor__type-icon {
  color: #3b82f6;
  transform: scale(1.1);
}

.site-stats-editor__type-item--active .site-stats-editor__type-icon {
  color: #2563eb;
}

.site-stats-editor__type-label {
  font-size: 11px;
  font-weight: 500;
  color: #4b5563;
  text-align: center;
  position: relative;
  z-index: 1;
  transition: color 0.2s ease, font-weight 0.2s ease;
}

.site-stats-editor__type-item:hover .site-stats-editor__type-label {
  color: #1f2937;
}

.site-stats-editor__type-item--active .site-stats-editor__type-label {
  color: #1d4ed8;
  font-weight: 600;
}

.site-stats-editor__empty {
  border: 1.5px dashed #d1d5db;
  border-radius: 10px;
  padding: 32px 20px;
  background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%);
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.site-stats-editor__empty-icon {
  font-size: 32px;
  opacity: 0.5;
}

.site-stats-editor__empty-text {
  font-size: 13px;
  color: #9ca3af;
  font-weight: 500;
}

.site-stats-editor__preview {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 12px;
  border: 1.5px dashed #e5e7eb;
  border-radius: 12px;
  padding: 14px;
  background: linear-gradient(135deg, #fafbfc 0%, #ffffff 100%);
}

.site-stats-editor__preview-chart {
  background: #ffffff;
  border: 1.5px solid rgba(59, 130, 246, 0.12);
  border-radius: 10px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
}

.site-stats-editor__preview-chart:hover {
  border-color: rgba(59, 130, 246, 0.2);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.06);
}

.site-stats-editor__chart-title {
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  letter-spacing: -0.01em;
}

.site-stats-editor__chart-pie {
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: conic-gradient(
    rgba(59, 130, 246, 0.75) 0% 35%,
    rgba(16, 185, 129, 0.75) 35% 70%,
    rgba(249, 115, 22, 0.75) 70% 100%
  );
  align-self: center;
  box-shadow: inset 0 0 0 5px #ffffff;
}

.site-stats-editor__chart-slice {
  display: none;
}

.site-stats-editor__chart-line {
  position: relative;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
}

.site-stats-editor__chart-line-bg {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    to right,
    rgba(59, 130, 246, 0.08),
    rgba(59, 130, 246, 0.08) 6px,
    transparent 6px,
    transparent 12px
  );
}

.site-stats-editor__chart-line-plot {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.65), rgba(14, 165, 233, 0.65));
  mask: radial-gradient(circle at 12% 72%, transparent 35%, black 36%) 0 0 / 24px 24px repeat;
  opacity: 0.9;
  border-radius: 8px;
}

.site-stats-editor__preview-list {
  background: #ffffff;
  border: 1px solid rgba(99, 102, 241, 0.12);
  border-radius: 10px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.site-stats-editor__chart-heatmap {
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
}

.site-stats-editor__heatmap-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
  height: 100%;
}

.site-stats-editor__heatmap-cell {
  background: rgba(59, 130, 246, 0.6);
  border-radius: 3px;
  min-height: 8px;
}

.site-stats-editor__chart-bar {
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 80px;
  justify-content: center;
}

.site-stats-editor__bar-item {
  height: 12px;
  background: linear-gradient(90deg, rgba(59, 130, 246, 0.6), rgba(59, 130, 246, 0.4));
  border-radius: 6px;
}

.site-stats-editor__preview-list ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.site-stats-editor__preview-list li {
  display: grid;
  grid-template-columns: 20px 1fr auto;
  gap: 6px;
  align-items: center;
  font-size: 12px;
  color: #374151;
}

.site-stats-editor__list-index {
  width: 20px;
  height: 20px;
  border-radius: 6px;
  background: rgba(59, 130, 246, 0.12);
  color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

.site-stats-editor__list-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.site-stats-editor__list-value {
  font-weight: 600;
  color: #1f2937;
}
</style>

