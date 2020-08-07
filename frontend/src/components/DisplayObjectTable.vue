<template>
  <div class="table-bg">
    <div class="wrapper">
      <stats-info
        :header="statsInfo.header"
        :description="statsInfo.description"
        :show.sync="statsInfo.show"
      >
      </stats-info>
      <table class="table">
        <thead>
          <tr>
            <th class="level-column">
              {{ $t(lvlColKey) }}
            </th>
            <th
              v-for="key in head"
              :key="key"

              :class="{ 'info-mark': headStatsInfoData[key].text }"
              v-on="headStatsInfoData[key].text ? { click: (e) => clickInfo(e, key) } : {}"
            >
              {{ getFormatHead(key) }}
            </th>
            <slot name="head"></slot>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(num, levelIndex) in maxLevel" :key="num">
            <td class="level-column">
              {{ levelIndex + colLvlStartAt }}
            </td>
            <!-- eslint-disable vue/no-use-v-if-with-v-for -->
            <td
              v-for="(value, index) in body"
              v-if="value[levelIndex].value !== null"
              :key="index"

              :rowspan="value[levelIndex].rowspan"
              v-html="getFormatBody(head[index], value[levelIndex].value)"
            ></td>
            <!-- eslint-enable vue/no-use-v-if-with-v-for -->
            <slot name="body" :level="levelIndex"></slot>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import formatValue from '../js/modules/formatValue';
import formatKey from '../js/modules/formatKey';
import {getTextInfoStats} from '../js/modules/descriptionsHandler';
import StatsInfo from './DisplayObjectStatsInfo.vue';

export default {
  name: 'Table',
  components: {StatsInfo},
  props: {
    mergeCells: {
      type: Boolean,
      default: true,
    },
    lvlColKey: {
      type: String,
      default: 'lvl',
    },
    colLvlStartAt: {
      type: Number,
      default: 1,
    },
    maxLevel: {
      type: Number,
      request: true,
    },
    objName: String,
    head: Array,
    body: Array,
    iconDir: String,
  },
  data() {
    return {
      headStatsInfoData: {},
      statsInfo: {
        header: '',
        description: '',
        show: false,
      },
    };
  },
  created() {
    this.body.forEach((value, index, arr) => {
      arr[index] = rowspanMask(value, this.mergeCells);
    });
    this.head.forEach((key) => {
      this.newInfoBlock(key);
    });
  },
  methods: {
    getFormatBody(...args) {
      const $t = (key) => this.$t.call(this, key);
      const $te = (key) => this.$te.call(this, key);
      return formatValue($t, $te, this.iconDir, ...args);
    },
    getFormatHead(...args) {
      const $t = (key) => this.$t.call(this, key);
      return formatKey($t, this.objName, ...args);
    },
    newInfoBlock(key) {
      const $t = (key) => this.$t.call(this, key);
      const $te = (key) => this.$te.call(this, key);
      const text = getTextInfoStats($t, $te, key);
      const obj = (this.headStatsInfoData[key] = {});

      if (!text) return;
      obj.header = this.getFormatHead(key);
      obj.text = text;
    },
    clickInfo(event, key) {
      this.statsInfo.header = this.headStatsInfoData[key].header;
      this.statsInfo.description = this.headStatsInfoData[key].text;
      this.statsInfo.show = true;
    },
  },
};

function rowspanMask(rawArray, mergeCells) {
  return rawArray
      .map((item, index, arr) => {
        if (item == arr[index - 1] && mergeCells) {
          item = null;
        }
        return {value: item};
      })
      .map((item, index, arr) => {
        if (item.value === null) {
          let rowspan = 1;
          let lastItemIndex = index;

          while (arr[lastItemIndex].value == null) {
            lastItemIndex--;
            rowspan++;
          }
          arr[lastItemIndex].rowspan = rowspan;
        }
        return item;
      });
}
</script>

<style scoped>
.table-bg {
  padding: 20px 3%;
  margin: 0 0 4%;
  background-color: #0f1416;
}
.wrapper {
  position: relative;
  overflow: auto;
}
.table {
  width: 100%;
  height: 100%;
  border: 1px solid #424547;
  border-spacing: 0;
  border-collapse: separate;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  color: #aab2b6;
}
.table th,
td {
  padding: 8px 10px 8px;
  line-height: 16px;
  text-align: center;
  font-size: 75%;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
}
.table th {
  background-color: #090e10;
  padding-top: 9px;
  font-weight: bold;
  vertical-align: middle;
  color: #c9cfd3;
  border-bottom: 2px solid #25262e;
  top: 0;
}
.table td {
  vertical-align: center;
  border-top: 1px solid #25262e;
}
.table tr:hover {
  background-color: #151a1c;
}
.level-column {
  position: sticky;
  position: -webkit-sticky;
  background-color: #090e10;
  border-left: 1px solid #424547;
  border-right: 1px solid #424547;
  left: 0;
  z-index: 2;
  width: 1%;
}
.info-mark {
  color: #cfd6ad !important;
  cursor: pointer;
}
</style>

<style>
/* ==================================================================
   Закругление краёв */
table th + th,
table td + td,
table th + td {
  border-left: 1px solid #25262e;
  /*Стиль для левой границы между двумя ячейками*/
}
table thead tr:first-child th:first-child
    /*Первая строка первая ячейка в заголовке таблицы*/ {
  -webkit-border-radius: 5px 0 0 0;
  -moz-border-radius: 5px 0 0 0;
  border-radius: 5px 0 0 0;
}
table thead tr:first-child th:last-child
    /*Первая строка последняя ячейка в заголовке таблицы*/ {
  -webkit-border-radius: 0 5px 0 0;
  -moz-border-radius: 0 5px 0 0;
  border-radius: 0 5px 0 0;
}
table tbody tr:last-child td:first-child
    /*Последняя строка первая ячейка в теле таблицы*/ {
  -webkit-border-radius: 0 0 0 5px;
  -moz-border-radius: 0 0 0 5px;
  border-radius: 0 0 0 5px;
}
table tbody tr:last-child td:last-child
    /*Последняя строка последняя ячейка в теле таблицы*/ {
  -webkit-border-radius: 0 0 5px 0;
  -moz-border-radius: 0 0 5px 0;
  border-radius: 0 0 5px 0;
}
</style>
