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

    <CommunityTable file-name="artifacts" />

    <div id="ModulesByArtType">
      <v-data :data="{TID: 'MODULES_BY_ARTIFACT_TYPE', Name: 'ModulesByArtType', ...modulesByArtType}">

        <div class="switch">
          <div>
            <p
              v-t="'COMPACT_MODE'"
              class="name"
            />
            <p
              v-t="'COMPACT_MODE_NOTE'"
              class="description"
            />
          </div>
          <input
            id="compact-mode"
            class="checkbox"
            type="checkbox"
            :checked="$store.state.userSettings.compactModulesByArtTypeTable"
            @change="switchCompactMode"
          >
          <label
            for="compact-mode"
            class="label"
          />
        </div>

      </v-data>
    </div>

  </div>
</template>

<!--suppress JSUnresolvedReference -->
<script setup>
import { useStore } from 'vuex';
import VData from '../components/Data.vue';
import Page from '@/components/Page.vue';
import CommunityTable from '@/components/CommunityTable.vue';

import starsData from '@Data/stars.js';
import globals from '@Data/globals.js';
import objectArrayify from '@Utils/objectArrayify';
import { getBySlotType } from '../components/ModulePage.vue';
import img from '@Img/game/portraits/portrait_DyingPlanet.jpg';
import types from '@Store/modules/userSettings/types';
import byTypes from '@Regulation/byTypes';

const store = useStore();
const { MinDarkRSLevel } = globals;
const { RedStar } = starsData;
const { DarkRedStar } = starsData;
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
const RS_LVLS = RedStar['AppearanceModels'].length - 1; // Tut lvl 0

USELESS_STATS.forEach((k) => {
    delete RedStar[k];
    delete DarkRedStar[k];
});

DarkRedStar.TID = 'TID_DARK_RED_STAR_LABEL';
DarkRedStar.TID_Description = 'TID_JOIN_DARK_RED_STAR_INFO';

if ('JumpCosts_T' in RedStar) {
    RedStar.JumpShips = {
        JumpCostTransport: [...RedStar.JumpCosts_T],
        JumpCostMiner: [...RedStar.JumpCosts_M],
        JumpCostBattleship: [...RedStar.JumpCosts_B],
    };
    delete RedStar.JumpCosts_T;
    delete RedStar.JumpCosts_M;
    delete RedStar.JumpCosts_B;
}

if ('JumpCosts_T' in DarkRedStar) {
    DarkRedStar.JumpShips = {
        JumpCostTransport: [...DarkRedStar.JumpCosts_T],
        JumpCostMiner: [...DarkRedStar.JumpCosts_M],
        JumpCostBattleship: [...DarkRedStar.JumpCosts_B],
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
const modulesByArtType = Object.fromEntries(byTypes.artifact.map((type) => (
    [type, modulesByLvl(getBySlotType(type))]
)));

function modulesByLvl(modules) {
    const res = [];

    for (let i = 0; i < RS_LVLS; i++) {
        const item = Object.values(modules)
            .map(((mod) => {
                if (mod['RSLevel'] == i + 1) {
                    return mod;
                }
            }))
            .filter((e) => e != undefined);
        res.push(item.length ? item : null);
    }

    return res;
}
function switchCompactMode() {
    store.commit(types.SWITCH_COMPACT_MODULES_BY_ART_TYPE_TABLE);
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
<style scoped lang="scss">
@import "../style/vars";
@import "../style/userInput";

#CombatBlueprints, #UtilityBlueprints, #SupportBlueprints {
    font-size: 130%;
    margin-top: 2%;
}

#ModulesByArtType:deep(.table > tbody > tr > td > div) {
    display: flex;
    justify-content: center;
    align-items: center;

    a {
        padding: 0 10px;
        transition: filter .2s;

        &:hover {
            filter: opacity(0.5) drop-shadow(0.1px 0px 0px #000000);
        }
        > div {
            width: 50px;
        }

        p {
            padding-top: 5px;
            text-align: center;
        }
    }
}

.switch {
    justify-content: start;
}
</style>
