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
          <div :class="{'selected': (selected === index) }">
            <div class="icon" />
            <h2 class="name">{{ $t(section.text.locKey) }}</h2>
          </div>

          <TransitionGroup
            name="list"
            tag="ul"
            class="list"
            :style="{ '--total': section.children.length }"
          >
            <li
              v-for="(child, i) of (selected === index) ? section.children : []"
              :key="i"
              :style="{'--i': i + 1}"
            >

              <template v-if="child.link.type == 'router'">
                <router-link :to="child.link.path">
                  <h2 class="name">{{ $t(child.text.locKey, child.text.params) }}</h2>
                </router-link>
              </template>
              <template v-if="child.link.type == 'external'">
                <a
                  :href="child.link.path"
                  target="_blank"
                >
                  <h2 class="name">{{ $t(child.text.locKey, child.text.params) }}</h2>
                </a>
              </template>

            </li>
          </TransitionGroup>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import { getSectionsPages } from '@Scripts/parsePages.js';

export default {
    name: 'Navigation',
    data() {
        return {
            sections: getSectionsPages(),
            selected: null,
        };
    },
    created() {
        this.$router.afterEach(() => {
            this.select(null);
        });
    },
    methods: {
        select(i) {
            if (this.selected === i) {
                this.selected = null;
                return;
            }
            this.selected = i;
        },
    },
};
</script>

<style scoped lang="scss">
@import "../css/vars";

$mv: 1000px;
$color: #101415;
$hover-color: #242e2f;
$selected-color: #5fdba7;

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
        // user-drag: none; - "Unknown CSS property 'user-drag'"

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
                    justify-content: space-between;
                    align-items: center;

                    @media screen and (max-width: $mv) {
                        justify-content: left;
                    }

                    .icon {
                        margin-right: 5%;
                        width: 18px;
                        height: 20px;
                        background: url(http://localhost:8080/img/arrow.f223a946.svg) no-repeat right/100%;
                        transition: 0.5s;

                        @media screen and (max-width: $mv) {
                            margin-right: 0;
                            margin-left: 3%;
                            background-position: right;
                        }
                    }
                }

                .selected {
                    .name {
                        color: $selected-color;
                    }
                    .icon {
                        transform: rotate(90deg);
                    }
                }
            }
        }
    }

    .name {
        padding: 0;
        line-height: $header-height;

        @media screen and (max-width: $mv) {
            padding: 15px 0 15px 6%;
            line-height: normal;
            text-align: left;
        }
    }

    .list {
        padding-top: 1%;
        position: absolute;
        min-width: 250px;
        font-size: 10px;
        list-style-type: none;

        @media screen and (max-width: $mv) {
            position: inherit;
        }

        a {
            display: block;
            transition: .5s linear;
            text-decoration: none;
        }
        li {
            background-color: $color;

            &:hover {
                background-color: $hover-color;
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
