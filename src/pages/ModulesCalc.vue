<!--suppress TypeScriptUnresolvedReference -->
<template>
  <div>
    <div class="container">

      <Calculator
        v-model:input="input"
        :stack-chars="STACK_CHARS"
        :calc-total="calcTotal"
        local-storage-key="modulesCalc"
        title-key="MODULES_CALC"
        @setup="setupCalculator"
      />

      <div class="comp-btn">
        <button
          v-if="compData"
          class="button accent"
          @click="openCompModal = true"
        >{{ $t('HS_COMPENDIUM') }}</button>
      </div>

      <div class="tech-list-wrap">
        <TechList
          :on-click="openModuleInfo"
          :level-map="input.actually"
          :level-map-alt="input.plan"
          :is-muted="(k: string) => !input.plan[k]"
        />
      </div>

    </div>

    <Modal
      v-model:open="openModal"
      v-bind="modalOpts"
    >
      <template #body>
        <div class="modal-module">
          <div class="title">
            <div>
              <h2>{{ $t(modalOpts.data.module.TID) }}</h2>

              <div class="reset-buttons">
                <button
                  name="plan"
                  class="button yellow"
                  @click="onReset"
                >
                  {{ $t('RESET_PLAN') }}
                </button>
                <button
                  name="all"
                  class="button red"
                  @click="onReset"
                >
                  {{ $t('RESET_ALL') }}
                </button>
              </div>

            </div>
            <Icon
              :name="modalOpts.data.module.Icon"
              dir="game/Modules"
            />
          </div>

          <ul class="chars">
            <li
              v-for="type in (Object.keys(input) as Array<keyof Input>)"
              :key="type"
              class="input"
            >
              <span v-t="INPUT_LOC_KEYS[type]" />
              <div class="level-picker">
                <NumberPicker
                  :value="input[type][modalOpts.data.key] || 0"
                  :min="modalOpts.data.minLevel"
                  :max="modalOpts.data.maxLevel"
                  @update:value="(v: number) => onChangeLvl(type, v)"
                />
              </div>
            </li>

            <li><br></li>
            <li
              v-for="key in Object.keys(calc.output.plan[modalOpts.data.key] || {})"
              :key="key"
              :class="{'output': true, 'sub-chars': typeof calc.output.plan?.[modalOpts.data.key]?.[key] == 'object'}"
            >
              <b>{{ calc.format.key(key) }}</b>
              <div>
                <span
                  v-for="type of (Object.keys(input) as Array<keyof typeof Input>)"
                  :key="type"
                  :class="{
                    ...outputClasses(type, key),
                    [statsStyleName(key)]: true,
                    'stats-style': (type == 'actually') ? !outputClasses(type, key).none : false
                  }"
                >

                  <template v-if="typeof calc.output[type]?.[modalOpts.data.key]?.[key] === 'object'">
                    <ul>
                      <li
                        v-for="k1 in Object.keys(calc.output[type][modalOpts.data.key][key] || {})"
                        :key="k1"
                        class="output"
                      >
                        <b>{{ calc.format.key(k1) }}</b>
                        <div>
                          <span
                            v-for="type1 of (Object.keys(input) as Array<keyof Input>)"
                            :key="type1"
                            :class="outputClasses(type1, k1)"
                          >
                            {{ calc.format.value(k1, calc.output[type1]?.[modalOpts.data.key]?.[key]?.[k1]) }}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </template>

                  <template v-else>
                    {{ calc.format.value(key, calc.output[type]?.[modalOpts.data.key]?.[key]) }}
                  </template>

                </span>
              </div>
            </li>
          </ul>
        </div>
      </template>
    </Modal>

    <Modal
      v-model:open="openCompModal"
      :size="SIZES.SMALL"
      :title="$t('HS_COMPENDIUM')"
    >
      <template #body>
        <div class="select">
          <p
            v-t="'SYNC'"
            class="name"
          />
          <select
            :value="$store.state.userSettings.compendiumTechSyncConfigIndex"
            @change="$store.commit(userSettingsTypes.SET_COMPENDIUM_TECH_SYNC_CONFIG_INDEX, parseInt($event.target.value))"
          >
            <option
              v-for="(v, index) in calc.Config.configs"
              :key="index"
              :value="index"
            >
              {{ v.name }}
            </option>
          </select>
        </div>
      </template>
    </Modal>
  </div>
</template>

