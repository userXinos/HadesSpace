<template>
  <div>
    <Page
      title-loc-key="TID_WHITE_STAR"
      :content-args="{data: { ws }, iconDir: 'game/Stars', tableOpts: {lvlColKey: '№'} }"
      :portrait="{src: img, alt: 'whiteStars'}"
    />

    <v-data
      :data="planetsWS"
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
import img from '@Img/game/portraits/portrait_PlanetWhiteStar.png';

const ws = stars.WhiteStar;
ws.Lifetime = ws.Lifetime * ws.TimeSlowdownFactor;

const planetsWS = compileOne(planets, { filterByType: { path: 'planets.whitestar' } });
planetsWS.TID = 'PLANETS';
planetsWS.Name = 'Planets';
[
    'CreditIncomeModifier',
    'CreditShipmentModifier',
    'CreditStorageModifier',
    'FuelIncomeModifier',
    'FuelShipmentModifier',
    'FuelStorageModifier',
    'MaxUpgradeLevel',
    'ShipmentsPerHour',
    'ConceptImage',
].forEach((k) => delete planetsWS[k]);
</script>
<style scoped src="../style/page.scss"  lang="scss"></style>
