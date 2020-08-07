<template>
  <div>
    <h1 id="title">{{ title }}</h1>
    <img
        class="portrait"
        src="../img/portraits/shield.png"
        alt="shield modules"
    />

    <v-content
      v-bind:args="{
       data: promise,
       category: 'shield',
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
      title: this.$t('typeModShield'),
    };
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
};
</script>
