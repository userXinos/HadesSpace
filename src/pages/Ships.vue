<template>
  <div>
    <Page
      title-loc-key="TID_PRODUCTION_DLG_SHIPS"
      :content-args="{data: ships, iconDir: 'game/Ships'}"
      :portrait="{src: img, alt: 'ships'}"
    />

    <div>
      <h1
        id="FlagshipModules"
        class="topic"
      >
        <a
          v-t="'FLAGSHIP_MODULES'"
          href="#FlagshipModules"
          class="link-topic"
        />
      </h1>

      <v-content :args="{data: modules, iconDir: 'game/Modules', tableOpts: modulesTableOpts}" />
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import Page from '@/components/Page.vue';
import VContent from '../components/Content.vue';

import shipsData from '@Data/capital_ships.js';
import modulesData from '@Data/modules.js';
import getFilterByType from '@Utils/getFilterByType';
import objectArrayify from '@Utils/objectArrayify';
import { tableOpts } from '@/components/ModulePage.vue';
import img from '@Img/game/portraits/portrait_CorpFlagship.jpg';

const ships: Record<string, object> = objectArrayify(shipsData, getFilterByType('capital_ships.player'));
const modules: Record<string, object> = objectArrayify(modulesData, { filter: ([k]) => k in ships.CorpFlagship.modules });
const modulesTableOpts: object = computed(tableOpts);
</script>
<style scoped src="../style/page.scss"  lang="scss"></style>
