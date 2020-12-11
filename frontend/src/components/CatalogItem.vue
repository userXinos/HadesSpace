<template>
  <div class="ratio">
    <div class="content">
      <div class="item">
        <div class="item-icon">
          <div v-if="!icon.isNotIcon"
              :class="[icon.bgClass, 'icon-background']"
          >
              <span
                  :class="[icon.classes, 'icon']"
                  :style="{'background-image': `url( ${icon.img} )`}"
              />
          </div>
          <div v-else
               class="not-icon-background"
          >
              <span
                  :class="[icon.classes]"
                  :style="{'background-image': `url( ${icon.img} )`}"
              />
          </div>
        </div>
        <p class="item-text">
          {{ $t(text.locKey) }}
          {{ text.after }}
        </p>
      </div>
    </div>
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
  margin: 5%;
  background-color: #1b2325;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  transition: 0.5s;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.item:hover {
  box-shadow: 1px 1px #000000, 2px 2px #000000, 3px 3px #000000, 4px 4px #000000,
  5px 5px #000000, 6px 6px #000000, 7px 7px #000000;
  transform: translateX(-7px);
  transition: 0.5s;
  background-color: #1f282b;
}
.item-text {
  text-align: center;
  color: white;
  padding: 5% 5% 30%;
}
.item-icon {
  position: relative;
  width: 100%;
  height: 100%;
}
.item-icon > .not-icon-background > span {
  display: block;
  width: 60px;
  height: 60px;
  background-size: auto 60px;
  background-repeat: no-repeat;
  background-position: center;
}
.item-icon > .icon-background {
  background-size: auto 80px;
}
.item-icon > .not-icon-background {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.item-icon > .icon-background > .icon {
  width: 50px;
  height: 50px;
}
.art-bg {
  background-image: url(../img/artifact_background.png);
  opacity: 0.9;
}
.ratio {
  display: inline-block;
  position: relative;
  width: 20%;
}

.content {
   margin-top: 140%;
}

@media screen and (max-width: 960px) {
  .ratio {
    width: 100%;
  }
  .content {
    margin-top: 1%;
  }
  .item {
    width: 100%;
    height: 80px;
    flex-direction: row;
    position: relative;
    margin: 5px;
  }
  .item-icon > .icon-background,  .item-icon > .not-icon-background {
    width: 50px;
    height: 50px;
    background-size: auto 40px;
  }
  .item-icon > .icon-background > .icon {
    width: 20px;
  }
  .item-icon {
    position: absolute;
    top: 20%;
    left: 10%;
    width: 0;
    height: 0;
  }
  .item-icon > .not-icon-background > span {
    width: 45px;
    height: 45px;
    background-size: auto 45px;
  }
  .item-text {
    position: static;
    width: 60%;
    padding: 0;
  }
}
</style>
