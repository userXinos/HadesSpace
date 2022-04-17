<template>
  <div>
    <Head><title>{{ title }}</title></Head>
    <h1 class="topic"> {{ title }} </h1>

    <table class="planetsCalc">
      <tr
        v-for="(value, key) of output.calculated"
        :key="key"
      >
        <td>{{ formatKey(key) }}</td>
        <td
          v-for="(item, itemKey) of value"
          :key="key + itemKey"
          :class="outputClassesTable(itemKey, key)"
        >
          {{ item.toLocaleString() }}
        </td>
      </tr>
      <tr
        v-for="(value, key) of output.total"
        :key="key"
        class="total"
      >
        <td>{{ formatKey(key) }}</td>
        <td colspan="3">
          {{ formatValue(key, value) }}
        </td>
      </tr>
    </table>

    <div class="btn-warp">
      <div class="btn-reset">
        <button
          name="plan"
          @click="reset"
        >
          {{ $t("RESET_PLAN") }}
        </button>
        <button
          class="btn-reset-all"
          name="all"
          @click="reset"
        >
          {{ $t("RESET_ALL") }}
        </button>
      </div>
    </div>


    <v-data
      :data="{TID: '', TID2: planets.TID}"
      :table-opts="{lvlColKey: '№'}"
    >

      <template #table-head>
        <th v-t="'LVL'" /> <th v-t="'PLAN'" />
      </template>

      <template #table-body="{ row }">
        <td
          v-for="type in ['actually', 'plan']"
          :key="type"
        >
          <select
            class="select"
            @change="changeLvl(type, planets.Name[row], $event.target.value)"
          >
            <option
              v-for="(i, index) in (planets.MaxUpgradeLevel[row] + 1)"
              :key="type + i"
              :selected="isSelected(type, row, index)"
              :disabled="isDisabled(type, row, index)"
            >{{ index }}</option>
          </select>
        </td>
      </template>

    </v-data>

  </div>
</template>

<script>
import { Head } from '@vueuse/head';
import VData from '@/components/Data.vue';

import planetsData from '@Data/planets.js';
import levels from '@Data/planet_levels.js';
import spaceBuildings from '@Data/spacebuildings.js';

import key from '@Handlers/key.js';
import value from '@Handlers/value.js';
import compileOne from '@Scripts/compileOne.js';

const { TradingStation } = spaceBuildings;
const planetsYS = compileOne(planetsData, { filterByType: { path: 'planets.yellowstar' } });

const planets = {
    TID: planetsYS.TID,
    Name: planetsYS.Name,
    MaxUpgradeLevel: planetsYS.MaxUpgradeLevel,
};

const LOCAL_STORAGE_KEY = 'planetsCalc';
const KEYS = ['CreditStorage', 'FuelStorage', 'CreditsPerHour', 'FuelPerHour', 'ShipmentsCRValuePerDay'];
const KEYS_MODIFIERS = ['CreditStorageModifier', 'FuelStorageModifier', 'CreditIncomeModifier', 'FuelIncomeModifier', 'CreditShipmentModifier'];
const KEYS_TOTAL = ['Cost', 'TimeToUpgrade'];
const ROWS = ['actually', 'plan', 'result'];
const KEYS_ALIASES_TS = {
    ShipmentsCRValuePerDay: 'TotalShipmentCRPerDay',
    Cost: 'Cost',
    TimeToUpgrade: 'ConstructionTime',
};


// добавить торги к таблице
for (let i = 0; TradingStation.MaxOnOwnSolarSystem > i; i++) {
    planets.Name.push(`${TradingStation.Name }_${i}`);
    planets.MaxUpgradeLevel.push(TradingStation.Cost.length);
    planets.TID.push(TradingStation.TID);
}

