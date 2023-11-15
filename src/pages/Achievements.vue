<template>
  <Page
    :content-args="{data}"
    title-loc-key="TID_PLAYER_INFO_DLG_TAB_ACHIEVEMENTS"
  />
</template>

<script setup>
import Page from '@/components/Page.vue';
import achievements from '@Data/achievements.js';
import objectArrayify from '@Utils/objectArrayify';

const data = objectArrayify(achievements, {
    filter: ([, v]) => !v.Retired,
});
</script>
