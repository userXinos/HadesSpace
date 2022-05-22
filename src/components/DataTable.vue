<template>
  <div class="table-bg">
    <div
      ref="table"
      class="wrapper"
      @scroll="onTableScroll"
    >
      <table class="table">

        <teleport
          v-if="pinHead"
          to="#table-head-target"
          :disabled="!pinHead"
        >
          <div class="table-bg">
            <div
              ref="teleTable"
              class="wrapper pinned"
            ><table class="table">

              <thead class="head">
                <tr
                  v-for="(array, i) in tableMask.head"
                  :key="i"
                >
                  <th
                    v-if="i === 0"
                    :style="getPinnedTableCellStyle(0)"
                    :rowspan="tableMask.head.length"
                    class="lvl-col"
                  > {{ lvlColName }} </th>
                  <th
                    v-for="({value, rowspan, colspan}, k) in array"
                    :key="k"
                    :style="getPinnedTableCellStyle(k + 1, i)"
                    :rowspan="rowspan"
                    :colspan="colspan"
                  >{{ format.key(value) }}
                  </th>

                  <slot name="head" />
                </tr>
              </thead>

            </table></div></div>
        </teleport>

        <thead class="head">
          <tr
            v-for="(array, i) in tableMask.head"
            :key="i"
          >
            <th
              v-if="i === 0"
              ref="th"
              :rowspan="tableMask.head.length"
              class="lvl-col"
            > {{ lvlColName }} </th>
            <th
              v-for="({value, rowspan, colspan}, k) in array"
              :key="k"
              ref="th"
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

const HEIGHT_HEADER = 80;
const TH_PADDING = 20;

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
            pinHead: false,
        };
    },
    computed: {
        hasSlots() {
            return this.$slots.head && this.$slots.body;
        },
        tableMask() {
            return tableMask({ ...this.data }, this.mergeCells);
        },
        lvlColName() {
            return this.$te(this.lvlColKey) ? this.$t(this.lvlColKey) : this.lvlColKey;
        },
    },

    updated() {
        if (this.pinHead && this.$refs.teleTable) {
            this.$refs.teleTable.scrollLeft = this.$refs.table.scrollLeft;
        }
    },
    mounted() {
        window.addEventListener('scroll', this.onScroll);
    },
    unmounted() {
        window.removeEventListener('scroll', this.onScroll);
    },
    methods: {
        onScroll() {
            this.pinHead = !this.hasSlots && this.isInViewport(this.$refs.table);
        },
        isInViewport(element) {
            const rect = element.getBoundingClientRect();
            return rect.top <= (HEIGHT_HEADER - 20) && rect.bottom >= (HEIGHT_HEADER + 200);
            //                                  ^                                       ^
            //   убирать/показывать прямо когда сролл на таблице
        },

        onTableScroll(e) {
            if (!this.manualScroll) {
                if (this.$refs.teleTable) {
                    this.manualScroll = true;
                    this.$refs.teleTable.scrollLeft = e.target.scrollLeft;
                }
                this.manualScroll = false;
            }
        },
        getPinnedTableCellStyle(index, strIndex = 0) {
            if (strIndex > 0) {
                return {};
            }

            const width = this.$refs.th[index].clientWidth - TH_PADDING;
            return {
                minWidth: `${width}px`,
                maxWidth: `${width}px`,
            };
        },
    },
};
</script>


<style scoped lang="scss">
@use "sass:map";
@import "../style/vars";

$mw: 900px;

.table-bg {
    background: map.get($table, background);
    margin-top: 1%;

    .wrapper {
        position: relative;
        overflow: auto;
    }
    .pinned {
        overflow: hidden;
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

