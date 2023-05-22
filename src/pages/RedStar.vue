<template>
  <div>
    <Page
      title-loc-key="TID_RED_STAR"
      :content-args="{
        data: stars.RedStar,
        iconDir: 'game/Stars',
        tableOpts: {colLvlStartAt: 0}
      }"
      :portrait="{src: img, alt: 'RedStar'}"
    />

    <v-data
      v-if="isNebulaBuild"
      v-bind="{
        data: stars.DarkRedStar,
        iconDir: 'game/Stars',
        tableOpts: {colLvlStartAt: MinDarkRSLevel}
      }"
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
        <v-data
          :data="args.data"
          :table-opts="args.tableOpts"
        />
      </div>

    </div>
  </div>
</template>

<script setup>
import VData from '../components/Data.vue';
import Page from '@/components/Page.vue';

import starsData from '@Data/stars.js';
import artifacts from '@Data/artifacts.js';
import globals from '@Data/globals.js';
import objectArrayify from '@Utils/objectArrayify';
import img from '@Img/game/portraits/portrait_RedStar.png';

const isNebulaBuild = !!process.env.VUE_APP_NEBULA_BUILD;
const ARTS = {
    Combat: isNebulaBuild ? 'TID_TRADEITEM_ARTIFACT_COMBAT' : 'COMBAT_ART',
    Utility: isNebulaBuild ? 'TID_TRADEITEM_ARTIFACT_UTILITY' : 'UTILITY_ART',
    Support: isNebulaBuild ? 'TID_TRADEITEM_ARTIFACT_SUPPORT' : 'SUPPORT_ART',
};
const { MinDarkRSLevel } = globals;
const { RedStar } = starsData;
const DarkRedStar = starsData.DarkRedStar || {};
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

USELESS_STATS.forEach((k) => {
    delete RedStar[k];
    delete DarkRedStar[k];
});

DarkRedStar.TID = 'TID_DARK_RED_STAR_LABEL';
DarkRedStar.TID_Description = 'TID_JOIN_DARK_RED_STAR_INFO';

if ('JumpCosts_T' in RedStar) {
    RedStar.JumpCost = {
        Transport: [...RedStar.JumpCosts_T],
        Miner: [...RedStar.JumpCosts_M],
        Battleship: [...RedStar.JumpCosts_B],
    };
    delete RedStar.JumpCosts_T;
    delete RedStar.JumpCosts_M;
    delete RedStar.JumpCosts_B;
}

if ('JumpCosts_T' in DarkRedStar) {
    DarkRedStar.JumpCost = {
        Transport: [...DarkRedStar.JumpCosts_T],
        Miner: [...DarkRedStar.JumpCosts_M],
        Battleship: [...DarkRedStar.JumpCosts_B],
    };
    delete DarkRedStar.JumpCosts_T;
    delete DarkRedStar.JumpCosts_M;
    delete DarkRedStar.JumpCosts_B;
}

const stars = {
    RedStar: { RedStar },
    DarkRedStar: objectArrayify(DarkRedStar, {
        map: ([k, v]) => [k, Array.isArray(v) ? v.slice(MinDarkRSLevel) : v],
    }),
};
function getArt(name) {
    const tableOpts = {
        lvlColKey: '№',
        colLvlStartAt: (name == 'Support') ? 2 : 1,
    };
    const res = [];

    res[0] = {
        data: { ...artifacts[name], TID2: artifacts[name].TID, TID: ARTS[name] },
        tableOpts,
    };
    if (!isNebulaBuild) {
        res[1] = {
            data: { TID: 'BLUEPRINTS', ...artifacts[`${name}Blueprints`] },
            tableOpts,
        };
    }

    return res;
}
</script>
<style scoped lang="scss">
@import "../style/vars";
@import "../style/page";

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
