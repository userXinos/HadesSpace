<template>
  <div v-if="show">
    <template v-if="!isCerb">
      <div class="icon-background" :class="divClasses">
        <span class="icon" :style="spanStyle" :class="spanClasses"></span>
      </div>
    </template>
    <template v-else>
      <div class="cerberus">
        <img :src="url" alt="" />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    url: {type: String},
    objName: {type: String},
    argsFromApp: {type: Object},
  },
  data() {
    return {
      isCerb: this.argsFromApp.category == 'cerberus',
      isModules: this.argsFromApp.data == 'modules',
      isShips: this.argsFromApp.data == 'ships',
      show: true,

      divClasses: {},
      spanStyle: {},
      spanClasses: {},
    };
  },
  created() {
    if (this.isShips && !this.isCerb) {
      this.show = false;
    }
    this.divClasses = {
      'module-bg': this.isModules,
      'spaceBuildings-bg': !this.isModules,
      'round-bg': this.objName == 'TimeModulator' || this.objName.endsWith('Star'),
      'warpLine-bg': this.objName == 'WarpLaneHub',
    };
    this.spanStyle = {
      backgroundImage: (this.objName != 'WarpLaneHub') ? `url('${this.url}')` : '',
    };
    this.spanClasses = {
      'warpLine-body': this.objName == 'WarpLaneHub',
    };
  },
};
</script>

<style>
  /* <style scr=...> не работает... */
  @import "../css/icons.css";
</style>
