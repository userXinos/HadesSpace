<!--suppress TypeScriptUnresolvedReference -->
<template>
  <div>
    <div class="container">

      <calculator
        v-model:input="input"
        :stack-chars="STACK_CHARS"
        :calc-total="calcTotal"
        local-storage-key="modulesCalc"
        title-key="MODULES_CALC"
        @setup="setupCalculator"
      />

      <div class="sections-input">
        <section
          v-for="(type, typeName) of modules"
          :key="typeName"
          class="type"
        >
          <h3> {{ calc.format.key(typeName) }} </h3>
          <ul>
            <li
              v-for="([module, maxLevel]) of type"
              :key="module.Name"
              class="module"
            >
              <div
                :class="{'mute': !input.plan[module.Name]}"
                @click="() => openModuleInfo(module, maxLevel)"
              >
                <Icon
                  :name="module.Icon"
                  dir="game/Modules"
                />
                <div class="levels">
                  <span>
                    {{ input.actually[module.Name] ? input.actually[module.Name] : '' }}
                  </span>
                  <span>
                    {{ (input.plan[module.Name] && input.plan[module.Name] != input.actually[module.Name])? input.plan[module.Name] : '' }}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <modal
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
              <span v-t="inputLocKeys[type]" />
              <select
                class="select-lvl"
                @change="onChangeLvl(type, $event.target.value)"
              >
                <option
                  v-for="(lvl, index) in modalOpts.data.maxLevel + 1"
                  :key="lvl"
                  :selected="isSelected(type, index)"
                  :disabled="isDisabled(type, index)"
                > {{ index }} </option>
              </select>
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
    </modal>
  </div>
</template>

<!--suppress TypeScriptCheckImport -->
<script setup lang="ts">
import { ref, Ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

import Icon from '@/components/Icon.vue';
import Modal, { SIZES } from '@/components/Modal.vue';
import Calculator from '@/components/Calculator.vue';

import type { SetupComponent, SetupGetElementsCB, Input, Output, OutputValue, OutputMap, ElementsStore } from '@/typings/calculator';
import { getBySlotType } from '../components/ModulePage.vue';
import statsStyleName from '../utils/Handlers/statsStyleName';
import byTypes from '@Regulation/byTypes.js';

const STACK_CHARS = ['UnlockPrice', 'UnlockTime'];

const { t } = useI18n();
const inputLocKeys = {
    actually: 'CURRENT_LVL',
    plan: 'PLAN_LVL',
};
const modules: Ref<{[k: string]: unknown}> = ref({});
const input: Ref<Input> = ref({ actually: {}, plan: {} });
const openModal = ref(false);
const modalOpts = reactive({
    size: SIZES.SMALL,
    title: t('TID_TECH_DLG_TITLE'),
    data: {
        module: {},
        maxLevel: 0,
        get key() {
            return this.module.Name;
        },
    },
});
let calc: SetupComponent;

function setupCalculator(v: SetupComponent) {
    calc = v;
    for (const type of byTypes.artifact) {
        modules.value[type] = v.provideGetterElements((...p) => getModulesBySlotType.apply(null, [type, ...p]));
    }
}
function onChangeLvl(type: keyof Input, value: number|string) {
    return calc.onChangeLvl(type, modalOpts.data.key, value);
}
function isSelected(type: keyof Input, value: number): boolean {
    return calc.isSelected(type, modalOpts.data.key, value);
}
function isDisabled(type: keyof Input, value: number): boolean {
    return calc.isDisabled(type, modalOpts.data.key, value);
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
function openModuleInfo(module: OutputValue, maxLevel: number) {
    modalOpts.data.module = module;
    modalOpts.data.maxLevel = maxLevel;
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

        .select-lvl {
            font-size: 110%;
            background-color: map.get($table, "background");
            border-color: map.get($table, "background");

            option:disabled {
                color: #0e1315;
            }
        }
    }
}
.sections-input {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: space-between;
    margin-top: 4%;
    margin-right: auto;
    margin-left: auto;

    max-height: 850px;
    max-width: 1500px;
    --module-size: 90px;

    @media screen and (max-width: 1800px){
        --module-size: 80px;
    }
    @media screen and (max-width: 1600px){
        --module-size: 75px;
    }
    @media screen and (max-width: 1500px){
        --module-size: 70px;
        max-height: 1000px;
        max-width: 920px;
    }
    @media screen and (max-width: 1024px){
        max-height: none;
        max-width: 420px;
    }
    @media screen and (max-width: 960px){
        --module-size: 80px;
        max-width: 290px;
    }
    @media screen and (max-width: 600px){
        --module-size: 60px;
        max-width: 290px;
    }


    .type {
        width: calc((var(--module-size) + 24px)  * 4);
        margin-bottom: 3%;

        h3 {
            margin-bottom: 4%;
        }
        ul {
            display: flex;
            flex-wrap: wrap;

            .module {
                list-style: none;
                width: var(--module-size);
                margin: 12px;
                cursor: pointer;
                position: relative;

                @media screen and (max-width: 960px){
                    margin: 6px;
                }

                .mute {
                    opacity: .6;
                }

                .levels {
                    position: absolute;
                    top: 75%;
                    display: flex;
                    justify-content: space-between;
                    width: var(--module-size);
                    font-size: 120%;

                    :first-child {
                        color: $actually-color
                    }
                    :last-child {
                        color: $plan-color;
                    }
                }
            }
        }
    }
}
</style>
