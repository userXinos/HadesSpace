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
import objectArrayify from '@Utils/objectArrayify';
import spaceBuildings from '@Data/spacebuildings.js';
import img from '@Img/game/portraits/BlackCitadel.jpg';

const data = objectArrayify(spaceBuildings, {
    filter: ([, v]) => v?.AllowBuildOnYS,
});
</script>
