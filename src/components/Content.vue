<template>
  <div class="container">

    <template v-if="Object.keys(args.data).length > 1">
      <div class="title">
        <h2>{{ $t('CONTENT') }}</h2>
        <div
          class="hamburger-icon"
          :class="{'opened': contentOpened}"
          @click="contentOpened = !contentOpened"
        ><div /></div>
      </div>
      <transition-group
        v-if="contentOpened"
        tag="ol"
        class="list"
      >
        <li
          v-for="{Name, TID} of args.data"
          :key="Name"
        >
          <a
            v-t="TID"
            :href="`#${Name}`"
          />
        </li>
      </transition-group>
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

<script>
import VData from './Data.vue';

/**
 * @typedef {Object} data - from @Data
 * @param {Object.<String, Object>}}
 */

/**
 * @typedef {Object} args
 * @param {data} data
 * @param {Object} tableOpts - pass to DataTable.vue
 * @param {String} iconDir - from @Img/
 */

export default {
    components: { VData },
    props: {
        args: { type: Object, required: true },
    },
    data() {
        return {
            contentOpened: false,
        };
    },
};
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
        border: 5px solid #586066;
        list-style-type: none;
        columns: 200px auto;
        font-size: 125%;
        margin: 0 3%;

        li {
            text-align: center;
        }
    }
}

// credits: https://codepen.io/Bilal1909/pen/KKdrmRP
.hamburger-icon {
    width: 50px;
    cursor: pointer;

    @media screen and (max-width: 1000px){
        width: 40px;
    }

    &:before, &:after, & div {
        background: $text-color;
        content: "";
        display: block;
        height: 5px;
        border-radius: 3px;
        margin: 7px 0;
        transition: 0.5s;

        @media screen and (max-width: 1000px){
            height: 4px;
            margin: 2px 0;
        }
    }

    &.opened {
        &:before {
            transform: translateY(12px) rotate(135deg);
        }
        &:after {
            transform: translateY(-12px) rotate(-135deg);
        }
        &  div {
            transform: scale(0);
        }
    }
}
</style>
