# Halo 数据统计插件

## 📊 简介

为 Halo 2 提供高颜值、低侵入的数据可视化统计组件，前台基于 **Lit 3 Web Components + Shadow DOM** 实现样式完全隔离，支持：

- **Umami 流量统计**：支持前端实时切换周期（今日 / 7 天 / 30 天 / 90 天 / 1 年）、衍生阅读指标与实时在线人数、近 30 分钟访客动态及终端筛选
- **站内数据图表**：标签分布（交互圆环 + 图例联动锁定）、分类占比（水平比例条）、365 天创作热力图（支持文章/瞬间筛选与最长连更统计）、评论活跃榜、热门文章 Top10
- **服务状态监控**：集成 Uptime Kuma 状态页实时健康状态胶囊
- **GitHub 统计展示**：响应式 Bento 网格展示活跃热力图、贡献统计、精选仓库与常用语言
- **编辑器原生插入**：在 Halo 富文本编辑器中一键插入站内图表、Umami、Uptime 状态与 GitHub 统计卡片，且自动向下兼容历史文章占位标签

## ✨ 特性

- 🧩 **Shadow DOM 样式隔离 + 两级按需加载**：无统计组件的普通页面 **0 外部 JS 请求**；有组件时按标签动态加载独立 ESM 分包，Chart.js 仅在渲染圆环/折线/柱状图时懒加载，并支持视口懒请求
- 🌗 **自动亮暗主题适配**：实时监听主题 `dark` 类名、`data-theme` / `data-color-scheme` 与系统深色偏好，同步重绘 Chart.js 画布
- 🚀 **高性能**：WebClient 连接池优化 + 自动重试 + Chart.js 按需注册瘦身打包
- 📱 **移动端友好**：桌面与移动视口自适应排版，热力图支持触控横向滚动
- ♻️ **平滑兼容**：内置 `legacy-upgrade` 自动升级旧版 `.xhhaocom-*` / `.github-statistics-container` 占位容器

## 🏷️ 前台自定义组件标签

| 组件标签 | 用途 | 常用属性 |
| --- | --- | --- |
| `<site-charts>` | 站内统计图表（含导出 PNG） | `data-types="overview,tags,categories,articles,monthlyTrend,comments,topArticles"`、`compact`、`accent-color` |
| `<traffic-statistics>` | Umami 流量概览 + 趋势曲线 | `data-type="daily\|weekly\|monthly\|quarterly\|yearly"`、`accent-color` |
| `<umami-metrics>` | Umami 访客画像分析 | `data-type="daily\|weekly\|monthly\|quarterly\|yearly"`、`accent-color` |
| `<activity-statistics>` | 近 30 分钟网站动态 | 无需属性 |
| `<uptime-statistics>` | Uptime Kuma 服务状态胶囊 | 无需属性 |
| `<github-statistics>` | GitHub 统计卡片 | `data-types="graph,stats,pin,top-langs"`、`graph-theme` 等 |

## 🔧 技术栈

- **后端**：Spring Boot WebFlux、Reactor Netty、Hutool
- **前台组件**：Lit 3 Web Components、TypeScript、Vite、Chart.js（按需注册）
- **后台编辑器**：Vue 3、TypeScript、Rsbuild、Halo Components
- **构建工具**：Gradle、pnpm

## 🙏 致谢

**文章热力图设计灵感来源于微浸主题**：[了解主题](https://www.webjing.cn/archives/roLydXtD)

## 🌐 演示与交流

- **演示站点 1**：[https://www.xhhao.com/chart](https://www.xhhao.com/chart)
- **演示站点 2**：[https://blog.timxs.com/](https://blog.timxs.com/)
- **文档中心**：[https://docs.lik.cc/](https://docs.lik.cc/)
- **QQ 交流群**：766203360

## ⚙️ 开发环境

- Java 21+
- Node.js 22+
- pnpm 9+ / 10+
- Gradle 8+

## 🛠️ 开发指南

### 一键完整构建（含 Lit 组件 + Console UI + 插件 JAR）

```bash
./gradlew build
```

### 本地分别调试前端

```bash
# 前台 Lit Web Components（packages）
cd packages
pnpm install
pnpm build

# 后台编辑器扩展（ui）
cd ../ui
pnpm install
pnpm dev
```

### 清理构建

```bash
./gradlew clean
```

## 📄 许可证

[GPL-3.0](./LICENSE) © Handsome
