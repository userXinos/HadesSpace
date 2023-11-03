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
                <template
                  v-for="(v, j) in value"
                >
                  <!--suppress RequiredAttributes -->
                  <Icon
                    v-bind="v"
                    class="icon"
                  />
                  <div
                    v-if="j+1 < value.length"
                    :key="j"
                    class="separator"
                  />
                </template>
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
                :class="statsStyleName(row[0])"
              >{{ format.value(row[0], value) }}
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

const dir = 'game/Stars';
const LABEL_BY_ORDER = {
    'base': 'Base',
    '': { dir, name: 'star_yellow' },
    'ys': { dir, name: 'star_yellow' },
    'rs': { dir, name: 'star_red' },
    'ws': { dir, name: 'star_white' },
    'bs': { dir, name: 'star_blue' },
    'bls': { dir, name: 'star_blue' },
    'pve': [{ dir, name: 'star_yellow' }, { dir, name: 'star_red' }],
    'pvp': [{ dir, name: 'star_white' }, { dir, name: 'star_blue' }],
};
const LABEL_KEYS = Object.keys(LABEL_BY_ORDER);

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

        if (baseKey == 'TID_Description') {
            return; // TODO
        }
        if (!(baseKey in preBody)) {
            preBody[baseKey] = Array.from({ length: LABEL_KEYS.length });
        }
        preBody[baseKey][labelIndex] = v;
    });

    const head = [];
    const bodyValuesMatrix = Object.values(preBody);
    const bodyKeys = Object.keys(preBody);

    for (let i = LABEL_KEYS.length; i >= 0; i--) {
        const isSkipLabelKey = Object.values(preBody).every((e) => e[i] == undefined);

        if (isSkipLabelKey) {
            bodyValuesMatrix.forEach((row) => {
                row.splice(i, 1);
            });
        } else {
            const headLabel = LABEL_BY_ORDER[LABEL_KEYS[i]];
            if (typeof headLabel == 'object' && head.some((e) => typeof e == 'object' && e.name == headLabel.name)) {
                // цель состоит в том, чтобы удалить идентичные лейблы столбцов,
                // просто перенос значений по индексу с оставлением оригинального, но уже путсного ключа preBody
                bodyValuesMatrix.forEach((row, iRow) => {
                    const value = row[i];
                    if (value) {
                        bodyValuesMatrix[iRow][i + 1] = value;
                        delete bodyValuesMatrix[iRow][i];
                    }
                });
                bodyValuesMatrix.forEach((row) => {
                    row.splice(i, 1);
                });
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

.table {
    border-collapse: collapse;
    width: 100%;

    .separator {
        width: 5px;
        background-color: #6799b0;
        height: 106%;

        @media screen and (max-width: 500px) {
            width: 2px;
        }
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
                background-color: #29373d;
                border-top-left-radius: 10px;
                border-top-right-radius: 10px;
                display: flex;
                justify-content: center;
                align-items: center;

                .icon {
                    width: 60px;
                    height: 60px;

                    @media screen and (max-width: 500px) {
                        width: 40px;
                        height: 40px;
                    }
                }
            }
        }
    }

    tbody {
        background: #29373d;

        .cell-bg {
            margin: 0 5px;

            .cell {
                width: 100%;
                border: 1px solid map.get($table, border);
                border-radius: 10px;
                text-align: center;
                margin: 5px 1px;
                background-color: #2e3f45;
            }
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
        padding-left: 15px;
    }
}
</style>