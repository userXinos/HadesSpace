<template>
  <Page
    title-loc-key="TID_PRODUCTION_DLG_STATIONS"
    :content-args="{data, iconDir: 'game/SpaceBuildings'}"
    :portrait="{src: img, alt: 'spacebuildings'}"
  />
</template>

<!--suppress JSUnresolvedVariable -->
<script setup>
import Page from '@/components/Page.vue';

import CustomIcon from '@Utils/CustomIcon';
import objectArrayify from '@Utils/objectArrayify';
import spaceBuildings from '@Data/spacebuildings.js';

spaceBuildings.WarpLaneHub.Model = new CustomIcon('WarpLane');
spaceBuildings.TimeModulator.Model = new CustomIcon('TimeModulator');

const data = objectArrayify(spaceBuildings, {
    filter: ([, v]) => v?.CanBeBuilt || v?.AllowBuildOnYS,
});
const img = require(`@Img/game/portraits/BlackCitadel.png`);
</script>
