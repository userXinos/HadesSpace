<template>
  <div>
    <h1 id="title">{{ title }}</h1>
    <img
        class="portrait"
        src="../img/portraits/whiteStars.png"
        alt="whiteStars"
    />

    <v-content
      v-bind:args="{
       data: promise,
       single: 'WhiteStar',
       iconDir: 'Stars'
      }"
    >
    </v-content>

    <div class="title">
      <div class="title-text" id="Planets">
        <a href="#Planets">
          {{ $t('planets') }}
        </a>
      </div>
    </div>
    <v-content
       v-bind:args="{
         data: promise2,
         single: 'whitestarTable',
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
      promise2: import(/* webpackChunkName: "data-planets"*/ '../../../generateGameData/data/planets'),
      title: this.$t('TID_WHITE_STAR'),
    };
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
};
</script>
