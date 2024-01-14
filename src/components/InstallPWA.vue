<template>
  <div>
    <div
      class="button"
      @click="isOpenModal = true"
    >
      <div class="icon" />
      <span
        v-t="'TID_SHIP_UPGRADE_DLG_MODULE_INSTALL_BTN'"
        class="name"
      />
    </div>

    <Modal
      v-model:open="isOpenModal"
      title="PWA"
      :size="SIZES.SMALL"
    >
      <template #body>
        <div class="modal">
          <p v-t="'INSTALL_PWA_NOTE'" />
          <p
            v-if="!error"
            class="animated-button"
            @click="install"
          >
            <span />
            <span />
            <span />
            <span />
            {{ $t('TID_SHIP_UPGRADE_DLG_MODULE_INSTALL_BTN') }}
          </p>

          <p>
            <span v-if="error == 'NOT_PROVIDED'">
              {{ $t('INSTALL_PWA_ERR_NOT_PROVIDE') }}
            </span>
            <span v-if="error == 'NOT_SUPPORTED'">
              {{ $t('INSTALL_PWA_ERR_NOT_SUPPORTED') }}
            </span>
            <span v-if="error == 'INSTALLED'">
              {{ $t('TID_ADD_MODULE_DLG_ALREADY_INSTALLED') }}
            </span>
          </p>
        </div>
      </template>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Modal, { SIZES } from '@/components/Modal.vue';

export interface Props {
    error: string|null,
    install: () => void
}

defineProps<Props>();
const isOpenModal = ref(false);
</script>

<style scoped lang="scss">
@use "../style/vars";
@import "../style/userInput";

$mv: 1000px;

.button {
    cursor: pointer;
    justify-content: left;
    align-items: center;
    display: none;

    @media (display-mode: browser) {
        display: flex;
    }

    .icon {
        background: url("../img/icons/download.svg") no-repeat;
        width: 30px;
        height: 30px;

        @media screen and (max-width: $mv) {
            width: 28px;
            height: 28px;
            padding-bottom: 2%;
            margin-left: 3%;
        }
    }
    .name {
        display: none;
        font-size: 140%;
        padding-left: 15px;

        @media screen and (max-width: $mv) {
            display: block;
        }
    }

}
.modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
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
