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

    <template v-if="!isNebulaBuild">
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
    </template>


    <div id="ModulesByArtType">
      <v-data :data="{TID: 'MODULES_BY_ARTIFACT_TYPE', Name: 'modulesByArtType', ...modulesByArtType}">

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

<script setup>
import VData from '../components/Data.vue';
import Page from '@/components/Page.vue';
import Store from '@/store';

import starsData from '@Data/stars.js';
import artifacts from '@Data/artifacts.js';
import globals from '@Data/globals.js';
import objectArrayify from '@Utils/objectArrayify';
import { getBySlotType } from '../components/ModulePage.vue';
import img from '@Img/game/portraits/portrait_RedStar.png';
import types from '@Store/modules/userSettings/types';

const isNebulaBuild = !!process.env.VUE_APP_NEBULA_BUILD;
const ARTS = {
    Combat: isNebulaBuild ? 'TID_TRADEITEM_ARTIFACT_COMBAT' : 'COMBAT_ART',
    Utility: isNebulaBuild ? 'TID_TRADEITEM_ARTIFACT_UTILITY' : 'UTILITY_ART',
    Support: isNebulaBuild ? 'TID_TRADEITEM_ARTIFACT_SUPPORT' : 'SUPPORT_ART',
};
const { MinDarkRSLevel } = globals;
const { RedStar } = starsData;
const DarkRedStar = starsData.DarkRedStar || {};
const ARTIFACT_TYPES = isNebulaBuild ? ['Trade', 'Mining', 'Weapon', 'Shield', 'Support', 'Drone'] : ['Utility', 'Combat', 'Support'];
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
const RS_LVLS = RedStar[`${isNebulaBuild ? 'AppearanceModels' : 'Models'}`].length - 1; // Tut lvl 0

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
const modulesByArtType = Object.fromEntries(ARTIFACT_TYPES.map((type) => (
    [type, modulesByLvl(getBySlotType(type))]
)));

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
function modulesByLvl(modules) {
    const res = [];

    for (let i = 0; i < RS_LVLS; i++) {
        const item = Object.values(modules)
            .map(((mod) => {
                if (mod[`${isNebulaBuild ? 'RSLevel' : 'AwardLevel'}`] == i + 1) {
                    return mod;
                }
            }))
            .filter((e) => e != undefined);
        res.push(item.length ? item : null);
    }

    return res;
}
function switchCompactMode() {
    Store.commit(types.SWITCH_COMPACT_MODULES_BY_ART_TYPE_TABLE);
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
