<template>
  <div>
    <v-head><title>{{ title }}</title></v-head>
    <h1 class="topic"> {{ title }} </h1>

    <table class="total-table">
      <tr
        v-for="(v, k) of output.total.intermediate"
        :key="k"
      >
        <td>{{ format.key(k) }}</td>
        <td
          v-for="(item, itemKey) of v"
          :key="k + itemKey"
          :class="totalTableClasses(itemKey, k)"
        >
          {{ item.toLocaleString('ru-RU') }}
        </td>
      </tr>
      <tr
        v-for="(v, k) of output.total.result"
        :key="k"
        class="result"
      >
        <td>{{ format.key(k) }}</td>
        <td
          v-if="v > 0"
          colspan="3"
        >
          <b>{{ format.value(k, v) }}</b>
        </td>
      </tr>
    </table>

    <div class="buttons">
      <button
        class="settings"
        @click="settingsModal = true"
      />

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
    </div>

    <modal
      v-model:open="settingsModal"
      :title="$t('CALCULATOR_SETTINGS') + ' (Alpha)'"
      :size="SIZES.MEDIUM"
      @update:open="() => ConfigManager.save()"
    >

      <template #body>
        <div class="settings-modal">
          <div class="config-category">
            <p v-t="'CONFIG'" />

            <div class="flex-end">
              <button
                :class="`button ${buttonCopy.color}`"
                @click="copyConfig"
              > {{ buttonCopy.text }} </button>
              <button
                v-t="'CREATE'"
                class="button green"
                @click="newModal = true"
              />
            </div>
          </div>

          <div class="select">
            <p
              v-t="'LIST'"
              class="name"
            />
            <select
              v-model="ConfigManager.store.selected"
              @change="fullUpdate()"
            >
              <option
                v-for="(v, index) in ConfigManager.store.configs"
                :key="index"
                :value="index"
              >
                {{ v.name }}
              </option>
            </select>
          </div>

          <div class="input">
            <p
              v-t="'TID_CHANGE_NAME_TITLE'"
              class="name"
            />
            <input
              v-model="ConfigManager.store.configs[ConfigManager.store.selected].name"
              :placeholder="$t('TID_CORP_NAME_LABEL')"
            >
          </div>

          <div class="flex-end margin-bottom">
            <button
              class="button red"
              @click="removeConfig"
            >{{ $t(isNebula ? 'TID_SOCIAL_DELETE_MESSAGE' : 'TID_INBOX_DELETE_MESSAGE') }}
            </button>
          </div>

        </div>
      </template>

    </modal>

    <confirm @setShow="setShowConfirm" />

    <modal
      v-model:open="newModal"
      :title="$t('CREATE')"
      :size="SIZES.SMALL"
    >
      <template #body>
        <div class="input">
          <p
            v-t="'FROM_TEXT_FORMAT'"
            class="name"
          />
          <p class="name">Example: Fortify 8 Bond 5</p>
          <input v-model="newConfigFromText">
        </div>

        <div class="flex-end margin-bottom">
          <button
            v-t="'TID_OK'"
            class="button green"
            @click="createConfig"
          />
        </div>
      </template>
    </modal>

  </div>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from 'vue';
import i18n from '@Utils/Vue/i18n';
import router from '@Utils/Vue/router';

import { Head as VHead } from '@vueuse/head';
import Confirm from '@/components/TheConfirm.vue';
import Modal, { SIZES } from '@/components/Modal.vue';

import value from '@Handlers/value';
import key from '@Handlers/key';
import calculator from '@/composables/calculator';
import CalculatorConfig from '@/composables/calculatorConfig';

import type { Input, SetupComponent, SetupGetElementsCB } from '@/typings/calculator';

type calculatorArgs = Parameters<typeof calculator>
type configArgs = ConstructorParameters<typeof CalculatorConfig>

export interface Props {
    stackChars: calculatorArgs[0]
    calcTotal: calculatorArgs[1]
    localStorageKey: configArgs[0]
    titleKey: string,
    input: Input
}

const { t } = i18n.global;
const props = defineProps<Props>();
const emit = defineEmits(['update:input', 'setup']);

const isNebula = !!process.env.VUE_APP_NEBULA_BUILD;
const isProd = !!process.env.NODE_ENV === 'production';
const format = {
    key: (k: string) => key(k, router.currentRoute.name as string),
    value: (k: string, v: unknown) => value(k, v, router.currentRoute.value.name as string),
};

