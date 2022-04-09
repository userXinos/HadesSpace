<template>
  <Page
    :content-args="{data}"
    title-loc-key="TID_EMPIRE_OBJECTIVES"
  />
</template>

<script>
import Page from '@/components/Page.vue';

import filterByType from '@Scripts/filterByType.js';
import goals from '@Data/player_goals.js';

export default {
    components: { Page },
    data: () => {
        return {
            data: filterByType(goals, 'player_goals.fixed'),
        };
    },
};
</script>
