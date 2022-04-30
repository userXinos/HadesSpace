import { createApp } from 'vue';

import App from './App.vue';
import router from '@Scripts/Vue/router.js';
import i18n from '@Scripts/Vue/i18n.js';
import store from '@Store';

import VueProgressBar from '@aacassandra/vue3-progressbar';
import VueGtag from 'vue-gtag';
import Vue3TouchEvents from 'vue3-touch-events';
import { createHead } from '@vueuse/head';

import pluginsConfig from '@Scripts/Vue/pluginsConfig.js';
import clickOutside from '@Scripts/Vue/clickOutside.js';

import '@/style/main.scss';
import './registerServiceWorker';

createApp(App)
    .use(createHead())

    .use(VueProgressBar, pluginsConfig.VueProgressBar)
    .use(VueGtag, pluginsConfig.VueGtag, router)
    .use(Vue3TouchEvents)

    .directive('click-outside', clickOutside)

    .use(i18n)
    .use(router)
    .use(store)

    .mount('#app');
