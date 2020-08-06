<template>
  <div>
    <h1 id="title">{{ title }}</h1>
    <img
        class="portrait"
        src="../img/portraits/ships.png"
        alt="ships"
    />

    <v-content
      v-bind:args="{
       data: promise,
       category: 'player',
       dontFixTables: ['Transport', 'Miner', 'Battleship'],
       iconDir: 'Ships'
      }"
    >
    </v-content>

    <div class="title">
      <div class="title-text">
        <h1>
          <a href="#FlagshipModules" id="FlagshipModules">
            {{ $t('flagshipModules') }}
          </a>
        </h1>
      </div>
    </div>
    <v-content
       v-bind:args="{
         data: promise2,
         category: 'flagship',
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
      promise: import(/* webpackChunkName: "data-capital_ships"*/ '../../../generateGameData/data/capital_ships'),
      promise2: import(/* webpackChunkName: "data-modules"*/ '../../../generateGameData/data/modules'),
      title: this.$t('TID_PRODUCTION_DLG_SHIPS'),
    };
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
};
</script>
