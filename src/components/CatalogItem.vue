<template>
  <div class="content">
    <div class="item">
      <div class="icon">
        <Icon
          v-if="icon"
          :dir="icon.dir"
          :name="icon.name"
        />
      </div>
      <span
        v-t="text.locKey"
        class="text"
      />
    </div>
  </div>
</template>

<script>
import Icon from './Icon.vue';

export default {
    name: 'CatalogItem',
    components: { Icon },
    props: {
        text: {
            type: Object,
            default: () => ({
                locKey: '',
            }),
            requested: true,
        },
        icon: {
            type: Object,
            default: () => ({}),
            requested: true,
        },
    },
};
</script>

<style scoped lang="scss">
@import "../css/vars";

$mw: 960px;

.content {
    margin-top: 150%;

    @media screen and (max-width: $mw) {
        margin-top: 1%;
    }
}
.item {
  margin: 5%;
  background-color: #1b2325;
  display: flex;
  align-items: center;
  flex-direction: column;

  transition: 0.5s;

  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

    &:hover {
        box-shadow: 1px 1px #000000, 2px 2px #000000, 3px 3px #000000, 4px 4px #000000,
        5px 5px #000000, 6px 6px #000000, 7px 7px #000000;
        transform: translateX(-7px);
        transition: 0.5s;
        background-color: #1f282b;
    }

    .icon {
        width: 90px;
        padding-top: 30%;

        @media screen and (max-width: $mw) {
            justify-content: center;
            padding-top: 0;
            width: 42px;
            position: absolute;
            left: 5%;
        }
    }
    .text {
        font-size: 130%;
        text-align: center;
        color: $text-color;
        padding: 30px 5px;

        @media screen and (max-width: $mw) {
            //position: static;
            //width: 60%;
            //padding: 0;
        }
    }

    @media screen and (max-width: $mw) {
        justify-content: center;
        width: 100%;
        height: 80px;
        flex-direction: row;
        position: relative;
        margin: 5px;
    }
}

//@media screen and (max-width: 960px) {
//  .item-icon > .icon-background,  .item-icon > .not-icon-background {
//    width: 50px;
//    height: 50px;
//    background-size: auto 40px;
//  }
//  .item-icon > .icon-background > .icon {
//    width: 42%;
//    height: 42%;
//  }
//  .item-icon {
//    position: absolute;
//    top: 20%;
//    left: 10%;
//    width: 0;
//    height: 0;
//  }
//  .item-icon > .not-icon-background > span {
//    width: 45px;
//    height: 45px;
//    background-size: auto 45px;
//  }
//}
</style>
