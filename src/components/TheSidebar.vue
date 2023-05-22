<template>
  <modal v-model:open="propModel">
    <transition>
      <div
        v-if="open"
        v-touch:swipe="swipeHandler"
        class="sidebar"
      >
        <navigation />
        <settings />
      </div>
    </transition>
  </modal>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import Navigation from './TheNavigation.vue';
import Modal from '@/components/Modal.vue';
import Settings from '@/components/Settings.vue';

export interface Props {
    open: boolean
    swipeHandler?: () => void
}

const props = withDefaults(defineProps<Props>(), {
    swipeHandler: () => (() => undefined),
});
const emit = defineEmits(['update:open']);
const propModel = computed({
    get: () => props.open,
    set: (value: boolean) => emit('update:open', value),
});
</script>

<style scoped lang="scss">
@import "../style/vars";

$sidebar-size: 80%;
$border-size: 3px;

.sidebar {
    position: fixed;
    background-color: $background-elements;
    height: 100%;
    width: 80%;
    border-right: solid 2px $border-color;
    padding: 80px 2%;
    overflow: auto;
    top: 0;
}

.v-enter-active, .v-leave-active {
    left: 0;
    transition: 700ms ease, left 350ms
}
.v-enter-from, .v-leave-to {
    left: calc( (#{$sidebar-size} + #{$border-size}) * -1 );
    transition: 550ms ease, left 300ms;
}
</style>
