<template>
  <div>
    <h1 id="title">{{ title }}</h1>
    <img
        class="portrait"
        src="../img/portraits/redStar.png"
        alt="redStar"
    />

    <v-content
      v-bind:args="{
       data: promise,
       single: 'RedStar',
       iconDir: 'Stars',
       collvlStartAt: 0,
      }"
    >
    </v-content>

    <div class="title" id="Artifacts">
      <div class="title-text">
        <h1>
          <a href="#Artifacts">
            {{ $t('TID_OBJECT_ACTION_ARTIFACTS') }}
          </a>
        </h1>
      </div>
    </div>
    <div v-for="art of ['Combat', 'Utility', 'Support']" :key="art">
      <div class="title">
        <div class="title-text" :id="art">
          <a :href="'#' + art">
            {{ $t(art + 'Art') }}
          </a>
        </div>
      </div>
      <v-content
       v-bind:args="{
           data: promise2,
           single: art,
           lvlColKey: '№',
           collvlStartAt: (art == 'Support') ? 2 : 1
    }"
      >
      </v-content>
      <div class="title">
        <div class="title-text">
          {{ $t('blueprints') }}
        </div>
      </div>
      <v-content
       v-bind:args="{
           data: promise2,
           single: 'blueprints' + art,
           lvlColKey: '№',
           collvlStartAt: (art == 'Support') ? 2 : 1,
           dontFixTables: true
    }"
      >
      </v-content>
    </div>
  </div>
</template>

<script>
import VContent from '../components/Content.vue';

export default {
  components: {VContent},
  data() {
    return {
      promise: import(/* webpackChunkName: "data-stars"*/ '../../../generateGameData/data/stars'),
      promise2: import(/* webpackChunkName: "data-artifacts"*/ '../../../generateGameData/data/artifacts'),
      title: this.$t('TID_RED_STAR'),
    };
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
};
</script>
