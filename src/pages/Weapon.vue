<template>
  <div>
    <h1 id="title">{{ title }}</h1>
    <img
        class="portrait"
        src="../img/portraits/weapon.png"
        alt="weapon modules"
    />

    <v-content
      v-bind:args="{
       data: promise,
       category: 'weapon',
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
      title: this.$t('typeModWeapon'),
    };
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
};
</script>
