<template>
  <div>
    <h1 id="title">{{ title }}</h1>
    <img
        class="portrait"
        src="../img/portraits/support.png"
        alt="support modules"
    />

    <v-content
      v-bind:args="{
       data: promise,
       category: 'support',
       iconDir: 'Modules'
      }"
    >
    </v-content>
  </div>
</template>

<script>
import VContent from '../components/Content.vue';

export default {
  components: {VContent},
  data() {
    return {
      promise: import(/* webpackChunkName: "data-modules"*/ '../../../generateGameData/data/modules'),
      title: this.$t('typeModSupport'),
    };
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
};
</script>