<!--suppress TypeScriptCheckImport -->
<script setup lang="ts">
import { ref, Ref, reactive, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';

import Icon from '@/components/Icon.vue';
import Modal, { SIZES } from '@/components/Modal.vue';
import Calculator from '@/components/Calculator.vue';

import { init as compInit } from '@Utils/compendium';
import TechList from '@/components/TechList.vue';
import NumberPicker from '@/components/NumberPicker.vue';
import compendiumTechList from '@/composables/compendiumTechList';

import type { SetupComponent, SetupGetElementsCB, Input, Output, OutputValue, OutputMap, ElementsStore } from '@/typings/calculator';
import { getBySlotType } from '../components/ModulePage.vue';
import statsStyleName from '../utils/Handlers/statsStyleName';
import byTypes from '@Regulation/byTypes.js';
import objectArrayify from '@Utils/objectArrayify';
import userSettingsTypes from '@/store/modules/userSettings/types';
import { getTechIndex } from 'bot_client';

import globals from '@Data/globals.js';
import modulesData from '@Data/modules.js';

const STACK_CHARS = ['UnlockPrice', 'UnlockTime'];
const INPUT_LOC_KEYS = {
    actually: 'CURRENT_LVL',
    plan: 'PLAN_LVL',
};

const store = useStore();
const { t } = useI18n();
const { data: compData, levelMap: compLevelMap, setTechLevel: compSetTechLevel } = compendiumTechList();

const { MaxModuleLevel } = globals;
const maxLvl: Record<string, number> = objectArrayify(modulesData, {
    map: ([k]) => [k, MaxModuleLevel],
});
const minLvl: Record<string, number> = objectArrayify(modulesData, {
    map: (([k, v]) => [k, getModulesMinLvl(v as object)]),
});

const modules: Ref<{[k: string]: unknown}> = ref({});
const input: Ref<Input> = ref({ actually: {}, plan: {} });
const openModal = ref(false);
const openCompModal = ref(false);
const modalOpts = reactive({
    size: SIZES.SMALL,
    title: t('TID_TECH_DLG_TITLE'),
    data: {
        module: {},
        minLevel: 0,
        maxLevel: 0,
        get key() {
            return this.module.Name;
        },
    },
});
let calc: SetupComponent;

onMounted(async () => {
    await compInit();
});
watch([compLevelMap, () => store.state.userSettings.compendiumTechSyncConfigIndex], ([value]) => {
    if (store.state.userSettings.compendiumTechSyncConfigIndex == calc.Config.selected) {
        input.value.actually = { ...value };
        input.value.plan = { ...value, ...input.value.plan };
    }
});

function setupCalculator(v: SetupComponent) {
    calc = v;
    for (const type of byTypes.artifact) {
        modules.value[type] = v.provideGetterElements((...p) => getModulesBySlotType.apply(null, [type, ...p]));
    }
}
function onChangeLvl(type: keyof Input, value: number) {
    if (store.state.userSettings.compendiumTechSyncConfigIndex == calc.Config.selected && type == 'actually') {
        const i = getTechIndex(modalOpts.data.key);
        compSetTechLevel(i, value);
    }
    return calc.onChangeLvl(type, modalOpts.data.key, value);
}
async function onReset(event: Event): Promise<void> {
    if (openModal.value) {
        if ((event.target as HTMLButtonElement).name == 'all') {
            onChangeLvl('actually', 0);
            onChangeLvl('plan', 0);
        } else {
            onChangeLvl('plan', 0);
        }
    }
}
function outputClasses(type: keyof Output, charName?: string): object {
    return calc.outputClasses(type, modalOpts.data.key, charName);
}
function openModuleInfo(value: Record<string, string>) {
    modalOpts.data.module = value;
    modalOpts.data.maxLevel = maxLvl[value.Name];
    modalOpts.data.minLevel = minLvl[value.Name];
    openModal.value = true;
}
function calcTotal(store: ElementsStore, output: Output) {
    const val = output.total;
    val.result['ReqBank'] = 0;

    return function(name: string, input: Input) {
        const UnlockPrices = store[name].UnlockPrice;
        const UnlockPrice = (Array.isArray(UnlockPrices)) ? UnlockPrices[input.plan[name] - 1] : UnlockPrices as number;

        val.result.ReqBank = (UnlockPrice > val.result.ReqBank) ? UnlockPrice : val.result.ReqBank;
    };
}
function getModulesBySlotType(type: string, ...[TIDs, getChars, elements]: Parameters<SetupGetElementsCB>) {
    const modules = getBySlotType(type) as OutputMap;

    return Object.entries(modules).map(([name, module]) => {
        let maxLevel = 1;

        for (const [, value] of Object.entries(module)) {
            if (Array.isArray(value) && value.length > maxLevel) {
                maxLevel = value.length;
            }
        }

        elements[name] = getChars((modules as {[k: string]: object})[name] as OutputValue, maxLevel);
        TIDs[name] = module.TID;

        return [module, maxLevel];
    });
}
function getModulesMinLvl(module: object): number {
    let maxLength = 1;

    for (const [, value] of Object.entries(module)) {
        if (Array.isArray(value) && value.length > maxLength) {
            maxLength = value.length;
        }
    }
    return MaxModuleLevel - maxLength + 1;
}
</script>

<style scoped lang="scss">
@use "sass:map";

@import "../style/page";
@import "../style/vars";
@import "../style/calculator";
@import "../style/userInput";

$actually-color: #92cee5;
$plan-color: #ded45a;

.container {
    margin: 0 10%;

    @media screen and (max-width: 960px){
        margin: 0 4%;
    }

    .comp-btn {
        margin: 10px 0;
        display: flex;
        justify-content: end;
    }

    .tech-list-wrap {
        :deep(.other) {
            display: none;
        }
    }
}

.modal-module {
    min-height: 500px;

    .title {
        display: flex;
        justify-content: space-between;
        margin-bottom: 6%;

        > div:first-child {
            flex: 3;
        }
        > div:last-child {
            width: 25%;
            flex: 1;
            margin-left: 5%;
        }

        .reset-buttons {
            padding-top: 5%;
            justify-content: start;

            button {
                padding: 7px;
                font-size: 90%;

                @media screen and (max-width: 960px){
                    font-size: 70%;
                }
            }
        }
    }

    .chars li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2%;

        &.input {
            display: flex;
            align-items: center;
            flex-direction: column;
            padding-bottom: 5%;
            font-size: 120%;

            .level-picker {
                width:60%;
                padding-top: 2%;
                margin: 0 auto;
            }
        }
        &.output {
            font-size: 100%;

            @media screen and (max-width: 960px){
                font-size: 80%;
            }

            span.actually:not(.none) {
                color: $border-color;
            }
            span.stats-style {
                display: inline-flex;
            }
        }
        &.sub-chars {
            margin-top: 4%;
            flex-direction: column;

            > div {
                margin-top: 2%;

                > span:first-child {
                    display: none;
                }
                > span:last-child {
                    display: block;
                }
            }
        }
    }
}
</style>
