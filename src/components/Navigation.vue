<template>
  <nav class="container">
    <ul
      v-click-outside="hideAll"
      class="sections"
    >
      <li
        v-for="(section, key) of sections"
        :key="key"
        @click="switchSection(section)"
      >
        <div>
          <h2
            :class="['name', (section.isShow) ? 'selected' : '']"
          >{{ $t(section.text.locKey) }}</h2>
          <ul
            v-if="section.isShow"
            class="list"
          >
            <li
              v-for="(child, key1) of section.children"
              :key="key1"
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
          </ul>
        </div>
      </li>
    </ul>
  </nav>
</template>

<script>
import { getSectionsPages } from '@Scripts/parsePages.js';

const sections = getSectionsPages();
sections.forEach((e) => e.isShow = false);

export default {
    name: 'Nav',
    data() {
        return { sections };
    },
    methods: {
        hideAll() {
            this.sections.forEach((e) => e.isShow = false);
        },
        switchSection(obj) {
            const result = !obj.isShow;
            this.hideAll();
            obj.isShow = result;
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
    }
    .sections {
        height: 100%;
        list-style-type: none;
        cursor: pointer;
        user-select: none;
        // user-drag: none; - "Unknown CSS property 'user-drag'"
    }
    .sections > li {
        display: inline-block;
        margin: 0 10px;

        @media screen and (max-width: $mv) {
            display: block;
            margin: 0;
        }

        .selected {
            color: $selected-color;
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

    }
}
</style>
