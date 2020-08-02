'use strict';

import Vue from 'vue';
import i18n from '../js/modules/i18n';
import TheHeader from '../components/TheHeader';

new Vue({
  el: '#main',
  i18n,
  components: {
    'App': () => import('../components/App'),
    'PlanetsCalc': () => import('../components/ThePlanetsCalc'),
  },
  data: {obj: {}},
});

// шапка
Vue.component('my-header', TheHeader);
new Vue({
  el: '#header',
  components: {TheHeader},
});

// кнопка наверх
const btnTop = new Vue({
  el: '#btn-top',
  data: {
    show: false,
  },
  methods: {
    scroll() {
      this.show = window.pageYOffset > 300;
    },
  },
});
window.addEventListener('scroll', btnTop.scroll);
