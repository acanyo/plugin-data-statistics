<script lang="ts" setup>
import { nodeViewProps, NodeViewWrapper } from "@halo-dev/richtext-editor";
import { reactive } from "vue";

const props = defineProps(nodeViewProps as any);

const variantOptions = [
  {
    label: "流量统计",
    value: "traffic",
    description: "展示页面浏览量、访问次数、访客数以及实时数据。"
  },
  {
    label: "近30分钟网站活动",
    value: "activity",
    description: "展示最近30分钟内的访客访问路径与设备信息。"
  }
];

const typeOptions = [
  { label: "日", value: "daily" },
  { label: "周", value: "weekly" },
  { label: "月", value: "monthly" },
  { label: "季度", value: "quarterly" },
  { label: "年", value: "yearly" }
];

const local = reactive({
  variant: (props.node?.attrs?.variant as string) || "traffic",
  type: (props.node?.attrs?.type as string) || "weekly"
});

function sync() {
  props.updateAttributes?.({
    variant: local.variant,
    type: local.variant === "traffic" ? local.type : undefined
  });
}

function handleVariantChange(value: string) {
  if (local.variant === value) return;
  local.variant = value;
  if (value !== "traffic") {
    local.type = "weekly";
  }
  sync();
}

function handleTypeChange(value: string) {
  if (local.type === value) return;
  local.type = value;
  sync();
}
</script>

<template>
  <node-view-wrapper as="div" class="stats-editor">
    <div class="stats-editor__header">
      <span class="stats-editor__title">Umami 统计组件</span>
      <span class="stats-editor__subtitle">选择要插入的 Umami 统计模块，发布后前台将自动渲染。</span>
    </div>

    <div class="stats-editor__section">
      <div
        v-for="option in variantOptions"
        :key="option.value"
        class="stats-editor__variant"
        :class="{ 'stats-editor__variant--active': local.variant === option.value }"
        @click="handleVariantChange(option.value)"
      >
        <div class="stats-editor__variant-label">{{ option.label }}</div>
        <div class="stats-editor__variant-desc">{{ option.description }}</div>
      </div>
    </div>

    <div v-if="local.variant === 'traffic'" class="stats-editor__section">
      <label class="stats-editor__field-label" for="stats-type-select">展示周期</label>
      <select
        id="stats-type-select"
        class="stats-editor__select"
        :value="local.type"
        @change="handleTypeChange(($event.target as HTMLSelectElement).value)"
      >
        <option v-for="option in typeOptions" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>
      <div class="stats-editor__preview stats-editor__preview--traffic">
        <div class="stats-editor__preview-card" v-for="card in 5" :key="card">
          <div class="stats-editor__preview-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
          </div>
          <div class="stats-editor__preview-value">850</div>
          <div class="stats-editor__preview-label">示例指标</div>
        </div>
      </div>
    </div>

    <div v-else class="stats-editor__section">
      <div class="stats-editor__preview stats-editor__preview--activity">
        <div class="stats-editor__preview-activity-item" v-for="item in 3" :key="item">
          <div class="stats-editor__preview-activity-time">下午 2:06:20</div>
          <div class="stats-editor__preview-activity-detail">
            来自 <strong>中国</strong> 的访客在 <strong>Chrome</strong> 浏览器访问 <code>/archives/example</code>
          </div>
        </div>
      </div>
    </div>
  </node-view-wrapper>
</template>

<style scoped>
.stats-editor {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 12px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: 'Inter', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.stats-editor__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stats-editor__title {
  font-size: 14px;
  font-weight: 600;
  color: #111827;
}

.stats-editor__subtitle {
  font-size: 12px;
  color: #6b7280;
}

.stats-editor__section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.stats-editor__variant {
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #f9fafb;
}

.stats-editor__variant:hover {
  border-color: #3b82f6;
}

.stats-editor__variant--active {
  border-color: #3b82f6;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.08), rgba(59, 130, 246, 0.03));
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.1);
}

.stats-editor__variant-label {
  font-size: 13px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.stats-editor__variant-desc {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.5;
}

.stats-editor__field-label {
  font-size: 12px;
  font-weight: 600;
  color: #1f2937;
}

.stats-editor__select {
  padding: 6px 10px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 12px;
  color: #1f2937;
  width: 180px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.stats-editor__select:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
}

.stats-editor__preview {
  border: 1px dashed #d1d5db;
  border-radius: 10px;
  padding: 12px;
  background: #f9fafb;
  display: flex;
  gap: 12px;
  overflow: hidden;
}

.stats-editor__preview--traffic {
  justify-content: space-between;
}

.stats-editor__preview-card {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 10px;
  border-radius: 8px;
  background: #fff;
  border: 1px solid rgba(59, 130, 246, 0.08);
}

.stats-editor__preview-icon {
  width: 34px;
  height: 34px;
  border-radius: 8px;
  background: #eff6ff;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #2563eb;
}

.stats-editor__preview-icon svg {
  width: 18px;
  height: 18px;
}

.stats-editor__preview-value {
  font-size: 18px;
  font-weight: 600;
  color: #1d4ed8;
}

.stats-editor__preview-label {
  font-size: 11px;
  color: #6b7280;
}

.stats-editor__preview--activity {
  flex-direction: column;
  gap: 8px;
}

.stats-editor__preview-activity-item {
  background: #fff;
  border: 1px solid rgba(79, 70, 229, 0.12);
  border-radius: 8px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.stats-editor__preview-activity-time {
  font-size: 12px;
  font-weight: 600;
  color: #4338ca;
}

.stats-editor__preview-activity-detail {
  font-size: 12px;
  color: #4b5563;
  line-height: 1.5;
}

.stats-editor__preview-activity-detail code {
  background: #eef2ff;
  padding: 1px 4px;
  border-radius: 4px;
  font-size: 11px;
}
</style>

