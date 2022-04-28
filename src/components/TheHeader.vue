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
          <img
            src="../img/logo.png"
            alt="logo"
          >
        </router-link>
      </div>

    </header>
  </div>
</template>

<script>
import Navigation from './Navigation.vue';
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

.offset {
    height: $header-height;
}
.header {
    background: $background-elements;
    width: 100%;
    height: $header-height;
    border-bottom: 2px solid $border-color;
    z-index: 1;
    position: fixed;
    left: 0;

    .logo {
        position: absolute;
        top: 0;
        display: flex;
        justify-content: center;
        width: 100%;
        pointer-events: none;

        img {
            height: $header-height;
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
            background: url("@Img/icons/menu.svg") round center;
            padding: calc(#{$header-height} / 5) 30px;
            display: block;
            cursor: pointer;
        }
    }
}
</style>
