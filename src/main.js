import { createApp } from 'vue';

import App from './components/App.vue';
import router from '@Scripts/Vue/router.js';
import i18n from '@Scripts/Vue/i18n.js';

import VueProgressBar from '@aacassandra/vue3-progressbar';
import { createHead } from '@vueuse/head';

import pluginsConfig from '@Scripts/Vue/pluginsConfig.js';
import clickOutside from '@Scripts/Vue/clickOutside.js';

import './css/style.scss';

createApp(App)
    .use(createHead())
    .use(VueProgressBar, pluginsConfig.VueProgressBar)
    .directive('click-outside', clickOutside)
    .use(i18n)
    .use(router)
    .mount('#app');

