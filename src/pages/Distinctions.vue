<template>
  <Page
    :content-args="{data, iconDir: 'game/Distinctions'}"
    title-loc-key="TID_PLAYER_INFO_SECTION_BADGES"
  />
</template>

<script setup>
import Page from '@/components/Page.vue';
import data from '@Data/distinctions.js';
</script>
