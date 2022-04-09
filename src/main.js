import { createApp } from 'vue';

import VueProgressBar from '@aacassandra/vue3-progressbar';
import { createHead } from '@vueuse/head';
// import VueGtag from 'vue-gtag';

import App from './components/App.vue';
import router from '@Scripts/Vue/router.js';
import i18n from '@Scripts/Vue/i18n.js';

import clickOutside from '@Scripts/Vue/clickOutside.js';

import './css/style.scss';

// Vue.use(VueGtag,
//     { config: { id: 'UA-167101762-1' } },
//     router,
// );
//

createApp(App)
    // .use(VueMeta)
    .use(createHead())
    .use(VueProgressBar, {
        color: '#345b66',
        failedColor: '#874b4b',
        thickness: '3px',
        transition: {
            speed: '0.2s',
            opacity: '0.2s',
            termination: 300,
        },
        autoRevert: true,
        location: 'top',
        inverse: false,
    })
    .use(i18n)
    .use(router)
    .directive('click-outside', clickOutside)
    .mount('#app');

