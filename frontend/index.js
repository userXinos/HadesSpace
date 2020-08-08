import Vue from 'vue';
import VueProgressBar from 'vue-progressbar';
import VueGtag from 'vue-gtag';
import App from './src/components/App.vue';
import router from './src/js/router';
import './src/css/style.css';

const srcollPlugin = {
  install(Vue, options) {
    Vue.prototype.$fixScroll = () => { // скролл, после загрузки данных
      if (options.router.history.current.hash) {
        location.href = options.router.history.current.hash;
      }
    };
  },
};

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
Vue.use(VueGtag, {
  config: {id: 'UA-167101762-1'},
  router,
});

router.onError((err) => {
  console.error(err);
  Vue.prototype.$Progress.fail();
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

