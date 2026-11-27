import { definePlugin } from '@halo-dev/ui-shared'
import { markRaw } from 'vue'
import MdiChartBoxOutline from '~icons/mdi/chart-box-outline'
import DataStatisticsBlock from './views/dataStatisticsBlock'
import DashboardView from './views/DashboardView.vue'
import StatisticsSummaryWidget from './widgets/StatisticsSummaryWidget.vue'

export default definePlugin({
  components: {},
  routes: [
    {
      parentName: 'Root',
      route: {
        path: '/data-statistics',
        name: 'DataStatisticsDashboard',
        component: DashboardView,
        meta: {
          title: '数据看板',
          searchable: true,
          menu: {
            name: '数据看板',
            group: 'tool',
            icon: markRaw(MdiChartBoxOutline),
            priority: 10
          }
        }
      }
    }
  ],
  extensionPoints: {
    'default:editor:extension:create': () => [DataStatisticsBlock],
    'console:dashboard:widgets:create': () => [
      {
        id: 'data-statistics:overview',
        component: markRaw(StatisticsSummaryWidget),
        group: 'statistics',
        defaultSize: {
          w: 6,
          h: 6,
          minW: 4,
          minH: 4,
          maxW: 12,
          maxH: 10
        }
      }
    ]
  }
})
