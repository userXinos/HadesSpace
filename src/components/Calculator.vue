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
            return `${location.origin}${location.pathname}`;
        },
    },
    created() {
        if (this.$route.query.d) {
            const parsed = this.ConfigManager.parseUrl(this.$route.query.d as string);

            this.ConfigManager.add({ actually: parsed, plan: parsed }, { temporary: true });
            this.$router.push(`${location.pathname}`);
        }

        this.fullUpdate();
        this.$emit('setup', {
            onChangeLvl: this.onChangeLvl,
            isSelected: this.isSelected,
            isDisabled: this.isDisabled,
            outputClasses: this.outputClasses,
            provideGetterElements: this.provideGetterElements,
            output: this.output,
        });
    },
    methods: {
        setShowConfirm(func: () => Promise<void>) {
            this.resetConfirm = func;
        },
        updateInput() {
            this.$emit('update:input', this.ConfigManager.selectedConfig);
        },
        updateOutput(key?: string) {
            this.$nextTick(() => {
                this.updateLogicOutput(this.input, key);
            });
        },
        fullUpdate() {
            this.updateInput();
            this.updateOutput();
        },
        async onReset(event: Event): Promise<void> {
            if ((event.target as HTMLButtonElement).name == 'all') {
                await this.resetConfirm('Reset all ? Are you serious ?')
                    .then(() => {
                        for (const key in this.input) {
                            if (key in this.input) {
                                this.ConfigManager.selectedConfig[key as keyof Input] = {};
                            }
                        }
                    })
                    .catch(() => undefined);
            } else {
                if (this.input.plan) {
                    for (const key in this.input.plan) {
                        if (key in this.input.plan) {
                            this.ConfigManager.selectedConfig.plan[key] = this.input.actually[key];
                        }
                    }
                }
            }

            this.updateOutput();
            this.ConfigManager.save();
        },

        async removeConfig() {
            const { name } = this.ConfigManager.value.configs[this.ConfigManager.value.selected];
            await this.resetConfirm(this.$t('REMOVE_CONFIG', [name]))
                .then(() => {
                    this.ConfigManager.removeSelected();
                    this.fullUpdate();
                })
                .catch(() => undefined);
        },
        async createConfig() {
            let parsed = {};

            if (this.newConfigFromText) {
                await this.ConfigManager.parseString(this.newConfigFromText)
                    .then((data) => parsed = data)
                    .catch((err) => {
                        alert(err.message);
                        console.error(err);
                    });
            }
            this.ConfigManager.add({ actually: { ...parsed }, plan: { ...parsed } });
            this.newConfigFromText = '';
            this.newModal = false;
            this.fullUpdate();
        },
        copyConfig() {
            const d = this.ConfigManager.stringifyUrl();

            navigator.clipboard.writeText(`${this.currentUrl}?d=${d}`)
                .then(() => {
                    this.buttonCopy.text = this.$t('COPIED');
                    this.buttonCopy.color = 'green';

                    setTimeout(() => {
                        this.buttonCopy.text = this.$t('COPY');
                        this.buttonCopy.color = 'yellow';
                    }, 2000);
                })
                .catch((err) => {
                    this.buttonCopy.text = 'Error';
                    this.buttonCopy.color = 'red';
                    alert(err.message);
                    console.error(err);
                });
        },

        totalTableClasses(type: string, key: string): object {
            const val = this.output.total.intermediate[key];

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
        },

        onChangeLvl(type: keyof Input, key: string, value: number|string): number {
            value = (typeof value === 'string') ? parseInt(value) : value;

            if (value == 0) {
                delete this.input[type][key];
                delete this.output[type][key];
            } else {
                this.ConfigManager.selectedConfig[type][key] = value;
            }

            this.updateInput();
            this.updateOutput(key);
            this.ConfigManager.save();

            return value;
        },
        isSelected(type: keyof Input, key: string, value: number): boolean {
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
        isDisabled(type: keyof Input, key: string, value: number): boolean {
            if (type != 'plan' || !this.input.actually) {
                return false;
            }
            return (value < this.input.actually[key]);
        },
        outputClasses(type: keyof Output, key: string, charName?: string): object {
            if (type == 'actually') {
                return {
                    'none': charName && this.totalResultKeys.includes(charName),
                    'actually': true,
                };
            }
            if (type == 'plan') {
                const char = charName ? this.output[type][key][charName] : undefined;

                return {
                    'yellow-color': (this.input.actually[key] ? this.input.plan[key] > this.input.actually[key] : true) && (typeof char !== 'object'),
                    'plus': !charName || (charName && !this.totalResultKeys.includes(charName)),
                    'none': this.input.plan[key] == this.input.actually[key],
                    'plan': true,
                };
            }
            return {};
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
