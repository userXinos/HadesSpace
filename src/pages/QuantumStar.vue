<template>
  <div>
    <Page
      title-loc-key="TID_CORP_STAR"
      :content-args="{data: { qs }, iconDir: 'game/Stars', tableOpts: {lvlColKey: '№'} }"
      :portrait="{src: img, alt: 'quantumStars'}"
    />

    <v-data
      :data="planetsQS"
      :table-opts="{lvlColKey: '№'}"
    />

  </div>
</template>

<script setup>
import Page from '@/components/Page.vue';
import VData from '@/components/Data.vue';

import stars from '@Data/stars.js';
import planets from '@Data/planets.js';
import compileOne from '@Utils/compileOne.ts';
import img from '@Img/game/portraits/portrait_Sentinel.jpg';

const qs = stars.QuantumStar;
qs.TID = 'TID_CORP_STAR';
delete qs.Lifetime;
delete qs.NumPlayersWithAccess;

const planetsQS = compileOne(planets, { filterByType: { path: 'planets.quantumstar' } });
planetsQS.TID = 'PLANETS';
planetsQS.Name = 'Planets';
[
    'ConceptImage',
    'PlanetSize',
    'AppearanceModels',
].forEach((k) => delete planetsQS[k]);
</script>
<style scoped src="../style/page.scss"  lang="scss"></style>
