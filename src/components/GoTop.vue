<template>
  <transition>
    <div
      v-if="show"
      class="btn"
      @click="scrollToTop"
    />
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
.btn {
    position: fixed;
    right: 20px;
    bottom: 30px;
    width: 55px;
    height: 55px;
    background: #313033 url(../img/icons/arrow.svg) no-repeat center/20px;
    border-radius: 100%;
    opacity: 0.8;
    transform: rotate(270deg);
    cursor: pointer;

  &:hover {
    background-color: #454347;
    opacity: 1;
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