export default {
    components: { Head, VData },
    data() {
        return {
            title: this.$t('PLANETS_CALC'),
            planets,
            output: {
                calculated: {},
                total: {},
            },
            storage: { actually: {}, plan: {} },
        };
    },
    created() {
        if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
            try {
                this.storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
            } catch (e) {
                localStorage.removeItem(LOCAL_STORAGE_KEY);
            }
        }
        this.formatOpts = {
            $t: this.$t.bind(this),
            $te: this.$te.bind(this),
        };
    },
    mounted() {
        this.updateOutput();
    },
    methods: {
        createCells() {
            KEYS.forEach((key) => {
                const result = {};
                ROWS.forEach((e) => (result[e] = 0));

                this.output.calculated[key] = result;
            });
            KEYS_TOTAL.forEach((key) => {
                this.output.total[key] = 0;
            });
        },
        formatKey(k) {
            return key(k, this.formatOpts);
        },
        formatValue(k, v) {
            return value(k, v, planetsYS.Name, this.formatOpts);
        },
        isSelected(type, keyIndex, value) {
            const key = planets.Name[keyIndex];
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
            const key = planets.Name[keyIndex];

            if (type != 'plan') return;
            if (!this.storage.actually) return;
            return (value < this.storage.actually[key]);
        },
        reset(event) {
            if (event.target.name == 'all') {
                const msg = confirm('Reset all? Ar u serious ?');
                if (msg) {
                    this.storage = { actually: {}, plan: {} };
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
        },
        changeLvl(type, key, value) {
            value = parseInt(value);

            this.storage[type][key] = value;
            this.updateOutput();
            return value;
        },
        updateStorage() {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.storage));
        },
        updateOutput() {
            const result = this.output.calculated;
            const resultTotal = this.output.total;

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
                    const itemIndex = planets.Name.indexOf(item);

                    if (!obj[item]) return;
                    Object.keys(result).forEach((key, index) => {
                        let num1;
                        let num2;

                        if (mode == 'result') { // обновить результат
                            num1 = result[key].plan;
                            num2 = result[key].actually;
                        } else {
                            num1 = result[key][mode] || 0;
                            if (KEYS_MODIFIERS[index]) {
                                num2 = (levels[key][itemLvl] * planetsYS[KEYS_MODIFIERS[index]][itemIndex]) / 100;

                                if (item.includes('TradingStation')) {
                                    num2 = 0;
                                    if (key in KEYS_ALIASES_TS) {
                                        num2 = TradingStation[KEYS_ALIASES_TS[key]][itemLvl];
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
                        const PlanIndexLvl = obj.plan[item] - 1;
                        const ActuallyIndexLvl = (obj.actually[item] || 0) - 1;
                        const num1 = (resultTotal[key] == undefined) ? 0 : resultTotal[key];
                        let num2 = 0;

                        for (let level = ActuallyIndexLvl; PlanIndexLvl > level; level++) {
                            let data = levels[key][level + 1] || 0;

                            if (item.includes('TradingStation') && key in KEYS_ALIASES_TS) {
                                data = TradingStation[KEYS_ALIASES_TS[key]][level + 1] || 0;
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

<style scoped lang="scss">
@use "sass:map";

@import "../css/page.css";
@import "../css/vars";

.select {
    background-color: map.get($table, "background");
    border-color: map.get($table, "background");
}
.planetsCalc {
  border: 1px solid #424547;
  border-spacing: 0;
  color: #aab2b6;

  width: 90%;
  max-width: 450px;
  margin: 15px auto;

    td {
        padding: 8px 10px 8px;
        line-height: 16px;
        text-align: center;
        font-size: 80%;
    }
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
.btn-warp {
  display: flex;
}
.btn-reset {
  margin-left: auto;
  padding-right: 3%;
}
.btn-reset button {
  color: #fff;
  cursor: pointer;
  background-color: Transparent;
  position: relative;
  border: 1px solid #f7ca18;
  transition: all 0.4s cubic-bezier(0.42, 0, 0.58, 1);
  padding: 10px 10px;
  margin-left: 5px;
}
.btn-reset button:hover {
  color: #000;
  background-color: transparent;
}
.btn-reset button:hover:before {
  left: 0;
  right: auto;
  width: 100%;
}
.btn-reset button:before {
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
.btn-reset-all {
  border: 1px solid #c90000 !important;
}
.btn-reset-all:before {
  background: #c90000 !important;
}
</style>
