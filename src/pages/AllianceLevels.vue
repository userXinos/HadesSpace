<template>
  <Page
    :content-args="{data}"
    title-loc-key="TID_CORP_LEVELS_LABEL"
  />
</template>

<script>
import Page from '@/components/Page.vue';
import data from '@Data/alliance_levels.js';


export default {
    components: { Page },
    data: () => ({ data: { data: { TID: '', ...data } } }),
};
</script>
