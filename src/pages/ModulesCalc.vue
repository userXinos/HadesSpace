<template>
  <div>
    <Head><title>{{ title }}</title></Head>
    <h1 class="topic"> {{ title }} </h1>

    <table class="total">
      <tr
        v-for="(value, key) of output.total"
        :key="key"
        class="total"
      >
        <td>{{ format.key(key) }}</td>
        <td
          colspan="3"
          :class="outputClasses('total', key)"
        >
          {{ format.value(key, value) }}
          <!--          <template v-if="key == 'UnlockTime' && value > 0">-->
          <!--            &nbsp;&nbsp; (-->
          <!--            <img-->
          <!--              class="crystal"-->
          <!--              src="../img/icons/crystal.png"-->
          <!--            > {{ Math.floor(sec2crystals(value)) }}-->
          <!--            )-->
          <!--          </template>-->
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

    <confirm
      text="Reset all ? Are you serious ?"
      @setShow="(func) => resetConfirm = func"
    />

    <div class="margin-wrap">
      <div class="sections-input">
        <section
          v-for="type of types"
          :key="type"
          class="type"
        >
          <h3> {{ format.key(type) }} </h3>
          <ul>
            <li
              v-for="([module, maxLevel]) of getType(type)"
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
                  <span> {{ input.actually[module.Name] ? input.actually[module.Name] : '' }} </span>
                  <span> {{ input.plan[module.Name] ? input.plan[module.Name] : '' }} </span>
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

          <ul class="stats">
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
              v-for="(_, key) in output.plan[modalOpts.data.key]"
              :key="key"
              class="output"
            >
              <b>{{ format.key(key) }}</b>
              <div>
                <span
                  v-for="type of Object.keys(input)"
                  :key="type"
                  :class="outputClasses(type, key)"
                >
                  <template v-if="output[type][modalOpts.data.key]">
                    {{ format.value(key, output[type][modalOpts.data.key][key]) }}
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

import { Head } from '@vueuse/head';
import Icon from '@/components/Icon.vue';
import Modal, { SIZES } from '@/components/Modal.vue';
import Confirm from '@/components/TheConfirm.vue';

import value from '@Handlers/value';
import key from '@Handlers/key';
import modulesCalcLogic, { STACK_CHARS, Input, OutputKeys, Module, Output } from '@/composables/modulesCalcLogic';
import { getBySlotType } from '@/components/ModulePage.vue';
import { InputKeys } from '../composables/planetsCalcLogic.js';
import { sec2crystals } from '@Scripts/crystalConverter';

const LOCAL_STORAGE_KEY = 'modulesCalc';
const TYPES_ORDER = ['Trade', 'Mining', 'Weapon', 'Shield', 'Support'];

// {"plan":{"Recall":1,"RelicDrone":12,"TransportCapacity":12,"ShipmentComputer":12,"Trader":12,"Rush":12,"TradeBurst":12,"ShipmentDrone":12,"Offload":10,"ShipmentBeam":12,"Entrust":12,"Dispatch":10,"MiningBoost":12,"MineralStorageCapacity":10,"Enrich":12,"MassMining":10,"HydrogenUpload":12,"MiningUnity":10,"Crunch":12,"Genesis":12,"HydroRocket":12,"MiningDrone":10,"WeakBattery":1,"Battery":12,"Laser":12,"MassBattery":12,"DualLaser":12,"Barrage":12,"DartLauncher":12,"WeakShield":5,"StandardShield":12,"PassiveShield":12,"StrongShield":12,"MirrorShield":12,"BlastShield":12,"AreaShield":12,"EMP":12,"Teleport":12,"RedStarExtender":10,"Repair":12,"TimeWarp":12,"Unity":12,"Sanctuary":1,"Stealth":12,"Fortify":12,"Impulse":12,"AlphaRocket":12,"Salvage":12,"Supress":12,"Destiny":12,"Barrier":12,"Vengeance":12,"DeltaRocket":12,"Leap":10,"Bond":12,"LaserTurret":12,"AlphaDrone":12,"Suspend":12,"OmegaRocket":12,"RemoteBomb":12}}

