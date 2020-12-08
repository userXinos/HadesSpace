<template>
  <div class="item">
    <div class="item-icon"
         :class="[(icon.isNotIcon) ? '' : 'icon-pos']"
    >
      <div v-if="!icon.isNotIcon"
          :class="[icon.bgClass, 'icon-background']"
      >
          <span
              :class="[icon.classes, 'icon']"
              :style="{'background-image': `url( ${icon.img} )`}"
          />
      </div>
      <template v-else>
          <span
              :class="[icon.classes]"
              :style="{'background-image': `url( ${icon.img} )`}"
          />
      </template>
    </div>
    <p class="item-text">
      {{ $t(text.locKey) }}
      {{ text.after }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'CatalogItem',
  props: ['text', 'icon'],
};
</script>

<style scoped>
@import "../css/icons.css";

.item {
  width: 17%;
  height: 250px;
  margin: 10px;
  background-color: #1b2325;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  transition: 0.5s;
}
.item:hover {
  box-shadow: 1px 1px #000000, 2px 2px #000000, 3px 3px #000000, 4px 4px #000000,
  5px 5px #000000, 6px 6px #000000, 7px 7px #000000;
  transform: translateX(-7px);
  transition: 0.5s;
  background-color: #1f282b;
}
.item-text {
  height: 90px;
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  vertical-align: middle;
  font-size: 17px;
  color: white;
  position: absolute;
  top: 150px;
  padding: 5%;
}
.item-icon {
  position: absolute;
  bottom: 50%;
  left: 30%;
}
.icon-pos {
  bottom: 80%;
  left: 20%;
}
.item-icon > span {
  display: block;
  width: 60px;
  height: 60px;
  background-size: auto 60px;
  background-repeat: no-repeat;
  background-position: center;
}
.item-icon > .icon-background {
  width: 90px;
  height: 90px;
  background-size: auto 80px;
  bottom: 80%;
  left: 20%;
}
.item-icon > .icon-background > .icon {
  width: 50px;
  height: 50px;
}
.art-bg {
  background-image: url(../img/artifact_background.png);
  opacity: 0.9;
}

@media screen and (max-width: 960px) {
  .item {
    width: 100%;
    height: 80px;
    flex-direction: row;
    position: relative;
    margin: 5px;
  }
  .item-icon > .icon-background {
    width: 50px;
    height: 50px;
    background-size: auto 40px;
  }
  .item-icon > .icon-background > .icon {
    width: 20px;
  }
  .item-icon {
    position: absolute;
    right: 0%;
    bottom: 20%;
    left: 10%;
  }
  .icon-pos {
    bottom: 80%;
    right: 100%;
  }
  .item-icon > span {
    width: 45px;
    height: 45px;
    background-size: auto 45px;
  }
  .item-text {
    position: static;
    width: 60%;
  }
}
</style>
