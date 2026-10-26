<template>
  <div>
    <Page
      title-loc-key="CERBERUS"
      :content-args="{data: ships, iconDir: 'game/Ships'}"
      :portrait="{src: cerberusPortrait, alt: 'cerberus'}"
    >
      <div class="categories">
        <ol>
          <li><a
            v-t="'DARK_CERBERUS'"
            href="#DarkCerberus"
          /></li>
          <li><a
            v-t="'QUANTUM_CERBERUS'"
            href="#QuantumCerberus"
          /></li>
          <li><a
            v-t="'TID_CERB_STATION_HOME2'"
            href="#CerberusStations"
          /></li>
        </ol>
      </div>
    </Page>

    <div>
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
            v-t="'DARK_CERBERUS'"
            href="#DarkCerberus"
            class="link-topic"
          />
        </h1>
      </div>

      <v-content :args="{data: darkShips, iconDir: 'game/Ships'}" />
    </div>

    <div>
      <div class="portrait-container">
        <img
          class="portrait"
          :src="quantumCerberusPortrait"
          alt="quantum cerberus"
        >
        <h1
          id="QuantumCerberus"
          class="topic"
        >
          <a
            v-t="'QUANTUM_CERBERUS'"
            href="#QuantumCerberus"
            class="link-topic"
          />
        </h1>
      </div>

      <v-content :args="{data: quantumShips, iconDir: 'game/Ships'}" />
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

      <v-content :args="{data: stations, iconDir: 'game/SpaceBuildings', tableOpts: { lvlColKey: '№' }}" />
    </div>

  </div>
</template>

<!--suppress JSUnresolvedReference -->
<script setup>
import { useI18n } from 'vue-i18n';
import Page from '@/components/Page.vue';
import VContent from '../components/Content.vue';

import getFilterByType from '@Utils/getFilterByType';
import objectArrayify from '@Utils/objectArrayify';
import shipsData from '@Data/capital_ships.js';
import stationsData from '@Data/cerberus_stations.js';
import modules from '@Data/modules.js';

import cerberusPortrait from '@Img/game/portraits/portrait_CerberusDestroyer.jpg';
import stationPortrait from '@Img/game/portraits/portrait_CerberusStation.jpg';
import darkCerberusPortrait from '@Img/game/portraits/portrait_Interceptor.jpg';
import quantumCerberusPortrait from '@Img/game/portraits/portrait_CerberusCarrier.png';

if (shipsData.CerberusGhosts.GhostSpawnSecs) {
    // eslint-disable-next-line prefer-destructuring
    shipsData.CerberusGhosts.GhostSpawnSecs = shipsData.CerberusGhosts.GhostSpawnSecs[0];
}

if (shipsData.CerberusColossus.modules[1].SalvageHullPercent) {
    shipsData.CerberusColossus.modules[1].SalvageHullPercent.pop();
}

const { t } = useI18n();
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

const ships = getShips('capital_ships.cerberus');
const darkShips = getShips('capital_ships.darkCerberus');
const quantumShips = getShips('capital_ships.quantumCerberus');
const stations = objectArrayify(stationsData, {
    map: ([k, v]) => {
        if (v.ShipToSpawn) {
            v.ShipToSpawn = getShipLocName(v.ShipToSpawn);
        }
        return [k, v];
    },
});
const quantumBaseWeapons = objectArrayify(modules, {
    filter: ([k]) => k.startsWith('QB'),
});
const quantumBases = {};
const dnStations = Object.entries(stations)
    .filter(([k, v]) => k.startsWith('DN_Lv') && v && 'DisplayLevel' in v)
    .sort((a, b) => a[1].DisplayLevel - b[1].DisplayLevel);

if (dnStations.length) {
    const [[firstKey, firstStation]] = dnStations;
    const metaKeys = ['Name', 'DisplayLevel', 'TID', 'TID_Description', 'ConceptImage', 'Model', 'WeaponFx'];
    const statKeys = [...new Set(dnStations.flatMap(([, station]) => Object.keys(station)))]
        .filter((key) => !metaKeys.includes(key));

    quantumBases.Name = firstKey;
    quantumBases.QBLevel = dnStations.map(([, station]) => station.DisplayLevel);
    quantumBases.modules = Object.values(quantumBaseWeapons).map((module) => {
        if (module.Name !== 'QBLaser') {
            return module;
        }

        const { DPSRampTimesWS, ...laser } = module;

        return { ...laser, DPSRampTimes_WS: DPSRampTimesWS };
    });
    metaKeys.filter((key) => key in firstStation).forEach((key) => {
        if (key !== 'Name' && key !== 'DisplayLevel') {
            quantumBases[key] = firstStation[key];
        }
    });
    statKeys.forEach((key) => {
        const values = dnStations.map(([, station]) => station[key]);
        const [firstValue] = values;
        const isConstant = values.every((value) => JSON.stringify(value) === JSON.stringify(firstValue));

        quantumBases[key] = isConstant ? firstValue : values;
    });

    stations[firstKey] = quantumBases;
    dnStations.slice(1).forEach(([key]) => delete stations[key]);
}

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
            if (v.PeriodSpawnType) {
                v.PeriodSpawnType = getShipLocName(v.PeriodSpawnType);
            }
            return [k, v];
        },

    });
}
function getShipLocName(key) {
    return (key in shipsData) ? t(shipsData[key].TID) : key;
}
</script>

<style scoped lang="scss">
@import "../style/page";
@import "../style/vars";

.portrait-container {
    padding-top: 5%;
}

.categories {
    margin: 0 3%;

    ol {
        padding: 2%;
        border: solid $border-color 4px;
        border-radius: 10px;
        list-style-type: none;
        font-size: 150%;
    }
    li {
        text-align: center;
    }
}
</style>
