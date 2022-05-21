<template>
  <div>
    <div class="container">

      <calculator
        v-model:input="input"
        :update-output="logicUpdateOutput"
        local-storage-key="modulesCalc"
        :output="output"
        title-key="MODULES_CALC"
        @setup="setupCalculator"
      />

      <div class="sections-input">
        <section
          v-for="type of types"
          :key="type"
          class="type"
        >
          <h3> {{ format.key(type) }} </h3>
          <ul>
            <li
              v-for="([module, maxLevel]) of getModulesBySlotType(type)"
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
            <Icon
              :name="modalOpts.data.module.Icon"
              dir="game/Modules"
            />
          </div>

          <ul class="chars">
            <li
              v-for="type in Object.keys(input)"
              :key="type"
              class="input"
            >
              <span v-t="inputLocKeys[type]" />
              <select
                class="select"
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

            <br>
            <li
              v-for="key in Object.keys(output.plan[modalOpts.data.key] || {})"
              :key="key"
              :class="{'output': true, 'sub-chars': typeof output.plan?.[modalOpts.data.key]?.[key] == 'object'}"
            >
              <b>{{ format.key(key) }}</b>
              <div>
                <span
                  v-for="type of Object.keys(input)"
                  :key="type"
                  :class="outputClasses(type, key)"
                >

                  <template v-if="typeof output[type]?.[modalOpts.data.key]?.[key] === 'object'">
                    <ul>
                      <li
                        v-for="k1 in Object.keys(output[type][modalOpts.data.key][key] || {})"
                        :key="k1"
                        class="output"
                      >
                        <b>{{ format.key(k1) }}</b>
                        <div>
                          <span
                            v-for="type1 of Object.keys(input)"
                            :key="type1"
                            :class="outputClasses(type1, k1)"
                          >
                            {{ format.value(k1, output[type1]?.[modalOpts.data.key]?.[key]?.[k1]) }}
                          </span>
                        </div>
                      </li>
                    </ul>
                  </template>

                  <template v-else>
                    {{ format.value(key, output[type]?.[modalOpts.data.key]?.[key]) }}
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

<script lang="ts">
import { defineComponent } from 'vue';

import Icon from '@/components/Icon.vue';
import Modal, { SIZES } from '@/components/Modal.vue';
import Calculator, { Setup } from '@/components/Calculator.vue';

import value from '@Handlers/value';
import key from '@Handlers/key';
import calculator, { Input, Output, Element, getElementsCB, ElementsStore } from '../composables/calculator';
import { getBySlotType } from '../components/ModulePage.vue';

const STACK_CHARS = ['UnlockPrice', 'UnlockTime'];
const TYPES_ORDER = ['Trade', 'Mining', 'Weapon', 'Shield', 'Support'];

export default defineComponent({
    name: 'ModulesCalc',
    components: { Icon, Modal, Calculator },
    setup() {
        const { output, update, provideGetterElements } = calculator(STACK_CHARS, calcTotal);

        return {
            output,
            logicUpdateOutput: update,
            getModulesBySlotType: (type: string) =>
                provideGetterElements((...p) => getModulesBySlotType.apply(null, [type, ...p])),
        };
    },
    data() {
        return {
            inputLocKeys: {
                actually: 'CURRENT_LVL',
                plan: 'PLAN_LVL',
            },
            format: {
                key: (k: string) => key(k, this.$route.name),
                value: (k: string, v: string | number) => value(k, v, null),
            },
            types: TYPES_ORDER,

            calc: {} as Setup,
            input: { actually: {}, plan: {} } as Input,
            resetConfirm: () => (new Promise(() => null)) as Promise<void>,

            openModal: false,
            modalOpts: {
                size: SIZES.SMALL,
                title: this.$t('TID_TECH_DLG_TITLE'),
                data: {
                    module: {} as Element,
                    maxLevel: 0,
                    get key() {
                        return this.module.Name;
                    },
                },
            },

        };
    },
    methods: {
        setupCalculator(v: Setup) {
            this.calc = v;
        },
        onChangeLvl(type: keyof Input, value: number|string) {
            return this.calc.onChangeLvl(type, this.modalOpts.data.key, value);
        },
        isSelected(type: keyof Input, value: number): boolean {
            return this.calc.isSelected(type, this.modalOpts.data.key, value);
        },
        isDisabled(type: keyof Input, value: number): boolean {
            return this.calc.isDisabled(type, this.modalOpts.data.key, value);
        },
        async onReset(event: Event): Promise<void> {
            if (this.openModal) {
                if ((event.target as HTMLButtonElement).name == 'all') {
                    this.onChangeLvl('actually', 0);
                    this.onChangeLvl('plan', 0);
                } else {
                    this.onChangeLvl('plan', 0);
                }
            }
        },

        outputClasses(type: keyof Output, charName?: string): object {
            return this.calc.outputClasses(type, this.modalOpts.data.key, charName);
        },
        openModuleInfo(module: Element, maxLevel: number) {
            this.modalOpts.data.module = module;
            this.modalOpts.data.maxLevel = maxLevel;
            this.openModal = true;
        },
    },
});

function getModulesBySlotType(type: string, ...[getChars, elements]: Parameters<getElementsCB>) {
    const modules = getBySlotType(type) as { [k: string]: Element };

    return Object.entries(modules).map(([name, module]) => {
        let maxLevel = 1;

        for (const [, value] of Object.entries(module)) {
            if (Array.isArray(value) && value.length > maxLevel) {
                maxLevel = value.length;
            }
        }

        elements[name] = getChars((modules as {[k: string]: object})[name] as Element, maxLevel);

        return [module, maxLevel];
    });
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
</script>

<style scoped lang="scss">
@use "sass:map";

@import "../style/page";
@import "../style/vars";
@import "../style/calculator";

$actually-color: #92cee5;
$plan-color: #ded45a;

.container {
    margin: 0 10%;

    @media screen and (max-width: 960px){
        margin: 0 4%;
    }
}

.modal-module {
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

        .select {
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
        --module-size: 80px;
        max-height: 1000px;
        max-width: 920px;
    }
    @media screen and (max-width: 1024px){
        max-height: none;
        max-width: 420px;
    }
    @media screen and (max-width: 960px){
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
