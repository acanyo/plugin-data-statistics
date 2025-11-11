import { definePlugin } from '@halo-dev/console-shared'
import DataStatistics from './views/dataStatistics'

export default definePlugin({
  components: {},
  routes: [],
  extensionPoints: {
    'default:editor:extension:create': () => [DataStatistics],
  },
})
