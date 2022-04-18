<template>
  <Page
    :content-args="{data, iconDir: 'game/Distinctions'}"
    title-loc-key="TID_PLAYER_INFO_SECTION_BADGES"
  />
</template>

<script>
import Page from '@/components/Page.vue';
import data from '@Data/distinctions.js';

export default {
    components: { Page },
    data: () => ({ data }),
};
</script>
