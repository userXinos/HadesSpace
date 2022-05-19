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

<script lang="js">
import { defineComponent } from 'vue';

import Navigation from './TheNavigation.vue';
import Modal from '@/components/Modal.vue';
import Settings from '@/components/Settings.vue';

export default defineComponent({
    name: 'Sidebar',
    components: { Navigation, Settings, Modal },
    props: {
        open: Boolean,
        swipeHandler: {
            type: Function,
            default: undefined,
        },
    },
    emits: ['update:open'],
    computed: {
        propModel: {
            get() {
                return this.open;
            },
            set(value) {
                this.$emit('update:open', value);
            },
        },
    },
});
</script>

<style scoped lang="scss">
@import "../style/vars";

$sidebar-size: 80%;
$border-size: 3px;

.sidebar {
    position: fixed;
    background-color: #161b1d;
    height: 100%;
    width: 80%;
    border-right: #202a22 solid 3px;
    padding-top: 80px;
    overflow: auto;
    top: 0;
    z-index: 5;
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
