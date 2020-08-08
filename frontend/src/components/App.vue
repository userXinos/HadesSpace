<template>
  <div id="app">
    <the-header/>
    <router-view/>
    <vue-progress-bar/>
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
  metaInfo() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
    };
  },
  created() {
    window.addEventListener('scroll', this.scroll); // кнопка наверх

    // статус-бар
    this.$Progress.start();
    this.$router.beforeEach((to, from, next) => {
      if (to.meta.progress !== undefined) {
        const meta = to.meta.progress;
        this.$Progress.parseMeta(meta);
      }
      this.$Progress.start();
      next();
    });
    this.$router.afterEach(() => {
      this.$Progress.finish();
    });
  },
  methods: {
    scroll() { // колбек кнопки наверх
      this.showBtnTop = (window.pageYOffset > 300);
    },
  },
};
</script>
