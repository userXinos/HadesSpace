<template>
  <div>
    <h1 id="title">{{ title }}</h1>
    <img
        class="portrait"
        src="../img/portraits/yellowStar.png"
        alt="yellowStar"
    />

    <v-content
      v-bind:args="{
       data: promise,
       single: 'YellowStar',
       iconDir: 'Stars'
      }"
    >
    </v-content>

    <div class="title title-heading" id="Sectors">
      <a href="#Sectors">
        {{ $t('sectors') }}
      </a>
    </div>
    <v-content
       v-bind:args="{
         data: promise2,
         lvlColKey: '№',
    }"
    >
    </v-content>
      <div class="title title-heading" id="LvlsPlanets">
        <a href="#LvlsPlanets">
          {{ $t('lvlsPlanets') }}
        </a>
      </div>
    <v-content
       v-bind:args="{
         data: promise3
    }"
    >
    </v-content>
    <div class="title title-heading" id="Planets">
      <a href="#Planets">
        {{ $t('planets') }}
      </a>
    </div>
    <v-content
       v-bind:args="{
         data: promise4,
         single: 'yellowstarTable',
         dontFixTables: true,
         lvlColKey: '№',
    }"
    >
    </v-content>
      <div class="title title-heading" id="ColonizationPlanets">
        <a href="#ColonizationPlanets">
          {{ $t('colonizationPlanets') }}
        </a>
      </div>
    <v-content
       v-bind:args="{
         data: promise5,
         lvlColKey: '№',
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
      promise2: import(/* webpackChunkName: "data-yellow_star_sectors"*/ '../../../generateGameData/data/yellow_star_sectors'),
      promise3: import(/* webpackChunkName: "data-planet_levels"*/ '../../../generateGameData/data/planet_levels'),
      promise4: import(/* webpackChunkName: "data-planets"*/ '../../../generateGameData/data/planets'),
      promise5: import(/* webpackChunkName: "data-colonize_prices"*/ '../../../generateGameData/data/colonize_prices'),
      title: this.$t('TID_YELLOW_STAR'),
    };
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
};
</script>
