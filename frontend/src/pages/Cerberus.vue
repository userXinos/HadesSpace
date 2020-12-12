<template>
  <div>
    <h1 id="title">{{ title }}</h1>
    <img
        class="portrait"
        src="../img/portraits/cerberus.png"
        alt="cerberus"
    />

    <v-content
      v-bind:args="{
       data: promise,
       category: 'cerberus',
       iconDir: 'Ships',
       cerberusModules
      }"
    >
    </v-content>

    <div class="title title-heading" id="CerberusStations">
      <h1>
        <a href="#CerberusStations">
          {{ $t('TID_CERB_STATION_HOME2') }}
        </a>
      </h1>
    </div>
    <v-content
       v-bind:args="{
       data: promise2,
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
      promise: import(/* webpackChunkName: "data-capital_ships"*/ '../../../generateGameData/data/capital_ships'),
      promise2: import(/* webpackChunkName: "data-cerberus_stations"*/ '../../../generateGameData/data/cerberus_stations'),
      title: this.$t('cerberus'),
      cerberusModules: {},
    };
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
  created() {
    import(/* webpackChunkName: "data-modules"*/ '../../../generateGameData/data/modules')
        .then((raw) => {
          raw['byTypes'].cerberus.forEach((e) => {
            this.$set(this.cerberusModules, e, raw.data[e]);
          });
        })
        .catch(console.error);
  },
};
</script>
