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

      <v-content :args="{data: modules, iconDir: 'game/Modules'}" />
    </div>

  </div>
</template>

<script>
import Page from '@/components/Page.vue';
import VContent from '../components/Content.vue';

import ships from '@Data/capital_ships.js';
import modules from '@Data/modules.js';
import filterByType from '@Scripts/filterByType.js';
import objectArrayify from '@Scripts/objectArrayify.js';

export default {
    components: { Page, VContent },
    data() {
        return {
            ships: filterByType(ships, 'capital_ships.player'),
            modules: objectArrayify(modules, {
                filter: ([k]) => k in ships.CorpFlagship.modules,
            }),
            img: require(`@Img/game/portraits/portrait_CorpFlagship.png`),
        };
    },
};
</script>
<style scoped src="../style/page.scss"  lang="scss"></style>
