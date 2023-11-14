<template>
  <div class="wrap">
    <div class="container">

      <calculator
        v-model:input="input"
        :stack-chars="STACK_CHARS"
        :calc-total="calcTotal"
        local-storage-key="planetsCalc"
        title-key="PLANETS_CALC"
        @setup="setupCalculator"
      />

      <div class="switch">
        <div>
          <p
            v-t="'TID_STARTER_PACK_2'"
            class="name"
          />
          <p />
        </div>
        <input
          id="compact-mode"
          class="checkbox"
          type="checkbox"
          :checked="$store.state.userSettings.planetsCalcSp2"
          @change="$store.commit(types.SWITCH_PLANETS_CALC_SP2)"
        >
        <label
          for="compact-mode"
          class="label"
        />
      </div>

      <!--suppress JSUnresolvedReference -->
      <!--  WS moment: Unresolved variable or type planetValues-->
      <v-data
        :data="{TID: 'INPUT_VALUES', Name: 'Input', TID2: planetValues.map((e) => e.TID)}"
        :table-opts="{lvlColKey: '№', mergeCells: false}"
      >

        <template #table-head>
          <th v-t="'CURRENT_LVL'" />
          <th v-t="'PLAN_LVL'" />
          <th />
        </template>

        <template #table-body="{ row }">
          <td
            v-for="(_, type) in input"
            :key="type"
          >
            <select
              class="select"
              @change="calc.onChangeLvl(type, planetValues[row].Name, $event.target.value)"
            >
              <option
                v-for="(i, index) in (planetValues[row].MaxUpgradeLevel + 1)"
                :key="type + i"
                :selected="calc.isSelected(type, planetValues[row].Name, index as number)"
                :disabled="calc.isDisabled(type, planetValues[row].Name, index as number)"
              >{{ index }}
              </option>
            </select>
          </td>
          <td>
            <div @click="() => openModuleInfo(planetValues[row])">
              <img
                src="../img/icons/info.png"
                class="open-info"
                alt="info icon"
              >
            </div>
          </td>
        </template>

      </v-data>

    </div>

    <modal
      v-model:open="openModal"
      v-bind="modalOpts"
    >
      <template #body>
        <div class="modal-module">
          <ul class="chars">
            <li class="output">
              <b>{{ $t('TID_PLANET_LEVEL_DESCR') }}</b>
              <div>
                <span
                  v-for="(_, type) of input"
                  :key="type"
                  :class="outputClasses(type, null)"
                >
                  {{ input[type]?.[modalOpts.data.key] }}
                </span>
              </div>
            </li>
            <li
              v-for="key in Object.keys(calc.output.plan[modalOpts.data.key] || {}).filter(k => !HIDE_LVL_CHARS.includes(k))"
              :key="key"
              class="calc.output"
            >
              <b>{{ calc.format.key(key) }}</b>
              <div>
                <span
                  v-for="(_, type) of input"
                  :key="type"
                  :class="outputClasses(type, key)"
                >
                  {{ calc.format.value(key, Math.trunc(calc.output[type]?.[modalOpts.data.key]?.[key]) || undefined) }}
                </span>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </modal>
  </div>
</template>

