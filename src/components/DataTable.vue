<template>
  <div class="table-bg">
    <div class="wrapper">
      <table class="table">

        <thead class="head">
          <tr
            v-for="(array, i) in tableMask.head"
            :key="i"
          >
            <th
              v-if="i === 0"
              v-t="lvlColKey"
              :rowspan="tableMask.head.length"
              class="lvl-col"
            />
            <th
              v-for="({value, rowspan, colspan}, k) in array"
              :key="k"
              :rowspan="rowspan"
              :colspan="colspan"
            >{{ format.key(value) }}</th>

            <slot name="head" />
          </tr>
        </thead>

        <tbody class="body">
          <tr
            v-for="(row, i) in tableMask.body"
            :key="i"
          >
            <th class="lvl-col">{{ i + colLvlStartAt }}</th>
            <td
              v-for="({key, value, rowspan, colspan, hide}, index2) in row"
              v-show="!hide"
              :key="index2 + key"
              :rowspan="rowspan"
              :colspan="colspan"
              :cell-key="key"
            >
              <v-node
                v-if="typeof format.value(key, value) === 'function'"
                :render="format.value(key, value)"
              />
              <template v-else>
                {{ format.value(key, value) }}
              </template>

            </td>

            <slot
              name="body"
              :row="i"
            />
          </tr>
        </tbody>

      </table>
    </div>
  </div>
</template>

<script>
import { h } from 'vue';

import tableMask from '@Scripts/tableMask.js';

function VNode({ render }) {
    return render(h);
}

export default {
    name: 'Table',
    components: { VNode },
    props: {
        data: {
            type: Object,
            requested: true,
            default: () => ({}),
        },
        format: {
            type: Object,
            requested: true,
            default: () => ({ key: () => null, value: () => null }),
        },
        mergeCells: {
            type: Boolean,
            default: true,
        },
        colLvlStartAt: {
            type: Number,
            default: 1,
        },
        lvlColKey: {
            type: String,
            default: 'LVL',
        },
    },
    data() {
        return {
            headStatsInfoData: {},
            statsInfo: {
                header: '',
                description: '',
                show: false,
            },
            tableMask: {},
        };
    },
    created() {
        this.tableMask = tableMask({ ...this.data });
    },
};
</script>


<style scoped lang="scss">
@use "sass:map";
@import "../css/vars";

$mw: 900px;

.table-bg {
    background: map.get($table, background);
    margin-top: 1%;

.wrapper {
    position: relative;
    overflow: auto;
}
}
.table {
    width: 100%;
    border-bottom: 1px solid map.get($table, border);
    border-left: 1px solid map.get($table, border);

    .lvl-col {
        position: sticky;
        left: 0;
        width: 1%;
    }
    th, :slotted(th) {
        background-color: map.get($table, background2);
        font-weight: bold;

        @media screen and (max-width: $mw) {
            font-size: 70%;
        }
    }
    .body {
        tr:hover, :slotted(tr):hover {
            background-color: map.get($table, hover);
        }
    }
    th, td, :slotted(td), :slotted(th) {
        padding: 10px;
        line-height: 16px;
        text-align: center;
        font-size: 90%;
        // user-select: none;
        border-top: 1px solid map.get($table, border);
        border-right: 1px solid map.get($table, border);
    }

    td[cell-key="TID_Description"] {
        font-size: 70%;
    }
}
</style>

