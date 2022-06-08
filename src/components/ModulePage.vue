<template>
  <Page
    :title-loc-key="locKey"
    :content-args="{data, iconDir: 'game/Modules', tableOpts}"
    :portrait="{src: img, alt: `${type} modules`}"
  />
</template>

<script>
import Page from '@/components/Page.vue';
import modulesData from '@Data/modules.js';
import globals from '@Data/globals.js';
import objectArrayify from '@Scripts/objectArrayify';

const { MaxModuleLevel } = globals;

const NEBULA_BUILD = !!process.env.VUE_APP_NEBULA_BUILD;
const TID_ART_BY_SLOT = {
    Trade: 'TID_TRADEITEM_ARTIFACT_UTILITY',
    Mining: 'TID_TRADEITEM_ARTIFACT_UTILITY',
    Shield: 'TID_TRADEITEM_ARTIFACT_COMBAT',
    Weapon: 'TID_TRADEITEM_ARTIFACT_COMBAT',
    Support: 'TID_TRADEITEM_ARTIFACT_SUPPORT',
};

const sortByAwardLevel = objectArrayify(modulesData, {
    filter: ([, v]) => !v.Hide,
    sort: (([, a], [, b]) => (NEBULA_BUILD) ? a.RSLevel - b.RSLevel : a.AwardLevel - b.AwardLevel),
});
export const getBySlotType = (SlotType) => objectArrayify(sortByAwardLevel, {
    filter: ([, v]) => v.SlotType === SlotType,
});

export default {
    components: { Page },
    props: {
        type: { type: String, required: true },
        portrait: { type: String, required: true },
        postFilter: { type: Function, default: ((e) => e) },
    },
    data() {
        return {
            data: this.postFilter(this.addArtifactName(getBySlotType(this.type))),
            img: require(`@Img/game/portraits/${this.portrait}.png`),
            locKey: `TYPE_MOD_${this.type.toUpperCase()}`,
        };
    },
    computed: {
        tableOpts() {
            const maxModulesLvl = new Map();

            return {
                get colLvlStartAt() {
                    if (NEBULA_BUILD && this.data?.body?.default) {
                        const k = this.data.body.default;

                        if (!maxModulesLvl.has(k)) {
                            maxModulesLvl.set(k, 0);
                        }

                        const maxLvl = maxModulesLvl.get(k);
                        if (maxLvl < 1) {
                            let max = 0;
                            for (const e of this.data.body.default) {
                                max = (max < e.length) ? e.length - 1 : max;
                            }
                            maxModulesLvl.set(k, max);
                            return MaxModuleLevel - max;
                        }
                        return MaxModuleLevel - maxLvl;
                    }
                    return 1;
                },
            };
        },
    },
    methods: {
        addArtifactName(obj) {
            for (const e of Object.values(obj)) {
                if (e.SlotType && e.RSLevel) {
                    e.artifact = `${this.$t(TID_ART_BY_SLOT[e.SlotType])} ${this.$t('TID_LEVEL_GENERIC', [e.RSLevel]).toLowerCase()}`;
                }
            }
            return obj;
        },
    },
};
</script>
