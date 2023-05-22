<template>
  <Page
    title-loc-key="TID_BLUE_STAR"
    :content-args="{
      data: { BlueStar: stars.BlueStar },
      iconDir: 'game/Stars',
      tableOpts: { lvlColKey: 'Position' }
    }"
    :portrait="{src: img, alt: 'BlueStar'}"
  />
</template>

<script setup>
import Page from '@/components/Page.vue';
import stars from '@Data/stars.js';

const img = require(`@Img/game/portraits/portrait_BlueStar.png`);
</script>
