<template>
  <div id="app">
    <the-header/>
    <router-view/>
    <a href="#" id="btn-top" v-show="showBtnTop"></a>
  </div>
</template>

<script>
import i18n from '../js/modules/i18n';
import TheHeader from './TheHeader';

export default {
  i18n,
  name: 'App',
  components: {TheHeader},
  data() {
    return {
      showBtnTop: false,
    };
  },
  created() {
    window.addEventListener('scroll', this.scroll);
  },
  methods: {
    scroll() {
      this.showBtnTop = (window.pageYOffset > 300);
    },
  },
};
</script>