const { provideGetterElements, output, update: updateLogicOutput } = calculator(props.stackChars, props.calcTotal);
const ConfigManager = new CalculatorConfig(props.localStorageKey);

const setupArgs: SetupComponent = {
    output: output,
    onChangeLvl: onChangeLvl,
    isSelected: isSelected,
    isDisabled: isDisabled,
    outputClasses: outputClasses,
    format: format,

    provideGetterElements: (cb: SetupGetElementsCB) =>
        provideGetterElements((...args) => cb(ConfigManager.TIDs, ...args)),
};

let resetConfirm: (q: string) => Promise<void> = (() => Promise.prototype);
const settingsModal = ref(false);
const newModal = ref(false);
const newConfigFromText = ref('');
const buttonCopy = ref({ text: t('COPY'), color: 'yellow' });
const title = computed(() => t(props.titleKey));
const totalResultKeys = computed(() => Object.keys(output.total.result));
const currentUrl = computed(() => `${location.origin}${location.pathname}`);


if (router.currentRoute.value.query.d) {
    const parsed = ConfigManager.parseUrl(router.currentRoute.value.query.d as string);
    const data = { actually: parsed, plan: parsed };

    ConfigManager.add(data, { temporary: true });
    router.push({ path: isProd ? '/' : location.pathname });
}

fullUpdate();
emit('setup', setupArgs);


function setShowConfirm(func: () => Promise<void>): void {
    resetConfirm = func;
}
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
    if ((event.target).name == 'all') {
        await resetConfirm('Reset all ? Are you serious ?')
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
async function removeConfig(): Promise<void> {
    const { name } = ConfigManager.store.configs[ConfigManager.store.selected];
    await resetConfirm(t('REMOVE_CONFIG', [name]))
        .then(() => {
            ConfigManager.removeSelected();
            fullUpdate();
        })
        .catch(() => {}); // eslint-disable-line @typescript-eslint/no-empty-function
}
async function createConfig(): Promise<void> {
    let parsed = {};

    if (newConfigFromText.value) {
        await ConfigManager.parseString(newConfigFromText.value)
            .then((data) => parsed = data)
            .catch((err) => {
                alert(err.message);
                console.error(err);
            });
    }
    ConfigManager.add({ actually: { ...parsed }, plan: { ...parsed } });
    newConfigFromText.value = '';
    newModal.value = false;
    fullUpdate();
}
function copyConfig(): void {
    const d = ConfigManager.stringifyUrl();

    navigator.clipboard.writeText(`${currentUrl.value}?d=${d}`)
        .then(() => {
            buttonCopy.value = { text: t('COPIED'), color: 'green' };
            setTimeout(() => buttonCopy.value = { text: t('COPY'), color: 'yellow' }, 2000);
        })
        .catch((err) => {
            buttonCopy.value = { text: t('Error'), color: 'red' };
            alert(err.message);
            console.error(err);
        });
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

    updateInput();
    updateOutput(key);
    ConfigManager.save();

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
function outputClasses(type: keyof Output, key: string, charName?: string): object {
    if (type == 'actually') {
        return {
            'none': charName && totalResultKeys.value.includes(charName),
            'actually': true,
        };
    }
    if (type == 'plan') {
        const char = charName ? output[type][key][charName] : undefined;

        return {
            'yellow-color': (props.input.actually[key] ? props.input.plan[key] > props.input.actually[key] : true) && (typeof char !== 'object'),
            'plus': !charName || (charName && !totalResultKeys.value.includes(charName)),
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

.total-table {
    border: 2px solid #424547;
    border-spacing: 0;
    color: #aab2b6;
    width: 100%;
    max-width: 600px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 25px;
    border-collapse: collapse;

    td {
        padding: 6px;
        line-height: 16px;
        text-align: center;

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
    }

    .result {
        border-top: 2px solid #424547;
    }
    .result ~ .result {
        border: none;
    }
}

.buttons {
    display: flex;
    justify-content: space-between;

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
    .config-category {
        display: flex;
        justify-content: space-between;
        padding-bottom: 5%;

        @media screen and (max-width: 500px){
            flex-direction: column;
        }

        p {
            font-size: 140%;

            @media screen and (max-width: 500px){
                padding-bottom: 20px;
            }

        }
    }
}
</style>
