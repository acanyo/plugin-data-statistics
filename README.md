# Halo 数据看板（plugin-data-statistics）

为 **Halo 2.27+** 打造的新一代数据可视化统计插件。前台全面采用 **Lit 3 Web Components + Shadow DOM** 与 **两级按需加载** 架构，与任意主题样式完全隔离；后台集成 **独立数据看板**、**工作台概览小组件** 以及 **4 合 1 富文本编辑器「统计图表」块**，开箱即用。

---

## ✨ 核心亮点

- ⚡ **两级按需加载，普通页面 0 负担**
  - `<head>` 仅注入 `< 1 KB` 内联引导脚本（原生兼容 Pjax / 动态 DOM），**无统计组件的页面 0 外部 JS 请求、0 KB 流量**；
  - 前台组件按标签拆分为独立 ESM 分包，**Chart.js（`~69 kB` gzip）独立懒加载**——只引用 `<uptime-statistics>` 或纯热力图 `<site-charts data-types="articles,moments">` 时完全不加载 Chart.js；
  - 所有组件内置 `IntersectionObserver` 视口懒请求，滚动接近时再拉取接口数据。
- 🧩 **Shadow DOM 样式隔离 + 亮暗主题自适应**
  - 自动监听主题 `dark` 类名、`data-theme` / `data-color-scheme` 与系统深色偏好，实时同步重绘 Chart.js 画布。
  - 支持在插件设置中自定义 **主题强调色（`accentColor`）**，图表配色与热力图 4 级色阶均自动联动。
- 📝 **富文本编辑器 4 合 1「统计图表」块**
  - 在 Halo 编辑器工具栏或输入 `/` 斜杠命令（`/统计`、`/图表`、`/umami`）即可一键插入；
  - 单一卡片内可自由切换 **站内图表 / Umami 流量 / 服务状态 / GitHub 统计**，支持模块按需勾选、精简模式开关与实时结构预览。
- 📊 **Halo 后台独立数据看板与工作台小组件**
  - 左侧菜单新增 **「数据看板」** 页面（`/console/data-statistics`）与 Console 工作台概览卡片，支持管理员一键刷新/清除站内统计缓存。
- ♻️ **100% 平滑兼容历史文章**
  - 自动识别并无痛升级旧版 `.xhhaocom-*` 与 `.github-statistics-container` 占位容器，老文章无需手动修改。

---

## 📦 功能一览

### 1. 站内数据图表（`<site-charts>`）
- **全站内容概览（`overview`）**：文章数、全站总阅读、累计评论、建站运行天数，支持 **一键导出 2x 高清长图 PNG**（零外部依赖 Canvas 绘制）。
- **标签分布（`tags`）**：交互式环形图 + 图例联动高亮与点击锁定，支持点击跳转标签页。
- **分类占比（`categories`）**：高密度比例进度条，支持展开全部与点击跳转分类页。
- **创作活跃度热力图（`articles`）**：近 365 天每日发布热力矩阵，可选合并「瞬间（Moments）」统计并支持 **全部 / 文章 / 瞬间** 实时筛选，内置活跃天数、最长连更与单日峰值指标。
- **月度创作趋势（`monthlyTrend`）**：近 12 个月文章/瞬间发布节奏面积折线图。
- **评论活跃榜（`comments`）**：横向数值直标柱状图，展示站内活跃读者 Top 10。
- **热门文章排行（`topArticles`）**：按累计阅读量排序的 Top 10 榜单，点击标题直达文章。
- **精简嵌入模式（`compact`）**：隐藏副标题与统计条并去掉外边距，适合嵌入首页卡片或侧边栏。

### 2. Umami 流量与访客分析
- **流量统计概览（`<traffic-statistics>`）**：支持访客前端自由切换 **今日 / 近 7 天 / 近 30 天 / 近 90 天 / 近一年**，展示浏览量、访问次数、独立访客、实时在线人数、环比涨跌徽章、跳出率、平均停留时长以及 PV/访问双曲线趋势图。
- **访客画像分析（`<umami-metrics>`）**：支持按 **来源渠道 / 国家地区 / 浏览器 / 操作系统 / 热门页面** 五大维度与多周期切换。
- **近 30 分钟实时动态（`<activity-statistics>`）**：实时访客路径时间轴，支持全部 / 桌面端 / 移动端筛选与 30 秒静默刷新。

