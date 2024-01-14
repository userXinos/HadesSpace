<template>
  <div>
    <div class="offset" />

    <!--  content -->
    <slot />


    <header
      class="header"
    >

      <div class="buttons">

        <template v-if="isMinMode">
          <div
            class="sidebar"
            @click="openSidebar"
          />
        </template>

        <template v-else>
          <Navigation />
          <div>
            <Settings />
            <InstallPWA v-bind="pwaOpts" />
          </div>
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

<script setup lang="ts">
import Navigation from './TheNavigation.vue';
import Settings from '@/components/Settings.vue';
import InstallPWA from '@/components/InstallPWA.vue';

export interface Props {
    isMinMode: boolean,
    openSidebar: () => void
    pwaOpts: {
        error: string,
        install: () => void
    }
}
defineProps<Props>();
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
        position: fixed;
        left: 0;
        top: 0;

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


            $logo-wight: 187px;
            .image {
                background: url("../img/logo.png") center no-repeat;
                background-size: 80%;
                padding-top: $height;
                padding-left: $logo-wight;

                @media screen and (max-width: $mw) {
                    background-size: 50%;
                    background-position: left;
                    padding-top: $height;
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

            div:last-child {
                display: flex;
                align-items: center;
            }

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
