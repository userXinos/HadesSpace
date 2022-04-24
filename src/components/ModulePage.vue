<template>
  <Page
    :title-loc-key="locKey"
    :content-args="{data, iconDir: 'game/Modules'}"
    :portrait="{src: img, alt: `${type} modules`}"
  />
</template>

<script>
import Page from '@/components/Page.vue';
import modulesData from '@Data/modules.js';
import objectArrayify from '@Scripts/objectArrayify.js';

const sortByAwardLevel = objectArrayify(modulesData, {
    filter: ([, v]) => !v.Hide,
    sort: (([, a], [, b]) => a.AwardLevel - b.AwardLevel),
});
const getBySlotType = (SlotType) => objectArrayify(sortByAwardLevel, {
    filter: ([, v]) => v.SlotType === SlotType,
});

export default {
    components: { Page },
    props: {
        type: {
            type: String,
            requested: true,
            default: null,
        },
        portrait: {
            type: String,
            requested: true,
            default: null,
        },
        postFilter: {
            type: Function,
            requested: false,
            default: ((e) => e),
        },
    },
    data() {
        return {
            data: this.postFilter(getBySlotType(this.type)),
            img: require(`@Img/game/portraits/${this.portrait}.png`),
            locKey: `TYPE_MOD_${this.type.toUpperCase()}`,
        };
    },
};
</script>
