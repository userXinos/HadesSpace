<template>
  <div class="main">
    <div>
      <div class="container-name">{{ title }}</div>
      <div class="container">
        <router-link class="item-link" to="/yellowstar">
          <div class="item">
            <div class="item-icon">
                <span
                    class="icon"
                    :style="{
                    'background-image': `url( ${require('../img/Stars/star_yellow.png')} )`
                  }"
                ></span>
            </div>
            <div class="item-text">{{ $t('TID_YELLOW_STAR') }}</div>
          </div>
        </router-link>
        <router-link class="item-link" to="/redstar">
          <div class="item">
            <div class="item-icon">
                <span
                    class="icon"
                    :style="{
                    'background-image': `url( ${require('../img/Stars/star_red.png')} )`
                  }"
                ></span>
            </div>
            <div class="item-text">{{ $t('TID_RED_STAR') }}</div>
          </div>
        </router-link>
        <router-link class="item-link" to="/whitestar">
          <div class="item">
            <div class="item-icon">
                <span
                    class="icon"
                    :style="{
                    'background-image': `url( ${require('../img/Stars/star_white.png')} )`
                  }"
                ></span>
            </div>
            <div class="item-text">{{ $t('TID_WHITE_STAR') }}</div>
          </div>
        </router-link>
        <router-link class="item-link" to="/bluestar">
          <div class="item">
            <div class="item-icon">
                <span
                    class="icon"
                    :style="{
                    'background-image': `url( ${require('../img/Stars/star_blue.png')} )`
                  }"
                ></span>
            </div>
            <div class="item-text">{{ $t('TID_BLUE_STAR') }}</div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: this.$t('stars'),
    };
  },
  metaInfo() {
    return {
      title: this.title,
    };
  },
};
</script>

<style src="../css/catalog.css"></style>