<!--suppress TypeScriptCheckImport, TypeScriptUnresolvedReference -->
<script setup lang="ts">
import { ref, computed, Ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';
import Store from '@Store/index';
import types from '../store/modules/userSettings/types';

import levels from '@Data/planet_levels.js';
import planetsData from '@Data/planets.js';
import spaceBuildings from '@Data/spacebuildings.js';
import YSSectors from '@Data/yellow_star_sectors.js';
import globals from '@Data/globals.js';

import Calculator from '@/components/Calculator.vue';
import VData from '@/components/Data.vue';
import Modal, { SIZES } from '@/components/Modal.vue';

import type { SetupComponent, SetupGetElementsCB, Input, OutputValue, ElementsStore, Output } from '../typings/calculator';
import objectArrayify from '../utils/objectArrayify';
import getFilterByType from '../utils/getFilterByType';

const { SP2ShipmentsBoostPct } = globals;
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
const STACK_CHARS = ['XPAward', 'Cost', 'TimeToUpgrade', 'RSLevelReq'];
const HIDE_LVL_CHARS = ['CrystalsWeight', 'Name'];
const TOTAL_KEYS = Object.keys(levels)
    .filter((k) => ![...STACK_CHARS, ...HIDE_LVL_CHARS].includes(k));
const PLANET_MOONS = Object.values(YSSectors.NumMoons as (number|number[])[]).reduce((acc, NumMoons, currentIndex) => {
    if (NumMoons) {
        if (Array.isArray(NumMoons)) {
            NumMoons.forEach((NumMoons2, currentIndex2 ) => acc[YSSectors.PlanetTypes[currentIndex][currentIndex2]] = NumMoons2);
        } else {
            acc[YSSectors.PlanetTypes[currentIndex]] = NumMoons;
        }
    }
    return acc;
}, {}) as Record<string, number>;

const { t } = useI18n();
const planets = ref([]);
const input: Ref<Input> = ref({ actually: {}, plan: {} });
const openModal = ref(false);
const modalOpts = reactive({
    size: SIZES.SMALL,
    title: 'name',
    data: {
        planet: {},
        get key() {
            return this.planet.Name;
        },
    },
});
const planetValues = computed<OutputValue[]>(() => Object.values(planets.value));
let calc: SetupComponent;

Store.subscribe((mutation) => {
    if (mutation.type == types.SWITCH_PLANETS_CALC_SP2 && calc) {
        setupCalculator(calc);
        calc.forceReCalc();
    }
});

function setupCalculator(v: SetupComponent) {
    calc = v;
    planets.value = v.provideGetterElements(getPlanets as SetupGetElementsCB) as unknown[];
}
function openModuleInfo(planet: OutputValue) {
    modalOpts.title = t(planet.TID);
    modalOpts.data.planet = planet;
    openModal.value = true;
}
function outputClasses(type: keyof Output, charName?: string): object {
    return calc.outputClasses(type, modalOpts.data.key, charName);
}
function calcTotal(store: ElementsStore, output: Output) {
    let RSLevelReq = 0;
    for (const k of TOTAL_KEYS) {
        output.total.intermediate[k] = {
            actually: 0,
            plan: 0,
            sum: 0,
        };
    }

    return function(name: string, input: Input) {
        for (const k of TOTAL_KEYS) {
            output.total.intermediate[k].actually += output.actually[name]?.[k] as number || 0;
            output.total.intermediate[k].plan += output.plan[name]?.[k] as number || 0;
            output.total.intermediate[k].sum = output.total.intermediate[k].actually + output.total.intermediate[k].plan;
        }


        if (store[name].RSLevelReq) {
            const localeRSLevelReq = (store[name].RSLevelReq as number[])[input.plan[name]] || 0;
            RSLevelReq = output.total.result.RSLevelReq = (RSLevelReq < localeRSLevelReq) ? localeRSLevelReq : RSLevelReq;
        }
    };
}
function getPlanets(...[TIDs, getChars, elements]: Parameters<SetupGetElementsCB>): unknown[] {
    type TS = {
        Name: string,
        MaxUpgradeLevel?: number,
        MaxOnOwnSolarSystem: number
    }
    let tsMaxLvl = 0;
    const filteredLevels = objectArrayify(levels, {
        filter: ([, v]: [string, unknown]) => Array.isArray(v),
    });

    const planets = objectArrayify(planetsData, {
        ...getFilterByType('planets.yellowstar'),
        map: ([name, planet]: [string, OutputValue]) => {
            elements[name] = objectArrayify(filteredLevels, {
                map: ([k, v]: [string, number[]]) => {
                    const MaxUpgradeLevel = planet.MaxUpgradeLevel as number;
                    const sModifier = (Store.state.userSettings.planetsCalcSp2 && k == 'ShipmentsCRValuePerDay') ? SP2ShipmentsBoostPct / 100 : 0;
                    let res = v.map((e) => e * (k in CHARS_MODIFIERS ? (planet[CHARS_MODIFIERS[k]] as number) / 100 : 1 + sModifier));

                    if (k == 'ShipmentsCRValuePerDay' && planet.Name in PLANET_MOONS) {
                        res = v.map((e) => e * (planet[CHARS_MODIFIERS['ShipmentsCRValuePerDay']] / 100 + sModifier) * (PLANET_MOONS[planet.Name] + 1));
                    }
                    if (res.length < MaxUpgradeLevel) {
                        res.push(...Array.from({ length: MaxUpgradeLevel - res.length }, () => res[res.length - 1]));
                    }
                    return [k, res];
                },
            });

            TIDs[name] = planet.TID;

            return [name, planet];
        },
    });
    // noinspection TypeScriptUnresolvedReference
    const TradingStation = objectArrayify(spaceBuildings.TradingStation as TS, {
        map: ([k, v]: [string, unknown]) => {
            if (Array.isArray(v) && v.length > tsMaxLvl) {
                tsMaxLvl = v.length;
            }
            return [(k in KEYS_ALIASES_TS) ? KEYS_ALIASES_TS[k] : k, v];
        },
    });
    TradingStation.MaxUpgradeLevel = tsMaxLvl;

    for (let i = 0; TradingStation.MaxOnOwnSolarSystem > i; i++) {
        const ts = { ...TradingStation, Name: `${TradingStation.Name}_${i}` };

        planets[ts.Name] = ts;
        elements[ts.Name] = getChars(ts, tsMaxLvl);
    }

    return planets;
}
</script>

<style scoped lang="scss">
@use "sass:map";

@import "../style/vars";
@import "../style/calculator";
@import "../style/userInput";

.wrap {
    display: flex;
    justify-content: center;
    margin: 0 2%;

    .container {
        width: 100%;
        max-width: 1000px;
    }
}

.switch {
  margin-top: 1%;
  width: max-content;
  margin-left: auto;
}

.select {
    font-size: 140%;
    background-color: map.get($table, "background");
    border-color: map.get($table, "background");

    option:disabled {
        color: #0e1315;
    }
}
.open-info {
    width: 25px;
    cursor: pointer;
}
.modal-module {
    .chars li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2%;

        &.output {
            font-size: 100%;

            @media screen and (max-width: 960px){
                font-size: 80%;
            }
        }
    }
}

</style>
