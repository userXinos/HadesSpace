<template>
  <div class="container">
    <icon class="icon"
          v-if="argsContent.iconDir && (typeof icon != 'object')"
          :icon="icon"
          :obj-name="obj.Name"
          :args-content="argsContent"
    ></icon>
    <div
        v-if="!Array.isArray(obj.TID) && obj.TID"
        class="title"
        :id="obj.Name" >
      <a :href="'#' + obj.Name">
        {{ $t(obj.TID) }}
      </a>
    </div>
    <div
      class="desc"
      v-if="!Array.isArray(obj.TID_Description) && obj.TID_Description"
      v-html="getDescr(obj.TID_Description)"
    ></div>
    <div class="stringStats">
      <h2
          class="stringStatsElem"
          v-for="(value, key) in stringStats"
          :key="key + '-stats'"
          :class="{ 'info-mark': infoData[key].text }"
          v-on="infoData[key].text ? { click: (e) => clickInfo(e, key) } : {}"
      >
        <b>{{ getFormatKey(key) }}</b
        >:
        {{ getFormaValue(key, value) }}
    </h2>
    </div>

    <!--    TODO избавиться от дублирования-->
    <template v-if="cerberusModule.locKey">
      <h2 class="stringStatsElem cerberusModule">
        {{ $t(cerberusModule.locKey) }}:
      </h2>
      <h2
        class="stringStatsElem"
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
  color: #afb8be;
  font-size: 110%;
  text-align: left;
}
.desc > p {
  font-size: 80%;
  text-align: right;
}
.desc > p:before {
  content: "\2014\00A0";
}
.stringStats {
  padding: 10px 0;
}
.stringStatsElem {
  font-weight: normal;
  padding: 2px 0;
  font-size: 120%;
  color: #afb8be;
  text-align: left;
}
.cerberusModule {
  text-decoration: underline;
  font-weight: bold;
  padding-top: 10px;
  text-align: left;
}

.info-mark {
  color: #cfd6ad;
  cursor: pointer;
}
.icon {
  float: right;
  width: 10%;
  margin-left: 3%;
  margin-bottom: 3%;
}

@media screen and (max-width: 550px) {
  .stringStatsElem,
  .desc {
    font-size: 100%;
    text-align: left;
  }
  .icon {
    width: 21%;
  }
}
</style>

<style>
.title {
  font-size: 200%;
  color: #ccd7de;
  padding-bottom: 19px;
}
.title-heading {
  padding-bottom: 0;
  text-align: center;
}
.title:target {
  padding-top: 100px;
  margin-top: -100px;
}
.title a {
  color: #ccd7de;
  text-decoration: none;
}
.title a:hover {
  color: #90979b;
  text-decoration: underline;
}
.title a:active {
  color: #a33f17;
}

@media screen and (max-width: 550px) {
  .title {
    font-size: 120%;
  }
}
</style>
