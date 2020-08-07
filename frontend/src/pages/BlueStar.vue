<template>
  <div>
    <h1 id="title">{{ title }}</h1>
    <img
        class="portrait"
        src="../img/portraits/blueStars.png"
        alt="blueStars"
    />

    <v-content
      v-bind:args="{
       data: promise,
       single: 'BlueStar',
       lvlColKey: '№',
       iconDir: 'Stars'
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
      promise: import(/* webpackChunkName: "data-stars"*/ '../../../generateGameData/data/stars'),
      title: this.$t('TID_BLUE_STAR'),
    };
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
};
</script>
