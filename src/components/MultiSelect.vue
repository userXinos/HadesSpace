<template>
  <div
    v-click-outside="() => isOpen = false"
    class="multiselect"
    :class="{'__active': isOpen}"
  >
    <slot
      :selected="selected"
      :toggle-dropdown="toggleDropdown"
    >
      <button
        class="multiselect_btn"
        @click="toggleDropdown"
      >
        <input
          ref="filterInput"
          v-model="filter"
          type="text"
          @click.stop
        >
        <div
          v-show="!isOpen"
          class="label"
        >
          <slot
            name="label"
          >
            <p v-if="selected.length">
              {{ $t('SELECTED', [selected.length]) }}
            </p>
            <p
              v-else
              v-t="'SELECT'"
            />
          </slot>
        </div>

        <div
          v-if="!isOpen"
          class="clear"
          @click.stop="clear"
        />
        <div class="arrow" />
      </button>
    </slot>

    <Transition name="list">
      <ul
        v-if="isOpen"
        class="multiselect_list"
      >
        <li
          v-for="(option, id) in filteredOptions"
          :key="id"
          @click="selectOption(option)"
        >
          <input
            type="checkbox"
            :checked="$props.modelValue.includes(option)"
          >
          <span class="label">{{ option[$props.displayField] }}</span>
        </li>
      </ul>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

export interface Props {
    options: [{ [key: string]: unknown }];
    displayField: string
}
const props = defineProps<Props>();

const selected = defineModel<unknown[]>({ required: true });
const isOpen = ref(false);
const filterInput = ref<HTMLElement>();
const filter = ref<string>();
const filteredOptions = computed(() =>
    props.options.filter((e) => e[props.displayField]?.toLowerCase().includes(filter.value?.toLowerCase())),
);

function toggleDropdown() {
    isOpen.value = !isOpen.value;

    if (isOpen.value) {
        filter.value = '';
        filterInput.value?.focus();
    }
}

function selectOption(option) {
    if (selected.value.includes(option)) {
        selected.value.splice(selected.value.indexOf(option), 1);
    } else {
        selected.value.push(option);
    }
}
function clear() {
    selected.value = [];
}
</script>

<style scoped lang="scss">
@import "../style/vars";

.multiselect {
    position: relative;
    height: 100%;
    z-index: 1;

    &.__active {
        .arrow {
            transform: rotate(270deg);
        }
    }

    &_btn {
        cursor: pointer;
        display: flex;
        font-weight: bold;
        transition: background .2s;
        width: 100%;
        background: inherit;
        font-size: 16px;
        height: 50px;

        .arrow {
            width: 16px;
            height: 16px;
            background-repeat: no-repeat;
            background-image: url("@/img/icons/arrow.svg");
            transform: rotate(90deg);
            transition: transform .2s;
            position: absolute;
            right: 10px;
            top: 18px;
        }
        .clear {
            width: 24px;
            height: 24px;
            background-repeat: no-repeat;
            background-image: url("@/img/icons/cross.svg");
            position: absolute;
            right: 30px;
            top: 14px;
        }

        .label {
            position: absolute;
            width: 90%;
            height: 92%;
            display: flex;
            justify-content: center;
            align-items: center;
            background: inherit;
        }
        input {
            position: absolute;
            width: 80%;
            background: inherit;
            border: none;
            padding: 5px;
            top: 10px;
            left: 10px;

            &:active, &:focus {
                background: inherit;
                border: 1px solid $border-color;
                border-radius: 5px;
                outline: none
            }
        }
    }

    &_list {
        position: absolute;
        width: 100%;
        box-shadow: 0 12px 30px rgba(0, 0, 0, 0.1), 0 7.7037px 12.7407px rgba(0, 0, 0, 0.061), 0 1.62963px 3.25926px rgba(0, 0, 0, 0.061);
        background: inherit;
        border-radius: 4px;
        margin-top: 6px;
        overflow-y: auto;
        max-height: 300px;
        text-align: center;
        cursor: pointer;

        &::-webkit-scrollbar {
            width: 4px;
            height: 40px;
        }

        ::-webkit-scrollbar-thumb {
            min-height: 40px;
        }

        li {
            padding: 8px;
            display: flex;
            justify-content: start;

            .label {
                width: 100%;
            }

            &:hover {
                filter: invert(0.9);
            }
        }
    }
}

.list {
    &-enter-active, &-leave-active {
        transition: max-height .18s linear;
    }

    &-enter-from, &-leave-to {
        max-height: 0;
    }
}
</style>
