import Vue from 'vue';
import App from './src/components/App.vue';
import router from './src/js/router';
import './src/css/style.css';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
