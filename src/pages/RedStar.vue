<template>
  <div>
    <Page
      title-loc-key="TID_RED_STAR"
      :content-args="{
        data: star,
        iconDir: 'game/Stars',
        tableOpts: {colLvlStartAt: 0}
      }"
      :portrait="{src: img, alt: 'RedStar'}"
    />

    <h1
      id="Artifacts"
      class="topic"
    >
      <a
        v-t="'TID_OBJECT_ACTION_ARTIFACTS'"
        href="#Artifacts"
        class="art-title"
      />
    </h1>

    <!--suppress JSUnusedLocalSymbols -->
    <div
      v-for="(_, name) in ARTS"
      :key="name"
    >
      <div
        v-for="args in getArt(name)"
        :key="`${name}${args.data.Name}`"
      >
        <v-data v-bind="args" />
      </div>

    </div>
  </div>
</template>

<script>
import VData from '../components/Data.vue';
import Page from '@/components/Page.vue';

import stars from '@Data/stars.js';
import artifacts from '@Data/artifacts.js';

const ARTS = {
    Combat: 'COMBAT_ART',
    Utility: 'UTILITY_ART',
    Support: 'SUPPORT_ART',
};

const { RedStar } = stars;

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

USELESS_STATS.forEach((k) => delete RedStar[k]);

export default {
    components: { Page, VData },
    data() {
        return {
            ARTS,
            artifacts,
            star: { RedStar },
            img: require(`@Img/game/portraits/portrait_RedStar.png`),
        };
    },
    methods: {
        getArt(name) {
            const tableOpts = {
                lvlColKey: '№',
                colLvlStartAt: (name == 'Support') ? 2 : 1,
            };

            return [
                {
                    data: {
                        ...this.artifacts[name],
                        TID2: this.artifacts[name].TID,
                        TID: ARTS[name],
                    },
                    tableOpts,
                },
                {
                    data: {
                        TID: 'BLUEPRINTS',
                        ...this.artifacts[`${name}Blueprints`],
                    },
                    tableOpts,
                },
            ];
        },
    },
};
</script>
<style scoped lang="scss">
@import "../css/vars";

$mw: 900px;

.art-title {
    padding: 0;
    color: $text-color;
}

</style>

<!--suppress CssUnusedSymbol -->
<style>
#CombatBlueprints, #UtilityBlueprints, #SupportBlueprints {
    font-size: 130%;
    margin-top: 2%;
}
</style>
