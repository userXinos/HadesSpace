<template>
  <div>
    <Page
      title-loc-key="TID_WHITE_STAR"
      :content-args="{data: stars, iconDir: 'game/Stars', tableOpts: {lvlColKey: '№'} }"
      :portrait="{src: img, alt: 'whiteStars'}"
    />

    <v-data
      :data="planets"
      :table-opts="{lvlColKey: '№'}"
    />

  </div>
</template>

<script>
import Page from '@/components/Page.vue';
import VData from '@/components/Data.vue';

import stars from '@Data/stars.js';
import planets from '@Data/planets.js';
import compileOne from '@Scripts/compileOne.js';

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

export default {
    components: { Page, VData },
    data() {
        return {
            stars: { ws },
            planets: planetsWS,
            img: require(`@Img/game/portraits/portrait_PlanetWhiteStar.png`),

        };
    },
};
</script>
<style scoped src="../css/page.css"></style>