export default defineComponent({
    name: 'ModulesCalc',
    components: { Head, Icon, Modal, Confirm },
    setup() {
        const { output, update } = modulesCalcLogic();

        return {
            output,
            logicUpdateOutput: update,
        };
    },
    data() {
        return {
            title: this.$t('MODULES_CALC'),

            input: { actually: {}, plan: {} } as Input,
            inputLocKeys: {
                actually: 'CURRENT_LVL',
                plan: 'PLAN_LVL',
            },
            updateOutput: (key?: string) => this.logicUpdateOutput(this.input, key),
            resetConfirm: () => (new Promise(() => null)) as Promise<void>,

            types: TYPES_ORDER,
            sec2crystals,

            openModal: false,
            modalOpts: {
                size: SIZES.SMALL,
                title: this.$t('TID_TECH_DLG_TITLE'),
                data: {
                    module: {} as Module,
                    maxLevel: 0,
                    get key() {
                        return this.module.Name;
                    },
                },
            },

            formatOpts: {
                $t: this.$t.bind(this),
                $te: this.$te.bind(this),
            },
            format: {
                key: (k: string) => key(k, this.$route.name, this.formatOpts),
                value: (k: string, v: string | number) => value(k, v, null, this.formatOpts),
            },
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
        getType(type: string): [Module, number][] {
            const modules = getBySlotType(type) as { [k: string]: Module };

            // noinspection TypeScriptUnresolvedFunction
            return Object.entries(modules).map(([, module]) => {
                let maxLevel = 1;

                // noinspection TypeScriptUnresolvedFunction
                for (const [, value] of Object.entries(module)) {
                    if (Array.isArray(value) && value.length > maxLevel) {
                        maxLevel = value.length;
                    }
                }
                return [module, maxLevel];
            });
        },
        isSelected(type: InputKeys, value: number): boolean {
            const { key } = this.modalOpts.data;
            let current = this.input.plan[key] || 0;
            const min = this.input.actually[key];

            if (min > current) {
                current = this.onChangeLvl('plan', min);
            }
            if (type == 'plan') {
                return (value == current);
            }
            return (this.input[type][key] == value);
        },
        isDisabled(type: InputKeys, value: number): boolean {
            const { key } = this.modalOpts.data;

            if (type != 'plan' || !this.input.actually) {
                return false;
            }
            return (value < this.input.actually[key]);
        },
        async onReset(event: Event): Promise<void> {
            if (this.openModal) {
                if ((event.target as HTMLButtonElement).name == 'all') {
                    this.onChangeLvl('actually', 0);
                    this.onChangeLvl('plan', 0);
                } else {
                    this.onChangeLvl('plan', 0);
                }
                return;
            }

            if ((event.target as HTMLButtonElement).name == 'all') {
                await this.resetConfirm()
                    .then(() => {
                        this.input = { actually: {}, plan: {} } as Input;
                    })
                    .catch(() => undefined);
            } else {
                if (this.input.plan) {
                    for (const key in this.input.plan) {
                        if (key in this.input.plan) {
                            this.input.plan[key] = this.input.actually[key];
                        }
                    }
                } else {
                    this.input.plan = {};
                }
            }
            this.updateOutput();
            this.updateStorage();
        },
        onChangeLvl(type: InputKeys, value: number): number {
            const key = this.modalOpts.data.module.Name;
            value = (typeof value === 'string') ? parseInt(value) : value;

            if (value == 0) {
                delete this.input[type][key];
                delete this.output[type][key];
            } else {
                this.input[type][key] = value;
            }

            this.updateOutput();
            this.updateStorage();
            return value;
        },

        updateStorage(): void {
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(this.input));
        },

        outputClasses(type: OutputKeys, charName: string): object {
            const { key } = this.modalOpts.data;

            if (type == 'plan') {
                return {
                    'plan': this.input.actually[key] ? this.input.plan[key] > this.input.actually[key] : true,
                    'plus': !STACK_CHARS.includes(charName),
                    'hide': this.input.plan[key] == this.input.actually[key],
                };
            }
            if (type == 'actually') {
                return {
                    'hide': STACK_CHARS.includes(charName),
                };
            }
            if (type === 'total') {
                return {
                    'hide': this.output.total[charName as keyof Output['total']] == 0,
                };
            }
            return {};
        },
        openModuleInfo(module: Module, maxLevel: number) {
            this.modalOpts.data.module = module;
            this.modalOpts.data.maxLevel = maxLevel;
            this.openModal = true;
        },
    },
});
</script>

<style scoped lang="scss">
@use "sass:map";

@import "../style/page";
@import "../style/vars";

$actually-color: #92cee5;
$plan-color: #ded45a;

.margin-wrap {
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

    @media screen and (max-width: 1600px){
        max-height: 1050px;
        max-width: 950px;
    }
    @media screen and (max-width: 1800px){
        --module-size: 80px;
    }
    @media screen and (max-width: 960px){
        max-height: none;
        max-width: 290px;
        --module-size: 60px
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

.stats {
    li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 2%;

        &.output {
            font-size: 90%;
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

.total {
    background-color: rgba(9, 12, 12, 0.99);
    font-weight: bold;
}
.hide {
    display: none;
}
.plan {
    color: #fff19f;
    white-space: nowrap;

    &.plus {
        &:before {
            content: " + ";
        }
    }

}
.result-growth {
    color: #1e7e34;
}
.result-not-growth{
    opacity: 0.5;
}

$reset-button-colors: (
    "all": #a90000,
    "plan": #cca814,
);

table.total {
    border: 1px solid #424547;
    border-spacing: 0;
    color: #aab2b6;

    width: 90%;
    max-width: 500px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 15px;
    font-size: 130%;

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
    .crystal {
        width: 11px;
    }
}


.reset-buttons {
    display: flex;
    justify-content: end;
    gap: 10px;
    font-size: 90%;

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

</style>
