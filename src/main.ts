import { createApp } from 'vue';

import router from '@Utils/Vue/router';
import i18n, { setI18nLanguage } from '@Utils/Vue/i18n';
import store from './store/index';
import App from './App.vue';

import VueProgressBar from '@aacassandra/vue3-progressbar';
import VueGtag from 'vue-gtag';
import Vue3TouchEvents from 'vue3-touch-events';
import { createHead } from '@vueuse/head';

import pluginsConfig from '@Utils/Vue/pluginsConfig';
import clickOutside from '@Utils/Vue/clickOutside';

import '@/style/main.scss';
import '@Utils/Vue/registerServiceWorker';

// noinspection JSIgnoredPromiseFromCall
setI18nLanguage(store.state.userSettings.language);

// noinspection TypeScriptValidateTypes
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
