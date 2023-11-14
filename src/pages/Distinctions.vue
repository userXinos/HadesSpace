<template>
  <Page
    :content-args="{data, iconDir: 'game/Distinctions'}"
    title-loc-key="TID_PLAYER_INFO_SECTION_BADGES"
  />
</template>

<!--suppress JSUnresolvedReference -->
<script setup>
import Page from '@/components/Page.vue';
import distinctions from '@Data/distinctions.js';
import objectArrayify from '@Utils/objectArrayify';

const data = objectArrayify(distinctions, {
    sort: ([, a], [, b]) => (a.GroupPriority ?? -100) - (b.GroupPriority ?? -100),
});
</script>
