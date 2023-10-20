<template>
  <div>
    <Page
      title-loc-key="TID_YELLOW_STAR"
      :content-args="{data: {ys}, iconDir: 'game/Stars'}"
      :portrait="{src: img, alt: 'yellowStar'}"
    />

    <v-data v-bind="{data: sectors, tableOpts: { lvlColKey: '№' }}" />
    <v-data v-bind="{data: { TID: 'LVLS_PLANETS', ...levels }}" />
    <v-data v-bind="{data: planetsYS, tableOpts: { lvlColKey: '№' }}" />
    <template v-if="prices.length">
      <v-data v-bind="{data: colonizationPrices, tableOpts: { lvlColKey: '№' }}" />
    </template>


  </div>
</template>

<script setup>
import i18n from '@Utils/Vue/i18n';
import Page from '@/components/Page.vue';
import VData from '../components/Data.vue';

import stars from '@Data/stars.js';
import sectorsData from '@Data/yellow_star_sectors.js';
import levels from '@Data/planet_levels.js';
import planets from '@Data/planets.js';
import img from '@Img/game/portraits/portrait_YellowStar.png';

import compileOne from '@Utils/compileOne.ts';

const prices = process.env.VUE_APP_NEBULA_BUILD ? [] : require(`@Data/colonize_prices.js`);
const ys = { ...stars.YellowStar };
delete ys.Models;

const planetsYS = compileOne(planets, { filterByType: { path: 'planets.yellowstar' } });
delete planetsYS.ModelFolders;
delete planetsYS.ConceptImage;
planetsYS.TID2 = planetsYS.TID;
planetsYS.TID = 'PLANETS';
planetsYS.Name = 'Planets';

const { t } = i18n.global;
const colonizationPrices = {
    Name: 'colonize_prices',
    TID: 'COLONIZATION_PLANETS',
    ProbableTypePlanet: planetsYS.TID2.map((k) => t(k)),
    _: [0, ...prices],
};

const sectors = {
    Name2: sectorsData.Name,
    ...sectorsData,
    BaseType: sectorsData.BaseType.map((v, i) => v ? ({ ...v, NumBases: sectorsData.NumBases[i] }) : null),
    TID: 'SECTORS',
    TID_Description: 'TID_YS_SECTORS_CUSTOM_DESCR',
    Name: 'yellow_star_sectors',
};
</script>
<style scoped src="../style/page.scss"  lang="scss"></style>
