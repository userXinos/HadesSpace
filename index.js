import Vue from 'vue';

import {srcollPlugin} from './src/js/plugins';
import VueProgressBar from 'vue-progressbar';
import VueAnalytics from 'vue-analytics';
import VueMeta from 'vue-meta';
// import VueGtag from 'vue-gtag';

import App from './src/components/App.vue';
import router from './src/js/router';

import './src/js/directives';
import './src/css/style.css';

Vue.config.productionTip = false;

Vue.use(srcollPlugin, {
  router,
});
Vue.use(VueProgressBar, {
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
});
Vue.use(VueAnalytics, {
  id: 'UA-167101762-1',
  router,
});
Vue.use(VueMeta);
// Vue.use(VueGtag, {
//   config: {id: 'UA-167101762-1'},
//   // router,
// });

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

