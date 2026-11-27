import { isActive, mergeAttributes, Node, ToolboxItem, VueNodeViewRenderer } from "@halo-dev/richtext-editor";
import { h, markRaw } from "vue";
import MdiChartBoxOutline from "~icons/mdi/chart-box-outline";
import MdiDeleteForeverOutline from "~icons/mdi/delete-forever-outline";
import MdiArrowULeftBottom from "~icons/mdi/arrow-u-left-bottom";
import DataStatisticsBlockView from "./DataStatisticsBlockView.vue";
import { deleteNode } from "../utils/delete-node";

type Editor = any;
type EditorState = any;

export type StatisticsCategory = "site" | "umami" | "uptime" | "github";
export type UmamiVariant = "traffic" | "activity" | "metrics";
export type UmamiPeriod = "daily" | "weekly" | "monthly" | "quarterly" | "yearly";

export interface DataStatisticsBlockAttrs {
  category: StatisticsCategory;
  // Site Charts
  siteTypes: string[];
  siteCompact: boolean;
  // Umami
  umamiVariant: UmamiVariant;
  umamiType: UmamiPeriod;
  // GitHub
  githubTypes: string[];
  statsLocale: string;
  statsShowIcons: string;
  statsTheme: string;
  pinRepo: string;
  topLangsLayout: string;
  topLangsHideProgress: string;
  topLangsStatsFormat: string;
  graphTheme: string;
}

export const DEFAULT_SITE_CHART_TYPES = [
  "overview",
  "tags",
  "categories",
  "articles",
  "monthlyTrend",
  "comments",
  "topArticles"
];

const GITHUB_TYPE_ORDER = ["graph", "stats", "pin", "top-langs"];

declare module "@halo-dev/richtext-editor" {
  interface Commands {
    addDataStatisticsBlock: (attrs?: Partial<DataStatisticsBlockAttrs>) => any;
    setDataStatisticsBlockAttrs: (attrs: Partial<DataStatisticsBlockAttrs>) => any;
  }
}

function defaultAttrs(overrides?: Partial<DataStatisticsBlockAttrs>): DataStatisticsBlockAttrs {
  return {
    category: overrides?.category || "site",
    siteTypes: overrides?.siteTypes ? [...overrides.siteTypes] : [...DEFAULT_SITE_CHART_TYPES],
    siteCompact: Boolean(overrides?.siteCompact),
    umamiVariant: overrides?.umamiVariant || "traffic",
    umamiType: overrides?.umamiType || "weekly",
    githubTypes: overrides?.githubTypes ? [...overrides.githubTypes] : ["graph"],
    statsLocale: overrides?.statsLocale || "",
    statsShowIcons: overrides?.statsShowIcons || "",
    statsTheme: overrides?.statsTheme || "",
    pinRepo: overrides?.pinRepo || "",
    topLangsLayout: overrides?.topLangsLayout || "",
    topLangsHideProgress: overrides?.topLangsHideProgress || "",
    topLangsStatsFormat: overrides?.topLangsStatsFormat || "",
    graphTheme: overrides?.graphTheme || "minimal"
  };
}

