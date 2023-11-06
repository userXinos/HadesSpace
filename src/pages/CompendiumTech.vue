<template>
  <CompendiumPage>
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
                <div />
              </div>
              <ModalIcon />
            </div>
            <span v-t="'CURRENT_LVL'" />
            <div class="level-picker">
              <NumberPicker
                :value="getDataByKey(modalOpts.data.key)?.level || 0"
                :min="0"
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
import { ref, reactive, h, VNode, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { getTechIndex, TechLevels } from 'bot_client';
import client from '../utils/compendium';
import debounce from 'lodash.debounce';

import Icon from '@/components/Icon.vue';
import Modal, { SIZES } from '@/components/Modal.vue';
import CompendiumPage from '../components/CompendiumPage.vue';
import CompendiumTechList from '../components/CompendiumTechList.vue';
import NumberPicker from '../components/NumberPicker.vue';

import shipsData from '@Data/capital_ships.js';
import allianceData from '@Data/alliance_levels.js';
import spaceBuildingsData from '@Data/spacebuildings.js';
import modulesData from '@Data/modules.js';
import objectArrayify from '../utils/objectArrayify';
import { getTechFromIndex } from 'bot_client/src/module_types';

declare type SetTechLevel = (techId: number, level: number) => Promise<void>;

const spaceBuildings = { RedStarScanner: spaceBuildingsData.RedStarScanner, ShipmentRelay: spaceBuildingsData.ShipmentRelay };
const ships = { Transport: shipsData.Transport, Miner: shipsData.Miner, Battleship: shipsData.Battleship };

spaceBuildings.RedStarScanner.Cost.shift(); // tut lvl

const maxLvl: Record<string, number> = Object.fromEntries([
    ...Object.entries(spaceBuildings).map(([k, v]) => [k, v.Cost.length]),
    ...Object.entries(ships).map(([k, v]) => [k, v.BuildCost.length]),
    ...Object.entries(modulesData).map(([k, v]) => [k, getModulesMaxLvl(v as object)]),
    ['AllianceLevel', allianceData.XPRequired.length],
]);


const setTechLevel: SetTechLevel = debounce((...args) => client.setTechLevel(...args), 500);
const { t } = useI18n();
const openModal = ref(false);
const data = ref<TechLevels>({});
const levelMap = ref<Record<string, number>>({});
const modalOpts = reactive({
    size: SIZES.SMALL,
    title: t('TID_TECH_DLG_TITLE'),
    data: {
        value: {},
        maxLevel: 0,
        get key() {
            return this.value.Name;
        },
    },
});

data.value = client.getTechLevels();

watch(data, (value) => {
    levelMap.value = objectArrayify(value, {
        map: ([i, v]) => [getTechFromIndex(i as number), v.level],
    });
}, { deep: true });

client.on('sync', (tl: TechLevels) => {
    data.value = tl;
});

function openTechInfo(value: object) {
    modalOpts.data.value = value;
    modalOpts.data.maxLevel = maxLvl[value.Name];
    openModal.value = true;
}
function isMuted(key: string): boolean {
    return !getDataByKey(key)?.level;
}
function onChangeLvl(value: number): number {
    const i = getTechIndex(modalOpts.data.key);

    if (!data.value[i]) {
        data.value[i] = { level: 0 };
    }
    data.value[i].level = value;
    setTechLevel(i, value);
    return value;
}
function getModulesMaxLvl(module: object): number {
    let maxLevel = 1;

    for (const [, value] of Object.entries(module)) {
        if (Array.isArray(value) && value.length > maxLevel) {
            maxLevel = value.length;
        }
    }
    return maxLevel;
}
function getDataByKey(key: string): object|null {
    return data.value?.[getTechIndex(key)] || null;
}
function ModalIcon(): VNode {
    const m = modalOpts.data.value;

    if (m.Icon) {
        return h(Icon, { name: m.Icon, dir: m.specialIcon ? 'icons' : 'game/Modules' });
    }
    if (m.Model) {
        return h(Icon, { name: m.Model[(getDataById(m.Name)?.level - 1) || 5], dir: 'game/Ships' });
    }
    if (m.PrefabModel) {
        return h(Icon, { name: m.PrefabModel, dir: 'game/SpaceBuildings' });
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

  @media screen and (max-width: 960px){
    //margin: 0 4%;
  }
}

.modal {
  min-height: 500px;

  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 6%;

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

.animated-fetch {
  background: linear-gradient(to left, $background, $background-elements 18%, $background);
  background-size: 50vw;
  animation: bg-pos-move 10s infinite forwards linear;
  opacity: .6;
  pointer-events: none;
}

@keyframes bg-pos-move {
  to { background-position: 1000% 0; }
}
</style>
