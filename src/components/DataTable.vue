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
            >{{ formatKey(value) }}</th>

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
              v-for="({key, value, rowspan}, index2) in row"
              v-show="value !== undefined"
              :key="key + index2"
              :rowspan="rowspan"
            >{{ formatValue(key, value) }}</td>

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
import tableMask from '@Scripts/tableMask.js';
import value from '@Handlers/value.js';
import key from '@Handlers/key.js';

export default {
    name: 'Table',
    props: {
        data: {
            type: Object,
            default: () => {},
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
        this.formatterOpts = {
            $t: this.$t.bind(this),
            $te: this.$te.bind(this),
        };
    },
    methods: {
        formatKey(...args) {
            return key(...args, this.formatterOpts);
        },
        formatValue(...args) {
            return value(...args, this.formatterOpts);
        },
    },
};
</script>


<style scoped lang="scss">
$mw: 900px;

.table-bg {
    background-color: var(--table-bg);
    margin-top: 1%;

.wrapper {
    position: relative;
    overflow: auto;
}
}
.table {
    width: 100%;
    border-bottom: 1px solid var(--border-color);
    border-left: 1px solid var(--border-color);

    .lvl-col {
        position: sticky;
        left: 0;
        width: 1%;
    }
    th, :slotted(th) {
        background-color: var(--table-bg2);
        font-weight: bold;

        @media screen and (max-width: $mw) {
            font-size: 70%;
        }
    }
    .body {
        tr:hover, :slotted(tr):hover {
            background-color: var(--table-hover);
        }
    }
    th, td, :slotted(td), :slotted(th) {
        padding: 8px 10px 8px;
        line-height: 16px;
        text-align: center;
        font-size: 80%;
        user-select: none;
        border-top: 1px solid var(--border-color);
    }
}
</style>

