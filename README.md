# 数据看板


## 简介

为 Halo2 提供强大的数据可视化统计功能，支持 Umami 流量统计、网站内部数据图表（标签、分类、文章趋势、评论排行、热门文章等），可在编辑器中灵活插入

## 🌐 演示与交流

- **演示站点**：[https://www.xhhao.com/](https://www.xhhao.com/chart)
- **文档**：[https://docs.lik.cc/](https://docs.lik.cc/)
- **QQ 交流群**：[![QQ群](https://www.xhhao.com/upload/iShot_2025-03-03_16.03.00.png)](https://www.xhhao.com/upload/iShot_2025-03-03_16.03.00.png)
- 
## 开发环境

- Java 21+
- Node.js 18+
- pnpm

## 开发

```bash
# 构建插件
./gradlew build

# 开发前端
cd ui
pnpm install
pnpm dev
```

## 构建

```bash
./gradlew build
```

构建完成后，可以在 `build/libs` 目录找到插件 jar 文件。

## 许可证

[GPL-3.0](./LICENSE) © Handsome 