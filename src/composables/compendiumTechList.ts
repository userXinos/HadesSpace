import { onMounted, ref, watch } from 'vue';

import objectArrayify from '@Utils/objectArrayify';
import { getTechFromIndex } from 'bot_client/src/module_types';
import client from '../utils/compendium';
import { TechLevels } from 'bot_client';
import debounce from 'lodash.debounce';

declare type SetTechLevel = (techId: number, level: number) => Promise<void>;

export default function compendiumTechList() {
    const data = ref<TechLevels>(null);
    const levelMap = ref<Record<string, number>>({});

    const setTechLevel = debounce(
        (tId: number, l: number) => client.setTechLevel(tId, l),
        500,
    ) as SetTechLevel;

    onMounted(() => {
        if (client.getUser()) {
            data.value = client.getTechLevels();
        }
    });
    watch(data, (value) => {
        if (value) {
            levelMap.value = objectArrayify(value, {
                map: ([i, v]) => [getTechFromIndex(i as number), v.level],
            });
        }
    }, { deep: true });

    client.on('sync', (tl: TechLevels) => data.value = tl);
    client.on('connected', () => data.value = client.getTechLevels());
    client.on('disconnected', () => {
        data.value = undefined;
        levelMap.value = undefined;
    });

    return {
        data,
        levelMap,
        setTechLevel,
    };
}
