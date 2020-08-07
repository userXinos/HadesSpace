<template>
  <div>
    <h1 id="title">{{ title }}</h1>

    <v-content
      v-bind:args="{
        data: promise,
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
      promise: import(/* webpackChunkName: "data-alliance_levels"*/ '../../../generateGameData/data/alliance_levels'),
      title: this.$t('TID_CORP_LEVELS_LABEL'),
    };
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
};
</script>
