<template>
  <nav class="container">
    <ul
      v-click-outside="() => select(null)"
      class="sections"
    >
      <li
        v-for="(section, index) of sections"
        :key="index"
        class="section"
        @click="() => select(index)"
      >
        <div>
          <div :class="{'selected': (selected == index) }">
            <div class="icon" />
            <h2 class="name">{{ $te(section.text.locKey) ? $t(section.text.locKey) : '' }}</h2>
          </div>

          <TransitionGroup
            name="list"
            tag="ul"
            class="list"
            :style="{ '--total': section.children?.length }"
          >
            <li
              v-for="(child, i) of (selected === index) ? section.children : []"
              :key="i"
              :style="{'--i': i + 1}"
            >

              <template v-if="child.link.type == 'router'">
                <router-link :to="child.link.path">
                  <h2 class="name">{{ $t(child.text.locKey, [child.text.params]) }}</h2>
                </router-link>
              </template>
              <template v-if="child.link.type == 'external'">
                <a
                  :href="child.link.path"
                  target="_blank"
                >
                  <h2 class="name">{{ $t(child.text.locKey, [child.text.params]) }}</h2>
                </a>
              </template>

            </li>
          </TransitionGroup>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import router from '@Utils/Vue/router';
import { getSectionsPages } from '@Utils/parsePages';

const sections = getSectionsPages();
const selected = ref<number|null>(null);

router.afterEach(() => select(null));

function select(i) {
    if (selected.value === i) {
        selected.value = null;
        return;
    }
    selected.value = i;
}
</script>

<style scoped lang="scss">
@import "../style/vars";

$mv: 1000px;
$selected-color: $border-color;

.container {
    display: flex;
    align-items: center;

    @media screen and (max-width: $mv) {
        position: revert;
        width: 100%;
        display: inline-block;
        margin-bottom: 3%;
    }
    .sections {
        height: 100%;
        list-style-type: none;
        cursor: pointer;
        user-select: none;

        .section {
            display: inline-block;
            margin: 10px;

            @media screen and (max-width: $mv) {
                display: block;
                margin: 0;
            }

            > div {
                > div {
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    gap: 5px;

                    @media screen and (max-width: $mv) {
                        justify-content: left;
                    }

                    .icon {
                        margin-right: 5%;
                        width: 18px;
                        height: 20px;
                        background: url(../img/icons/arrow.svg) no-repeat right/100%;
                        transition: 0.5s;
                        transform: rotate(90deg);

                        @media screen and (max-width: $mv) {
                            margin-right: 0;
                            margin-left: 3%;
                            background-position: right;
                        }
                    }

                  h2 {
                    word-break: keep-all;
                  }
                }

                .selected {
                    .name {
                        color: $selected-color;
                    }
                    .icon {
                        transform: rotate(270deg);
                    }
                }
            }
        }
    }

    .name {
        padding: 0;
        line-height: $header-default-height;
        font-size: 140%;

        @media screen and (max-width: $mv) {
            padding: 15px 0 15px 6%;
            line-height: normal;
            text-align: left;
            font-size: 180%;
        }
    }

    .list {
        padding-top: 1%;
        position: absolute;
        min-width: 250px;
        font-size: 12px;
        list-style-type: none;

        @media screen and (max-width: $mv) {
            border: none;
            position: inherit;
        }

        a {
            display: block;
            transition: .5s linear;
            text-decoration: none;
        }
        li {
            background-color: $background;
            border-color: $border-color;
            border-style: solid;
            border-width: 0 2px;

            &:first-child {
                border-top-width: 2px;
                border-top-right-radius: 10px;
                border-top-left-radius: 10px;
            }
            &:last-child {
                border-bottom-width: 2px;
                border-bottom-right-radius: 10px;
                border-bottom-left-radius: 10px;
            }
            &:hover {
                filter: brightness(150%);
            }

            @media screen and (max-width: $mv) {
                border: none;
            }
        }
        .name {
            line-height: normal;
            padding: 7% 5%;
            text-align: left;
        }

        // animation
        // credits: https://codepen.io/shshaw/pen/YLmdxz
        &-enter-active {
            transition: all 0.3s cubic-bezier(.36,-0.64,.34,1.76);
            transition-delay: calc( 0.1s * var(--i) );
        }

        &-leave-active {
            transition: all 0.3s;
            transition-delay: calc( 0.1s * (var(--total) - var(--i)) );
        }

        &-enter-active, &-leave-active {
            max-height: calc( 70px * var(--i) );
        }
        &-enter-from, &-leave-to {
            opacity: 0;
            max-height: 0;
        }

        &-enter-from {
            transform: rotateY(-90deg);
        }
    }
}
</style>
