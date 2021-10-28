<template>
  <div>
    <template v-if="items.length > 1">
      <h2>{{ $t("content") }}</h2>
      <div class="list">
        <ol>
          <li v-for="item in items" :key="item">
            <a :href="'#' + item">
              {{ $t(rawObj[item].TID) }}
            </a>
          </li>
        </ol>
      </div>
    </template>
    <template v-if="items[0] === null">
      <displayObject
        :obj="rawObj"
        :merge-cells="mergeCellsItems()"
        :lvl-col-key="args.lvlColKey"
        :collvl-start-at="args.collvlStartAt"
        :args-content="args"
        :cerberus-modules="cerberusModules"
      />
    </template>
    <template v-else>
      <displayObject
        v-for="item in items"
        :key="item"

        :obj="rawObj[item]"
        :merge-cells="mergeCellsItems(item)"
        :lvl-col-key="args.lvlColKey"
        :collvl-start-at="args.collvlStartAt"
        :cerberus-modules="args.cerberusModules"
        :args-content="args"
      />
    </template>
  </div>
</template>

<script>
import DisplayObject from './DisplayObject.vue';

export default {
  components: {DisplayObject},
  props: {
    args: Object,
  },
  data() {
    return {
      items: [],
      rawObj: {},
      cerberusModules: {},
    };
  },
  created() {
    this.$Progress.set(30);
    this.args.data
        .then((raw) => {
          this.rawObj = raw.data;
          return raw;
        })
        .then((raw) => {
          this.items = this.args.single ?
          [this.args.single] :
          this.args.category ?
          raw.byTypes[this.args.category.toLowerCase()] :
          [null];
        })
        .then(() => {
          this.$fixScroll();
          this.$Progress.finish();
        })
        .catch((err) => {
          console.error(err);
          this.$Progress.fail();
        });
  },
  methods: {
    mergeCellsItems(key) {
      if (this.args.dontFixTables) {
        if (Array.isArray(this.args.dontFixTables)) {
          return !this.args.dontFixTables.includes(key);
        } else {
          return !this.args.dontFixTables;
        }
      }
      return true;
    },
  },
};
</script>

<style scoped>
.list {
  padding: 0 5% 0;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 5%;
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
