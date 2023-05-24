<template>
  <div class="container">
    <span
      ref="slot"
      v-click-outside="() => showTooltip = false"
      :class="{'has-info': hasInfo[0]}"
      @click="click"
    > <slot /> </span>

    <teleport
      v-if="showTooltip"
      to="#modals"
      :disabled="!showTooltip"
    >
      <div
        class="triangle"
        :style="tooltipTriangleStyle"
      />
      <div
        class="tooltip"
        :style="tooltipStyle"
      >
        <p>{{ $t(hasInfo[1]) }}</p>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, ComputedRef, reactive, Ref, onMounted, onUnmounted } from 'vue';
import i18n from '@Utils/Vue/i18n';
import locKeys from '@Regulation/locKeys.mjs';

export interface Props {
    k: string,
}

const TOOLTIP_WIDTHS = [400, 200];
const { te } = i18n.global;
const props = defineProps<Props>();

const showTooltip = ref(false) as Ref<boolean>;
const screenState = ref(window.document.body.clientWidth > 900 ? 0 : 1) as Ref<0|1>;
const tooltipStyle = reactive({ top: '0', left: '0' });
const tooltipTriangleStyle = reactive({ top: '0', left: '0' });

const hasInfo: ComputedRef<[boolean, string]> = computed(hasInfoGetter);
const adjustmentX: ComputedRef<number> = computed(() => TOOLTIP_WIDTHS[screenState.value] / 2 + 10);

const slot = ref(null) as Ref<HTMLInputElement>;

onMounted(() => {
    document.addEventListener('scroll', scroll);
    window.addEventListener('resize', resize);
});
onUnmounted(() => {
    document.removeEventListener('scroll', scroll);
    window.removeEventListener('resize', resize);
});

function hasInfoGetter() {
    const newKey = locKeys[props.k] || props.k;

    if (te(`${newKey}_DESCR`)) {
        return [true, `${newKey}_DESCR`];
    }
    if (te(`${newKey}_INFO`)) {
        return [true, `${newKey}_INFO`];
    }
    return [false, ''];
}
function click() {
    if (!hasInfo.value[0]) {
        return;
    }
    showTooltip.value = true;

    const rect = slot.value.getBoundingClientRect();
    const aX = adjustmentX.value;
    const { clientWidth } = window.document.body;
    let { x, y, left, width } = rect;
    let x2 = left + width / 2;

    if (x <= aX) x = aX;
    if (x >= clientWidth - aX) x = clientWidth - aX;
    if (x2 >= clientWidth - 30) x2 = clientWidth - 30;

    tooltipTriangleStyle.top = tooltipStyle.top = `${y}px`;
    tooltipStyle.left = `${x}px`;
    tooltipTriangleStyle.left = `${x2}px`;
}

function scroll() {
    showTooltip.value = false;
}
function resize() {
    screenState.value = window.document.body.clientWidth > 900 ? 0 : 1;
}
</script>

<style scoped lang="scss">
@import "../style/vars";

$mw: 900px;

.container {
    display: initial;
}

.tooltip {
    position: fixed;
    display: block;
    background-color: $background-elements;
    border: solid $border-color 2px;
    border-radius: 10px;
    width: 400px;
    transform: translateX(-50%) translateY(-112%);

    p {
        padding: 20px;
        font-size: 100%;

        @media screen and (max-width: $mw) {
            padding: 10px;
            font-size: 80%;
        }
    }

    @media screen and (max-width: $mw) {
        width: 200px;
        transform: translateX(-50%) translateY(-107%);
    }
}
.triangle {
    position: fixed;
    display: block;
    border-width: 20px;
    border-style: solid;
    border-color: $border-color transparent transparent transparent;
    transform: translateX(-50%) translateY(-40%);

    @media screen and (max-width: $mw) {
        border-width: 15px;
    }
}

.has-info {
    color: $border-color;
}


</style>
