<template>
  <div>
    <v-head><title>{{ title }}</title></v-head>
    <h1 class="topic"> {{ title }} </h1>

    <table class="total-table">
      <tr
        v-for="(value, key) of output.total.intermediate"
        :key="key"
      >
        <td>{{ format.key(key) }}</td>
        <td
          v-for="(item, itemKey) of value"
          :key="key + itemKey"
          :class="totalTableClasses(itemKey, key)"
        >
          {{ item.toLocaleString('ru-RU') }}
        </td>
      </tr>
      <tr
        v-for="(value, key) of output.total.result"
        :key="key"
        class="result"
      >
        <td>{{ format.key(key) }}</td>
        <td
          v-if="value > 0"
          colspan="3"
        >
          <b>{{ format.value(key, value) }}</b>
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
      :size="modalSizes.MEDIUM"
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
              v-model="ConfigManager.value.selected"
              @change="fullUpdate()"
            >
              <option
                v-for="(value, index) in ConfigManager.value.configs"
                :key="index"
                :value="index"
              >
                {{ value.name }}
              </option>
            </select>
          </div>

          <div class="input">
            <p
              v-t="'TID_CHANGE_NAME_TITLE'"
              class="name"
            />
            <input
              v-model="ConfigManager.value.configs[ConfigManager.value.selected].name"
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
      :size="modalSizes.SMALL"
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

<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';

import { Head as VHead } from '@vueuse/head';
import Confirm from '@/components/TheConfirm.vue';
import Modal, { SIZES } from '@/components/Modal.vue';

import value from '@Handlers/value';
import key from '@Handlers/key';
import calculator from '@/composables/calculator';
import CalculatorConfig from '@/composables/calculatorConfig';
import type { Input, Output, getElementsCB } from '@/composables/calculator';

export declare interface Setup {
    onChangeLvl: (type: keyof Input, key: string, value: number|string) => number,
    isSelected: (type: keyof Input, key: string, value: number) => boolean
    isDisabled: (type: keyof Input, key: string, value: number) => boolean
    outputClasses: (type: keyof Output, key: string, charName?: string) => object,
    provideGetterElements: (callback: ProvideGetterElementsCB) => unknown,
    output: Output
}
export declare type ProvideGetterElementsCB = (TIDs: CalculatorConfig['TIDs'], ...args: Parameters<getElementsCB>) => unknown

type calculatorArgs = Parameters<typeof calculator>
type configArgs = ConstructorParameters<typeof CalculatorConfig>

export default defineComponent({
    name: 'Calculator',
    components: { VHead, Confirm, Modal },
    emits: ['update:input', 'setup'],
    // eslint-disable-next-line  vue/no-setup-props-destructure
    setup({ stackChars, calcTotal, localStorageKey }) {
        const { provideGetterElements, output, update } = calculator(stackChars, calcTotal);
        const ConfigManager = new CalculatorConfig(localStorageKey);
        const wrapCalcProvide = (cb: ProvideGetterElementsCB) =>
            provideGetterElements.apply(null, [(...a) => cb(ConfigManager.TIDs, ...a)]);

        return {
            output,
            updateLogicOutput: update,
            provideGetterElements: (cb: ProvideGetterElementsCB) => wrapCalcProvide(cb),

            ConfigManager,
        };
    },
    // eslint-disable-next-line vue/order-in-components
    props: {
        stackChars: { type: Array as PropType<calculatorArgs[0]>, required: true },
        calcTotal: { type: Function as PropType<calculatorArgs[1]>, required: true },
        localStorageKey: { type: String as PropType<configArgs[0]>, required: true },

        titleKey: { type: String, required: true },
        input: { type: Object as () => Input, required: true },
    },
    data() {
        return {
            isNebula: !!process.env.VUE_APP_NEBULA_BUILD,

            resetConfirm: (() => Promise.prototype) as (q: string) => Promise<void>,
            modalSizes: SIZES,
            settingsModal: false,

            newModal: false,
            newConfigFromText: '',
            buttonCopy: {
                text: this.$t('COPY'),
                color: 'yellow',
            },

            format: {
                key: (k: string) => key(k, this.$route.name),
                value: (k: string, v: unknown) => value(k, v, null),
            },
        };
    },
    computed: {
        title() {
            return this.$t(this.titleKey);
        },
        totalResultKeys() {
            return Object.keys(this.output.total.result);
        },
        currentUrl() {
            return `${location.pathname}`;
        },
    },
});
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
    .crystal {
        width: 11px;
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
