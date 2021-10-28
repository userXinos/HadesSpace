<template>
  <div>
    <h1 id="title">{{ title }}</h1>

    <v-content
      v-bind:args="{
        data: promise,
        category: 'fixed',
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
      promise: import(/* webpackChunkName: "data-player_goals"*/ '../../../generateGameData/data/player_goals'),
      title: this.$t('TID_EMPIRE_OBJECTIVES'),
    };
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
};
</script>
