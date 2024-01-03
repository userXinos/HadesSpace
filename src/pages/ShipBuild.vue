<template>
  <div class="container">
    <Head><title>{{ title }}</title></Head>
    <h1 class="topic"> {{ title }} </h1>

    <button
      v-t="'TID_PC_NEW_SHIP'"
      class="button accent"
      @click="openNewShip = true"
    />

    <button
      class="settings-btn"
      @click="openConfigManager = true"
    />

    <ul class="ship-list">
      <li
        v-for="({meta: {type: Name}, slots}, i) in ConfigManager.selectedConfig.ships"
        :key="`${Name}${i}`"
        class="ship"
        @click="editShip(i)"
      >
        <div class="icon">
          <Icon
            dir="game/Ships"
            :name="ships[Name].Model[ConfigManager.selectedConfig.levels[Name] - 1]"
          />
        </div>
        <div class="body">
          <p v-t="ships[Name].TID" />

          <ul class="modules">
            <li
              v-for="(modName, ii) in slots"
              :key="`${modName}${ii}`"
            >
              <template v-if="modName in modulesData">
                <Icon
                  dir="game/Modules"
                  :name="modulesData[modName].Icon"
                />
              </template>
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <Modal
      v-model:open="openNewShip"
      :title="$t('TID_PC_NEW_SHIP')"
      :size="SIZES.SMALL"
    >
      <template #body>
        <ul class="create-ship-list">
          <li
            v-for="ship in ships"
            :key="ship.Name"
            class="ship"
          >
            <div
              class="icon"
              @click="addShip(ship.Name)"
            >
              <Icon
                dir="game/Ships"
                :name="ship.Model[ConfigManager.selectedConfig.levels[ship.Name] - 1]"
              />
            </div>
            <div class="select">
              <select v-model="ConfigManager.selectedConfig.levels[ship.Name]">
                <option
                  v-for="v in ship.BuildCost.length"
                  :key="v"
                  :value="v"
                >
                  {{ v }}
                </option>
              </select>
            </div>
          </li>
        </ul>

      </template>
    </Modal>

    <Modal
      v-model:open="openEditShip"
      :title="$t('TID_CORP_DIALOG_EDIT')"
      :size="SIZES.LARGE"
    >
      <template #body>
        <div class="edit-ship">
          <div
            class="tech-list"
            :class="modalOpts.data.hideModulesTypes"
          >
            <TechList
              :is-muted="isSelectedShipModule"
              :on-click="onClickShipModule"
            />
          </div>
          <button
            v-t="'TID_DISBAND_SHIP_BUTTON'"
            class="button red"
            @click="modalOpts.data.removeShip"
          />
        </div>
      </template>
    </Modal>

    <Modal
      v-model:open="openConfigManager"
      :title="$t('TID_SETTINGS_DLG_TITLE')"
      :size="SIZES.MEDIUM"
      @update:open="() => ConfigManager.save()"
    >
      <template #body>
        <MultiConfigGUI
          :on-create-new="() => ConfigManager.add(zeroConfig)"
          :instance="ConfigManager"
        />
      </template>
    </Modal>

  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { reactive, ref } from 'vue';

import { Head } from '@vueuse/head';
import Modal, { SIZES } from '@/components/Modal.vue';
import Icon from '@/components/Icon.vue';
import MultiConfigGUI from '@/components/MultiConfigGUI.vue';

import MultiConfig from '@Utils/MultiConfig';

import byTypes from '@Regulation/byTypes';
import shipsData from '@Data/capital_ships.js';
import modulesData from '@Data/modules.js';
import TechList from '@/components/TechList.vue';

const LOCAL_STORAGE_KEY = 'shipBuild';
const zeroConfig = { levels: { Transport: 1, Miner: 1, Battleship: 1 }, ships: [] };
const ships = { Battleship: shipsData.Battleship, Transport: shipsData.Transport, Miner: shipsData.Miner };

interface Ship {
    meta: { type: keyof typeof ships }
    slots: string[]
}
interface Input {
    levels: {
        Transport: number
        Miner: number
        Battleship: number

        [k: keyof typeof modulesData]: number
    }
    ships: Ship[]
}
const { t } = useI18n();
const title = t('ShipBuild');
const shipNames = Object.keys(ships);

