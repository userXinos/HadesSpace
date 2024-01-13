<template>
  <div class="container">
    <Head><title>{{ title }}</title></Head>

    <p v-t="'INSTALL_PWA_NOTE'" />
    <p
      v-if="deferredPrompt != null"
      class="animated-button"
      @click="go"
    >
      <span />
      <span />
      <span />
      <span />
      {{ $t('TID_SHIP_UPGRADE_DLG_MODULE_INSTALL_BTN') }}
    </p>
    <p v-if="deferredPrompt == null">
      <span v-if="err == 'INSTALLED'">
        {{ $t('TID_ADD_MODULE_DLG_ALREADY_INSTALLED') }}
      </span>
      <span v-if="err == undefined">
        {{ $t('INSTALL_PWA_ERR_NOT_PROVIDE') }}
      </span>
    </p>
  </div>
</template>

<script setup lang="ts">
import { Head } from '@vueuse/head';
import { useI18n } from 'vue-i18n';

interface BeforeInstallPromptEvent extends Event {
    readonly platforms: string[];
    readonly userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string; }>;
    prompt(): Promise<void>;
}
declare global {
    interface WindowEventMap {
        beforeinstallprompt: BeforeInstallPromptEvent;
    }
}
const { t } = useI18n();
const title = t('TID_SHIP_UPGRADE_DLG_MODULE_INSTALL_BTN');
let deferredPrompt: BeforeInstallPromptEvent = null;
let err: string;

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
});
window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    err = 'INSTALLED';
});
function go() {
    deferredPrompt.prompt();
}
</script>

<style scoped lang="scss">
@use "../style/vars";
@import "../style/page.scss";

.container {
    max-width: 680px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 5% auto 20%;

    p:first-child {
        margin-bottom: 50px;
    }
}

/*
 * Animated CSS button
 * Copyright Alexander Bodin 2019-09-07
 *
 * Useage: .class {@import button($button-size, $hue, $sat);}
 */
.animated-button {
    background: linear-gradient(-30deg, vars.$background-elements 50%, vars.$background 50%);
    padding: 20px 40px;
    margin: 12px;
    display: inline-block;
    transform: translate(0%, 0%);
    overflow: hidden;
    color: #d4e0f7;
    font-size: 20px;
    letter-spacing: 2.5px;
    text-align: center;
    text-transform: uppercase;
    text-decoration: none;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
    max-width: 100px;
    cursor: pointer;
}

.animated-button::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #8592ad;
    opacity: 0;
    -webkit-transition: .2s opacity ease-in-out;
    transition: .2s opacity ease-in-out;
}

.animated-button:hover::before {
    opacity: 0.2;
}

.animated-button span {
    position: absolute;
}

.animated-button span:nth-child(1) {
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to left, rgba(8, 20, 43, 0), vars.$border-color);
    animation: 2s animateTop linear infinite;
}

@-webkit-keyframes animateTop {
    0% {transform: translateX(100%);}
    100% {transform: translateX(-100%);}
}

@keyframes animateTop {
    0% {transform: translateX(100%);}
    100% {transform: translateX(-100%);}
}

.animated-button span:nth-child(2) {
    top: 0;
    right: 0;
    height: 100%;
    width: 2px;
    background: linear-gradient(to left, rgba(8, 20, 43, 0), vars.$border-color);
    animation: 2s animateRight linear -1s infinite;
}

@-webkit-keyframes animateRight {
    0% {transform: translateY(100%);}
    100% {transform: translateY(-100%);}
}

@keyframes animateRight {
    0% {transform: translateY(100%);}
    100% {transform: translateY(-100%);}
}

.animated-button span:nth-child(3) {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(to left, rgba(8, 20, 43, 0), vars.$border-color);
    animation: 2s animateBottom linear infinite;
}

@-webkit-keyframes animateBottom {
    0% {transform: translateX(-100%);}
    100% {transform: translateX(100%);}
}

@keyframes animateBottom {
    0% {transform: translateX(-100%);}
    100% {transform: translateX(100%);}
}

.animated-button span:nth-child(4) {
    top: 0;
    left: 0;
    height: 100%;
    width: 2px;
    background: linear-gradient(to left, rgba(8, 20, 43, 0), vars.$border-color);
    animation: 2s animateLeft linear -1s infinite;
}

@-webkit-keyframes animateLeft {
    0% {transform: translateY(-100%);}
    100% {transform: translateY(100%);}
}

@keyframes animateLeft {
    0% {transform: translateY(-100%);}
    100% {transform: translateY(100%);}
}
</style>
