<template>
  <div>
    <Head><title>{{ title }}</title></Head>
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
    <confirm
      text="Reset all ? Are you serious ?"
      @setShow="setShowConfirm"
    />

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { Head } from '@vueuse/head';
import Confirm from '@/components/TheConfirm.vue';

import value from '@Handlers/value';
import key from '@Handlers/key';
import { Input, Output } from '@/composables/calculator';

export interface Setup {
    onChangeLvl: (type: keyof Input, key: string, value: number|string) => number,
    isSelected: (type: keyof Input, key: string, value: number) => boolean
    isDisabled: (type: keyof Input, key: string, value: number) => boolean
}

export default defineComponent({
    name: 'Calculator',
    components: { Head, Confirm },
    props: {
        titleKey: {
            type: String,
            required: true,
        },
        input: {
            type: Object as () => Input,
            required: true,
        },
        output: {
            type: Object as () => Output,
            required: true,
        },
        localStorageKey: {
            type: String,
            required: true,
        },

        updateOutput: {
            type: Function,
            required: true,
        },
    },
    emits: ['update:input', 'setup'],
    data() {
        return {
            resetConfirm: () => (new Promise(() => null)) as Promise<void>,

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
    },
    created() {
        if (localStorage.getItem(this.localStorageKey)) {
            this.$emit('update:input', JSON.parse(localStorage.getItem(this.localStorageKey) || '{}'));
        }
        this.$emit('setup', {
            onChangeLvl: this.onChangeLvl,
            isSelected: this.isSelected,
            isDisabled: this.isDisabled,
        });
    },
    mounted() {
        this.updateOutput(this.input);
    },
    methods: {
        setShowConfirm(func: () => Promise<void>) {
            this.resetConfirm = func;
        },
        async onReset(event: Event): Promise<void> {
            const newInput = {} as Input;

            if ((event.target as HTMLButtonElement).name == 'all') {
                await this.resetConfirm()
                    .then(() => {
                        for (const key in this.input) {
                            if (key in this.input) {
                                newInput[key as keyof Input] = {};
                            }
                        }
                        this.$emit('update:input', newInput);
                    })
                    .catch(() => undefined);
            } else {
                newInput.plan = {};

                if (this.input.plan) {
                    for (const key in this.input.plan) {
                        if (key in this.input.plan) {
                            newInput.plan[key] = this.input.actually[key];
                        }
                    }
                }
                this.$emit('update:input', { ...this.input, ...newInput });
            }

            // noinspection ES6MissingAwait
            this.$nextTick(() => {
                this.updateOutput(this.input);
                this.updateStorage();
            });
        },
        onChangeLvl(type: keyof Input, key: string, value: number|string): number {
            value = (typeof value === 'string') ? parseInt(value) : value;

            if (value == 0) {
                delete this.input[type][key];
                delete this.output[type][key];
            } else {
                this.$emit('update:input', { ...this.input,
                    [type]: { ...this.input[type],
                        [key]: value,
                    },
                });
            }

            this.$nextTick(() => {
                this.updateOutput(this.input, key);
                this.updateStorage();
            });

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
        updateStorage(): void {
            localStorage.setItem(this.localStorageKey, JSON.stringify(this.input));
        },

        totalTableClasses(type: string, key: string): object {
            const val = this.output.total.intermediate[key];

            if (type == 'plan') {
                return {
                    'plan plus': val.plan,
                    'hide': val.plan == 0,
                };
            }
            if (type == 'sum') {
                const isGrowth = (val.sum > val.actually);

                return {
                    'result-growth': isGrowth,
                    'result-not-growth': !isGrowth,
                    'hide': val.sum == 0,
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

$reset-button-colors: (
    "all": #a90000,
    "plan": #cca814,
);

.total-table {
    border: 2px solid #424547;
    border-spacing: 0;
    color: #aab2b6;
    width: 100%;
    max-width: 600px;
    margin-right: auto;
    margin-left: auto;
    margin-bottom: 3%;
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
</style>