### 3. 服务状态监控（`<uptime-statistics>`）
- 集成 **Uptime Kuma** 状态页实时健康状态胶囊（正常 / 部分异常 / 全部异常），每 60 秒静默刷新，点击可跳转至状态详情页。

### 4. GitHub 统计卡片（`<github-statistics>`）
- 响应式 Bento 网格展示 GitHub **活跃热力图（`graph`）**、**贡献统计（`stats`）**、**仓库展示（`pin`）** 与 **常用语言（`top-langs`）**，支持自定义反向代理地址与多套配色主题。

---

## 🏷️ 主题与自定义页面调用指南

除在 Halo 富文本编辑器直接插入外，你也可以在主题模板或自定义页面中直接使用以下原生 Web Component 标签：

| 组件标签 | 用途 | 常用属性 |
| --- | --- | --- |
| `<site-charts>` | 站内统计图表（不传 `data-types` 默认全展示；显式传入则严格按需渲染） | `data-types="overview,tags,categories,articles,monthlyTrend,comments,topArticles"`、`compact`、`accent-color` |
| `<traffic-statistics>` | Umami 流量概览 + 趋势曲线 | `data-type="daily\|weekly\|monthly\|quarterly\|yearly"`、`accent-color` |
| `<umami-metrics>` | Umami 访客画像分析 | `data-type="daily\|weekly\|monthly\|quarterly\|yearly"`、`accent-color` |
| `<activity-statistics>` | 近 30 分钟网站动态 | 无需属性 |
| `<uptime-statistics>` | Uptime Kuma 服务状态胶囊 | 无需属性 |
| `<github-statistics>` | GitHub 统计卡片 | `data-types="graph,stats,pin,top-langs"`、`graph-theme` 等 |

### 常用嵌入示例

```html
<!-- 完整站内数据看板（含全站概览与导出长图） -->
<site-charts></site-charts>

<!-- 仅嵌入精简版文章创作热力图（不加载 Chart.js，适合首页/侧边栏） -->
<site-charts data-types="articles" compact></site-charts>

<!-- Umami 近 7 天流量统计 + 访客画像 -->
<traffic-statistics data-type="weekly"></traffic-statistics>
<umami-metrics data-type="monthly"></umami-metrics>

<!-- Uptime 服务状态胶囊（适合页脚） -->
<uptime-statistics></uptime-statistics>
```

---

## ⚙️ 环境要求与配置

- **Halo 版本**：`>= 2.27.0`
- **配置入口**：进入 Halo 后台 → **插件 → 数据看板 → 设置**
  - **基础设置**：是否开启瞬间热力图合并、自定义主题强调色、建站日期（用于计算已运行天数，留空自动取首篇文章日期）。
  - **Umami 设置**：Umami 站点地址、登录账号与密码、Website ID。
  - **Uptime 设置**：Uptime Kuma 状态页完整 URL。
  - **GitHub 设置**：GitHub 用户名、默认仓库及统计卡片/活力图代理地址。

---

## 🌐 演示与交流

- **演示站点 1**：[https://www.xhhao.com/chart](https://www.xhhao.com/chart)
- **演示站点 2**：[https://blog.timxs.com/](https://blog.timxs.com/)
- **文档中心**：[https://docs.lik.cc/](https://docs.lik.cc/)
- **QQ 交流群**：766203360

## 🙏 致谢

- **文章热力图设计灵感来源于微浸主题**：[了解主题](https://www.webjing.cn/archives/roLydXtD)

---

## 🛠️ 本地开发与构建

- **环境依赖**：Java 21+、Node.js 22+、pnpm 10+、Gradle 8+

```bash
# 一键完整构建（含 Lit ESM 按需分包 + Console UI + 插件 JAR）
./gradlew clean build

# 启动本地 Halo 开发容器调试
./gradlew haloServer
```

## 📄 许可证

[GPL-3.0](./LICENSE) © Handsome
