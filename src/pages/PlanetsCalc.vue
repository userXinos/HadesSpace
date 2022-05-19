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
          {{ item.toLocaleString('ru-RU') }}
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

    <div class="margin-wrap">
      <div class="reset-buttons">
        <button
          name="plan"
          @click="onReset"
        >
          {{ $t('RESET_PLAN') }}
        </button>
        <button
          name="all"
          @click="onReset"
        >
          {{ $t('RESET_ALL') }}
        </button>
      </div>
    </div>


    <v-data
      :data="{TID: 'INPUT_VALUES', Name: 'Input', TID2: planets.TID}"
      :table-opts="{lvlColKey: '№', mergeCells: false}"
      :max-width="1000"
    >

      <template #table-head>
        <th v-t="'LVL'" /> <th v-t="'PLAN'" />
      </template>

      <template #table-body="{ row }">
        <td
          v-for="type in Object.keys(input)"
          :key="type"
        >
          <select
            class="select"
            @change="onChangeLvl(type, planets.Name[row], $event.target.value)"
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

<script lang="ts">
import { defineComponent } from 'vue';

import { Head } from '@vueuse/head';
import VData from '@/components/Data.vue';

import planetsCalcLogic, { Data, Input, InputKeys, ColNames, RowKeys } from '../composables/planetsCalcLogic';

import planetsData from '@Data/planets.js';
import spaceBuildings from '@Data/spacebuildings.js';

import key from '@Handlers/key.js';
import value from '@Handlers/value.js';
import compileOne from '@Scripts/compileOne.js';

const LOCAL_STORAGE_KEY = 'planetsCalc';

const { TradingStation } = spaceBuildings;
const planetsYS = compileOne(planetsData, { filterByType: { path: 'planets.yellowstar' } }) as Data;

const planets = {
    TID: planetsYS.TID as string[],
    Name: planetsYS.Name as string[],
    MaxUpgradeLevel: planetsYS.MaxUpgradeLevel as number[],
};


// добавить торги к таблице
for (let i = 0; TradingStation.MaxOnOwnSolarSystem > i; i++) {
    planets.Name.push(`${TradingStation.Name}_${i}`);
    planets.MaxUpgradeLevel.push(TradingStation.Cost.length);
    planets.TID.push(TradingStation.TID);
}

export default defineComponent({
    components: { Head, VData },
    setup() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const { output, update } = planetsCalcLogic(planetsYS as Data, TradingStation as any, planets.Name as string[]);

        return {
            output,
            logicUpdateOutput: update,
        };
    },
    data() {
        return {
            title: this.$t('PLANETS_CALC'),
            planets,
            input: { actually: {}, plan: {} } as Input,
            updateOutput: () => this.logicUpdateOutput(this.input),
        };
    },
    created() {
        if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
            this.input = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}');
        }
    },
    mounted() {
        this.updateOutput();
    },
    methods: {
        formatKey(k: string) {
            return key(k, this.$route.name);
        },
        formatValue(k: string, v: string|number) {
            return value(k, v, planetsYS.Name);
        },

        isSelected(type: InputKeys, keyIndex: number, value: number): boolean {
            const key = planets.Name[keyIndex];
            let current = this.input.plan[key] || 0;
            const min = this.input.actually[key];

            if (min > current) {
                current = this.onChangeLvl('plan', key, min);
            }
            if (type == 'plan') {
                return (value == current);
            }
            return (this.input[type][key] == value);
        },
        isDisabled(type: InputKeys, keyIndex: number, value: number): boolean {
            const key = planets.Name[keyIndex];

            if (type != 'plan' || !this.input.actually) {
                return false;
            }
            return (value < this.input.actually[key]);
        },
        onReset(event: Event): void {
            if ((event.target as HTMLButtonElement).name == 'all') {
                const msg = confirm('Reset all? Ar u serious ?');
                if (msg) {
                    this.input = { actually: {}, plan: {} } as Input;
                } else {
                    return;
                }
            } else {
                if (this.input.plan) {
                    for (const key of Object.keys(this.input.plan)) {
                        this.input.plan[key] = this.input.actually[key];
                    }
                } else {
                    this.input.plan = {};
                }
            }
            this.updateOutput();
            this.updateStorage();
        },
        onChangeLvl(type: InputKeys, key: string, value: string|number): number {
            value = (typeof value === 'string') ? parseInt(value) : value;

            this.input[type][key] = value;
            this.updateOutput();
            this.updateStorage();
            return value;
        },

        updateStorage(): void {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.input));
        },
        outputClassesTable(type: ColNames, key: RowKeys): object {
            if (type == 'plan') {
                return {
                    'plan-plus': this.output.calculated[key].plan,
                    'hide': this.output.calculated[key].plan == 0,
                };
            }
            if (type == 'result') {
                const isGrowth = (this.output.calculated[key].actually < this.output.calculated[key].result);
                const isHide = this.output.total.TimeToUpgrade == 0;
                return {
                    'result-growth': isGrowth,
                    'result-not-growth': !isGrowth,
                    'hide': isHide,
                };
            }
            return {};
        },
    },
});
</script>

<style scoped lang="scss">
@use "sass:map";

@import "../style/page";
@import "../style/vars";

$reset-button-colors: (
    "all": #a90000,
    "plan": #cca814,
);

.margin-wrap {
    margin: 0 3%;
}

table.planetsCalc {
    border: 1px solid #424547;
    border-spacing: 0;
    color: #aab2b6;

    width: 90%;
    max-width: 500px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 15px;

    td {
        padding: 8px 10px 8px;
        line-height: 16px;
        text-align: center;
        font-size: 90%;

        &:first-child {
            text-align: left;
            padding-right: 5%;
        }
    }

    .total {
        background-color: rgba(9, 12, 12, 0.99);
        font-weight: bold;
    }
    .hide {
        visibility: collapse;
    }
    .plan-plus {
        color: #fff19f;
        white-space: nowrap;

        &:before {
            content: "+";
        }
    }
    .result-growth {
        color: #1e7e34;
    }
    .result-not-growth{
        opacity: 0.5;
    }
}


.reset-buttons {
    display: flex;
    justify-content: end;
    gap: 10px;

    // source: https://codepen.io/alticreation/pen/zBZwOP

    button {
        padding: 10px;
        color: #fff;
        text-transform: uppercase;
        font-size: 100%;
        transition: all 0.3s;
        position: relative;
        border: none;
        z-index: 1;

        &:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -2;
        }

        &:before {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 100%;
            transition: all 0.3s;
            z-index: -1;
        }

        &:hover:before {
            width: 100%;
        }


        @each $name, $color in $reset-button-colors {
            &[name="#{$name}"] {
                &:after {
                    background-color: $color
                }

                &:before {
                    background-color: darken($color, 15%);
                }
            }
        }
    }
}

.select {
    background-color: map.get($table, "background");
    border-color: map.get($table, "background");

    option:disabled {
        color: #0e1315;
    }
}

</style>
