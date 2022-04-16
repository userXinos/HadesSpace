<template>
  <div>
    <Page
      title-loc-key="TID_YELLOW_STAR"
      :content-args="{data: {stars}, iconDir: 'game/Stars'}"
      :portrait="{src: img, alt: 'yellowStar'}"
    />

    <v-data v-bind="{data: sectors, tableOpts}" />
    <v-data v-bind="{data: levels}" />
    <v-data v-bind="{data: planets, tableOpts}" />
    <v-data v-bind="{data: prices, tableOpts}" />

  </div>
</template>

<script>
import Page from '@/components/Page.vue';
import VData from '../components/Data.vue';

import stars from '@Data/stars.js';
import sectors from '@Data/yellow_star_sectors.js';
import levels from '@Data/planet_levels.js';
import planets from '@Data/planets.js';
import prices from '@Data/colonize_prices.js';

import compileOne from '@Scripts/compileOne.js';

const star = { ...stars.YellowStar };
delete star.Models;

const planetsYS = compileOne(planets, { filterByType: { path: 'planets.yellowstar' } });
delete planetsYS.ModelFolders;
delete planetsYS.ConceptImage;
planetsYS.TID2 = planetsYS.TID;
planetsYS.TID = 'PLANETS';
planetsYS.Name = 'Planets';

const colonizationPrices = {
    Name: 'colonize_prices',
    TID: 'COLONIZATION_PLANETS',
    TID2: planetsYS.TID2,
    _: [0, ...prices],
};

export default {
    components: { Page, VData },
    data() {
        return {
            stars: star,
            sectors: {
                Name2: sectors.Name,
                ...sectors,
                BaseType: sectors.BaseType.map((v, i) => v ? ({ ...v, NumBases: sectors.NumBases[i] }) : null),
                TID: 'SECTORS',
                Name: 'yellow_star_sectors',
            },
            levels: { TID: 'LVLS_PLANETS', ...levels },
            planets: planetsYS,
            prices: colonizationPrices,

            tableOpts: { lvlColKey: '№' },
            img: require(`@Img/game/portraits/yellowStar.png`),
        };
    },
};
</script>
<style scoped src="../css/page.css"></style>
