<template>
  <div class="container">
    <v-title
      :obj="obj"
      :stringStats="stringStats"
      :cerberus-module="cerberusModule"
      :args-content="argsContent"
    ></v-title>
    <v-table
      v-if="table.maxLevel > 1"

      :max-level="table.maxLevel"
      :obj-name="correctObjName"
      :merge-cells="mergeCells"
      :lvl-col-key="lvlColKey"
      :col-lvl-start-at="collvlStartAt"
      :icon-dir="argsContent.iconDir"
      :head="table.head"
      :body="table.body"
    ></v-table>
  </div>
</template>

<script>
import VTable from './DisplayObjectTable.vue';
import VTitle from './DisplayObjectTitle.vue';

const ignoringHeaders = [
  'maxLevel',
  'Name',
  'TID',
  'TID_Description',
  'Icon',
  'SlotType',
  'Model',
  'AwardLevel',
];

export default {
  name: 'DisplayObject',
  components: {
    VTable,
    VTitle,
  },
  props: {
    obj: {
      type: Object,
      request: true,
    },
    mergeCells: Boolean,
    lvlColKey: String,
    collvlStartAt: Number,
    argsContent: Object,
    cerberusModules: Object,
  },
  data() {
    return {
      table: {
        maxLevel: this.obj.maxLevel,
        head: [],
        body: [],
      },
      stringStats: {},
      cerberusModule: {
        locKey: null,
        value: {},
      },
    };
  },
  computed: {
    correctObjName() {
      return (typeof this.obj.Name == 'string') ? this.obj.Name : null;
    },
  },
  watch: {
    cerberusModules(modules) {
      const key = Object.keys(this.stringStats)
          .filter((e) => Object.keys(modules).includes(e))[0];

      if (key) {
        const result = Object.assign({}, modules[key]);

        this.cerberusModule.locKey = 'cerb' + result.SlotType;
        ignoringHeaders.forEach((e) => delete result[e]);

        if (key == 'HydraBarrage') {
          const index = this.obj.HydraBarrage - 1;
          for (const [key, value] of Object.entries(result)) {
            if (Array.isArray(value)) {
              result[key] = value[index];
            }
          }
        }
        this.cerberusModule.value = result;
        this.$delete(this.stringStats, key);
      }
    },
  },
  created() {
    Object.keys(this.obj).forEach((key) => {
      if (Array.isArray(this.obj[key])) {
        this.table.head.push(key);
        this.table.body.push(this.obj[key]);
      } else if (!ignoringHeaders.includes(key)) {
        this.stringStats[key] = this.obj[key];
      }
    });
  },
};
</script>
<style scoped>
.container {
  padding: 1px 1%;
  margin-bottom: 3%;
}
@media screen and (max-width: 550px) {
  .container {
    padding: 1px 3%;
    margin-bottom: 5%;
  }
}
</style>
