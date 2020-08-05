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
        :icons="icons"
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
        :icons="icons"
        :cerberus-modules="cerberusModules"
      />
    </template>
  </div>
</template>

<script>
import i18n from '../js/modules/i18n';
import DisplayObject from './DisplayObject.vue';

// let importAll = (r) => r.keys().map(r)
//
// importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));

const filesData = {
  // modules: import('../../../data/modules'),
  // ships: import('../../../data/capital_ships'),
  // yellow_star_sectors: import('../../../data/yellow_star_sectors'),
  // planets: import('../../../data/planets.js'),
  // colonize_prices: import('../../../data/colonize_prices'),
  // planet_levels: import('../../../data/planet_levels'),
  // artifacts: import('../../../data/artifacts'),
  // stars: import('../../../data/stars'),
  // spacebuildings: import('../../../data/spacebuildings'),
  // player_goals: import('../../../data/player_goals'),
  achievements: import('../../../generateGameData/data/achievements'),
  // alliance_levels: import('../../../data/alliance_levels'),
  // cerberus_stations: import('../../../data/cerberus_stations'),
};
const iconsData = {
  // modules: require('../img/modules_icons/*.png'),
  // ships: require('../img/ships_icons/*.png'),
  // spacebuildings: require('../img/spaceBuildings_icons/*.png'),
  // stars: require('../img/stars_icons/*.png'),
};

export default {
  i18n,
  components: {DisplayObject},
  props: {
    args: Object,
  },
  data() {
    return {
      items: [],
      rawObj: {},
      cerberusModules: {},
      icons: {},
    };
  },
  created() {
    filesData[this.args.data]
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
        .catch(console.error);

    if (this.args.category == 'cerberus') {
      filesData['modules']
          .then((raw) => {
            raw.byTypes.cerberus.forEach((e) => {
              this.$set(this.cerberusModules, e, raw.data[e]);
            });
          })
          .catch(console.error);
    }
    if (this.args.data in iconsData) {
      this.icons = iconsData[this.args.data];
      this.icons.argsFromApp = this.args;
    }
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
}
.list ol {
  border: 5px outset #586066;
  list-style-type: none;
  columns: 200px auto;
  font-size: 125%;
}
.list li {
  /* border: 1px solid #424547; */
  text-align: center;
}
</style>
