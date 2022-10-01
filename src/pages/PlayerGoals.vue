<template>
  <Page
    :content-args="{data}"
    title-loc-key="TID_EMPIRE_OBJECTIVES"
  />
</template>

<script>
import Page from '@/components/Page.vue';

import objectArrayify from '@Scripts/objectArrayify';
import goals from '@Data/player_goals.js';

const INDEXES = ['X', 'Y', 'Z'];
const VALUE_BY_INDEX = {
    DeliverShipmentsBatch: ['IntParam', 'GoalTarget'],
    DestroySentinels: ['StringParam', 'GoalTarget'],
    DestroyGuardians: ['StringParam', 'GoalTarget'],
    DestroyColossus: ['StringParam', 'GoalTarget'],
    DestroyInterceptor: ['StringParam', 'GoalTarget'],
    DestroyPhoenix: ['StringParam', 'GoalTarget'],
    EntrustArtifacts: ['GoalTarget', 'IntParam', 'RSLevel'],
    UseDestinyNoSanct: ['GoalTarget', 'IntParam'],
    WinBSWithModule: ['Name'],
};
const DEFAULT_INDEX = 'GoalTarget';

const fixed = objectArrayify(goals, {
    filter: ([k]) => !['TUT', 'PT', 'EG'].some((e) => k.startsWith(e)),
    map: ([key, v]) => {
        if (key in VALUE_BY_INDEX) {
            VALUE_BY_INDEX[key].forEach((k, i) => {
                v[`value${INDEXES[i]}`] = v[k];
                delete v[k];
            });
        } else if (DEFAULT_INDEX in v) {
            v[`value${INDEXES[0]}`] = v[DEFAULT_INDEX];
            delete v[DEFAULT_INDEX];
        }

        return [key, v];
    },
});

fixed.WinBSWithModule.Name = 'WinBSWithModule';

export default {
    components: { Page },
    data: () => {
        return {
            data: fixed,
        };
    },
};
</script>
