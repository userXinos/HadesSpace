<template>
  <Page
    :title-loc-key="locKey"
    :content-args="{data, iconDir: 'game/Modules'}"
    :portrait="{src: img, alt: `${type} modules`}"
  />
</template>

<script>
import Page from '@/components/Page.vue';

import filterByType from '@Scripts/filterByType.js';
import modulesData from '@Data/modules.js';

export default {
    components: { Page },
    props: {
        type: {
            type: String,
            requested: true,
            default: null,
        },
    },
    data() {
        return {
            data: filterByType(modulesData, `modules.${this.type}`),
            img: require(`@Img/game/portraits/${this.type}.png`),
            locKey: `TYPE_MOD_${this.type.toUpperCase()}`,
        };
    },
};
</script>
