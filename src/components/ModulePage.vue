<template>
  <Page
    :title-loc-key="locKey"
    :content-args="{data, iconDir: 'game/Modules', tableOpts}"
    :portrait="{src: img, alt: `${type} modules`}"
  />
</template>

<script lang="ts">
import globals from '@Data/globals.js';
import modulesData from '@Data/modules.js';
import objectArrayify from '@Utils/objectArrayify';

const NEBULA_BUILD = !!process.env.VUE_APP_NEBULA_BUILD;
const { MaxModuleLevel } = globals;
const sortByAwardLevel = objectArrayify(modulesData, {
    filter: ([, v]) => !v.Hide,
    sort: (([, a], [, b]) => (NEBULA_BUILD) ? a.RSLevel - b.RSLevel : a.AwardLevel - b.AwardLevel),
});

const getBySlotType = (SlotType: string) => objectArrayify(sortByAwardLevel, {
    filter: ([, v]) => v.SlotType === SlotType,
});
function tableOptsGetter() {
    const maxModulesLvl = new Map();

    return {
        get colLvlStartAt() {
            if (NEBULA_BUILD && this?.data?.body) {
                const matrixKey = (this.data.body.default) ? 'default' : Object.keys(this.data.body)[0];
                const k = this.data.body[matrixKey];

                if (!maxModulesLvl.has(k)) {
                    maxModulesLvl.set(k, 0);
                }

                const maxLvl = maxModulesLvl.get(k);
                if (maxLvl < 1) {
                    let max = 0;
                    for (const e of this.data.body[matrixKey]) {
                        max = (max < e.length) ? e.length - 1 : max;
                    }
                    maxModulesLvl.set(k, max);
                    return MaxModuleLevel - max;
                }
                return MaxModuleLevel - maxLvl;
            }
            return 1;
        },
    } as Record<string, any>;
}
export default { name: 'ModulePage' };
export {
    getBySlotType,
    tableOptsGetter as tableOpts,
};
</script>

<script setup lang="ts">
/* eslint-disable @typescript-eslint/no-var-requires */

import { computed } from 'vue';
import i18n from '@Utils/Vue/i18n';

import Page from '@/components/Page.vue';

export interface Props {
    type: string
    portrait: string
    postFilter?: (e: object) => e
}

const { t } = i18n.global;
const TID_ART_BY_SLOT = {
    Trade: 'TID_ARTIFACT_TYPE_0',
    Mining: 'TID_ARTIFACT_TYPE_1',
    Shield: 'TID_ARTIFACT_TYPE_2',
    Weapon: 'TID_ARTIFACT_TYPE_3',
    Support: 'TID_ARTIFACT_TYPE_4',
    Drone: 'TID_ARTIFACT_TYPE_5',
};

const props = withDefaults(defineProps<Props>(), {
    postFilter: (e) => e,
});
const data = props.postFilter(addArtifactName(getBySlotType(props.type)));
const img = require(`@Img/game/portraits/${props.portrait}.png`);
const locKey = `TYPE_MOD_${(NEBULA_BUILD && props.type == 'Support') ? 'COMBAT' : props.type.toUpperCase()}`;
const tableOpts = computed(tableOptsGetter);

function addArtifactName(obj) {
    for (const e of Object.values(obj)) {
        if (e.SlotType && e.RSLevel) {
            e.artifact = `${t(TID_ART_BY_SLOT[e.SlotType])} ${t('TID_LEVEL_GENERIC', [e.RSLevel]).toLowerCase()}`;
        }
    }
    return obj;
}
</script>
