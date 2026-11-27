<script lang="ts" setup>
import { nodeViewProps, NodeViewWrapper } from "@halo-dev/richtext-editor";
import { reactive, computed, markRaw } from "vue";
import MdiChartBoxOutline from "~icons/mdi/chart-box-outline";
import MdiChartBar from "~icons/mdi/chart-bar";
import MdiChartTimelineVariant from "~icons/mdi/chart-timeline-variant";
import MdiHeartPulse from "~icons/mdi/heart-pulse";
import MdiGithub from "~icons/mdi/github";
import MdiViewDashboardOutline from "~icons/mdi/view-dashboard-outline";
import MdiTagMultiple from "~icons/mdi/tag-multiple";
import MdiFolderMultiple from "~icons/mdi/folder-multiple";
import MdiCalendarMonth from "~icons/mdi/calendar-month";
import MdiChartAreaspline from "~icons/mdi/chart-areaspline";
import MdiCommentMultiple from "~icons/mdi/comment-multiple";
import MdiFire from "~icons/mdi/fire";
import MdiCodeTags from "~icons/mdi/code-tags";
import MdiPin from "~icons/mdi/pin";
import MdiChevronDown from "~icons/mdi/chevron-down";
import MdiCheck from "~icons/mdi/check";
import {
  DEFAULT_SITE_CHART_TYPES,
  type StatisticsCategory,
  type UmamiPeriod,
  type UmamiVariant
} from "./dataStatisticsBlock";

const props = defineProps(nodeViewProps as any);

const categoryTabs: Array<{ value: StatisticsCategory; label: string; icon: unknown }> = [
  { value: "site", label: "站内图表", icon: markRaw(MdiChartBar) },
  { value: "umami", label: "Umami 流量", icon: markRaw(MdiChartTimelineVariant) },
  { value: "uptime", label: "服务状态", icon: markRaw(MdiHeartPulse) },
  { value: "github", label: "GitHub 统计", icon: markRaw(MdiGithub) }
];

const siteChartOptions = [
  { label: "全站概览", value: "overview", icon: markRaw(MdiViewDashboardOutline) },
  { label: "标签分布", value: "tags", icon: markRaw(MdiTagMultiple) },
  { label: "分类占比", value: "categories", icon: markRaw(MdiFolderMultiple) },
  { label: "创作热力图", value: "articles", icon: markRaw(MdiCalendarMonth) },
  { label: "月度趋势", value: "monthlyTrend", icon: markRaw(MdiChartAreaspline) },
  { label: "评论活跃榜", value: "comments", icon: markRaw(MdiCommentMultiple) },
  { label: "热门文章", value: "topArticles", icon: markRaw(MdiFire) }
];

const umamiVariantOptions: Array<{ label: string; value: UmamiVariant; description: string }> = [
  { label: "流量统计概览", value: "traffic", description: "浏览量、环比涨跌、访问趋势与实时在线" },
  { label: "近 30 分钟动态", value: "activity", description: "实时访客路径时间轴与终端筛选" },
  { label: "访客画像分析", value: "metrics", description: "来源渠道、国家地区、浏览器与热门页" }
];

const umamiPeriodOptions: Array<{ label: string; value: UmamiPeriod }> = [
  { label: "今日", value: "daily" },
  { label: "近 7 天", value: "weekly" },
  { label: "近 30 天", value: "monthly" },
  { label: "近 90 天", value: "quarterly" },
  { label: "近一年", value: "yearly" }
];

const githubTypeOptions = [
  { label: "活跃热力图", value: "graph", icon: markRaw(MdiChartTimelineVariant) },
  { label: "贡献统计", value: "stats", icon: markRaw(MdiChartBar) },
  { label: "仓库展示", value: "pin", icon: markRaw(MdiPin) },
  { label: "语言统计", value: "top-langs", icon: markRaw(MdiCodeTags) }
];

const graphThemes = [
  { value: "minimal", label: "Minimal（默认）" },
  { value: "github-light", label: "GitHub Light" },
  { value: "github-dark", label: "GitHub Dark" },
  { value: "github-dark-dimmed", label: "GitHub Dark Dimmed" },
  { value: "nord", label: "Nord" },
  { value: "lucent", label: "Lucent" },
  { value: "radical", label: "Radical" },
  { value: "dracula", label: "Dracula" },
  { value: "gruvbox", label: "Gruvbox" },
  { value: "one-dark", label: "One Dark" },
  { value: "tokyo-day", label: "Tokyo Day" },
  { value: "tokyo-night", label: "Tokyo Night" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "high-contrast", label: "High Contrast" }
];

const heatmapCells = [
  0, 1, 2, 0, 1, 3, 2, 0, 1, 4, 2, 1,
  1, 0, 3, 2, 0, 1, 4, 2, 0, 1, 2, 3,
  0, 2, 1, 4, 3, 0, 2, 1, 3, 0, 4, 2
];

const uptimeSamples = [
  { label: "所有业务正常", dotClass: "is-success" },
  { label: "部分业务异常", dotClass: "is-warning" },
  { label: "全部业务异常", dotClass: "is-error" }
];

const attrs = props.node?.attrs || {};

