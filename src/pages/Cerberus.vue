<template>
  <div>
    <Page
      title-loc-key="CERBERUS"
      :content-args="{data: ships, iconDir: 'game/Ships'}"
      :portrait="{src: cerberusPortrait, alt: 'cerberus'}"
    />

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

<script>
import Page from '@/components/Page.vue';
import VContent from '../components/Content.vue';

import filterByType from '@Scripts/filterByType.js';
import objectArrayify from '@Scripts/objectArrayify.js';
import ships from '@Data/capital_ships.js';
import stations from '@Data/cerberus_stations.js';

// eslint-disable-next-line prefer-destructuring
ships.CerberusGhosts.GhostSpawnSecs = ships.CerberusGhosts.GhostSpawnSecs[0];
ships.CerberusColossus.modules[1].SalvageHullPercent.pop();

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

export default {
    components: { Page, VContent },
    data() {
        return {
            ships: filterByType(ships, 'capital_ships.cerberus', {
                map: ([k, v]) => {
                    if (v.modules) {
                        v.modules = v.modules.map((e) => objectArrayify(e, {
                            filter: ([k]) => !UNNECESSARY_MODULE_STATS.includes(k),
                        }));
                    }
                    return [k, v];
                },

            }),
            stations,
            cerberusPortrait: require(`@Img/game/portraits/portrait_CerberusDestroyer.png`),
            stationPortrait: require(`@Img/game/portraits/portrait_CerberusStation.png`),
        };
    },
};
</script>

<style scoped lang="scss">
@import "../style/page";

.portrait-container {
    padding-top: 5%;
}
</style>
