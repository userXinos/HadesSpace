<template>
  <Page
    title-loc-key="TID_BLUE_STAR"
    :content-args="{
      data: { BlueStar: stars.BlueStar },
      iconDir: 'game/Stars',
      tableOpts: { lvlColKey: 'TID_BS_FINAL_POSITIONS' }
    }"
    :portrait="{src: img, alt: 'BlueStar'}"
  />
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import Page from '@/components/Page.vue';
import stars from '@Data/stars.js';
import img from '@Img/game/portraits/portrait_BlueStar.jpg';

const { t } = useI18n();
t('TID_BS_FINAL_POSITIONS'); // for i18n-extract
</script>
