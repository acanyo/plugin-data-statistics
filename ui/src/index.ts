import { definePlugin } from '@halo-dev/console-shared'
import SiteStatistics from './views/dataStatistics'
import UmamiStatistics from './views/umamiStatistics'

export default definePlugin({
  components: {},
  routes: [],
  extensionPoints: {
    'default:editor:extension:create': () => [SiteStatistics, UmamiStatistics],
  },
})
