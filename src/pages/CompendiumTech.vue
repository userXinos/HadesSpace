<template>
  <div>
    <div
      class="sections-input other"
      :class="{'animated-fetch': isFetching}"
    >
      <section class="type">
        <h3 v-t="'TID_BUILDING_LEVEL_DESCR'" />
        <ul>
          <li
            v-for="(building, buildingName) of spaceBuildings"
            :key="buildingName"
            class="module"
          >
            <div
              :class="{'mute': !getDataById(building.Name)}"
              @click="() => openModuleInfo(building, building.Cost.length + 1)"
            >
              <Icon
                :name="building.PrefabModel"
                dir="game/SpaceBuildings"
              />
              <span
                v-if="getDataById(building.Name)?.level"
                class="level"
              >
                {{ getDataById(building.Name).level }}
              </span>
            </div>
          </li>
        </ul>
      </section>
      <section class="type">
        <h3 v-t="'TID_PRODUCTION_DLG_SHIPS'" />
        <ul>
          <li
            v-for="(ship, shipName) of ships"
            :key="shipName"
            class="module"
          >
            <div
              :class="{'mute': !getDataById(ship.Name)}"
              @click="() => openModuleInfo(ship, ship.BuildCost.length + 1)"
            >
              <Icon
                :name="getDataById(ship.Name) ? ship.Model[getDataById(ship.Name).level -1] : ship.Model[5]"
                dir="game/Ships"
              />
              <span
                v-if="getDataById(ships.Name)?.level"
                class="level"
              >
                {{ getDataById(ship.Name).level }}
              </span>
            </div>
          </li>
        </ul>
      </section>
      <section class="type">
        <h3 v-t="'TID_CORP_TAB_MY_CORP'" />
        <ul>
          <li class="module">
            <div
              :class="{'mute': !getDataById('AllianceLevel')}"
              @click="() => openModuleInfo(alliance, allianceData.XPRequired.length + 1)"
            >
              <Icon
                name="corpXp"
                dir="icons"
              />
              <span
                v-if="getDataById('AllianceLevel')?.level"
                class="level"
              >
                {{ getDataById('AllianceLevel').level }}
              </span>
            </div>
          </li>
        </ul>
      </section>
    </div>
    <div
      class="sections-input modules"
      :class="{'animated-fetch': isFetching}"
    >
      <section
        v-for="(type, typeName) of modules"
        :key="typeName"
        class="type"
      >
        <h3> {{ format.key(typeName) }} </h3>
        <ul>
          <li
            v-for="([module, maxLevel]) of type"
            :key="module.Name"
            class="module"
          >
            <div
              :class="{'mute': !getDataById(module.Name)}"
              @click="() => openModuleInfo(module, maxLevel)"
            >
              <Icon
                :name="module.Icon"
                dir="game/Modules"
              />
              <span
                v-if="getDataById(module.Name)?.level"
                class="level"
              >
                {{ getDataById(module.Name).level }}
              </span>
            </div>
          </li>
        </ul>
      </section>
    </div>

    <modal
      v-model:open="openModal"
      v-bind="modalOpts"
    >
      <template #body>
        <div class="modal">
          <div class="title">
            <div>
              <h2>{{ $t(modalOpts.data.value.TID) }}</h2>
              <div />
            </div>
            <ModalIcon />
          </div>
          <span v-t="'CURRENT_LVL'" />
          <div class="level-picker">
            <NumberPicker
              :value="getDataById(modalOpts.data.key)?.level || 0"
              :min="0"
              :max="modalOpts.data.maxLevel"
              @update:value="onChangeLvl"
            />
          </div>
        </div>
      </template>
    </modal>

    <modal
      v-model:open="openCodeReqModal"
      :title="'Code'"
      :size="SIZES.SMALL"
    >
      <template #body>
        <div class="input">
          <p class="name">code here:</p>
          <input v-model="reqCode">
        </div>

        <div class="flex-end margin-bottom">
          <button
            v-t="'TID_OK'"
            class="button green"
            @click="applyReqCode"
          />
        </div>
      </template>
    </modal>

  </div>
</template>

<!--suppress TypeScriptCheckImport -->
<script setup lang="ts">
import { ref, reactive, onUnmounted, onMounted, h, VNode } from 'vue';
import { useI18n } from 'vue-i18n';
import { Compendium, TechLevels } from 'bot_client';
import debounce from 'lodash.debounce';

import Icon from '@/components/Icon.vue';
import Modal, { SIZES } from '@/components/Modal.vue';
import NumberPicker from '../components/NumberPicker.vue';

import shipsData from '@Data/capital_ships.js';
import allianceData from '@Data/alliance_levels.js';
import spaceBuildingsData from '@Data/spacebuildings.js';
import compendiumIDs from '@Regulation/compendiumIDs.js';

import { getBySlotType } from '../components/ModulePage.vue';
import key from '../utils/Handlers/key';
import router from '../utils/Vue/router';
import value from '../utils/Handlers/value';

declare type SetTechLevel = (techId: number, level: number) => Promise<void>;
const MODULES_TYPES_ORDER = ['Trade', 'Mining', 'Weapon', 'Shield', 'Support', 'Drone'];

