<template>
  <div>
    <h1 id="title">{{ title }}</h1>
    <table class="planetsCalc">
      <tr v-for="(value, key) of output.calculated" :key="key">
        <td>{{ getFormatKey(key) }}</td>
        <td v-for="(item, itemKey) of value" :key="key + itemKey"
            :class="outputClassesTable(itemKey, key)"
        >
          {{ item.toLocaleString() }}
        </td>
      </tr>
      <tr class="total" v-for="(value, key) of output.total" :key="key">
        <td>{{ $t(key) }}</td>
        <td colspan="3">
          {{ getFormatValue(key, value) }}
        </td>
      </tr>
    </table>
    <div class="btns-warp">
      <div class="btns-reset">
        <button @click="reset" name="plan">
          {{ $t("resetPlan") }}
        </button>
        <button class="resetButtonAll" @click="reset" name="all">
          {{ $t("resetAll") }}
        </button>
      </div>
    </div>
    <v-table
        v-if="allDataLoaded"
        obj-name="planetsCalc"
        :head="input.static.head"
        :body="input.static.body"
        :max-level="input.static.maxLevel"
        :lvl-col-key="'№'"
        :merge-cells="false"
    >
      <template #head>
        <th>{{ $t("lvl") }}</th>
        <th>{{ $t("plan") }}</th>
      </template>

      <template #body="{ level }">
        <td v-for="type of ['actually', 'plan']" :key="type">
          <select @change="changeLvl(type, input.keys[level], $event.target.value)">
            <option
                v-for="(i, index) of (input.maxUpgradeLevel[level] + 1)"
                :key="type + i"
                :selected="isSelected(type, level, index)"
                :disabled="isDisabled(type, level, index)"
            >
              {{ index }}
            </option>
          </select>
        </td>
      </template>
    </v-table>
  </div>
</template>

<script>
import formatKey from '../js/modules/formatKey';
import formatValue from '../js/modules/formatValue';
import VTable from '../components/DisplayObjectTable.vue';

const localStorageKey = 'planetsCalc';
const keys = [
  'CreditStorage',
  'FuelStorage',
  'CreditsPerHour',
  'FuelPerHour',
  'ShipmentsCRValuePerDay',
];
const keysModifiers = [
  'CreditStorageModifier',
  'FuelStorageModifier',
  'CreditIncomeModifier',
  'FuelIncomeModifier',
  'CreditShipmentModifier',
];
const keysTotal = ['Cost', 'TimeToUpgrade'];
const rows = ['actually', 'plan', 'result'];
const keysAliasesTS = {
  ShipmentsCRValuePerDay: 'TotalShipmentCRPerDay',
  Cost: 'Cost',
  TimeToUpgrade: 'ConstructionTime',
};