const local = reactive({
  category: (attrs.category as StatisticsCategory) || "site",
  siteTypes: Array.isArray(attrs.siteTypes) ? [...(attrs.siteTypes as string[])] : [...DEFAULT_SITE_CHART_TYPES],
  siteCompact: Boolean(attrs.siteCompact),
  umamiVariant: (attrs.umamiVariant as UmamiVariant) || "traffic",
  umamiType: (attrs.umamiType as UmamiPeriod) || "weekly",
  githubTypes: Array.isArray(attrs.githubTypes) ? [...(attrs.githubTypes as string[])] : ["graph"],
  statsLocale: (attrs.statsLocale as string) || "",
  statsShowIcons: (attrs.statsShowIcons as string) || "",
  statsTheme: (attrs.statsTheme as string) || "",
  pinRepo: (attrs.pinRepo as string) || "",
  topLangsLayout: (attrs.topLangsLayout as string) || "",
  topLangsHideProgress: (attrs.topLangsHideProgress as string) || "",
  topLangsStatsFormat: (attrs.topLangsStatsFormat as string) || "",
  graphTheme: (attrs.graphTheme as string) || "minimal",
  expandedGithub: {
    graph: false,
    stats: false,
    pin: false,
    topLangs: false
  }
});

function sync() {
  props.updateAttributes?.({
    category: local.category,
    siteTypes: [...local.siteTypes],
    siteCompact: local.siteCompact,
    umamiVariant: local.umamiVariant,
    umamiType: local.umamiType,
    githubTypes: [...local.githubTypes],
    statsLocale: local.statsLocale,
    statsShowIcons: local.statsShowIcons,
    statsTheme: local.statsTheme,
    pinRepo: local.pinRepo,
    topLangsLayout: local.topLangsLayout,
    topLangsHideProgress: local.topLangsHideProgress,
    topLangsStatsFormat: local.topLangsStatsFormat,
    graphTheme: local.graphTheme
  });
}

function setCategory(cat: StatisticsCategory) {
  if (local.category === cat) return;
  local.category = cat;
  sync();
}

function toggleSiteType(val: string) {
  const idx = local.siteTypes.indexOf(val);
  if (idx > -1) {
    local.siteTypes.splice(idx, 1);
  } else {
    local.siteTypes.push(val);
  }
  sync();
}

function applySitePreset(preset: "all" | "heatmap" | "clear") {
  if (preset === "all") {
    local.siteTypes = [...DEFAULT_SITE_CHART_TYPES];
  } else if (preset === "heatmap") {
    local.siteTypes = ["articles"];
  } else {
    local.siteTypes = [];
  }
  sync();
}

function toggleCompact() {
  local.siteCompact = !local.siteCompact;
  sync();
}

function setUmamiVariant(variant: UmamiVariant) {
  if (local.umamiVariant === variant) return;
  local.umamiVariant = variant;
  if (variant === "metrics" && !local.umamiType) {
    local.umamiType = "monthly";
  }
  sync();
}

function setUmamiPeriod(period: UmamiPeriod) {
  if (local.umamiType === period) return;
  local.umamiType = period;
  sync();
}

function toggleGithubType(val: string) {
  const idx = local.githubTypes.indexOf(val);
  if (idx > -1) {
    local.githubTypes.splice(idx, 1);
  } else {
    local.githubTypes.push(val);
  }
  sync();
}

function toggleGithubConfig(key: keyof typeof local.expandedGithub) {
  local.expandedGithub[key] = !local.expandedGithub[key];
}

const statusPill = computed(() => {
  if (local.category === "site") {
    return `站内 · ${local.siteTypes.length} / ${siteChartOptions.length}${local.siteCompact ? " · 精简" : ""}`;
  }
  if (local.category === "umami") {
    if (local.umamiVariant === "activity") return "Umami · 实时动态";
    const matched = umamiPeriodOptions.find((o) => o.value === local.umamiType);
    const label = local.umamiVariant === "metrics" ? "访客画像" : "流量统计";
    return matched ? `${label} · ${matched.label}` : label;
  }
  if (local.category === "uptime") {
    return "Uptime · 实时监测";
  }
  return `GitHub · 已选 ${local.githubTypes.length} 项`;
});

const previewSiteCharts = computed(() => {
  const list: Array<{ type: string; title: string; fullWidth?: boolean }> = [];
  if (local.siteTypes.includes("overview")) list.push({ type: "overview", title: "全站内容概览", fullWidth: true });
  if (local.siteTypes.includes("tags")) list.push({ type: "tags", title: "标签分布" });
  if (local.siteTypes.includes("categories")) list.push({ type: "categories", title: "分类占比" });
  if (local.siteTypes.includes("articles")) list.push({ type: "articles", title: "创作活跃度", fullWidth: true });
  if (local.siteTypes.includes("monthlyTrend")) list.push({ type: "monthlyTrend", title: "月度创作趋势", fullWidth: true });
  if (local.siteTypes.includes("comments")) list.push({ type: "comments", title: "评论活跃榜" });
  if (local.siteTypes.includes("topArticles")) list.push({ type: "topArticles", title: "热门文章排行" });
  return list;
});
</script>

