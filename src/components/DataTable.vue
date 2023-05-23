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
              ref="teleportTable"
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
            >
              {{ format.key(value) }}
              <template v-if="$store.state.userSettings.showKeys">({{ value }})</template>
            </th>

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
            >
              <v-node
                v-if="typeof format.value(key, value) === 'function'"
                :render="format.value(key, value)"
              />
              <template v-else>
                <span
                  class="stats-style"
                  :class="value ? statsStyleName((key.startsWith('_') ? key.slice(1) : key)) : null"
                >{{ format.value(key, value) }}</span>
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

<script setup lang="ts">
import { ref, computed, useSlots, onUpdated, onMounted, onUnmounted, h } from 'vue';
import { Ref } from 'vue';
import i18n from '@Utils/Vue/i18n';

import tableMaskUtil from '@Utils/tableMask';
import statsStyleName from '@Handlers/statsStyleName';
import type { Raw } from '@Utils/tableMask';

export interface Props {
    data: Raw
    format: { key: (k: string) => string, value: (k: string, v: unknown) => string }
    mergeCells?: boolean
    colLvlStartAt?: number
    lvlColKey?: string
}

const HEIGHT_HEADER = 80;
const TH_PADDING = 20;

const { t, te } = i18n.global;
const props = withDefaults(defineProps<Props>(), {
    mergeCells: true,
    colLvlStartAt: 1,
    lvlColKey: 'LVL',
});
const pinHead = ref(false);
const slots = useSlots();
const hasSlots = computed(() => slots.head && slots.body);
const tableMask = computed(() => tableMaskUtil({ ...props.data }, props.mergeCells));
const lvlColName = computed(() => te(props.lvlColKey) ? t(props.lvlColKey) : props.lvlColKey);
let manualScroll;

const teleportTable = ref(null) as Ref<HTMLInputElement>;
const table = ref(null) as Ref<HTMLInputElement>;
const th = ref(null) as Ref<HTMLInputElement>;

onUpdated(() => {
    if (pinHead.value && teleportTable.value) {
        teleportTable.value.scrollLeft = table.value.scrollLeft;
    }
});
onMounted(()=> {
    window.addEventListener('scroll', onScroll);
});
onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
});

function onScroll(): void {
    pinHead.value = !hasSlots.value && isInViewport(table.value);
}
function isInViewport(element: HTMLInputElement): boolean {
    const rect = element.getBoundingClientRect();
    return rect.top <= (HEIGHT_HEADER - 20) && rect.bottom >= (HEIGHT_HEADER + 200);
    //                                  ^                                       ^
    //   убирать/показывать прямо когда сролл на таблице
}
function onTableScroll(e: Event): void {
    if (!manualScroll) {
        if (teleportTable.value) {
            manualScroll = true;
            teleportTable.value.scrollLeft = e.target.scrollLeft;
        }
        manualScroll = false;
    }
}
function getPinnedTableCellStyle(index: number, strIndex = 0): {minWidth?: string, maxWidth?: string} {
    if (strIndex > 0) {
        return {};
    }

    const width = th.value[index].clientWidth - TH_PADDING;
    return {
        minWidth: `${width}px`,
        maxWidth: `${width}px`,
    };
}
function VNode({ render }) {
    return render(h);
}
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
        border: solid $border-color 1px;
        border-radius: 10px;
    }
    .pinned {
        overflow: hidden;
    }
}
.table {
    width: 100%;
    border-collapse: collapse;

    .lvl-col {
        position: sticky;
        left: 0;
        width: 1%;
    }
    th, :slotted(th) {
        background-color: map.get($table, background2);
        background-clip: padding-box;
        font-weight: bold;

        @media screen and (max-width: $mw) {
            font-size: 70%;
        }
    }
    .body {
        tr:hover, :slotted(tr):hover {
            backdrop-filter: brightness(150%);
        }
    }
    th, td, :slotted(td), :slotted(th) {
        padding: 10px;
        line-height: 16px;
        text-align: center;
        font-size: 90%;
        // user-select: none;
        border: 1px solid map.get($table, border);
    }

    td[cell-key="TID_Description"] {
        font-size: 70%;
    }
    td[cell-key="Model"] {
        > div {
            max-width: 50px;
        }
    }
}
</style>

