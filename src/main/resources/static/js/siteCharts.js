import { ready } from './modules/siteCharts/modules/siteCharts/utils.js';
import { init, setupMutationObserver } from './modules/siteCharts/init.js';

(function () {
    'use strict';

    ready(init);
    setupMutationObserver();

})();
