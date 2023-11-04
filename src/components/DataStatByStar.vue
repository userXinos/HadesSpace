<template>
  <table class="table">
    <thead>
      <tr>
        <th
          v-for="(value, i) in table[0]"
          :key="i"
        >
          <div class="cell-bg">
            <div class="cell">
              <template v-if="value == null" />
              <template v-else-if="typeof value == 'string'">{{ $t(value) }}</template>
              <template v-else-if="Array.isArray(value)">
                <!--suppress RequiredAttributes -->
                <Icon
                  v-for="(v, j) in value"
                  :key="j"
                  v-bind="v"
                  class="icon"
                />
              </template>
              <!--suppress RequiredAttributes -->
              <Icon
                v-else
                v-bind="value"
                class="icon"
              />
            </div>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(row, iRow) in table[1]"
        :key="iRow"
      >
        <td
          v-for="(value, i) in row"
          :key="i"
        >
          <div class="cell-bg">
            <div
              class="cell"
            >

              <template v-if="i == 0">
                <DataStatTooltip
                  :k="value"
                >{{ format.key(value) }}
                </DataStatTooltip>
                <template v-if="$store.state.userSettings.showKeys"> ({{ value }})</template>
              </template>

              <span
                v-else
                :class="value && statsStyleName(row[0])"
                class="stats-style"
              ><template v-if="value && TO_SPOILER_KEYS.includes(row[0])">
                 <DataStatTooltip
                   :k="value"
                   :is-loc-key="true"
                 > {{ $t('TID_OBJ_ACTION_EXPLORE_SECTOR') }}
                 </DataStatTooltip>
               </template>
                <template v-else>{{ format.value(row[0], value) }}</template>
              </span>

            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import Icon from '@/components/Icon.vue';
import DataStatTooltip from '@/components/DataStatTooltip.vue';
import statsStyleName from '@Handlers/statsStyleName';

import { regex as postfixRegex } from '@Regulation/postfixes.mjs';

const LABEL_BY_ORDER = {
    'base': 'Base',
    '': { dir: 'icons', name: 'star_multi' },
    'ys': { dir: 'game/Stars', name: 'star_yellow' },
    'rs': { dir: 'game/Stars', name: 'star_red' },
    'ws': { dir: 'game/Stars', name: 'star_white' },
    'bs': { dir: 'game/Stars', name: 'star_blue_2' },
    'bls': { dir: 'game/Stars', name: 'star_blue_2' },
    'pve': { dir: 'icons', name: 'star_pve' },
    'pvp': { dir: 'icons', name: 'star_pvp' },
};
const LABEL_KEYS = Object.keys(LABEL_BY_ORDER);
const TO_SPOILER_KEYS = ['TID_Description'];

export interface Props {
    items: { [k:string]: object|unknown[] },
    format: { key: (k: string) => string, value: (k: string, v: unknown) => string }
}

const props = defineProps<Props>();
const table = computed(() => {
    const preBody = {};

    Object.entries(props.items).forEach(([k, v]) => {
        const baseKey = k.replace(postfixRegex, '');
        const labelIndex = LABEL_KEYS.indexOf((postfixRegex.exec(k)?.[1] ?? '').toLowerCase());

        if (!(baseKey in preBody)) {
            preBody[baseKey] = Array.from({ length: LABEL_KEYS.length });
        }
        preBody[baseKey][labelIndex] = v;
    });

    const head = [];
    const bodyValuesMatrix = Object.values(preBody);
    const bodyKeys = Object.keys(preBody);

    for (let i = LABEL_KEYS.length; i >= 0; i--) {
        const isSkipLabelKey = bodyValuesMatrix.every((row) => row[i] == undefined);

        if (isSkipLabelKey) {
            bodyValuesMatrix.forEach((row) => row.splice(i, 1));
        } else {
            const headLabel = LABEL_BY_ORDER[LABEL_KEYS[i]];
            if (typeof headLabel == 'object' && head.some((e) => typeof e == 'object' && e.name == headLabel.name)) {
                // цель состоит в том, чтобы удалить идентичные лейблы столбцов,
                // просто перенос значений по индексу с оставлением оригинального, но уже путсного ключа preBody
                bodyValuesMatrix.forEach((row, iRow) => {
                    const value = row[i];
                    if (value && !row[i + 1]) {
                        bodyValuesMatrix[iRow][i + 1] = value;
                        delete bodyValuesMatrix[iRow][i];
                    }
                });
                bodyValuesMatrix.forEach((row) => row.splice(i, 1));
            } else {
                head.unshift(headLabel);
            }
        }
    }

    return [
        [null, ...head],
        bodyKeys.map((k, i) => [k, ...bodyValuesMatrix[i]]),
    ];
});
</script>

<style scoped lang="scss">
@use "sass:map";

@import "../style/vars";

$bg-color: #29373d;

.table {
    border-collapse: collapse;
    width: 100%;

    @media screen and (max-width: 500px){
        font-size: 80%;
    }

    thead tr {
        height: 100%;

        th {
            height: 100%;
        }
        .cell-bg {
            margin: -1px 5px;
            height: 100%;

            .cell {
                height: 100%;
                background-color: $bg-color;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                display: flex;
                justify-content: center;
                align-items: center;

                .icon {
                    width: 60px;
                    height: 60px;

                    @media screen and (max-width: 500px) {
                        width: 30px;
                        height: 30px;
                    }
                }
            }
        }
    }

    tbody td {
        background: $bg-color;

        .cell-bg {
            margin: 0 5px;

            .cell {
                width: 100%;
                border: 1px solid map.get($table, border);
                border-radius: 5px;
                text-align: center;
                margin: 5px 1px;
                background: #2e3f45
            }
        }
    }
    tbody tr:first-child {
        & > td:first-child {
            border-top-left-radius: 10px;
        }
    }
    tbody tr:last-child {
        & > td:first-child {
            border-bottom-left-radius: 10px;
        }
        & > td:last-child {
            border-bottom-right-radius: 10px;
        }
    }


    thead th:first-child .cell-bg {
        height: 0;
    }
    thead th:last-child .cell-bg {
        margin-right: 0;
    }
    tbody td:first-child .cell {
        text-align: start;
        border: none;
        background: none;
        padding-left: 1%;
    }
}
</style>
