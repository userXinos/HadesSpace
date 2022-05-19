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
export default {
    data() {
        return {
            open: false,
            hide: this.debounce(() => this.show = false),
        };
    },
    created() {
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
            this.show = (window.scrollY > 300);
            this.hide();
        },
        debounce(func, timeout = 2000) {
            let timer;
            return (...args) => {
                clearTimeout(timer);
                timer = setTimeout(() => {
                    func.apply(this, args);
                }, timeout);
            };
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


