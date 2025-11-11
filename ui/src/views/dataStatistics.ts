import { isActive, mergeAttributes, Node, ToolboxItem, VueNodeViewRenderer } from "@halo-dev/richtext-editor";
import { h, markRaw } from "vue";
import MdiChartTimelineVariant from "~icons/mdi/chart-timeline-variant";
import MdiDeleteForeverOutline from "~icons/mdi/delete-forever-outline";
import MdiArrowULeftBottom from "~icons/mdi/arrow-u-left-bottom";
import DataStatisticsView from "./DataStatisticsView.vue";
import { deleteNode } from "../utils/delete-node";
type Editor = any;
type EditorState = any;

declare module "@halo-dev/richtext-editor" {
  interface Commands {
    addDataStatistics: (attrs?: Partial<DataStatisticsAttrs>) => any;
    setDataStatisticsAttrs: (attrs: Partial<DataStatisticsAttrs>) => any;
  }
}

export interface DataStatisticsAttrs {
  variant: "traffic" | "activity";
  type?: "daily" | "weekly" | "monthly" | "quarterly" | "yearly";
}

const DataStatistics = Node.create({
  name: "data-statistics",
  group: "block",
  atom: true,
  selectable: true,
  draggable: true,

  addAttributes() {
    return {
      variant: {
        default: "traffic" as DataStatisticsAttrs["variant"]
      },
      type: {
        default: "weekly" as DataStatisticsAttrs["type"]
      }
    };
  },

  parseHTML() {
    return [
      {
        tag: "div",
        getAttrs: (element: string | HTMLElement) => {
          if (!(element instanceof HTMLElement)) {
            return false;
          }
          if (element.classList.contains("xhhaocom-dataStatistics-v2-traffic")) {
            return {
              variant: "traffic",
              type: (element.getAttribute("data-type") as DataStatisticsAttrs["type"]) || "weekly"
            } satisfies Partial<DataStatisticsAttrs>;
          }
          if (element.classList.contains("xhhaocom-dataStatistics-v2-activity")) {
            return {
              variant: "activity"
            } satisfies Partial<DataStatisticsAttrs>;
          }
          return false;
        }
      }
    ];
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: Record<string, unknown> }) {
    const attrs = HTMLAttributes as Partial<DataStatisticsAttrs> & Record<string, unknown>;
    const variant = (attrs.variant as DataStatisticsAttrs["variant"]) || "traffic";
    const type = (attrs.type as DataStatisticsAttrs["type"]) || "weekly";

    if (variant === "activity") {
      return ["div", mergeAttributes({ class: "xhhaocom-dataStatistics-v2-activity" })];
    }

    return [
      "div",
      mergeAttributes({
        class: "xhhaocom-dataStatistics-v2-traffic",
        "data-type": type
      })
    ];
  },

  addCommands() {
    return {
      ...(this.parent?.() || {}),
      addDataStatistics:
        (attrs?: Partial<DataStatisticsAttrs>) =>
        ({ commands }: { commands: any }) => {
          return commands.insertContent({
            type: this.name,
            attrs: {
              variant: attrs?.variant || "traffic",
              type: attrs?.type || "weekly"
            }
          });
        },
      setDataStatisticsAttrs:
        (attrs: Partial<DataStatisticsAttrs>) =>
        ({ commands }: { commands: any }) => {
          return commands.updateAttributes(this.name, attrs);
        }
    } as any;
  },

  addNodeView() {
    return VueNodeViewRenderer(DataStatisticsView as any);
  },

  addOptions() {
    const DeleteIcon = markRaw({
      setup() {
        return () =>
          h(MdiDeleteForeverOutline as any, {
            style: {
              color: "#ef4444"
            }
          });
      }
    });

    return {
      ...this.parent?.(),
      getToolboxItems({ editor }: { editor: Editor }) {
        return {
          priority: 122530,
          component: markRaw(ToolboxItem),
          props: {
            editor,
            icon: markRaw(MdiChartTimelineVariant),
            title: "插入统计模块",
            description: "流量统计或实时活动展示",
            action: () => {
              editor.chain().focus().addDataStatistics().run();
            }
          }
        };
      },
      getBubbleMenu({ editor }: { editor: Editor }) {
        return {
          pluginKey: "dataStatisticsBubbleMenu",
          shouldShow: ({ state }: { state: EditorState }) => {
            return isActive(state, DataStatistics.name);
          },
          items: [
            {
              priority: 122531,
              props: {
                icon: DeleteIcon,
                title: "删除",
                action: ({ editor }: { editor: Editor }) => {
                  deleteNode(DataStatistics.name, editor);
                }
              }
            },
            {
              priority: 122532,
              props: {
                icon: markRaw(MdiArrowULeftBottom),
                title: "换行",
                action: ({ editor }: { editor: Editor }) => {
                  editor.commands.insertContentAt(
                    editor.state.selection.$from.pos + 1,
                    [{ type: "paragraph", content: "" }],
                    { updateSelection: true }
                  );
                  editor.commands.focus(editor.state.selection.$from.pos, { scrollIntoView: true });
                }
              }
            }
          ]
        };
      },
      getDraggable() {
        return {
          getRenderContainer({ dom }: { dom: HTMLElement }) {
            let container = dom;
            while (container && !container.hasAttribute("data-node-view-wrapper")) {
              container = container.parentElement as HTMLElement;
            }
            return { el: container };
          },
          allowPropagationDownward: true
        };
      }
    };
  }
});

export default DataStatistics;
