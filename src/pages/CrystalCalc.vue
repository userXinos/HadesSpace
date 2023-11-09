<template>
  <div>
    <v-head><title>{{ title }}</title></v-head>
    <h1 class="topic"> {{ title }} </h1>

    <div class="main">
      <div class="input-wrap crystals">
        <p
          v-t="'TID_HUD_CRYSTALS'"
          :class="statsStyleName('PriceInCrystals')"
          class="stats-style"
        />
        <input
          v-model="crystals"
          type="number"
          min="0"
          @input="crystalChange($event.target.value)"
        >
      </div>

      <p
        v-t="'TIME'"
        class="stats-style"
        :class="statsStyleName('UnlockTime')"
      />
      <div class="time">
        <div class="input-wrap">
          <input
            v-model="timeD"
            type="number"
            min="0"
            @input="timeChange"
          >
        </div>
        <div class="hr-min">
          <div class="input-wrap">
            <input
              v-model="timeH"
              type="number"
              min="0"
              @input="timeChange"
            >
          </div>
          <span>:</span>
          <div class="input-wrap">
            <input
              v-model="timeM"
              type="number"
              min="0"
              @input="timeChange"
            >
          </div>
        </div>
      </div>
      <div class="input-wrap">
        <p
          v-t="'TID_HUD_CREDITS'"
          class="stats-style"
          :class="statsStyleName('CreditStorage')"
        />
        <input
          v-model="credits"
          type="number"
          min="0"
          @input="creditChange($event.target.value)"
        >
      </div>
      <div class="input-wrap">
        <p
          v-t="'TID_HUD_HYDROGEN'"
          class="stats-style"
          :class="statsStyleName('FuelStorage')"
        />
        <input
          v-model="hydrogen"
          type="number"
          min="0"
          @input="hydrogenChange($event.target.value)"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Head as VHead } from '@vueuse/head';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import statsStyleName from '@Handlers/statsStyleName';
import { CrystalConverter } from '../utils/crystalConverter';

const { t } = useI18n();
const title = t('CRYSTAL_CALCULATOR');

const crystals = ref<number>();
const timeD = ref<number>();
const timeH = ref<number>();
const timeM = ref<number>();
const credits = ref<number>();
const hydrogen = ref<number>();

function crystalChange(v) {
    const sec = roundToTwo(CrystalConverter.crystals2sec(v));
    timeD.value = Math.trunc(sec / 86400);
    timeH.value = Math.trunc((sec % 86400) / 3600);
    timeM.value = Math.trunc((sec % 3600) / 60);
    credits.value = roundToTwo(CrystalConverter.crystals2credit(v));
    hydrogen.value = roundToTwo(CrystalConverter.crystals2hydrogen(v));
}
function timeChange() {
    let sec = 0;
    sec += timeD.value * 86400;
    sec += timeH.value * 3600;
    sec += timeM.value * 60;
    crystals.value = Math.round(CrystalConverter.sec2crystals(sec));
    credits.value = undefined;
    hydrogen.value = undefined;
}
function creditChange(v) {
    crystals.value = Math.round(CrystalConverter.credit2crystals(v));
    timeH.value = undefined;
    timeM.value = undefined;
    timeD.value = undefined;
    hydrogen.value = undefined;
}
function hydrogenChange(v) {
    crystals.value = Math.round(CrystalConverter.hydrogen2crystals(v));
    timeH.value = undefined;
    timeM.value = undefined;
    timeD.value = undefined;
    credits.value = undefined;
}

function roundToTwo(num: number) {
    return +(`${Math.round(Number(`${num}e+2`)) }e-2`);
}
</script>

<style scoped lang="scss">
@import "../style/page.scss";
@import "../style/vars.scss";

.main {
  max-width: 200px;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 100px;
}
.stats-style {
  width: max-content;
}
.input-wrap {
  max-width: 100%;
  margin-bottom: 20px;

  input {
    margin-top: 5px;
    width: 100%;
    font-size: 200%;
    color: #444;
    text-align: center;
    border: none;
    border-radius: 10px;
  }
}
.crystals {
  margin-bottom: 50px;
}
.time {
  display: flex;

  .hr-min {
    padding-left: 20px;
    display: flex;
    align-items: center;
    gap: 2px;

    span {
      margin-bottom: 15px;
      font-size: 150%;
    }
  }
}
</style>
