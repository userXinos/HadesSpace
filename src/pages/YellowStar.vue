<template>
  <div>
    <Page
      title-loc-key="TID_YELLOW_STAR"
      :content-args="{data: {stars}, iconDir: 'game/Stars'}"
      :portrait="{src: img, alt: 'yellowStar'}"
    />

    <v-data v-bind="{data: sectors, tableOpts: { lvlColKey: '№' }}" />
    <v-data v-bind="{data: levels}" />
    <v-data v-bind="{data: planets, tableOpts: { lvlColKey: '№' }}" />
    <v-data v-bind="{data: prices, tableOpts: { lvlColKey: '№' }}" />

  </div>
</template>

<script>
import i18n from '@Scripts/Vue/i18n';
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

const { t } = i18n.global;
const colonizationPrices = {
    Name: 'colonize_prices',
    TID: 'COLONIZATION_PLANETS',
    ProbableTypePlanet: planetsYS.TID2.map((k) => t(k)),
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

            img: require(`@Img/game/portraits/portrait_YellowStar.png`),
        };
    },
};
</script>
<style scoped src="../style/page.scss"  lang="scss"></style>
