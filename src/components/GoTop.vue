<template>
  <transition>
    <div
      v-if="show"
      class="btn"
      @click="scrollToTop"
    ><div class="icon" /></div>
  </transition>
</template>

<script>
import debounce from 'lodash.debounce';

export default {
    data() {
        return {
            show: false,
        };
    },
    created() {
        this.hide = debounce(() => this.show = false, 4000);
    },
    mounted() {
        document.addEventListener('scroll', this.scroll);
    },
    unmounted() {
        document.removeEventListener('scroll', this.scroll);
    },
    methods: {
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        scroll() {
            const show = (window.scrollY > 300);
            if (this.show != show) {
                this.show = show;
                this.hide();
            }
        },
    },
};
</script>
<style scoped lang="scss">
@import "../style/vars";

.btn {
    position: fixed;
    right: 20px;
    bottom: 30px;
    width: 7vh;
    height: 7vh;
    background-color: $border-color;
    border-radius: 100%;
    cursor: pointer;
    transition: 0.5s;

    &:hover {
        transform: scale(1.2);
    }

    .icon {
        height: 100%;
        background-color: black;
        transform: rotate(270deg);

        mask-image: url(../img/icons/arrow.svg);
        mask-position: center;
        mask-size: 4vh;
        mask-repeat: no-repeat;
    }
}

.v-enter-active, .v-leave-active {
    bottom: 30px;
    transition: ease-in-out, bottom 500ms
}
.v-enter-from, .v-leave-to {
    bottom: -100px;
    transition: ease-in-out, bottom 500ms;
}
</style>


