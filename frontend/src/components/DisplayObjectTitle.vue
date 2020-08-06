<template>
  <div>
    <div class="title" v-if="!Array.isArray(obj.TID) && obj.TID">
      <icon
        v-if="argsContent.iconDir && (typeof icon != 'object')"
        :icon="icon"
        :obj-name="obj.Name"
        :args-content="argsContent"
      ></icon>
      <div class="title-text">
        <a :id="obj.Name" :href="'#' + obj.Name">
          {{ $t(obj.TID) }}
        </a>
      </div>
    </div>
    <div
      class="desc"
      v-if="!Array.isArray(obj.TID_Description) && obj.TID_Description"
      v-html="getDescr(obj.TID_Description)"
    ></div>
    <h2
      class="stringStsts"
      v-for="(value, key) in stringStats"
      :key="key + '-stats'"
      :class="{ 'info-mark': infoData[key].text }"
      v-on="infoData[key].text ? { click: (e) => clickInfo(e, key) } : {}"
    >
      <b>{{ getFormatKey(key) }}</b
      >:
      {{ getFormaValue(key, value) }}
    </h2>

    <!--    TODO избавиться от дублирования-->
    <template v-if="cerberusModule.locKey">
      <h2 class="stringStsts cerberusModule">
        {{ $t(cerberusModule.locKey) }}:
      </h2>
      <h2
        class="stringStsts"
        v-for="(value, key) in cerberusModule.value"
        :key="key + '-cerbStats'"
        :class="{ 'info-mark': infoData[key].text }"
        v-on="infoData[key].text ? { click: (e) => clickInfo(e, key) } : {}"
      >
        <b>{{ getFormatKey(key) }}</b
        >:
        {{ getFormaValue(key, value) }}
      </h2>
    </template>

    <stats-info
      :header="statsInfo.header"
      :description="statsInfo.description"
      :show.sync="statsInfo.show"
    >
    </stats-info>
  </div>
</template>

<script>
import formatValue from '../js/modules/formatValue';
import formatKey from '../js/modules/formatKey';
import {genDescr, getTextInfoStats} from '../js/modules/descriptionsHandler';
import Icon from './DisplayObjectIcon.vue';
import StatsInfo from './DisplayObjectStatsInfo.vue';

export default {
  name: 'Title',
  components: {
    Icon,
    StatsInfo,
  },
  props: {
    obj: Object,
    stringStats: Object,
    argsContent: Object,
    cerberusModule: Object,
  },
  data() {
    return {
      infoData: {},
      statsInfo: {
        header: '',
        description: '',
        show: false,
      },
    };
  },
  computed: {
    mergedObjects() {
      return {
        ...this.stringStats,
        ...this.cerberusModule.value,
      };
    },
    icon() {
      return this.obj.Icon || this.obj.Model;
    },
  },
  watch: {
    mergedObjects: {
      immediate: true,
      handler: function(value) {
        Object.keys(value).forEach((key) => {
          this.newInfoBlock(key);
        });
      },
    },
  },
  methods: {
    getFormatKey(...args) {
      const $t = (key) => this.$t.call(this, key);
      return formatKey($t, this.objName, ...args);
    },
    getFormaValue(...args) {
      const $t = (key) => this.$t.call(this, key);
      const $te = (key) => this.$te.call(this, key);
      return formatValue($t, $te, null, ...args);
    },
    getDescr(...args) {
      const $t = (key) => this.$t.call(this, key);
      const $te = (key) => this.$te.call(this, key);
      return genDescr($t, $te, this.obj.Name, ...args);
    },
    newInfoBlock(key) {
      const $t = (key) => this.$t.call(this, key);
      const $te = (key) => this.$te.call(this, key);
      const text = getTextInfoStats($t, $te, key);
      const obj = (this.infoData[key] = {});

      if (!text) return;
      obj.header = this.getFormatKey(key);
      obj.text = text;
    },
    clickInfo(event, key) {
      this.statsInfo.header = this.infoData[key].header;
      this.statsInfo.description = this.infoData[key].text;
      this.statsInfo.show = true;
    },
  },
};
</script>

<style scoped>
.desc {
  margin: 1px 5%;
  padding: 10px 0;
  color: #afb8be;
  font-size: 150%;
  text-align: center;
}
.desc > p {
  padding: 10px 0;
  font-size: 80%;
  text-align: right;
}
.desc > p:before {
  content: "\2014\00A0";
}

.stringStsts {
  padding: 2px 6%;
  text-align: left;
  font-weight: normal;
  font-size: 120%;
  color: #afb8be;
  list-style-type: circle;
  margin: 0 -2%;
}
.cerberusModule {
  text-decoration: underline;
  font-weight: bold;
  padding-top: 10px;
}

.info-mark {
  color: #cfd6ad;
  cursor: pointer;
}
</style>

<style>
.title {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 3% 0 0;
}
.title-text {
  margin-left: 10px;
  font-size: 150%;
  color: #ccd7de;
}
.title-text a {
  color: #ccd7de;
  text-decoration: none;

  scroll-margin-top: 6rem;
}
.title-text a:hover {
  color: #90979b;
  text-decoration: underline;
}
.title-text a:active {
  color: #a33f17;
}
@media screen and (max-width: 550px) {
  .stringStsts,
  .desc {
    font-size: 100%;
    text-align: left;
  }
  .title-text {
    font-size: 120%;
  }
}
</style>
