<template>
  <div
    v-if="tableMask != null"
    class="table-bg"
  >
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
              :class="{'filtered': isHide(value)}"
            >
              <DataStatTooltip :k="value">
                {{ format.key(value) }}
              </DataStatTooltip>
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
              :cell-key="key"
              :class="{'filtered': isHide(key)}"
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
import { ref, computed, useSlots, onUpdated, onMounted, onUnmounted, h, reactive, watch, VNode as VN } from 'vue';
import { Ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useStore } from 'vuex';
import types from '../store/modules/userSettings/types';

import DataStatTooltip from '@/components/DataStatTooltip.vue';

import tableMaskUtil from '@Utils/tableMask';
import statsStyleName from '@Handlers/statsStyleName';
import type { Raw } from '@Utils/tableMask';
import objectArrayify, { Callbacks } from '@Utils/objectArrayify';

export interface Props {
    data: Raw
    format: { key: (k: string) => string, value: (k: string, v: unknown) => string }
    isHide: (k: string) => boolean,
    mergeCells?: boolean
    colLvlStartAt?: number
    lvlColKey?: string
}

const HEIGHT_HEADER = 80;
const TH_PADDING = 20;

const store = useStore();
const { t, te } = useI18n();
const props = withDefaults(defineProps<Props>(), {
    mergeCells: true,
    colLvlStartAt: 1,
    lvlColKey: 'LVL',
});
const pinHead = ref(false);
const slots = useSlots();
const hasSlots = computed(() => slots.head && slots.body);
const categories = reactive(Object.keys(props.data.head));
const filteredIndexes = reactive<Record<string, number[]>>(Object.fromEntries(categories.map((e) => [e, []])));
const lvlColName = computed(() => te(props.lvlColKey) ? t(props.lvlColKey) : props.lvlColKey);
const tableMask = computed(() => {
    const callbacks: Callbacks = { map: filterMapCb, filter: ([, v]) => v.length };
    const filteredData = {
        head: objectArrayify(props.data.head, callbacks),
        body: objectArrayify(props.data.body, callbacks),
    };

    if (!Object.values(filteredData.body)[0]?.length) {
        return null;
    }
    return tableMaskUtil({ ...filteredData }, props.mergeCells);
});

let manualScroll: boolean;

const teleportTable = ref() as Ref<HTMLInputElement>;
const table = ref() as Ref<HTMLInputElement>;
const th = ref() as Ref<HTMLInputElement>;


updateFiltered();


store.subscribe((mutation) => {
    if (mutation.type == types.SWITCH_DISABLE_FILTERS) {
        updateFiltered();
    }
});

watch(props.data.head, () => {
    updateFiltered();
});

onUpdated(() => {
    if (pinHead.value && teleportTable.value) {
        teleportTable.value.scrollLeft = table.value.scrollLeft;
    }
});
onMounted(()=> window.addEventListener('scroll', onScroll));
onUnmounted(() => window.removeEventListener('scroll', onScroll));

function onScroll(): void {
    pinHead.value = !hasSlots.value && !!(tableMask.value && isInViewport(table.value));
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
            teleportTable.value.scrollLeft = (e.target as HTMLDataElement).scrollLeft;
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
function updateFiltered() {
    categories.forEach((e) => filteredIndexes[e] = []);

    Object.entries(props.data.head)
        .forEach(([category, keys]) => {
            keys.forEach((k, i) => {
                if (props.isHide(k) && !store.state.userSettings.disableFilters) {
                    filteredIndexes[category].push(i);
                }
            });
        });
}
function filterMapCb([cat, values]) {
    const v = [...values];
    filteredIndexes[cat].forEach((i) => delete v[i]);
    return [cat, v.filter(Boolean)];
}
function VNode({ render }: {render: (createElement: typeof h) => VN}) {
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
    word-break: keep-all;
  }
  .filtered {
    background-color: rgba(157, 14, 43, 0.2);
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
    .filtered {
      background-color: rgba(220,20,60, 0.2);
    }
  }
  th, td, :slotted(td), :slotted(th) {
    padding: 10px;
    line-height: 16px;
    text-align: center;
    font-size: 90%;
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

