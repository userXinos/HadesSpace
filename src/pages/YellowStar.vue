<template>
  <div>
    <Page
      title-loc-key="TID_YELLOW_STAR"
      :content-args="{data: stars, iconDir: 'game/Stars'}"
      :portrait="{src: img, alt: 'yellowStar'}"
    />

    <v-content :args="{data: sectors, tableOpts}" />
    <v-content :args="{data: levels}" />
    <v-content :args="{data: planets, tableOpts}" />
    <v-content :args="{data: prices, tableOpts}" />

  </div>
</template>

<script>
import Page from '@/components/Page.vue';
import VContent from '../components/Content.vue';

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
planetsYS.TID2 = planetsYS.TID;
planetsYS.TID = 'PLANETS';
planetsYS.Name = 'Planets';

const colonizationPrices = {
    TID: 'COLONIZATION_PLANETS',
    TID2: planetsYS.TID2,
    null: [0, ...prices],
};

export default {
    components: { Page, VContent },
    data() {
        return {
            stars: { star },
            sectors: { sectors: { TID: 'SECTORS', ...sectors } },
            levels: { levels: { TID: 'LVLS_PLANETS', ...levels } },
            planets: { planetsYS },
            prices: { colonizationPrices },

            tableOpts: { lvlColKey: '№' },
            img: require(`@Img/game/portraits/yellowStar.png`),
        };
    },
};
</script>
<style scoped src="../css/page.css"></style>
