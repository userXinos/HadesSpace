<!--suppress TypeScriptValidateTypes, TypeScriptUnresolvedReference -->
<template>
  <div>
    <div class="sections-group other">
      <section
        class="type"
        name="spaceBuildings"
      >
        <h3 v-t="'TID_BUILDING_LEVEL_DESCR'" />
        <ul>
          <li
            v-for="(building, buildingName) of spaceBuildings"
            :key="buildingName"
            class="item"
          >
            <div
              :class="{'mute': isMuted(building.Name)}"
              @click="() => onClick(building)"
            >
              <Icon
                :name="building.PrefabModel"
                dir="game/SpaceBuildings"
              />
              <span
                v-if="levelMap?.[building.Name]"
                class="level"
              >
                {{ levelMap[building.Name] }}
              </span>
            </div>
          </li>
        </ul>
      </section>
      <section
        class="type"
        name="ships"
      >
        <h3 v-t="'TID_PRODUCTION_DLG_SHIPS'" />
        <ul>
          <li
            v-for="(ship, shipName) of ships"
            :key="shipName"
            class="item"
          >
            <div
              :class="{'mute': isMuted(ship.Name)}"
              @click="() => onClick(ship)"
            >
              <Icon
                :name="ship.Name in levelMap ? ship.Model[levelMap[ship.Name] - 1] : ship.Model[4]"
                dir="game/Ships"
              />
              <span
                v-if="levelMap?.[ship.Name]"
                class="level"
              >
                {{ levelMap[ship.Name] }}
              </span>
            </div>
          </li>
        </ul>
      </section>
      <section
        class="type"
        name="alliance"
      >
        <h3 v-t="'TID_CHAT_TAB_CORPORATION'" />
        <ul>
          <li class="item">
            <div
              :class="{'mute': isMuted('AllianceLevel')}"
              @click="() => onClick(alliance)"
            >
              <Icon
                name="corpXp"
                dir="icons"
              />
              <span
                v-if="levelMap?.['AllianceLevel']"
                class="level"
              >
                {{ levelMap['AllianceLevel'] }}
              </span>
            </div>
          </li>
        </ul>
      </section>
    </div>
    <div class="sections-group modules">
      <section
        v-for="(type, typeName) of modules"
        :key="typeName"
        class="type"
        name="modules"
      >
        <h3> {{ format.key(typeName) }} </h3>
        <ul>
          <li
            v-for="module of type"
            :key="module.Name"
            class="item"
          >
            <div
              :class="{'mute': isMuted(module.Name)}"
              @click="() => onClick(module)"
            >
              <Icon
                :name="module.Icon"
                dir="game/Modules"
              />
              <span
                v-if="levelMap?.[module.Name]"
                class="level"
              >
                {{ levelMap[module.Name] }}
              </span>
            </div>
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<!--suppress TypeScriptCheckImport -->
<script setup lang="ts">
import shipsData from '@Data/capital_ships.js';
import spaceBuildingsData from '@Data/spacebuildings.js';

import { getBySlotType } from '@/components/ModulePage.vue';
import Icon from '@/components/Icon.vue';
import key from '@Handlers/key';
import router from '@Utils/Vue/router';
import value from '@Handlers/value';

export interface Props {
    levelMap?: Record<string, number>
    onClick?: (item: object) => void
    isMuted?: (id: string) => boolean
}

const MODULES_TYPES_ORDER = ['Trade', 'Mining', 'Weapon', 'Shield', 'Support', 'Drone'];

const spaceBuildings = { RedStarScanner: spaceBuildingsData.RedStarScanner, ShipmentRelay: spaceBuildingsData.ShipmentRelay };
const ships = { Transport: shipsData.Transport, Miner: shipsData.Miner, Battleship: shipsData.Battleship };
const alliance = { Name: 'AllianceLevel', TID: 'TID_CORP_TAB_MY_CORP', Icon: 'corpXp', specialIcon: true };
const modules: {[k: string]: unknown} = Object.fromEntries(MODULES_TYPES_ORDER.map((t) => [t, getBySlotType(t)]));

const format = {
    key: (k: string) => key(k, router.currentRoute.value.name as string),
    value: (k: string, v: unknown) => value(k, v, router.currentRoute.value.name as string),
};

withDefaults(defineProps<Props>(), {
    levelMap: () => ({}),
    onClick: () => undefined,
    isMuted: () => false,
});
</script>

<style scoped lang="scss" src="../style/CompendiumTechList.scss" />
