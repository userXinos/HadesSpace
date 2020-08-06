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
  name: 'Icon',
  props: {
    icon: String,
    objName: String,
    argsContent: Object,
  },
  data() {
    return {
      url: (this.icon) ? require(`../img/${this.argsContent.iconDir}/${this.icon}.png`) : '',
      isCerb: this.argsContent.category == 'cerberus',
      isModules: this.argsContent.iconDir == 'Modules',
      isShips: this.argsContent.iconDir == 'Ships',
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

<style src="../css/icons.css"></style>
