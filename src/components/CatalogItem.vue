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
      <span class="text"> {{ $t(text.locKey, text.params) }} </span>
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
            padding-top: 0;
            padding-left: 5%;
            margin-right: -5%;
            width: 50px;
        }
    }
    .text {
        // https://stackoverflow.com/a/39269074
        font-size: calc((13vw - 3rem) / 7);

        text-align: center;
        color: $text-color;
        padding: 30px 5px;

        @media screen and (max-width: $mw) {
            font-size: 130%;
            width: 100%;
        }
    }

    @media screen and (max-width: $mw) {
        height: 80px;
        flex-direction: row;
        position: relative;
        margin: 5px;
    }
}
</style>
