<template>
  <div class="offset">
    <header class="header">


      <div class="buttons">

        <template v-if="isMinMode">
          <div
            class="sidebar"
            @click="openSidebar"
          />
        </template>

        <template v-else>
          <navigation />
          <settings />
        </template>

      </div>

      <div class="logo">
        <router-link to="/">
          <div class="image" />
        </router-link>
      </div>

    </header>
  </div>
</template>

<script>
import Navigation from './TheNavigation.vue';
import Settings from '@/components/Settings.vue';

export default {
    name: 'Header',
    components: { Navigation, Settings },
    props: {
        isMinMode: {
            type: Boolean,
            requested: true,
            default: null,
        },
        openSidebar: {
            type: Function,
            requested: true,
            default: null,
        },
    },
};
</script>

<style scoped lang="scss">
@import "../style/vars";

$mw: 1000px;

@mixin header($height) {
    .offset {
        height: $height;
    }
    .header {
        background: $background;
        width: 100%;
        height: $height;
        border-bottom: 2px solid $border-color;
        z-index: 2;
        position: fixed;
        left: 0;

        .logo {
            position: absolute;
            top: 0;
            display: flex;
            justify-content: center;
            width: 100%;
            pointer-events: none;

            @media screen and (max-width: $mw) {
                justify-content: start;
                padding-left: 70px;
            }

            .image {
                background: url("../img/logo.png") round center;
                padding-top: $height;
                padding-left: calc(#{$height} * 2);
                background-position: inherit;

                @media screen and (max-width: $mw) {
                    background-image: url("../img/mini-logo.png");
                    padding-left: $height;
                }
            }

            a {
                pointer-events: all;
                display: contents;
            }
        }

        .buttons {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            padding: 0 1%;

            .sidebar {
                background: url("../img/icons/menu.svg") round center;
                padding: calc(#{$height} / 4) 29px;
                display: block;
                cursor: pointer;
            }
        }
    }
}

@include header($height: $header-default-height);

@media screen and (max-width: $mw) {
    @include header($height: 60px);
}


</style>