const spaceBuildings = { RedStarScanner: spaceBuildingsData.RedStarScanner, ShipmentRelay: spaceBuildingsData.ShipmentRelay };
const ships = { Transport: shipsData.Transport, Miner: shipsData.Miner, Battleship: shipsData.Battleship };
const alliance = { Name: 'Alliance', TID: 'TID_CORP_TAB_MY_CORP', Icon: 'corpXp', specialIcon: true };
const modules: {[k: string]: unknown} = Object.fromEntries(MODULES_TYPES_ORDER.map((t) => [t, getModulesBySlotType(t)]));

const client = new Compendium();
const setTechLevel: SetTechLevel = debounce((...args) => client.setTechLevel(...args), 500);
const { t } = useI18n();
const openModal = ref(false);
const openCodeReqModal = ref(false);
const isFetching = ref(false);
const reqCode = ref('');
const data = ref<TechLevels>({});
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
const format = {
    key: (k: string) => key(k, router.currentRoute.name as string),
    value: (k: string, v: unknown) => value(k, v, router.currentRoute.value.name as string),
};

spaceBuildings.RedStarScanner.Cost.shift(); // tut lvl

client.on('connected', (ident: Identity) => {
    console.log(`Connected: ${ident.user.username}, Guild: ${ident.guild.name}`);
    isFetching.value = false;
});
client.on('connectfailed', (e: string) => {
    console.log(`Connect failed: ${e}`);
});
client.on('disconnected', () => {
    console.log(`Disconnected`);
});
client.on('sync', (tl: TechLevels) => {
    console.log(`Tech Levels synced: rs=${tl[701].level}`);
});

onMounted(async () => {
    isFetching.value = true;
    await client.initialize();

    if (!client.getUser()) {
        openCodeReqModal.value = true;
    } else {
        data.value = client.getTechLevels();
    }
    isFetching.value = false;
});
onUnmounted(() => {
    client.shutdown();
});


async function applyReqCode() {
    isFetching.value = true;
    openCodeReqModal.value = false;

    const ident = await client.checkConnectCode(reqCode.value);
    console.log(
        `Successfully submitted code and retrieved identity:\nUser: ${ident.user.username}\nGuild: ${ident.guild.name})`,
    );
    await client.connect(ident);

    data.value = client.getTechLevels();
}
function openModuleInfo(value: object, maxLevel: number) {
    modalOpts.data.value = value;
    modalOpts.data.maxLevel = maxLevel;
    openModal.value = true;
}
function onChangeLvl(value: number): number {
    const cId = compendiumIDs[modalOpts.data.key];

    if (!data.value[cId]) {
        data.value[cId] = { level: 0 };
    }
    data.value[cId].level = value;
    setTechLevel(cId, value);
    return value;
}

function getDataById(id: string): object|null {
    if (id in compendiumIDs) {
        return data.value?.[compendiumIDs[id]] || null;
    }
    return null;
}
function getModulesBySlotType(type: string): object {
    const modules = getBySlotType(type);

    return Object.entries(modules).map(([, module]) => {
        let maxLevel = 1;

        for (const [, value] of Object.entries(module)) {
            if (Array.isArray(value) && value.length > maxLevel) {
                maxLevel = value.length;
            }
        }

        return [module, maxLevel];
    });
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
    margin: 0 10%;

    @media screen and (max-width: 960px){
        margin: 0 4%;
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
        width: 60%;
        margin: 0 auto;
    }
}
.sections-input {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: space-between;
    border: solid 2px $background-elements;
    padding: 1%;
    border-radius: 10px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 1%;

    max-height: 850px;
    max-width: 1500px;
    --module-size: 90px;

    @media screen and (max-width: 1800px){
        --module-size: 80px;
    }
    @media screen and (max-width: 1600px){
        --module-size: 75px;
    }
    @media screen and (max-width: 1500px){
        --module-size: 70px;
        max-height: 1000px;
        max-width: 920px;
    }
    @media screen and (max-width: 1024px){
        max-height: none;
        max-width: 420px;
    }
    @media screen and (max-width: 960px){
        --module-size: 80px;
        max-width: 290px;
    }
    @media screen and (max-width: 600px){
        --module-size: 60px;
        max-width: 290px;
    }


    .type {
        width: calc((var(--module-size) + 24px)  * 4);
        margin-bottom: 3%;

        h3 {
            margin-bottom: 4%;
        }
        ul {
            display: flex;
            flex-wrap: wrap;

            .module {
                list-style: none;
                width: var(--module-size);
                margin: 12px;
                cursor: pointer;
                position: relative;

                @media screen and (max-width: 960px){
                    margin: 6px;
                }

                .mute {
                    opacity: .6;
                }

                .level {
                    position: absolute;
                    top: 75%;
                    right: 0;
                    font-size: 130%;
                    width: 30px;
                    height: 28px;
                    background-color: $border-color;
                    color: $background;
                    text-align: center;
                    border-radius: 10px;
                    padding-top: 2px;
                }
            }
        }
    }
}

.other {
    flex-direction: row;
    margin-top: 4%;

    .type {
        margin-bottom: 1%;
    }
}

.animated-fetch {
    animation-duration: 2s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-name: placeHolderShimmer;
    animation-timing-function: linear;
    background: linear-gradient(to left, $background, $background-elements 18%, $background);
    opacity: .6;
    pointer-events: none;
}

@keyframes placeHolderShimmer {
    0% {
        background-position: -800px 0
    }
    100% {
        background-position: 800px 0
    }
}

</style>
