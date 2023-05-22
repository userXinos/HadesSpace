import { createApp } from 'vue';

import router from '@Utils/Vue/router';
import i18n from '@Utils/Vue/i18n';
import store from '@Store/index';
import App from './App.vue';

import VueProgressBar from '@aacassandra/vue3-progressbar';
import VueGtag from 'vue-gtag';
import Vue3TouchEvents from 'vue3-touch-events';
import { createHead } from '@vueuse/head';

import pluginsConfig from '@Utils/Vue/pluginsConfig';
import clickOutside from '@Utils/Vue/clickOutside';

import '@/style/main.scss';
import '@Utils/Vue/registerServiceWorker';

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
