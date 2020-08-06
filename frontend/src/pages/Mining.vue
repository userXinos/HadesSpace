<template>
  <div>
    <h1 id="title">{{ title }}</h1>
    <img
        class="portrait"
        src="../img/portraits/mining.png"
        alt="mining modules"
    />

    <v-content
      v-bind:args="{
       data: promise,
       category: 'mining',
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
      title: this.$t('typeModMining'),
    };
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
};
</script>
