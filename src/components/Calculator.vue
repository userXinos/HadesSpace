<template>
  <div>
    <v-head><title>{{ title }}</title></v-head>
    <h1 class="topic"> {{ title }} </h1>

    <div class="table-and-buttons">
      <table class="total-table">
        <tr
          v-for="(v, k) of output.total.intermediate"
          :key="k"
        >
          <td
            :class="statsStyleName(k as string)"
            class="stats-style"
          >
            {{ format.key(k as string) }}
          </td>
          <td
            v-for="(item, itemKey) of v"
            :key="k + itemKey"
            :class="totalTableClasses(itemKey, k as string)"
          >
            {{ item.toLocaleString('ru-RU') }}
          </td>
        </tr>
        <tr
          v-for="(v, k) of output.total.result"
          :key="k"
          class="result"
        >
          <td
            :class="statsStyleName(k as string)"
            class="stats-style"
          >
            {{ format.key(k as string) }}
            <span
              v-if="k == 'TimeToUpgradeParallel'"
              class="show-info"
              @click="openInfo = true"
            />
          </td>
          <td
            v-if="v > 0"
            colspan="3"
          >
            <b>{{ format.value(k as string, v) }}</b>
          </td>
        </tr>
      </table>

      <div class="buttons">
        <div class="reset-buttons">
          <button
            class="button yellow"
            name="plan"
            @click="onReset"
          >
            {{ $t('RESET_PLAN') }}
          </button>
          <button
            class="button red"
            name="all"
            @click="onReset"
          >
            {{ $t('RESET_ALL') }}
          </button>
        </div>
        <button
          class="settings"
          @click="settingsModal = true"
        />
      </div>
    </div>

    <Modal
      v-model:open="settingsModal"
      :title="$t('CALCULATOR_SETTINGS')"
      :size="SIZES.MEDIUM"
      @update:open="() => ConfigManager.save()"
    >

      <template #body>
        <div class="settings-modal">

          <div class="input-wrap">
            <p
              v-t="'DAILY_INVESTMENT'"
              class="stats-style"
              :class="statsStyleName('CreditStorage')"
            />
            <input
              :value="$store.state.userSettings.calcDayCreditLimit"
              type="number"
              min="0"
              @input="$store.commit(userSettingsTypes.SET_CALC_DAY_CREDIT_LIMIT, parseInt(($event.target as HTMLInputElement).value))"
            >
          </div>

          <MultiConfigGUI
            :on-create-new="createConfig"
            :instance="ConfigManager"
            :data-to-string="ConfigManager.selectedConfig.actually"
          />

        </div>
      </template>

    </Modal>

    <Modal
      v-model:open="openInfo"
      :title="$t('TID_MORE_INFO_BTN')"
      :size="SIZES.MEDIUM"
    >
      <template #body>
        <div class="info">
          <p v-t="'UPGRADE_TIME_IN_PARALLEL_INFO'" />
        </div>
      </template>
    </Modal>

  </div>
</template>

<!--suppress TypeScriptCheckImport -->
<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import debounce from 'lodash.debounce';

import { Head as VHead } from '@vueuse/head';
import Modal, { SIZES } from '@/components/Modal.vue';
import MultiConfigGUI from '@/components/MultiConfigGUI.vue';

import value from '@Handlers/value';
import key from '@Handlers/key';
import userSettingsTypes from '@/store/modules/userSettings/types';
import types from '@/store/types';
import statsStyleName from '@Handlers/statsStyleName';
import calculator from '@/composables/calculator';
import MultiConfig from '@Utils/MultiConfig';

import type { Input, Output, SetupComponent, SetupGetElementsCB } from '@/typings/calculator';

const CalculatorConfig = MultiConfig<Input>;
type calculatorArgs = Parameters<typeof calculator>
type configArgs = ConstructorParameters<typeof CalculatorConfig>

export interface Props {
    stackChars: calculatorArgs[0]
    calcTotal: calculatorArgs[1]
    localStorageKey: configArgs[0]
    titleKey: string,
    input: Input
}

const store = useStore();
const { t } = useI18n();
const router = useRouter();
const props = defineProps<Props>();
const emit = defineEmits(['update:input', 'setup']);

const format = {
    key: (k: string) => key(k, router.currentRoute.value.name as string),
    value: (k: string, v: unknown) => value(k, v, router.currentRoute.value.name as string),
};

const { provideGetterElements, output, update: updateLogicOutput } = calculator(props.stackChars, props.calcTotal);
const ConfigManager = new CalculatorConfig(props.localStorageKey, { actually: {}, plan: {} });
const debounceUpdate = debounce(() => {
    updateInput();
    updateOutput();
    ConfigManager.save();
}, 100);

const setupArgs: SetupComponent = {
    output: output,
    onChangeLvl: onChangeLvl,
    isSelected: isSelected,
    isDisabled: isDisabled,
    outputClasses: outputClasses,
    forceReCalc: fullUpdate,
    format: format,
    Config: ConfigManager.store,

    provideGetterElements: (cb: SetupGetElementsCB) => provideGetterElements(cb),
};

const settingsModal = ref(false);
const openInfo = ref(false);
const title = computed(() => t(props.titleKey));
const totalResultKeys = computed(() => Object.keys(output.total.result));


if (router.currentRoute.value.query.d) {
    const parsed = MultiConfig.parseUrl(router.currentRoute.value.query.d as string);
    const data = { actually: { ...parsed }, plan: { ...parsed } };

    ConfigManager.add(data, { temporary: true });
}

fullUpdate();
emit('setup', setupArgs);

watch(() => ConfigManager.store.selected, () => {
    fullUpdate();
});

