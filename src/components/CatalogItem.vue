<template>
  <div class="item">
    <div class="icon">
      <Icon
        v-if="icon"
        :dir="icon.dir"
        :name="icon.name"
      />
    </div>
    <span class="text"> {{ $t(text.locKey, text.params) }} </span>
  </div>
</template>

<script setup lang="ts">
import Icon from './Icon.vue';

export interface Props {
    text: {locKey: string}
    icon: object
}
defineProps<Props>();
</script>

<style scoped lang="scss">
@import "../style/vars";

$mw: 960px;

.item {
    height: 100%;
    background-color: $background-elements;
    border-radius: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    transition: 0.5s;

    &:hover {
        transform: scale(0.93);
        transition: 0.5s;
        filter: brightness(120%);
    }

    .icon {
        width: 40%;
        max-width: 90px;
        padding-top: 20%;
    }
    .text {
        font-size: 120%;
        text-align: center;
        padding: 10% 5px;

        @media screen and (max-width: $mw) {
            font-size: 80%;
        }
    }
}
</style>