const openNewShip = ref(false);
const openEditShip = ref(false);
const openConfigManager = ref(false);
const modalOpts = reactive({
    data: {
        hideModulesTypes: [] as string[],
        removeShip: () => undefined,
        ship: { slots: [] } as Ship,
    },
});
const ConfigManager = new MultiConfig<Input>(LOCAL_STORAGE_KEY, zeroConfig);

function addShip(name: keyof typeof ships): void {
    ConfigManager.selectedConfig.ships.push({ meta: { type: name }, slots: [] });
    ConfigManager.selectedConfig.ships.sort((a: Ship, b:Ship) => shipNames.indexOf(a.meta.type) - shipNames.indexOf(b.meta.type));
    ConfigManager.save();
    openNewShip.value = false;
}
function editShip(i: number) {
    const ship: Ship = ConfigManager.selectedConfig.ships[i];
    const { levels }: {levels: Input['levels']} = ConfigManager.selectedConfig;
    const allowedSlots = [];
    const { NewModuleSlots } = ships[ship.meta.type];

    if (typeof NewModuleSlots == 'string') {
        allowedSlots.push(...Array(levels[ship.meta.type]).fill(NewModuleSlots));
    } else if (Array.isArray(NewModuleSlots)) {
        allowedSlots.push(...NewModuleSlots.slice(0, levels[ship.meta.type]).flat());
    }

    if (!ship.slots.length) {
        ship.slots = allowedSlots;
    }
    modalOpts.data.ship = ship;
    modalOpts.data.hideModulesTypes = byTypes.artifact
        .filter((t: string) => !allowedSlots.includes(t));
    modalOpts.data.removeShip = () => {
        ConfigManager.selectedConfig.ships.splice(i, 1);
        ConfigManager.save();
        openEditShip.value = false;
    };
    ConfigManager.save();
    openEditShip.value = true;
}
function isSelectedShipModule(name: string) :boolean {
    return modalOpts.data.ship.slots.includes(name);
}
function onClickShipModule({ SlotType, Name }: {SlotType: string, Name: string}): void {
    const index = modalOpts.data.ship.slots.indexOf(Name);

    if (index != -1) {
        modalOpts.data.ship.slots[index] = SlotType;
    } else {
        const typeIndex = modalOpts.data.ship.slots.indexOf(SlotType);

        if (typeIndex != -1) {
            modalOpts.data.ship.slots[typeIndex] = Name;
        }
    }
    ConfigManager.save();
}
</script>

<style scoped lang="scss">
@use "../style/vars";
@use "sass:list";

@import "../style/page";
@import "../style/userInput";

$byArtifactType: ('Trade', 'Mining', 'Weapon', 'Shield', 'Support', 'Drone');

.container {
    margin: 0 2%;
}
.settings-btn {
    cursor: pointer;
    width: 38px;
    height: 38px;
    background: url("../img/icons/settings.svg") no-repeat;
    border: none;

    &:hover {
        opacity: .9;
        transition-duration: 800ms;
        transform: rotate(180deg);
    }
}
.ship-list {
    max-width: 500px;
    margin: 0 auto;

    .ship {
        list-style: none;
        display: flex;
        align-items: center;
        background-color: vars.$background-elements;
        margin: 2%;
        border-radius: 10px;
        cursor: pointer;

        &:hover {
            filter: brightness(150%);
        }
        .body {
            flex: 5;
            margin: 2%;

            .modules {
                background-color: vars.$background;
                border-radius: 5px;
                margin-top: 1%;
                display: flex;
                align-items: center;
                gap: 5px;
                padding: 5px;

                li {
                    list-style: none;
                    width: 10%;
                }
            }
        }
        .icon {
            flex: 1;
            transform: rotate(-45deg);
        }
    }
}
.create-ship-list {
    display: flex;
    gap: 5%;

    li {
        flex: 1;
        list-style: none;

        .icon {
            margin-bottom: 10px;
            background-color: $accent-color;
            border-radius: 5px;
            cursor: pointer;
        }
    }
}
.edit-ship {
    .tech-list {
        :deep(.other) {
            display: none;
        }
        :deep(.item .mute) {
            border: solid 2px #a8ddfd;
            padding: 2px;
            border-radius: 10px;
        }

        @each $type in $byArtifactType {
            &.#{$type} :deep(.modules) > .#{$type} {
                display: none;
            }
        }
    }
    .button {
        margin-top: 2%;
    }
}
</style>
