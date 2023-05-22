<template>
  <div class="content">
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

.content {
    margin-top: 150%;

    @media screen and (max-width: $mw) {
        margin-top: 1%;
    }
}
.item {
    margin: 5%;
    background-color: $background-elements;
    border-radius: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;

    transition: 0.5s;

    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    &:hover {
        transform: scale(0.93);
        transition: 0.5s;
        filter: brightness(120%);
    }

    .icon {
        width: 90px;
        padding-top: 30%;

        @media screen and (max-width: $mw) {
            padding-top: 0;
            padding-left: 5%;
            margin-right: -5%;
            width: 50px;
        }
    }
    .text {
        // https://stackoverflow.com/a/39269074
        font-size: calc((13vw - 3rem) / 7);

        text-align: center;
        color: $text-color;
        padding: 30px 5px;

        @media screen and (max-width: $mw) {
            font-size: 130%;
            width: 100%;
        }
    }

    @media screen and (max-width: $mw) {
        height: 80px;
        flex-direction: row;
        position: relative;
        margin: 5px;
    }
}
</style>