export default {
  components: {VTable},
  data() {
    return {
      title: this.$t('planetscalc'),
      input: {
        static: {
          head: [],
          body: [],
          maxLevel: 0,
        },
        keys: [],
        maxUpgradeLevel: [],
      },
      output: {
        calculated: {},
        total: {},
      },
      data: {
        planets: {},
        levels: {},
        tradingStations: {},
      },
      storage: {actually: {}, plan: {}},
      allDataLoaded: false,
    };
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
  mounted() {
    if (localStorage.getItem(localStorageKey)) {
      try {
        this.storage = JSON.parse(localStorage.getItem(localStorageKey));
      } catch (e) {
        localStorage.removeItem(localStorageKey);
      }
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      Promise.all([
        import(/* webpackChunkName: "data-planets"*/ '../../../generateGameData/data/planets'),
        import(/* webpackChunkName: "data-planet_levels"*/ '../../../generateGameData/data/planet_levels'),
        import(/* webpackChunkName: "data-spacebuildings"*/ '../../../generateGameData/data/spacebuildings'),
      ])
          .then(([planets, planetLevels, spacebuildings]) => {
            this.data.planets = planets.data.yellowstarTable;
            this.data.levels = planetLevels.data;
            this.data.tradingStations = spacebuildings.data.TradingStation;
          })
          .then(this.generateInputTable)
          .then(this.updateOutput)
          .then(() => this.allDataLoaded = true)
          .catch(console.error);
    },
    createCells() {
      keys.forEach((key) => {
        const result = {};
        rows.forEach((e) => (result[e] = 0));

        this.$set(this.output.calculated, key, result);
      });
      keysTotal.forEach((key) => {
        this.$set(this.output.total, key, 0);
      });
    },
    generateInputTable() {
      const obj = {
        Name: this.data.planets.Name,
        MaxUpgradeLevel: this.data.planets.MaxUpgradeLevel,

        TID: this.data.planets.TID,
        maxLevel: this.data.planets.maxLevel,
      };

      // добавить торги
      for (let i = 0; this.data.tradingStations.MaxOnOwnSolarSystem > i; i++) {
        obj.Name.push(this.data.tradingStations.Name + '_' + i);
        obj.MaxUpgradeLevel.push(this.data.tradingStations.maxLevel);

        obj.TID.push(this.data.tradingStations.TID);
        obj.maxLevel++;
      }

      this.input.keys = obj.Name;
      this.input.maxUpgradeLevel = obj.MaxUpgradeLevel;

      this.input.static.head.push('TID');
      this.input.static.body.push(obj.TID);
      this.input.static.maxLevel = obj.maxLevel;
    },
    getFormatKey(...args) {
      const $t = (key) => this.$t.call(this, key);
      return formatKey($t, this.objName, ...args);
    },
    getFormatValue(...args) {
      const $t = (key) => this.$t.call(this, key);
      const $te = (key) => this.$te.call(this, key);
      return formatValue($t, $te, null, ...args);
    },
    isSelected(type, keyIndex, value) {
      const key = this.input.keys[keyIndex];
      let current = this.storage.plan[key] || 0;
      const min = this.storage.actually[key];

      if (min > current) {
        current = this.changeLvl('plan', key, min);
      }
      if (type == 'plan') {
        return (value == current);
      }
      return (this.storage[type][key] == value);
    },
    isDisabled(type, keyIndex, value) {
      const key = this.input.keys[keyIndex];

      if (type != 'plan') return;
      if (!this.storage.actually) return;
      return (value < this.storage.actually[key]);
    },
    reset(event) {
      if (event.target.name == 'all') {
        const msg = confirm('Reset all? Ar u serious ?');
        if (msg) {
          this.storage = {actually: {}, plan: {}};
        } else {
          return;
        }
      } else {
        if (this.storage.plan) {
          Object.keys(this.storage.plan).forEach((key) => {
            this.storage.plan[key] = this.storage.actually[key];
          });
        } else {
          this.storage.plan = {};
        }
      }
      this.updateOutput();
      // location.reload();
    },
    changeLvl(type, key, value) {
      value = parseInt(value);

      this.$set(this.storage[type], key, parseInt(value));
      this.updateOutput();
      return value;
    },
    updateStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.storage));
    },
    updateOutput() {
      const result = this.output.calculated;
      const resultTotal = this.output.total;
      const items = this.input.keys;

      const planets = this.data.planets;
      const levels = this.data.levels;
      const tradingStations = this.data.tradingStations;

      this.createCells(); // вайпнуть значения
      this.updateStorage(); // синхронизировать хранилище

      Object.keys(this.storage).forEach((key) => {
        if (!Object.keys(this.storage[key]).length) return;

        updateCol(key, this.storage[key]);
      });

      Object.keys(result).forEach((key) => { // вычислить прирост плана
        result[key].plan = (result[key].plan - result[key].actually);
      });
      updateCol('result', this.storage.plan);
      calculateTotal(this.storage);

      function updateCol(mode, obj) {
        Object.keys(obj).forEach((item) => {
          const itemLvl = obj[item] - 1;
          const itemIndex = items.indexOf(item);

          if (!obj[item]) return;
          Object.keys(result).forEach((key, index) => {
            let num1;
            let num2;

            if (mode == 'result') { // обновить результат
              num1 = result[key].plan;
              num2 = result[key].actually;
            } else {
              num1 = result[key][mode] || 0;
              if (keysModifiers[index]) {
                num2 = (levels[key][itemLvl] * planets[keysModifiers[index]][itemIndex]) / 100;

                if (item.includes('TradingStation')) {
                  num2 = 0;
                  if (key in keysAliasesTS) {
                    num2 = tradingStations[keysAliasesTS[key]][itemLvl];
                  }
                }
              } else {
                num2 = levels[key][itemLvl];
              }
            }
            result[key][mode] = num1 + num2;
          });
        });
      }
      function calculateTotal(obj) {
        Object.keys(obj.plan).forEach((item) => {
          if (obj.plan[item] == 0) return;
          Object.keys(resultTotal).forEach((key) => {
            let num1 = 0;
            let num2 = 0;
            const PlanIndexLvl = obj.plan[item] - 1;
            const ActuallyIndexLvl = (obj.actually[item] || 0) - 1;

            num1 = (resultTotal[key] == undefined) ? 0 : resultTotal[key];
            for (let level = ActuallyIndexLvl; PlanIndexLvl > level; level++) {
              let data = levels[key][level + 1] || 0;

              if (item.includes('TradingStation') && key in keysAliasesTS) {
                data = tradingStations[keysAliasesTS[key]][level + 1] || 0;
              }
              num2 = num2 + data;
            }
            resultTotal[key] = num1 + num2;
          });
        });
      }
    },
    outputClassesTable(type, key) {
      if (type == 'plan') {
        return {
          'plan-plus': this.output.calculated[key].plan,
          'hide': this.output.calculated[key].plan == 0,
        };
      }
      if (type == 'result') {
        const isGrowth = (this.output.calculated[key].actually < this.output.calculated[key].result);
        const isHide = !this.output.total[Object.keys(this.output.total)[0]];
        return {
          'result-growth': isGrowth,
          'result-not-growth': !isGrowth,
          'hide': isHide,
        };
      }
    },
  },
};
</script>

