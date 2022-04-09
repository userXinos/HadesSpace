<template>
  <Page
    :content-args="{data}"
    title-loc-key="TID_PLAYER_INFO_DLG_TAB_ACHIEVEMENTS"
  />
</template>

<script>
import Page from '@/components/Page.vue';
import data from '@Data/achievements.js';

export default {
    components: { Page },
    data: () => ({ data }),
};
</script>