const DataStatisticsBlock = Node.create({
  name: "data-statistics-block",
  group: "block",
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    const base = defaultAttrs();
    return {
      category: { default: base.category },
      siteTypes: { default: base.siteTypes },
      siteCompact: { default: base.siteCompact },
      umamiVariant: { default: base.umamiVariant },
      umamiType: { default: base.umamiType },
      githubTypes: { default: base.githubTypes },
      statsLocale: { default: base.statsLocale },
      statsShowIcons: { default: base.statsShowIcons },
      statsTheme: { default: base.statsTheme },
      pinRepo: { default: base.pinRepo },
      topLangsLayout: { default: base.topLangsLayout },
      topLangsHideProgress: { default: base.topLangsHideProgress },
      topLangsStatsFormat: { default: base.topLangsStatsFormat },
      graphTheme: { default: base.graphTheme }
    };
  },

  parseHTML() {
    return [
      {
        tag: "site-charts",
        getAttrs: (element: string | HTMLElement) => {
          if (!(element instanceof HTMLElement)) return false;
          const raw = element.getAttribute("data-types");
          const siteTypes = raw ? raw.split(",").map((s) => s.trim()).filter(Boolean) : [...DEFAULT_SITE_CHART_TYPES];
          return defaultAttrs({
            category: "site",
            siteTypes,
            siteCompact: element.hasAttribute("compact")
          });
        }
      },
      {
        tag: "traffic-statistics",
        getAttrs: (element: string | HTMLElement) => {
          if (!(element instanceof HTMLElement)) return false;
          return defaultAttrs({
            category: "umami",
            umamiVariant: "traffic",
            umamiType: (element.getAttribute("data-type") as UmamiPeriod) || "weekly"
          });
        }
      },
      {
        tag: "activity-statistics",
        getAttrs: () =>
          defaultAttrs({
            category: "umami",
            umamiVariant: "activity"
          })
      },
      {
        tag: "umami-metrics",
        getAttrs: (element: string | HTMLElement) => {
          if (!(element instanceof HTMLElement)) return false;
          return defaultAttrs({
            category: "umami",
            umamiVariant: "metrics",
            umamiType: (element.getAttribute("data-type") as UmamiPeriod) || "monthly"
          });
        }
      },
      {
        tag: "uptime-statistics",
        getAttrs: () => defaultAttrs({ category: "uptime" })
      },
      {
        tag: "github-statistics",
        getAttrs: (element: string | HTMLElement) => {
          if (!(element instanceof HTMLElement)) return false;
          const raw = element.getAttribute("data-types");
          const githubTypes = raw ? raw.split(",").map((s) => s.trim()).filter(Boolean) : ["graph"];
          return defaultAttrs({
            category: "github",
            githubTypes,
            statsLocale: element.getAttribute("stats-locale") || "",
            statsShowIcons: element.getAttribute("stats-show-icons") || "",
            statsTheme: element.getAttribute("stats-theme") || "",
            pinRepo: element.getAttribute("pin-repo") || "",
            topLangsLayout: element.getAttribute("top-langs-layout") || "",
            topLangsHideProgress: element.getAttribute("top-langs-hide-progress") || "",
            topLangsStatsFormat: element.getAttribute("top-langs-stats-format") || "",
            graphTheme: element.getAttribute("graph-theme") || "minimal"
          });
        }
      },
      {
        tag: "div",
        getAttrs: (element: string | HTMLElement) => {
          if (!(element instanceof HTMLElement)) return false;

          if (element.classList.contains("xhhaocom-chartboard")) {
            const raw = element.getAttribute("data-types");
            const siteTypes = raw
              ? raw.split(",").map((s) => s.trim()).filter(Boolean)
              : ["tags", "categories", "articles", "comments", "topArticles"];
            return defaultAttrs({
              category: "site",
              siteTypes,
              siteCompact: element.hasAttribute("compact")
            });
          }

          if (element.classList.contains("xhhaocom-dataStatistics-v2-traffic")) {
            return defaultAttrs({
              category: "umami",
              umamiVariant: "traffic",
              umamiType: (element.getAttribute("data-type") as UmamiPeriod) || "weekly"
            });
          }

          if (element.classList.contains("xhhaocom-dataStatistics-v2-activity")) {
            return defaultAttrs({
              category: "umami",
              umamiVariant: "activity"
            });
          }

          if (element.classList.contains("xhhaocom-dataStatistics-v2-uptime-kuma")) {
            return defaultAttrs({ category: "uptime" });
          }

          if (element.classList.contains("github-statistics-container")) {
            const raw = element.getAttribute("data-types");
            const githubTypes = raw ? raw.split(",").map((s) => s.trim()).filter(Boolean) : ["graph"];
            return defaultAttrs({
              category: "github",
              githubTypes,
              statsLocale: element.getAttribute("data-stats-locale") || "",
              statsShowIcons: element.getAttribute("data-stats-show-icons") || "",
              statsTheme: element.getAttribute("data-stats-theme") || "",
              pinRepo: element.getAttribute("data-pin-repo") || "",
              topLangsLayout: element.getAttribute("data-top-langs-layout") || "",
              topLangsHideProgress: element.getAttribute("data-top-langs-hide-progress") || "",
              topLangsStatsFormat: element.getAttribute("data-top-langs-stats-format") || "",
              graphTheme: element.getAttribute("data-graph-theme") || "minimal"
            });
          }

          const isStats = element.classList.contains("xhhaocom-dataStatistics-v2-github-stats");
          const isPin = element.classList.contains("xhhaocom-dataStatistics-v2-github-pin");
          const isLangs = element.classList.contains("xhhaocom-dataStatistics-v2-github-top-langs");
          const isGraph = element.classList.contains("xhhaocom-dataStatistics-v2-github-graph");
          if (isStats || isPin || isLangs || isGraph) {
            const githubTypes: string[] = [];
            if (isStats) githubTypes.push("stats");
            if (isPin) githubTypes.push("pin");
            if (isLangs) githubTypes.push("top-langs");
            if (isGraph) githubTypes.push("graph");
            return defaultAttrs({
              category: "github",
              githubTypes: githubTypes.length > 0 ? githubTypes : ["stats"],
              statsLocale: element.getAttribute("data-locale") || "",
              statsShowIcons: element.getAttribute("data-show-icons") || "",
              statsTheme: element.getAttribute("data-theme") || "",
              pinRepo: element.getAttribute("data-repo") || "",
              topLangsLayout: element.getAttribute("data-layout") || "",
              topLangsHideProgress: element.getAttribute("data-hide-progress") || "",
              topLangsStatsFormat: element.getAttribute("data-stats-format") || "",
              graphTheme: element.getAttribute("data-theme") || "minimal"
            });
          }

          return false;
        }
      }
    ];
  },

  renderHTML({ node }: { node: { attrs: Partial<DataStatisticsBlockAttrs> } }) {
    const attrs = defaultAttrs(node.attrs);

    if (attrs.category === "umami") {
      if (attrs.umamiVariant === "activity") {
        return ["activity-statistics", mergeAttributes({})];
      }
      if (attrs.umamiVariant === "metrics") {
        return ["umami-metrics", mergeAttributes({ "data-type": attrs.umamiType })];
      }
      return ["traffic-statistics", mergeAttributes({ "data-type": attrs.umamiType })];
    }

    if (attrs.category === "uptime") {
      return ["uptime-statistics", mergeAttributes({})];
    }

    if (attrs.category === "github") {
      const sortedTypes = [...attrs.githubTypes].sort((a, b) => {
        const ia = GITHUB_TYPE_ORDER.indexOf(a);
        const ib = GITHUB_TYPE_ORDER.indexOf(b);
        if (ia === -1) return 1;
        if (ib === -1) return -1;
        return ia - ib;
      });
      const tagAttrs: Record<string, string> = {
        "data-types": sortedTypes.join(",")
      };
      if (attrs.statsLocale) tagAttrs["stats-locale"] = attrs.statsLocale;
      if (attrs.statsShowIcons) tagAttrs["stats-show-icons"] = attrs.statsShowIcons;
      if (attrs.statsTheme) tagAttrs["stats-theme"] = attrs.statsTheme;
      if (attrs.pinRepo) tagAttrs["pin-repo"] = attrs.pinRepo;
      if (attrs.topLangsLayout) tagAttrs["top-langs-layout"] = attrs.topLangsLayout;
      if (attrs.topLangsHideProgress) tagAttrs["top-langs-hide-progress"] = attrs.topLangsHideProgress;
      if (attrs.topLangsStatsFormat) tagAttrs["top-langs-stats-format"] = attrs.topLangsStatsFormat;
      if (attrs.graphTheme) tagAttrs["graph-theme"] = attrs.graphTheme;
      return ["github-statistics", mergeAttributes(tagAttrs)];
    }

    // Default: site charts
    const siteTagAttrs: Record<string, string> = {
      "data-types": attrs.siteTypes.join(",")
    };
    if (attrs.siteCompact) {
      siteTagAttrs.compact = "";
    }
    return ["site-charts", mergeAttributes(siteTagAttrs)];
  },

  addCommands() {
    return {
      ...this.parent?.(),
      addDataStatisticsBlock:
        (attrs?: Partial<DataStatisticsBlockAttrs>) =>
        ({ commands }: { commands: any }) => {
          return commands.insertContent({
            type: this.name,
            attrs: defaultAttrs(attrs)
          });
        },
      setDataStatisticsBlockAttrs:
        (attrs: Partial<DataStatisticsBlockAttrs>) =>
        ({ commands }: { commands: any }) => {
          return commands.updateAttributes(this.name, attrs);
        }
    } as any;
  },

  addNodeView() {
    return VueNodeViewRenderer(DataStatisticsBlockView as any);
  },

  addOptions() {
    const DeleteIcon = markRaw({
      setup() {
        return () =>
          h(MdiDeleteForeverOutline as any, {
            style: { color: "#ef4444" }
          });
      }
    });

    return {
      ...this.parent?.(),
      getToolboxItems({ editor }: { editor: Editor }) {
        return {
          priority: 122529,
          component: markRaw(ToolboxItem),
          props: {
            editor,
            icon: markRaw(MdiChartBoxOutline),
            title: "统计图表",
            description: "插入站内图表、Umami 流量/画像、Uptime 状态或 GitHub 统计",
            action: () => {
              editor.chain().focus().addDataStatisticsBlock().run();
            }
          }
        };
      },
      getCommandMenuItems() {
        return {
          priority: 122529,
          icon: markRaw(MdiChartBoxOutline),
          title: "统计图表",
          keywords: ["statistics", "chart", "umami", "uptime", "github", "tongji", "tubiao", "统计", "图表"],
          command: ({ editor, range }: { editor: Editor; range: any }) => {
            editor.chain().focus().deleteRange(range).addDataStatisticsBlock().run();
          }
        };
      },
      getBubbleMenu({ editor }: { editor: Editor }) {
        return {
          pluginKey: "dataStatisticsBlockBubbleMenu",
          shouldShow: ({ state }: { state: EditorState }) => {
            return isActive(state, DataStatisticsBlock.name);
          },
          items: [
            {
              priority: 10,
              props: {
                icon: markRaw(MdiArrowULeftBottom),
                title: "换行",
                action: ({ editor: activeEditor }: { editor: Editor }) => {
                  const targetEditor = activeEditor || editor;
                  targetEditor.commands.insertContentAt(
                    targetEditor.state.selection.$from.pos + 1,
                    [{ type: "paragraph", content: "" }],
                    { updateSelection: true }
                  );
                  targetEditor.commands.focus(targetEditor.state.selection.$from.pos, { scrollIntoView: true });
                }
              }
            },
            {
              priority: 20,
              props: {
                icon: DeleteIcon,
                title: "删除",
                action: ({ editor: activeEditor }: { editor: Editor }) => {
                  deleteNode(DataStatisticsBlock.name, activeEditor || editor);
                }
              }
            }
          ]
        };
      }
    };
  }
});

export default DataStatisticsBlock;
