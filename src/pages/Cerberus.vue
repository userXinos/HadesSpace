<template>
  <div>
    <Page
      title-loc-key="CERBERUS"
      :content-args="{data: ships, iconDir: 'game/Ships'}"
      :portrait="{src: cerberusPortrait, alt: 'cerberus'}"
    >
      <div class="container">
        <h2>{{ 'Categories' }}</h2>
        <div class="list">
          <ol>
            <li v-if="isNebulaBuild"><a href="#DarkCerberus">Dark cerberus</a></li>
            <li><a href="#CerberusStations">Cerberus stations</a></li>
          </ol>
        </div>
      </div>
    </Page>

    <div v-if="isNebulaBuild">
      <div class="portrait-container">
        <img
          class="portrait"
          :src="darkCerberusPortrait"
          alt="dark cerberus"
        >
        <h1
          id="DarkCerberus"
          class="topic"
        >
          <a
            href="#DarkCerberus"
            class="link-topic"
          > {{ 'Dark ' + $t('CERBERUS') }} </a>
        </h1>
      </div>

      <v-content :args="{data: darkShips, iconDir: 'game/Ships'}" />
    </div>

    <div>
      <div class="portrait-container">
        <img
          class="portrait"
          :src="stationPortrait"
          alt="cerberus station"
        >
        <h1
          id="CerberusStations"
          class="topic"
        >
          <a
            v-t="'TID_CERB_STATION_HOME2'"
            href="#CerberusStations"
            class="link-topic"
          />
        </h1>
      </div>

      <v-content :args="{data: stations, iconDir: 'game/SpaceBuildings'}" />
    </div>

  </div>
</template>

<script setup>
import i18n from '@Utils/Vue/i18n';
import Page from '@/components/Page.vue';
import VContent from '../components/Content.vue';

import getFilterByType from '@Utils/getFilterByType';
import objectArrayify from '@Utils/objectArrayify';
import shipsData from '@Data/capital_ships.js';
import stationsData from '@Data/cerberus_stations.js';

import cerberusPortrait from '@Img/game/portraits/portrait_CerberusDestroyer.png';
import stationPortrait from '@Img/game/portraits/portrait_CerberusStation.png';
const darkCerberusPortrait = require( `@Img/game/portraits/${process.env.VUE_APP_NEBULA_BUILD ? 'portrait_CerberusCarrier' : 'portrait_CerberusDestroyer'}.png`); // eslint-disable-line @typescript-eslint/no-var-requires

if (shipsData.CerberusGhosts.GhostSpawnSecs) {
    // eslint-disable-next-line prefer-destructuring
    shipsData.CerberusGhosts.GhostSpawnSecs = shipsData.CerberusGhosts.GhostSpawnSecs[0];
}

if (shipsData.CerberusColossus.modules[1].SalvageHullPercent) {
    shipsData.CerberusColossus.modules[1].SalvageHullPercent.pop();
}


const UNNECESSARY_MODULE_STATS = [
    'BSScore',
    'BCCost',
    'FuelUseIncrease',
    'TID_Artifact',
    'UnlockBlueprints',
    'UnlockPrice',
    'UnlockTime',
    'WhiteStarScore',
];

const isNebulaBuild = !!process.env.VUE_APP_NEBULA_BUILD;
const ships = getShips('capital_ships.cerberus');
const darkShips = getShips('capital_ships.darkCerberus');
const stations = objectArrayify(stationsData, {
    map: ([k, v]) => {
        if (v.ShipToSpawn) {
            v.ShipToSpawn = getShipLocName(v.ShipToSpawn);
        }
        return [k, v];
    },
});

function getShips(path) {
    return objectArrayify(shipsData, {
        ...getFilterByType(path),
        map: ([k, v]) => {
            if (v.modules) {
                v.modules = v.modules.map((e) => objectArrayify(e, {
                    filter: ([k]) => !UNNECESSARY_MODULE_STATS.includes(k),
                }));
            }
            if (v.OnDestroySpawn) {
                const k = v.OnDestroySpawn;
                const n = String(v.OnDestroySpawnCount);

                v.OnDestroySpawn = `${n}x ${getShipLocName(k)}`;
                delete v.OnDestroySpawnCount;
            }
            return [k, v];
        },

    });
}
function getShipLocName(key) {
    return (key in shipsData) ? i18n.global.t(shipsData[key].TID) : key;
}
</script>

<style scoped lang="scss">
@import "../style/page";

.portrait-container {
    padding-top: 5%;
}

.container {
    h2 {
        text-align: center;
        margin: 30px;
    }

    .list {
        margin: 0 3%;

        ol {
            border: 5px solid #586066;
            list-style-type: none;
            font-size: 150%;
        }
        li {
            text-align: center;
        }
    }
}
</style>
