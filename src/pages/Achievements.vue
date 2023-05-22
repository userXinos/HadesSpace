<template>
  <Page
    :content-args="{data}"
    title-loc-key="TID_PLAYER_INFO_DLG_TAB_ACHIEVEMENTS"
  />
</template>

<script setup>
import Page from '@/components/Page.vue';
import data from '@Data/achievements.js';
</script>
