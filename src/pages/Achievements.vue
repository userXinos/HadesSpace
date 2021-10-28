<template>
  <div>
    <h1 id="title">{{ title }}</h1>

    <v-content
      v-bind:args="{
        data: promise,
        category: 'default',
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
      promise: import(/* webpackChunkName: "data-achievements"*/ '../../../generateGameData/data/achievements'),
      title: this.$t('TID_PLAYER_INFO_DLG_TAB_ACHIEVEMENTS'),
    };
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
};
</script>
