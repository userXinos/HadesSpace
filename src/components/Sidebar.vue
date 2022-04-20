<template>
  <div>
    <div
      class="sidebar"
      :class="{'show-sidebar': isOpen}"
    >
      <navigation />
    </div>
  </div>
</template>

<script>
import Navigation from './Navigation.vue';

export default {
    name: 'Sidebar',
    components: { Navigation },
    props: {
        isOpen: {
            type: Boolean,
            requested: true,
            default: false,
        },
    },
};
</script>

<style scoped lang="scss">
@import "../css/vars";

$sidebar-size: 80%;
$border-size: 3px;

.sidebar {
    background-color: #161b1d;
    opacity: 1;
    height: 100%;
    width: $sidebar-size;
    position: fixed;
    left: calc( (#{$sidebar-size} + #{$border-size}) * -1 );
    z-index: 2;
    transition: 0.5s;
    border-right: $border-color solid $border-size;
    padding-top: $header-height;
    overflow: auto;
}
.show-sidebar {
    left: 0;
}
</style>
