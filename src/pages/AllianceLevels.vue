<template>
  <Page
    :content-args="{data}"
    title-loc-key="TID_CORP_LEVELS_LABEL"
  />
</template>

<script setup>
import Page from '@/components/Page.vue';
import allianceLevels from '@Data/alliance_levels.js';

const data = { data: { TID: '', ...allianceLevels } };

</script>