<template>
  <node-view-wrapper as="div" class="ds-block">
    <!-- Top Identity Header -->
    <div class="ds-block__header">
      <div class="ds-block__identity">
        <span class="ds-block__icon">
          <MdiChartBoxOutline />
        </span>
        <div class="ds-block__headings">
          <span class="ds-block__title">统计图表</span>
          <span class="ds-block__subtitle">发布后在前台自动加载实时数据组件</span>
        </div>
      </div>
      <span class="ds-block__pill">{{ statusPill }}</span>
    </div>

    <!-- Unified 4-Category Switcher -->
    <div class="ds-cat-bar" role="tablist" aria-label="统计图表类型">
      <button
        v-for="tab in categoryTabs"
        :key="tab.value"
        type="button"
        role="tab"
        class="ds-cat-btn"
        :class="{ 'is-active': local.category === tab.value }"
        :aria-selected="local.category === tab.value"
        @click="setCategory(tab.value)"
      >
        <component :is="tab.icon" class="ds-cat-btn__icon" />
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <div class="ds-block__body">
      <!-- ==================== 1. SITE CHARTS ==================== -->
      <template v-if="local.category === 'site'">
        <div class="ds-section">
          <div class="ds-label-row">
            <span class="ds-label">展示模块</span>
            <div class="ds-quick-actions">
              <button type="button" class="ds-link-btn" @click="applySitePreset('heatmap')">仅热力图</button>
              <span class="ds-divider">·</span>
              <button type="button" class="ds-link-btn" @click="applySitePreset('all')">全选</button>
              <span class="ds-divider">·</span>
              <button type="button" class="ds-link-btn" @click="applySitePreset('clear')">清空</button>
            </div>
          </div>

          <div class="ds-chip-grid ds-chip-grid--3">
            <button
              v-for="option in siteChartOptions"
              :key="option.value"
              type="button"
              class="ds-chip"
              :class="{ 'is-active': local.siteTypes.includes(option.value) }"
              :aria-pressed="local.siteTypes.includes(option.value)"
              @click="toggleSiteType(option.value)"
            >
              <span class="ds-chip__icon"><component :is="option.icon" /></span>
              <span class="ds-chip__label">{{ option.label }}</span>
              <span v-if="local.siteTypes.includes(option.value)" class="ds-chip__check"><MdiCheck /></span>
            </button>
          </div>

          <div class="ds-inline-option">
            <label class="ds-toggle-label">
              <input type="checkbox" :checked="local.siteCompact" @change="toggleCompact" />
              <span>精简嵌入模式</span>
              <span class="ds-toggle-hint">隐藏副标题与统计条，适合单图表紧凑嵌入</span>
            </label>
          </div>
        </div>

        <div v-if="previewSiteCharts.length > 0" class="ds-preview">
          <div
            v-for="chart in previewSiteCharts"
            :key="chart.type"
            class="ds-preview__card"
            :class="{ 'is-full': chart.fullWidth }"
          >
            <div class="ds-preview__title">{{ chart.title }}</div>

            <div v-if="chart.type === 'overview'" class="ds-mini-overview">
              <div class="ds-mini-kpi"><strong>128</strong><span>文章</span></div>
              <div class="ds-mini-kpi"><strong>46.8K</strong><span>阅读</span></div>
              <div class="ds-mini-kpi"><strong>312</strong><span>评论</span></div>
              <div class="ds-mini-kpi"><strong>686 天</strong><span>运行</span></div>
            </div>

            <div v-else-if="chart.type === 'tags'" class="ds-mini-donut">
              <svg viewBox="0 0 42 42" class="ds-mini-donut__svg" aria-hidden="true">
                <circle cx="21" cy="21" r="15" fill="none" stroke="var(--ed-bar-track)" stroke-width="5" />
                <circle cx="21" cy="21" r="15" fill="none" stroke="#2563eb" stroke-width="5" stroke-dasharray="38 94.2" />
                <circle cx="21" cy="21" r="15" fill="none" stroke="#0ea5e9" stroke-width="5" stroke-dasharray="26 94.2" stroke-dashoffset="-38" />
                <circle cx="21" cy="21" r="15" fill="none" stroke="#10b981" stroke-width="5" stroke-dasharray="18 94.2" stroke-dashoffset="-64" />
              </svg>
              <div class="ds-mini-donut__legend">
                <span><i style="background:#2563eb"></i>技术</span>
                <span><i style="background:#0ea5e9"></i>随笔</span>
                <span><i style="background:#10b981"></i>工具</span>
              </div>
            </div>

            <div v-else-if="chart.type === 'categories'" class="ds-mini-bars">
              <div class="ds-mini-bar"><span style="width:88%;opacity:1"></span></div>
              <div class="ds-mini-bar"><span style="width:64%;opacity:0.75"></span></div>
              <div class="ds-mini-bar"><span style="width:42%;opacity:0.52"></span></div>
            </div>

            <div v-else-if="chart.type === 'articles'" class="ds-mini-heatmap">
              <span v-for="(level, idx) in heatmapCells" :key="idx" class="ds-mini-heatmap__cell" :data-level="level" />
            </div>

            <div v-else-if="chart.type === 'monthlyTrend'">
              <svg viewBox="0 0 220 38" preserveAspectRatio="none" style="width:100%;height:34px;display:block">
                <path d="M0 32 Q30 16 55 22 T110 12 T165 18 T220 7 L220 38 L0 38 Z" fill="rgba(37,99,235,0.12)" />
                <path d="M0 32 Q30 16 55 22 T110 12 T165 18 T220 7" fill="none" stroke="#2563eb" stroke-width="2" />
              </svg>
            </div>

            <div v-else-if="chart.type === 'comments'" class="ds-mini-hbars">
              <div class="ds-mini-hbar"><span class="ds-mini-hbar__name"></span><span class="ds-mini-hbar__track"><i style="width:88%"></i></span></div>
              <div class="ds-mini-hbar"><span class="ds-mini-hbar__name"></span><span class="ds-mini-hbar__track"><i style="width:64%;opacity:0.7"></i></span></div>
              <div class="ds-mini-hbar"><span class="ds-mini-hbar__name"></span><span class="ds-mini-hbar__track"><i style="width:42%;opacity:0.45"></i></span></div>
            </div>

            <div v-else-if="chart.type === 'topArticles'" class="ds-mini-rank">
              <div v-for="rank in 3" :key="rank" class="ds-mini-rank__row">
                <span class="ds-mini-rank__num">0{{ rank }}</span>
                <span class="ds-mini-rank__line"><i :style="{ width: `${94 - (rank - 1) * 22}%` }"></i></span>
                <span class="ds-mini-rank__val">{{ 14 - rank * 3 }}.2K</span>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="ds-empty">请至少选择一个站内图表模块</div>
      </template>

      <!-- ==================== 2. UMAMI ==================== -->
      <template v-else-if="local.category === 'umami'">
        <div class="ds-section">
          <span class="ds-label">组件形态</span>
          <div class="ds-variant-grid">
            <button
              v-for="option in umamiVariantOptions"
              :key="option.value"
              type="button"
              class="ds-variant-card"
              :class="{ 'is-active': local.umamiVariant === option.value }"
              @click="setUmamiVariant(option.value)"
            >
              <div class="ds-variant-card__top">
                <span class="ds-variant-card__title">{{ option.label }}</span>
                <span class="ds-variant-card__radio" />
              </div>
              <span class="ds-variant-card__desc">{{ option.description }}</span>
            </button>
          </div>
        </div>

        <div v-if="local.umamiVariant !== 'activity'" class="ds-section">
          <span class="ds-label">默认统计周期</span>
          <div class="ds-segmented" role="radiogroup">
            <button
              v-for="opt in umamiPeriodOptions"
              :key="opt.value"
              type="button"
              class="ds-segmented__btn"
              :class="{ 'is-active': local.umamiType === opt.value }"
              @click="setUmamiPeriod(opt.value)"
            >
              {{ opt.label }}
            </button>
          </div>
        </div>

        <div v-if="local.umamiVariant === 'traffic'" class="ds-preview-traffic">
          <div class="ds-mini-kpi"><span>页面浏览量</span><strong>12.4K</strong></div>
          <div class="ds-mini-kpi"><span>访问次数</span><strong>4.8K</strong></div>
          <div class="ds-mini-kpi"><span>独立访客</span><strong>2.9K</strong></div>
          <div class="ds-mini-kpi"><span>实时在线</span><strong class="is-live">16</strong></div>
        </div>
        <div v-else-if="local.umamiVariant === 'metrics'" class="ds-preview-list">
          <div class="ds-preview-list__row"><span>直接访问</span><span>46%</span></div>
          <div class="ds-preview-list__row"><span>google.com</span><span>28%</span></div>
          <div class="ds-preview-list__row"><span>github.com</span><span>14%</span></div>
        </div>
        <div v-else class="ds-preview-list">
          <div class="ds-preview-list__row"><code>/archives/halo-stats</code><span>中国 · macOS · Chrome</span></div>
          <div class="ds-preview-list__row"><code>/</code><span>中国香港 · iOS · Safari</span></div>
        </div>
      </template>

      <!-- ==================== 3. UPTIME ==================== -->
      <template v-else-if="local.category === 'uptime'">
        <div class="ds-uptime-preview">
          <span v-for="item in uptimeSamples" :key="item.label" class="ds-uptime-pill">
            <span class="ds-uptime-pill__dot" :class="item.dotClass" />
            <span>{{ item.label }}</span>
          </span>
        </div>
        <div class="ds-hint">
          前台每 60 秒静默刷新 Uptime Kuma 状态页健康状态；请在「插件设置 → uptime 设置」中填写状态页完整 URL。
        </div>
      </template>

      <!-- ==================== 4. GITHUB ==================== -->
      <template v-else>
        <div class="ds-section">
          <span class="ds-label">展示模块</span>
          <div class="ds-chip-grid ds-chip-grid--2">
            <button
              v-for="option in githubTypeOptions"
              :key="option.value"
              type="button"
              class="ds-chip"
              :class="{ 'is-active': local.githubTypes.includes(option.value) }"
              :aria-pressed="local.githubTypes.includes(option.value)"
              @click="toggleGithubType(option.value)"
            >
              <span class="ds-chip__icon"><component :is="option.icon" /></span>
              <span class="ds-chip__label">{{ option.label }}</span>
              <span v-if="local.githubTypes.includes(option.value)" class="ds-chip__check"><MdiCheck /></span>
            </button>
          </div>
        </div>

        <div v-if="local.githubTypes.length > 0" class="ds-accordions">
          <div v-if="local.githubTypes.includes('graph')" class="ds-accordion">
            <button type="button" class="ds-accordion__head" @click="toggleGithubConfig('graph')">
              <span>活跃热力图配置</span>
              <span class="ds-accordion__right">
                <span class="ds-accordion__summary">{{ local.graphTheme }}</span>
                <MdiChevronDown class="ds-accordion__arrow" :class="{ 'is-open': local.expandedGithub.graph }" />
              </span>
            </button>
            <div v-show="local.expandedGithub.graph" class="ds-accordion__body">
              <div class="ds-field">
                <label class="ds-field__label">配色主题</label>
                <select class="ds-select" :value="local.graphTheme" @change="local.graphTheme = ($event.target as HTMLSelectElement).value; sync()">
                  <option v-for="t in graphThemes" :key="t.value" :value="t.value">{{ t.label }}</option>
                </select>
              </div>
            </div>
          </div>

          <div v-if="local.githubTypes.includes('stats')" class="ds-accordion">
            <button type="button" class="ds-accordion__head" @click="toggleGithubConfig('stats')">
              <span>贡献统计配置</span>
              <span class="ds-accordion__right">
                <span class="ds-accordion__summary">{{ local.statsTheme || "默认主题" }}</span>
                <MdiChevronDown class="ds-accordion__arrow" :class="{ 'is-open': local.expandedGithub.stats }" />
              </span>
            </button>
            <div v-show="local.expandedGithub.stats" class="ds-accordion__body">
              <div class="ds-field-grid">
                <div class="ds-field">
                  <label class="ds-field__label">语言</label>
                  <select class="ds-select" :value="local.statsLocale" @change="local.statsLocale = ($event.target as HTMLSelectElement).value; sync()">
                    <option value="">默认</option>
                    <option value="cn">简体中文</option>
                    <option value="zh-tw">繁体中文</option>
                    <option value="en">English</option>
                  </select>
                </div>
                <div class="ds-field">
                  <label class="ds-field__label">显示图标</label>
                  <select class="ds-select" :value="local.statsShowIcons" @change="local.statsShowIcons = ($event.target as HTMLSelectElement).value; sync()">
                    <option value="">默认</option>
                    <option value="true">显示</option>
                    <option value="false">隐藏</option>
                  </select>
                </div>
                <div class="ds-field">
                  <label class="ds-field__label">卡片主题</label>
                  <select class="ds-select" :value="local.statsTheme" @change="local.statsTheme = ($event.target as HTMLSelectElement).value; sync()">
                    <option value="">默认</option>
                    <option value="dark">Dark</option>
                    <option value="radical">Radical</option>
                    <option value="merko">Merko</option>
                    <option value="gruvbox">Gruvbox</option>
                    <option value="dracula">Dracula</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div v-if="local.githubTypes.includes('pin')" class="ds-accordion">
            <button type="button" class="ds-accordion__head" @click="toggleGithubConfig('pin')">
              <span>仓库展示配置</span>
              <span class="ds-accordion__right">
                <span class="ds-accordion__summary">{{ local.pinRepo || "默认仓库" }}</span>
                <MdiChevronDown class="ds-accordion__arrow" :class="{ 'is-open': local.expandedGithub.pin }" />
              </span>
            </button>
            <div v-show="local.expandedGithub.pin" class="ds-accordion__body">
              <div class="ds-field">
                <label class="ds-field__label">仓库名称（留空使用默认）</label>
                <input
                  class="ds-input"
                  type="text"
                  placeholder="例如：plugin-data-statistics"
                  :value="local.pinRepo"
                  @input="local.pinRepo = ($event.target as HTMLInputElement).value; sync()"
                />
              </div>
            </div>
          </div>

          <div v-if="local.githubTypes.includes('top-langs')" class="ds-accordion">
            <button type="button" class="ds-accordion__head" @click="toggleGithubConfig('topLangs')">
              <span>语言统计配置</span>
              <span class="ds-accordion__right">
                <span class="ds-accordion__summary">{{ local.topLangsLayout || "默认布局" }}</span>
                <MdiChevronDown class="ds-accordion__arrow" :class="{ 'is-open': local.expandedGithub.topLangs }" />
              </span>
            </button>
            <div v-show="local.expandedGithub.topLangs" class="ds-accordion__body">
              <div class="ds-field-grid">
                <div class="ds-field">
                  <label class="ds-field__label">布局方式</label>
                  <select class="ds-select" :value="local.topLangsLayout" @change="local.topLangsLayout = ($event.target as HTMLSelectElement).value; sync()">
                    <option value="">默认</option>
                    <option value="compact">紧凑</option>
                    <option value="donut">圆环</option>
                    <option value="pie">饼图</option>
                  </select>
                </div>
                <div class="ds-field">
                  <label class="ds-field__label">进度条</label>
                  <select class="ds-select" :value="local.topLangsHideProgress" @change="local.topLangsHideProgress = ($event.target as HTMLSelectElement).value; sync()">
                    <option value="">显示</option>
                    <option value="true">隐藏</option>
                  </select>
                </div>
                <div class="ds-field">
                  <label class="ds-field__label">统计格式</label>
                  <select class="ds-select" :value="local.topLangsStatsFormat" @change="local.topLangsStatsFormat = ($event.target as HTMLSelectElement).value; sync()">
                    <option value="">百分比</option>
                    <option value="bytes">字节数</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="ds-empty">请至少选择一个 GitHub 统计模块</div>
      </template>
    </div>
  </node-view-wrapper>
