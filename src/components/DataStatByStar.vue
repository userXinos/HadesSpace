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
                  :k="row[0]"
                >{{ format.key(row[0]) }}
                </DataStatTooltip>
                <template v-if="$store.state.userSettings.showKeys"> ({{ value }})</template>
              </template>

              <span
                v-else
                :class="value && statsStyleName(row[0])"
                class="stats-style"
              ><template v-if="value && TO_SPOILER_KEYS.includes(row[0])">
                 <DataStatTooltip
                   :k="value as string"
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

type Table = [
    ({dir: string, name: string} | null)[],
    [string, ...unknown[]][]
]

const STARS = {
    YS: { dir: 'game/Stars', name: 'star_yellow' },
    RS: { dir: 'game/Stars', name: 'star_red' },
    WS: { dir: 'game/Stars', name: 'star_white' },
    BS: { dir: 'game/Stars', name: 'star_blue_2' },
};
const POSTFIX_BY_STARS: Record<string, (keyof typeof STARS)[]> = {
    'base': ['YS', 'RS', 'WS', 'BS'],
    '': ['YS', 'RS', 'WS', 'BS'],
    'ys': ['YS'],
    'rs': ['RS'],
    'ws': ['WS'],
    'bs': ['BS'],
    'bls': ['BS'],
    'pve': ['YS', 'RS'],
    'pvp': ['WS', 'BS'],
};
const TO_SPOILER_KEYS = ['TID_Description'];

export interface Props {
    items: { [k:string]: unknown },
    format: { key: (k: string) => string, value: (k: string, v: unknown) => string }
}

const props = defineProps<Props>();

const table = computed<Table>(() => {
    const preBody: Record<string, { [k in keyof typeof STARS]?: unknown }> = {};
    let usedStars: (keyof typeof STARS)[] = [];

    Object.entries(props.items).forEach(([k, v]) => {
        const baseKey = k.replace(postfixRegex, '');
        const stars = POSTFIX_BY_STARS[(postfixRegex.exec(k)?.[1] ?? '').toLowerCase()];

        if (!preBody[baseKey]) {
            preBody[baseKey] = {};
        }
        stars.forEach((s) => {
            if (preBody[baseKey][s] && stars.length == Object.keys(STARS).length) {
                return;
            }
            preBody[baseKey][s] = v;

            if (!usedStars.includes(s)) {
                usedStars.push(s);
            }
        });
    });

    usedStars = usedStars.sort((a, b) => Object.keys(STARS).indexOf(a) - Object.keys(STARS).indexOf(b));

    const head: Table[0] = [null, ...usedStars.map((s) => STARS[s])];
    const body: Table[1] = [];

    Object.entries(preBody).forEach(([key, byStar]) => {
        const row = Array(usedStars.length);

        Object.entries(byStar).forEach(([star, value]) => {
            row[usedStars.indexOf(star as keyof typeof STARS)] = value;
        });
        body.push([key, ...row]);
    });

    return [head, body];
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
            margin: -1px 0.1vw;
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
