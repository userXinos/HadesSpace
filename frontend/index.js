import Vue from 'vue';
import App from './src/components/App.vue';
import router from './src/js/router';
import VueProgressBar from 'vue-progressbar';
import './src/css/style.css';

Vue.config.productionTip = false;

Vue.use(VueProgressBar, {
  color: '#283a3d',
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

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

