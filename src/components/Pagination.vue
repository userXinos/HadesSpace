<template>
  <ul class="pagination">
    <li
      class="arrow prev"
      @click="currentPage = currentPage - 1"
    />

    <li
      v-for="n of pages"
      :key="n"
      :class="{'selected': n === $props.modelValue}"
      @click="currentPage = n"
    >
      {{ n }}
    </li>

    <li
      class="arrow next"
      @click="currentPage = currentPage + 1"
    />
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';

export interface Props {
    maxPage: number
}
const props = defineProps<Props>();
const currentPage = defineModel<number>({
    default: 1,
    required: true,
    set(value) {
        if (value < 1) {
            value = 1;
        }
        if (value > props.maxPage) {
            value = props.maxPage;
        }
        return value;
    },
});

const halfWindow = 2;
const pages = computed(() => {
    let startPage = Math.max(currentPage.value - halfWindow, 1);
    let endPage = Math.min(currentPage.value + halfWindow, props.maxPage);

    if (endPage - startPage + 1 < 5) {
        if (startPage === 1) {
            endPage = Math.min(props.maxPage, startPage + 4);
        } else if (endPage === props.maxPage) {
            startPage = Math.max(1, endPage - 4);
        }
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
});
</script>

<style scoped lang="scss">
@import "../style/vars";


.pagination {
  display: flex;
    justify-content: center;
    gap: 10px;
    list-style: none;
    padding: 2% 0;

    li {
        width: 50px;
        aspect-ratio: 1 / 1;
        background:  $accent-color;
        color: black;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 10px;
        cursor: pointer;

        &.selected {
            background: darken($accent-color, 30%);
        }

        &:hover:not(.arrow) {
            background: darken($accent-color, 15%);
        }
    }

    .arrow {
        background: url('@/img/icons/arrow.svg') center no-repeat;
        background-size: 60%;

        &:hover {
            opacity: .6;
        }

        &.prev {
            transform: scaleX(-1);
        }
    }
}
</style>
