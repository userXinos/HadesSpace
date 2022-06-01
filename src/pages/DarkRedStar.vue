<template>
  <Page
    title-loc-key="TID_DARK_RED_STAR_LABEL"
    :content-args="{
      data,
      iconDir: 'game/Stars',
      tableOpts: {colLvlStartAt: 5}
    }"
    :portrait="{src: img, alt: 'Asteroids'}"
  />
</template>

<script>
import Page from '@/components/Page.vue';
import stars from '@Data/stars.js';

import objectArrayify from '@Scripts/objectArrayify';

const { DarkRedStar } = stars;
const USELESS_STATS = [
    'GhostSpawnSecs',
    'Models',
    'LowerPlanetsMinLevel',
    'MaxPlanetBomberCoverage',
    'MaxPlanetBomberCoverage',
    'GhostSpawner',
    'NumLowerPlanets',
    'MedRiskMining',
    'HighRiskMining',
];

USELESS_STATS.forEach((k) => delete DarkRedStar[k]);

export default {
    components: { Page },
    data() {
        return {
            data: { DarkRedStar: objectArrayify(DarkRedStar, {
                map: ([k, v]) => [k, Array.isArray(v) ? v.slice(5) : v],
            }) },
            img: require(`@Img/game/portraits/portrait_Asteroids.png`),
        };
    },
};
</script>