</template>

<style scoped>
.ds-block {
  --ed-surface: #ffffff;
  --ed-surface-subtle: #fafafa;
  --ed-surface-hover: #f4f4f5;
  --ed-border: rgba(9, 9, 11, 0.1);
  --ed-border-subtle: rgba(9, 9, 11, 0.06);
  --ed-text: #09090b;
  --ed-text-sec: #52525b;
  --ed-text-muted: #71717a;
  --ed-accent: #2563eb;
  --ed-accent-soft: rgba(37, 99, 235, 0.08);
  --ed-accent-border: rgba(37, 99, 235, 0.35);
  --ed-bar-track: #f1f5f9;
  --ed-hm-0: #f3f4f6;

  max-width: 620px;
  border: 1px solid var(--ed-border);
  border-radius: 12px;
  background: var(--ed-surface);
  box-shadow: 0 1px 2px rgba(9, 9, 11, 0.04), 0 6px 18px -10px rgba(9, 9, 11, 0.08);
  font-family: -apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  overflow: hidden;
  color: var(--ed-text);
}

:global(.dark) .ds-block,
:global([data-theme="dark"]) .ds-block {
  --ed-surface: #111318;
  --ed-surface-subtle: #161922;
  --ed-surface-hover: #1e222e;
  --ed-border: rgba(255, 255, 255, 0.1);
  --ed-border-subtle: rgba(255, 255, 255, 0.06);
  --ed-text: #f4f4f5;
  --ed-text-sec: #a1a1aa;
  --ed-text-muted: #71717a;
  --ed-accent: #60a5fa;
  --ed-accent-soft: rgba(96, 165, 250, 0.14);
  --ed-accent-border: rgba(96, 165, 250, 0.38);
  --ed-bar-track: rgba(255, 255, 255, 0.08);
  --ed-hm-0: rgba(255, 255, 255, 0.06);
}