function updateInput() {
    emit('update:input', ConfigManager.selectedConfig);
}
function updateOutput(key?: string) {
    nextTick(() => updateLogicOutput(props.input, key));
}
function fullUpdate() {
    updateInput();
    updateOutput();
}
async function onReset(event: Event): Promise<void> {
    if ((event.target as HTMLInputElement).name == 'all') {
        await store.dispatch(types.OPEN_CONFIRM, 'Reset all ? Are you serious ?')
            .then(() => {
                for (const key in props.input) {
                    if (key in props.input) {
                        ConfigManager.selectedConfig[key as keyof Input] = {};
                    }
                }
            })
            .catch(() => {}); // eslint-disable-line @typescript-eslint/no-empty-function
    } else {
        if (props.input.plan) {
            for (const key in props.input.plan) {
                if (key in props.input.plan) {
                    ConfigManager.selectedConfig.plan[key] = props.input.actually[key];
                }
            }
        }
    }

    updateOutput();
    ConfigManager.save();
}
async function createConfig(): Promise<void> {
    ConfigManager.add({ actually: { }, plan: { } });
    fullUpdate();
}
function totalTableClasses(type: string, key: string): object {
    const val = output.total.intermediate[key];

    if (type == 'plan') {
        return {
            'yellow-color plus': val.plan,
            'hide': val.plan == 0,
        };
    }
    if (type == 'sum') {
        const isGrowth = (val.sum > val.actually);

        return {
            'green-color ': isGrowth,
            'muffle': !isGrowth,
            'hide': val.sum == 0,
        };
    }
    return {};
}
function onChangeLvl(type: keyof Input, key: string, value: number|string): number {
    value = (typeof value === 'string') ? parseInt(value) : value;

    if (value == 0) {
        delete props.input[type][key]; // eslint-disable-line vue/no-mutating-props
        delete output[type][key];
    } else {
        ConfigManager.selectedConfig[type][key] = value;
    }

    const current = props.input.plan[key] || 0;
    const min = props.input.actually[key];

    if (min > current) {
        onChangeLvl('plan', key, min);
    }

    debounceUpdate();

    return value;
}
function isSelected(type: keyof Input, key: string, value: number): boolean {
    let current = props.input.plan[key] || 0;
    const min = props.input.actually[key];

    if (min > current) {
        current = onChangeLvl('plan', key, min);
    }
    if (type == 'plan') {
        return (value == current);
    }
    return (props.input[type][key] == value);
}
function isDisabled(type: keyof Input, key: string, value: number): boolean {
    if (type != 'plan' || !props.input.actually) {
        return false;
    }
    return (value < props.input.actually[key]);
}
function outputClasses(type: keyof Output, key: string, charName?: string): {[k: string]: boolean} {
    if (type == 'actually') {
        return {
            'none': !!charName && totalResultKeys.value.includes(charName),
            'actually': true,
        };
    }
    if (type == 'plan') {
        const char = charName ? output[type][key][charName] : undefined;

        return {
            'yellow-color': (props.input.actually[key] ? props.input.plan[key] > props.input.actually[key] : true) && (typeof char !== 'object'),
            'plus': !charName || (!!charName && !totalResultKeys.value.includes(charName)),
            'none': props.input.plan[key] == props.input.actually[key],
            'plan': true,
        };
    }
    return {};
}
</script>

<style scoped lang="scss">
@import "../style/page";
@import "../style/calculator";
@import "../style/userInput";

.table-and-buttons {
    display: flex;
    align-items: center;
    margin-right: auto;
    margin-left: auto;
    gap: 10px;

    @media screen and (max-width: 1000px){
        flex-direction: column;
        margin-bottom: 25px;
    }
}
.total-table {
    flex: 4;
    border: 2px solid #424547;
    border-spacing: 0;
    color: #aab2b6;
    width: 100%;
    border-collapse: collapse;

    td {
        padding: 6px;
        line-height: 16px;
        text-align: center;
        justify-content: left;

        @media screen and (max-width: 1000px){
            font-size: 70%;
        }

        &:first-child {
            font-size: 100%;
            text-align: left;
            padding-right: 5%;

            @media screen and (max-width: 1000px){
                font-size: 80%;
            }

        }

        &[colspan="3"] {
            font-size: 100%;
        }

        .show-info {
            &:after {
                padding: 2px;
                content: 'ⓘ';
                cursor: pointer;
            }
        }
    }

    .result {
        border-top: 2px solid #424547;
    }
    .result ~ .result {
        border: none;
    }
}

.buttons {
    flex: 1;
    display: flex;
    align-items: end;
    flex-direction: column;
    gap: 10px;

    .reset-buttons {
        flex-direction: column;

        @media screen and (max-width: 1000px){
            flex-direction: row;
        }
    }

    @media screen and (max-width: 1000px){
        flex-direction: row;
    }

    .settings {
        cursor: pointer;
        width: 38px;
        height: 38px;
        background: url("../img/icons/settings.svg") no-repeat;
        border: none;

        &:hover {
            opacity: .9;
            transition-duration: 800ms;
            transform: rotate(180deg);
        }
    }
}

.flex-end {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}
.margin-bottom {
    margin-bottom: 5%;
}

.settings-modal {
  .input-wrap {
    max-width: 100%;
    margin-bottom: 10%;

    p {
      justify-content: start;
      padding-bottom: 5px;
    }

    input {
      margin-top: 5px;
      width: 100%;
      font-size: 200%;
      color: #444;
      text-align: center;
      border: none;
      border-radius: 10px;
    }
  }
}
.info {
    p {
        white-space: pre-line;
    }
}
</style>
