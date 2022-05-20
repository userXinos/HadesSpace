<template>
  <div class="wrap">
    <div class="container">

      <calculator
        v-model:input="input"
        :update-output="logicUpdateOutput"
        local-storage-key="planetsCalc"
        :output="output"
        title-key="PLANETS_CALC"
        @setup="setupCalculator"
      />

      <v-data
        :data="{TID: 'INPUT_VALUES', Name: 'Input', TID2: Object.values(planets).map((e) => e.TID)}"
        :table-opts="{lvlColKey: '№', mergeCells: false}"
      >

        <template #table-head>
          <th v-t="'CURRENT_LVL'" />
          <th v-t="'PLAN_LVL'" />
        </template>

        <template #table-body="{ row }">
          <td
            v-for="type in Object.keys(input)"
            :key="type"
          >
            <select
              class="select"
              @change="calc.onChangeLvl(type, planetValues[row].Name, $event.target.value)"
            >
              <option
                v-for="(i, index) in (Object.values(planets)[row].MaxUpgradeLevel + 1)"
                :key="type + i"
                :selected="calc.isSelected(type, planetValues[row].Name, index)"
                :disabled="calc.isDisabled(type, planetValues[row].Name, index)"
              >{{ index }}
              </option>
            </select>
          </td>
        </template>

      </v-data>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import levels from '@Data/planet_levels.js';
import planetsData from '@Data/planets.js';
import spaceBuildings from '@Data/spacebuildings.js';

import Calculator, { Setup } from '@/components/Calculator.vue';
import VData from '@/components/Data.vue';

import calculator, { Input, Element, getElementsCB, ElementsStore, Output } from '../composables/calculator';
import key from '@Handlers/key.js';
import value from '@Handlers/value.js';
import objectArrayify from '@/js/objectArrayify';
import filterByType from '@Scripts/filterByType';

const CHARS_MODIFIERS: Record<string, string> = {
    CreditStorage: 'CreditStorageModifier',
    FuelStorage: 'FuelStorageModifier',
    CreditsPerHour: 'CreditIncomeModifier',
    FuelPerHour: 'FuelIncomeModifier',
    ShipmentsCRValuePerDay: 'CreditShipmentModifier',
};
const KEYS_ALIASES_TS: Record<string, string> = {
    TotalShipmentCRPerDay: 'ShipmentsCRValuePerDay',
    Cost: 'Cost',
    ConstructionTime: 'TimeToUpgrade',
};
const STACK_CHARS = ['Cost', 'TimeToUpgrade'];
const TOTAL_KEYS = Object.keys(levels)
    .filter((k) => ![...STACK_CHARS, 'CrystalsWeight', 'Name', 'ShipmentsHydroValuePerDay'].includes(k));

export default defineComponent({
    components: { Calculator, VData },
    setup() {
        const { output, update, provideGetterElements } = calculator(STACK_CHARS, calcTotal);

        return {
            output,
            logicUpdateOutput: update,
            planets: provideGetterElements(getPlanets) as object,
        };
    },
    data() {
        return {
            input: { actually: {}, plan: {} } as Input,
            calc: {} as Setup,

            format: {
                key: (k: string) => key(k, this.$route.name),
                value: (k: string, v: unknown) => value(k, v, null),
            },
        };
    },
    computed: {
        planetValues(): unknown[] {
            return Object.values(this.planets);
        },
    },
    methods: {
        setupCalculator(v: Setup) {
            this.calc = v;
        },
    },
});

function getPlanets(...[getChars, elements]: Parameters<getElementsCB>) {
    type TS = {
        Name: string,
        MaxUpgradeLevel: number,
        Cost: number[],
        MaxOnOwnSolarSystem: number
    }

    const planets = objectArrayify(filterByType(planetsData, 'planets.yellowstar'), {
        map: ([name, planet]: [string, Element]) => {
            elements[name] = objectArrayify(levels, {
                filter: ([, v]: [string, unknown]) => Array.isArray(v),
                map: ([k, v]: [string, number[]]) => [
                    k, v.map((e) => e * ((k in CHARS_MODIFIERS) ? planet[CHARS_MODIFIERS[k]] as number : 1)),
                ],
            }) as Element;

            return [name, planet];
        },
    }) as {[k: string]: unknown};
    const TradingStation = objectArrayify(spaceBuildings.TradingStation, {
        map: ([k, v]: [string, unknown]) => [(k in KEYS_ALIASES_TS) ? KEYS_ALIASES_TS[k] : k, v],
    }) as TS;
    TradingStation.MaxUpgradeLevel = TradingStation.Cost.length;

    for (let i = 0; TradingStation.MaxOnOwnSolarSystem > i; i++) {
        const name = `${TradingStation.Name}_${i}`;

        planets[name] = TradingStation;
        elements[name] = getChars(TradingStation, TradingStation.MaxUpgradeLevel);
    }

    return planets;
}
function calcTotal(store: ElementsStore, output: Output) {
    for (const k of TOTAL_KEYS) {
        output.total.intermediate[k] = {
            actually: 0,
            plan: 0,
            sum: 0,
        };
    }

    return function(name: string) {
        for (const k of TOTAL_KEYS) {
            output.total.intermediate[k].actually += (output.actually[name]?.[k] as number) / 100 || 0;
            output.total.intermediate[k].plan += (output.plan[name]?.[k] as number) / 100 || 0;
            output.total.intermediate[k].sum = output.total.intermediate[k].actually + output.total.intermediate[k].plan;
        }
    };
}
</script>

<style scoped lang="scss">
@use "sass:map";

@import "../style/page";
@import "../style/vars";

.wrap {
    display: flex;
    justify-content: center;
    margin: 0 2%;
}
.container {
    width: 100%;
    max-width: 1000px;
}

.select {
    font-size: 140%;
    background-color: map.get($table, "background");
    border-color: map.get($table, "background");

    option:disabled {
        color: #0e1315;
    }
}

</style>
