<template>
  <div class="container">
    <div
      class="minus"
      @click="checkAndSend(props.value - 1)"
    />
    <div class="input-wrap">
      <input
        ref="inputRef"
        type="text"
        :value="value"
        @change="checkAndSend(parseInt($event.target.value))"
      >
    </div>
    <div
      class="plus"
      @click="checkAndSend(props.value + 1)"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

export interface Props {
    value: number,
    min: number,
    max: number,
}
const props = defineProps<Props>();
const emit = defineEmits(['update:value']);
const inputRef = ref<HTMLInputElement>();

onMounted(() => {
    inputRef.value.focus();
    inputRef.value.select();
});

function checkAndSend(num: number) {
    if (num < props.min) {
        num = props.min;
    }
    if (num > props.max) {
        num = props.max;
    }

    emit('update:value', num);
}
</script>

<!--suppress CssUnknownTarget -->
<style scoped lang="scss">
@import "../style/vars";
.input-wrap {
    max-width: 100%;

    input {
        width: 100%;
        font-size: 200%;
        color: #444;
        text-align: center;
        border: none;
    }
}


.container {
    display: flex;
    align-items: center;
    grid-gap: 10px;
    max-height: 70px;
}

.minus, .plus {
    user-select: none;
    height: 100%;
    width: 100%;
    background: $background-elements;
    cursor: pointer;
    border-radius: 10px;
    overflow:hidden;

    padding: 10px;
}
.minus {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' fill='%23aee3fc' viewBox='0 -12 32 32'%3E%3Cpath d='M28 0H4a4 4 0 1 0 0 8h24a4 4 0 1 0 0-8'/%3E%3C/svg%3E");
}
.plus {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xml:space='preserve' fill='%23aee3fc' viewBox='0 0 45.402 45.402'%3E%3Cpath d='M41.267 18.557H26.832V4.134A4.127 4.127 0 0 0 22.707 0a4.126 4.126 0 0 0-4.124 4.135v14.432H4.141a4.137 4.137 0 0 0-4.138 4.135 4.143 4.143 0 0 0 1.207 2.934 4.122 4.122 0 0 0 2.92 1.222h14.453V41.27c0 1.142.453 2.176 1.201 2.922a4.11 4.11 0 0 0 2.919 1.211 4.13 4.13 0 0 0 4.129-4.133V26.857h14.435c2.283 0 4.134-1.867 4.133-4.15-.001-2.282-1.852-4.15-4.133-4.15z'/%3E%3C/svg%3E");
}

</style>