<style scoped>
.planetsCalc {
  border: 1px solid #424547;
  border-spacing: 0;
  color: #aab2b6;

  width: 90%;
  max-width: 450px;
  margin: 15px auto;
}
.planetsCalc >>> td {
  padding: 8px 10px 8px;
  line-height: 16px;
  text-align: center;
  font-size: 75%;
  border: none;
}
.planetsCalc td:first-child {
  text-align: left;
}
.planetsCalc tr.total {
  background-color: rgba(9, 12, 12, 0.99);
  font-weight: bold;
}

.hide {
  visibility: collapse;
}
.plan-plus {
  color: #fff19f;
  white-space: nowrap;
}
.plan-plus:before {
  content: "+";
}
.result-growth {
  color: #1e7e34;
}
.result-not-growth{
  opacity: 0.5;
}
.btns-warp {
  display: flex;
}
.btns-reset {
  margin-left: auto;
  padding-right: 3%;
}
.btns-reset button {
  color: #fff;
  cursor: pointer;
  background-color: Transparent;
  position: relative;
  border: 1px solid #f7ca18;
  transition: all 0.4s cubic-bezier(0.42, 0, 0.58, 1);
  padding: 10px 10px;
  margin-left: 5px;
}
.btns-reset button:hover {
  color: #000;
  background-color: transparent;
}
.btns-reset button:hover:before {
  left: 0;
  right: auto;
  width: 100%;
}
.btns-reset button:before {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 0;
  z-index: -1;
  content: "";
  background: #f7ca18;
  transition: all 0.4s cubic-bezier(0.42, 0, 0.58, 1);
}
.resetButtonAll {
  border: 1px solid #c90000 !important;
}
.resetButtonAll:before {
  background: #c90000 !important;
}
</style>