.ds-block__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 16px;
  background: var(--ed-surface-subtle);
  border-bottom: 1px solid var(--ed-border-subtle);
}

.ds-block__identity {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
}

.ds-block__icon {
  width: 28px;
  height: 28px;
  border-radius: 7px;
  background: var(--ed-surface);
  border: 1px solid var(--ed-border);
  color: var(--ed-accent);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.ds-block__icon svg {
  width: 16px;
  height: 16px;
}

.ds-block__headings {
  display: flex;
  flex-direction: column;
  gap: 1px;
  min-width: 0;
}

.ds-block__title {
  font-size: 13.5px;
  font-weight: 600;
  color: var(--ed-text);
  letter-spacing: -0.01em;
}

.ds-block__subtitle {
  font-size: 11.5px;
  color: var(--ed-text-muted);
}

.ds-block__pill {
  font-size: 11px;
  font-weight: 500;
  color: var(--ed-text-sec);
  background: var(--ed-surface);
  border: 1px solid var(--ed-border);
  border-radius: 999px;
  padding: 2px 10px;
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
}

/* 4-Tab Category Bar */
.ds-cat-bar {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 4px;
  padding: 8px 16px;
  background: var(--ed-surface-subtle);
  border-bottom: 1px solid var(--ed-border-subtle);
}

.ds-cat-btn {
  appearance: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 8px;
  border-radius: 7px;
  border: 1px solid transparent;
  background: transparent;
  color: var(--ed-text-sec);
  font-family: inherit;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;
}

.ds-cat-btn:hover {
  background: var(--ed-surface-hover);
  color: var(--ed-text);
}

.ds-cat-btn.is-active {
  background: var(--ed-surface);
  border-color: var(--ed-border);
  color: var(--ed-accent);
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(9, 9, 11, 0.06);
}

.ds-cat-btn__icon {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.ds-block__body {
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.ds-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ds-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.ds-label {
  font-size: 12px;
  font-weight: 600;
  color: var(--ed-text-sec);
}

.ds-quick-actions {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.ds-divider {
  color: var(--ed-text-muted);
  font-size: 11px;
}

.ds-link-btn {
  appearance: none;
  border: none;
  background: transparent;
  padding: 0;
  font-family: inherit;
  font-size: 11.5px;
  font-weight: 500;
  color: var(--ed-accent);
  cursor: pointer;
}

.ds-link-btn:hover {
  text-decoration: underline;
}

.ds-chip-grid {
  display: grid;
  gap: 7px;
}

.ds-chip-grid--3 {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.ds-chip-grid--2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.ds-chip {
  appearance: none;
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 7px 10px;
  border-radius: 8px;
  border: 1px solid var(--ed-border);
  background: var(--ed-surface);
  color: var(--ed-text-sec);
  font-family: inherit;
  font-size: 12px;
  font-weight: 500;
  cursor: pointer;
  text-align: left;
  transition: border-color 0.15s ease, background 0.15s ease, color 0.15s ease;
}

.ds-chip:hover {
  background: var(--ed-surface-hover);
  color: var(--ed-text);
}

.ds-chip.is-active {
  border-color: var(--ed-accent-border);
  background: var(--ed-accent-soft);
  color: var(--ed-accent);
}

.ds-chip__icon {
  display: inline-flex;
  color: var(--ed-text-muted);
  flex-shrink: 0;
}

.ds-chip.is-active .ds-chip__icon {
  color: var(--ed-accent);
}

.ds-chip__icon svg {
  width: 14px;
  height: 14px;
}

.ds-chip__label {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ds-chip__check {
  display: inline-flex;
  color: var(--ed-accent);
  flex-shrink: 0;
}

.ds-chip__check svg {
  width: 13px;
  height: 13px;
}

.ds-inline-option {
  padding-top: 2px;
}

.ds-toggle-label {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 12px;
  color: var(--ed-text-sec);
  cursor: pointer;
  user-select: none;
}

.ds-toggle-label input {
  accent-color: var(--ed-accent);
  cursor: pointer;
}

.ds-toggle-hint {
  font-size: 11px;
  color: var(--ed-text-muted);
}

/* Preview Canvas */
.ds-preview {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  padding: 10px;
  border-radius: 9px;
  border: 1px solid var(--ed-border);
  background: var(--ed-surface-subtle);
}

.ds-preview__card {
  background: var(--ed-surface);
  border: 1px solid var(--ed-border-subtle);
  border-radius: 7px;
  padding: 9px 11px;
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.ds-preview__card.is-full {
  grid-column: 1 / -1;
}

.ds-preview__title {
  font-size: 11px;
  font-weight: 600;
  color: var(--ed-text-sec);
}

.ds-mini-overview,
.ds-preview-traffic {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 6px;
}

.ds-preview-traffic {
  padding: 10px;
  border-radius: 9px;
  border: 1px solid var(--ed-border);
  background: var(--ed-surface-subtle);
}

.ds-mini-kpi {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px 8px;
  border-radius: 6px;
  background: var(--ed-surface);
  border: 1px solid var(--ed-border-subtle);
}

.ds-mini-kpi strong {
  font-size: 13px;
  font-weight: 700;
  color: var(--ed-text);
  font-variant-numeric: tabular-nums;
}

.ds-mini-kpi strong.is-live {
  color: #10b981;
}

.ds-mini-kpi span {
  font-size: 10px;
  color: var(--ed-text-muted);
}

.ds-mini-donut {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ds-mini-donut__svg {
  width: 44px;
  height: 44px;
  transform: rotate(-90deg);
  flex-shrink: 0;
}

.ds-mini-donut__legend {
  display: flex;
  flex-direction: column;
  gap: 3px;
  font-size: 10.5px;
  color: var(--ed-text-sec);
}

.ds-mini-donut__legend span {
  display: inline-flex;
  align-items: center;
  gap: 5px;
}

.ds-mini-donut__legend i {
  width: 6px;
  height: 6px;
  border-radius: 2px;
}

.ds-mini-bars {
  display: flex;
  flex-direction: column;
  gap: 7px;
  padding: 3px 0;
}

.ds-mini-bar {
  height: 6px;
  border-radius: 999px;
  background: var(--ed-bar-track);
  overflow: hidden;
}

.ds-mini-bar span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: var(--ed-accent);
}

.ds-mini-heatmap {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 3px;
}

.ds-mini-heatmap__cell {
  height: 8px;
  border-radius: 2px;
  background: var(--ed-hm-0);
}

.ds-mini-heatmap__cell[data-level="1"] { background: rgba(37, 99, 235, 0.22); }
.ds-mini-heatmap__cell[data-level="2"] { background: rgba(37, 99, 235, 0.45); }
.ds-mini-heatmap__cell[data-level="3"] { background: rgba(37, 99, 235, 0.72); }
.ds-mini-heatmap__cell[data-level="4"] { background: #2563eb; }

.ds-mini-hbars {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.ds-mini-hbar {
  display: flex;
  align-items: center;
  gap: 7px;
}

.ds-mini-hbar__name {
  width: 28px;
  height: 6px;
  border-radius: 3px;
  background: var(--ed-border);
  flex-shrink: 0;
}

.ds-mini-hbar__track {
  flex: 1;
  height: 6px;
  border-radius: 4px;
  background: var(--ed-bar-track);
  overflow: hidden;
}

.ds-mini-hbar__track i {
  display: block;
  height: 100%;
  border-radius: 4px;
  background: var(--ed-accent);
}

.ds-mini-rank {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.ds-mini-rank__row {
  display: grid;
  grid-template-columns: 18px 1fr auto;
  align-items: center;
  gap: 6px;
  font-size: 10.5px;
}

.ds-mini-rank__num {
  font-weight: 600;
  color: var(--ed-accent);
  font-variant-numeric: tabular-nums;
}

.ds-mini-rank__line {
  height: 5px;
  border-radius: 999px;
  background: var(--ed-bar-track);
  overflow: hidden;
}

.ds-mini-rank__line i {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: var(--ed-accent);
  opacity: 0.72;
}

.ds-mini-rank__val {
  color: var(--ed-text-muted);
  font-variant-numeric: tabular-nums;
}

/* Umami Controls */
.ds-variant-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.ds-variant-card {
  appearance: none;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 9px 11px;
  border-radius: 8px;
  border: 1px solid var(--ed-border);
  background: var(--ed-surface);
  text-align: left;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.15s ease, background 0.15s ease;
}

.ds-variant-card:hover {
  background: var(--ed-surface-hover);
}

.ds-variant-card.is-active {
  border-color: var(--ed-accent-border);
  background: var(--ed-accent-soft);
}

.ds-variant-card__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
}

.ds-variant-card__title {
  font-size: 12px;
  font-weight: 600;
  color: var(--ed-text);
}

.ds-variant-card.is-active .ds-variant-card__title {
  color: var(--ed-accent);
}

.ds-variant-card__radio {
  width: 13px;
  height: 13px;
  border-radius: 50%;
  border: 1.5px solid var(--ed-border);
  flex-shrink: 0;
  position: relative;
}

.ds-variant-card.is-active .ds-variant-card__radio {
  border-color: var(--ed-accent);
}

.ds-variant-card.is-active .ds-variant-card__radio::after {
  content: "";
  position: absolute;
  inset: 2.5px;
  border-radius: 50%;
  background: var(--ed-accent);
}

.ds-variant-card__desc {
  font-size: 11px;
  color: var(--ed-text-muted);
  line-height: 1.4;
}

.ds-segmented {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  padding: 3px;
  border-radius: 8px;
  background: var(--ed-surface-subtle);
  border: 1px solid var(--ed-border);
  gap: 2px;
}

.ds-segmented__btn {
  appearance: none;
  border: none;
  background: transparent;
  padding: 5px 6px;
  border-radius: 6px;
  font-family: inherit;
  font-size: 11.5px;
  font-weight: 500;
  color: var(--ed-text-sec);
  cursor: pointer;
}

.ds-segmented__btn.is-active {
  background: var(--ed-surface);
  color: var(--ed-text);
  font-weight: 600;
  box-shadow: 0 1px 2px rgba(9, 9, 11, 0.08);
}

.ds-preview-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 10px 12px;
  border-radius: 9px;
  border: 1px solid var(--ed-border);
  background: var(--ed-surface-subtle);
}

.ds-preview-list__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  font-size: 11.5px;
  color: var(--ed-text-sec);
  font-variant-numeric: tabular-nums;
}

.ds-preview-list__row code {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  padding: 1px 6px;
  border-radius: 4px;
  background: var(--ed-surface-hover);
  color: var(--ed-text);
}

/* Uptime Preview */
.ds-uptime-preview {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px;
  border-radius: 9px;
  border: 1px solid var(--ed-border);
  background: var(--ed-surface-subtle);
}

.ds-uptime-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 4px 10px;
  border-radius: 999px;
  border: 1px solid var(--ed-border);
  background: var(--ed-surface);
  font-size: 12px;
  font-weight: 500;
  color: var(--ed-text);
}

.ds-uptime-pill__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.ds-uptime-pill__dot.is-success { background: #10b981; box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.22); }
.ds-uptime-pill__dot.is-warning { background: #f59e0b; box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.22); }
.ds-uptime-pill__dot.is-error { background: #ef4444; box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.22); }

.ds-hint {
  font-size: 11.5px;
  color: var(--ed-text-muted);
  line-height: 1.5;
}

/* GitHub Accordions */
.ds-accordions {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.ds-accordion {
  border: 1px solid var(--ed-border);
  border-radius: 8px;
  background: var(--ed-surface);
  overflow: hidden;
}

.ds-accordion__head {
  appearance: none;
  width: 100%;
  border: none;
  background: var(--ed-surface-subtle);
  padding: 8px 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  cursor: pointer;
  font-family: inherit;
  font-size: 12px;
  font-weight: 600;
  color: var(--ed-text);
}

.ds-accordion__head:hover {
  background: var(--ed-surface-hover);
}

.ds-accordion__right {
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.ds-accordion__summary {
  font-size: 11px;
  font-weight: 400;
  color: var(--ed-text-muted);
}

.ds-accordion__arrow {
  width: 15px;
  height: 15px;
  color: var(--ed-text-muted);
  transition: transform 0.15s ease;
}

.ds-accordion__arrow.is-open {
  transform: rotate(180deg);
}

.ds-accordion__body {
  padding: 10px 12px;
  border-top: 1px solid var(--ed-border-subtle);
  background: var(--ed-surface);
}

.ds-field-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
}

.ds-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ds-field__label {
  font-size: 11px;
  font-weight: 500;
  color: var(--ed-text-sec);
}

.ds-input,
.ds-select {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid var(--ed-border);
  border-radius: 6px;
  background: var(--ed-surface);
  font-family: inherit;
  font-size: 12px;
  color: var(--ed-text);
}

.ds-input:focus,
.ds-select:focus {
  outline: none;
  border-color: var(--ed-accent);
  box-shadow: 0 0 0 2px var(--ed-accent-soft);
}

.ds-empty {
  padding: 18px;
  border-radius: 8px;
  border: 1px dashed var(--ed-border);
  background: var(--ed-surface-subtle);
  text-align: center;
  font-size: 12px;
  color: var(--ed-text-muted);
}
</style>
