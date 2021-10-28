<template>
  <div>
    <h1 id="title">{{ title }}</h1>
    <img
        class="portrait"
        src="../img/portraits/spacebuildings.png"
        alt="spacebuildings"
    />

    <v-content
      v-bind:args="{
       data: promise,
       category: 'player',
       iconDir: 'SpaceBuildings'
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
      promise: import(/* webpackChunkName: "data-spacebuildings"*/ '../../../generateGameData/data/spacebuildings'),
      title: this.$t('TID_PRODUCTION_DLG_STATIONS'),
    };
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
};
</script>
