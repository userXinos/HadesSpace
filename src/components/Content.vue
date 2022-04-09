<template>
  <div class="cont">

    <template v-if="Object.keys(args.data).length > 1">
      <h2>{{ $t("CONTENT") }}</h2>
      <div class="list">
        <ol>
          <li
            v-for="{Name, TID} of args.data"
            :key="Name"
          >
            <a
              v-t="TID"
              :href="`#${key}`"
            />
          </li>
        </ol>
      </div>
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
        args: {
            /** @type {args} */
            type: Object,
            default: () => {},
            required: true,
        },
    },
};
</script>

<style scoped>
.list {
  padding: 0 5% 0;
  margin-left: auto;
  margin-right: auto;
}
.list ol {
  border: 5px outset #586066;
  list-style-type: none;
  columns: 200px auto;
  font-size: 125%;
}
.list li {
  text-align: center;
}
</style>
