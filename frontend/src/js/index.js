// 'use strict';
//
// import Vue from 'vue';
// import VueRouter from 'vue-router';
// import i18n from '../js/Modules/i18n';
// import TheHeader from '../components/TheHeader.vue';
// import '../css/style.css';
//
// Vue.use(VueRouter);
//
// new Vue({
//   i18n,
//   el: '#main',
//   components: {
//     'App': () => import('../components/Content.vue'),
//     'PlanetsCalc': () => import('../components/ThePlanetsCalc.vue'),
//   },
//   data: {
//     obj: {},
//   },
// });
//
// // шапка
// Vue.component('my-header', TheHeader);
// new Vue({
//   el: '#header',
//   components: {TheHeader},
// });
//
// // кнопка наверх
// const btnTop = new Vue({
//   el: '#btn-top',
//   data: {
//     show: false,
//   },
//   methods: {
//     scroll() {
//       this.show = (window.pageYOffset > 300);
//     },
//   },
// });
// window.addEventListener('scroll', btnTop.scroll);
