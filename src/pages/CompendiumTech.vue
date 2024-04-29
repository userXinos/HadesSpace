<template>
  <CompendiumPage>
    <v-head><title>{{ title }}</title></v-head>

    <div>

      <div class="container">
        <CompendiumTechList
          :on-click="openTechInfo"
          :is-muted="isMuted"
          :level-map="levelMap"
        />
      </div>

      <modal
        v-model:open="openModal"
        v-bind="modalOpts"
      >
        <template #body>
          <div class="modal">
            <div class="title">
              <div>
                <!--suppress TypeScriptUnresolvedReference -->
                <h2>{{ $t(modalOpts.data.value.TID) }}</h2>
                <p>{{ t('TID_SOCIAL_TIMESTAMP', [sec2biggestTime(modalOpts.data.lastAgoUpdate)]) }}</p>
                <div />
              </div>
              <ModalIcon />
            </div>
            <span v-t="'CURRENT_LVL'" />
            <div class="level-picker">
              <NumberPicker
                :value="getDataByKey(modalOpts.data.key)?.level || 0"
                :min="modalOpts.data.minLevel"
                :max="modalOpts.data.maxLevel"
                @update:value="onChangeLvl"
              />
            </div>
          </div>
        </template>
      </modal>

    </div>
  </CompendiumPage>
</template>

<!--suppress TypeScriptCheckImport, TypeScriptUnresolvedReference -->
<script setup lang="ts">
import { ref, reactive, h, VNode, onUnmounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { getTechIndex } from 'bot_client';
import compendiumTechListLogic from '@/composables/compendiumTechList';
import { sec2biggestTime } from '@/utils/sec2str';

import { Head as VHead } from '@vueuse/head';
import Icon from '@/components/Icon.vue';
import Modal, { SIZES } from '@/components/Modal.vue';
import { getModulesMinLvl } from '@/components/ModulePage.vue';
import CompendiumPage from '../components/CompendiumPage.vue';
import CompendiumTechList from '../components/TechList.vue';
import NumberPicker from '../components/NumberPicker.vue';

import globals from '@Data/globals.js';
import shipsData from '@Data/capital_ships.js';
import allianceData from '@Data/alliance_levels.js';
import spaceBuildingsData from '@Data/spacebuildings.js';
import modulesData from '@Data/modules.js';
import { TechLevel } from 'bot_client/src/bot_api';

const spaceBuildings = { RedStarScanner: spaceBuildingsData.RedStarScanner, ShipmentRelay: spaceBuildingsData.ShipmentRelay };
const ships = { Transport: shipsData.Transport, Miner: shipsData.Miner, Battleship: shipsData.Battleship };
const { MaxModuleLevel } = globals;

const maxLvl: Record<string, number> = Object.fromEntries([
    ...Object.entries(spaceBuildings).map(([k, v]) => [k, v.Cost.length]),
    ...Object.entries(ships).map(([k, v]) => [k, v.BuildCost.length]),
    ...Object.keys(modulesData).map((k) => [k, MaxModuleLevel]),
    ['AllianceLevel', allianceData.XPRequired.length],
]);
const minLvl: Record<string, number> = Object.fromEntries([
    ...Object.keys(spaceBuildings).map((k) => [k, 0]),
    ...Object.keys(ships).map((k) => [k, 0]),
    ...Object.entries(modulesData).map(([k, v]) => [k, getModulesMinLvl(v as object)]),
    ['AllianceLevel', 0],
]);

const { data, levelMap, setTechLevel } = compendiumTechListLogic();
const { t } = useI18n();
const title = t('HS_COMPENDIUM');
const openModal = ref(false);
const modalOpts = reactive({
    size: SIZES.SMALL,
    title: t('TECHNOLOGIES'),
    data: {
        value: {} as Record<string, unknown>,
        maxLevel: 0,
        minLevel: 0,
        lastAgoUpdate: 0,
        get key() {
            return this.value.Name;
        },
    },
});

const dateInterval = setInterval(updateLastAgo, 5000);

onUnmounted(() => {
    clearTimeout(dateInterval);
});

function openTechInfo(value: Record<string, string>) {
    if (data.value) {
        modalOpts.data.value = value;
        modalOpts.data.maxLevel = maxLvl[value.Name];
        modalOpts.data.minLevel = minLvl[value.Name];
        openModal.value = true;
        updateLastAgo();
    }
}
function isMuted(key: string): boolean {
    return !getDataByKey(key)?.level;
}
function onChangeLvl(value: number): number {
    const i = getTechIndex(modalOpts.data.key);

    if (!data.value[i]) {
        data.value[i] = { level: 0 };
    }
    if (modalOpts.data.minLevel != 0 && value == modalOpts.data.minLevel && data.value[i].level != 0) {
        value = 0;
    }
    if (data.value[i].level != value) {
        data.value[i].level = value;
        setTechLevel(i, value);
        updateLastAgo();
    }
    return value;
}
function getDataByKey(key: string): TechLevel|null {
    return data.value?.[getTechIndex(key)] || null;
}
function ModalIcon(): VNode {
    const m = modalOpts.data.value;

    if (m.Icon) {
        return h(Icon, { name: m.Icon, dir: m.specialIcon ? 'icons' : 'game/Modules' });
    }
    if (m.Model) {
        return h(Icon, { name: m.Model[(getDataByKey(m.Name as string)?.level - 1) || 5], dir: 'game/Ships' });
    }
    if (m.PrefabModel) {
        return h(Icon, { name: m.PrefabModel, dir: 'game/SpaceBuildings' });
    }
}
function updateLastAgo() {
    if (openModal.value) {
        const lastDate = getDataByKey(modalOpts.data.key)?.ts;

        if (lastDate) {
            modalOpts.data.lastAgoUpdate = (new Date().getTime() - lastDate) / 1000;
        }
    }
}
</script>

<style scoped lang="scss">
@use "sass:map";
@use "sass:color";

@import "../style/page";
@import "../style/vars";
@import "../style/calculator";
@import "../style/userInput";

$actually-color: #92cee5;
$plan-color: #ded45a;

.container {
  margin-top: 1%;
}

.modal {
  min-height: 500px;

  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6%;

    h2 {
      margin-bottom: 2%;
    }

    > div:first-child {
      flex: 3;
    }
    > div:last-child {
      width: 25%;
      flex: 1;
      margin-left: 5%;
    }
  }
  .level-picker {
    padding-top: 5%;
    width: 70%;
    margin: 0 auto;
  }
}
</style>
