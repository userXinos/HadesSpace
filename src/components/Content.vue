<!--suppress TypeScriptUnresolvedReference -->
<template>
  <div class="container">

    <template v-if="Object.keys(args.data).length > 1">
      <div class="title">
        <div
          class="chat-icon"
          :class="[contentOpened ? 'opened' : 'closed']"
          @click="contentOpened = !contentOpened"
        />
      </div>
      <transition>
        <ol
          v-if="contentOpened"
          class="list"
          :class="{'with-icons': 'iconDir' in args}"
        >
          <li
            v-for="item of args.data"
            :key="item.Name"
          >
            <a :href="`#${item.Name}`">
              <template v-if="'iconDir' in args">
                <div>
                  <div
                    v-if="item.PrefabModel || item.Icon || item.Model"
                    class="icon"
                  >
                    <icon
                      :name="getRandomIfArr(item.PrefabModel || item.Icon || item.Model)"
                      :dir="args.iconDir"
                    />
                  </div>
                  <p>{{ $t(item.TID) }}</p>
                </div>
              </template>
              <template v-else>
                {{ $t(item.TID) }}
              </template>
            </a>
          </li>
        </ol>
      </transition>
    </template>

    <v-data
      v-for="(value, key) in args.data"
      :key="key"

      :data="value"
      :table-opts="args.tableOpts"
      :icon-dir="args.iconDir"
    />

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import VData from './Data.vue';
import Icon from '@/components/Icon.vue';

export interface Props {
    args: {
        data: Record<string, object>,
        tableOpts?: object,
        iconDir: string
    }
}
defineProps<Props>();

const contentOpened = ref(true);

function getRandomIfArr(elem) {
    if (Array.isArray(elem)) {
        const i = Math.floor(Math.random() * elem.length);

        return elem[i];
    }
    return elem;
}
</script>

<style scoped lang="scss">
@import "../style/vars";

.container {
    .title {
        margin: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2%;
    }

    .list {
        border: 3px solid $border-color;
        border-radius: 10px;
        list-style: none;
        columns: 200px auto;
        font-size: 125%;
        margin: 0 3%;
        padding: 10px;

        &.with-icons {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;

            li {
                display: inline-block;
                flex-grow: 1;
                padding: 20px;
                width: 100%;

                max-width: 90px;

                a > div {
                    display: flex;
                    align-items: center;
                    flex-direction: column;

                    .icon {
                        width: 100%
                    }
                }

                &:lang('de'), &:lang('fr'), &:lang('it') {
                    word-break: break-all;
                    padding-right: 20px;
                    padding-left: 20px;

                    a > div {
                        width: 130%;
                        display: flex;
                        align-items: center;
                        flex-direction: column;

                        .icon {
                            width: 80%
                        }
                    }
                }

                @media screen and (max-width: 1600px){
                    max-width: 80px;
                    font-size: 100%;
                }
                @media screen and (max-width: 1500px){
                    max-width: 70px;
                    font-size: 90%;
                }
                @media screen and (max-width: 1024px){
                    max-width: 60px;
                    font-size: 80%;
                }
                @media screen and (max-width: 960px){
                    max-width: 50px;
                    font-size: 70%;
                }

                p {
                    padding-top: 5px;
                    text-align: center;
                }
            }
        }
    }

}
.chat-icon {
    width: 50px;
    height: 50px;
    cursor: pointer;
    background: url('../img/icons/chat_arrow.svg') no-repeat right/100%;
    animation-duration: 0.7s;

    &.opened {
        transform: rotateX(180deg);
        animation-name: open;
    }
    &.closed {
        animation-name: close;
    }

    @keyframes open {
        0% {transform: scale(0.1);}
        50% {transform: rotateX(180deg);}
        100% {transform: scale(1) rotateX(180deg);}
    }
    @keyframes close {
        0% {transform: scale(0.1);}
        50% {transform: rotateX(0);}
        100% {transform: scale(1) rotateX(0);}
    }
}
.v {
    &-leave-active {
        animation: out 0.5s;
    }

    &-enter-active {
        animation: in 0.5s;
    }

    @keyframes in {
        0% {transform: scale(0);opacity: 0;}
        50% {transform: scale(1.1);opacity: 1;}
        100% {transform: scale(1);opacity: 1;}
    }
    @keyframes out {
        0% {transform: scale(1);opacity: 1;}
        50% {transform: scale(1.1);opacity: 1;}
        100% {transform: scale(0);opacity: 0;}
    }

}
</style>
