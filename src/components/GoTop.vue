<template>
  <div
    :class="{'show': show}"
    class="btn"
    @click="scrollToTop"
  />
</template>

<script>
export default {
    data() {
        return {
            show: false,
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
        },
    },
};
</script>
<style scoped lang="scss">
.btn {
  position: fixed;
  right: 20px;
  bottom: -100px;
  width: 55px;
  height: 55px;

  background: #313033 url(../img/icons/arrow.svg) no-repeat center/20px;

  border-radius: 100%;
  opacity: 0.8;
  transform: rotate(270deg);
  cursor: pointer;
  transition: bottom 0.5s ease-in-out;

  &:hover {
    background-color: #454347;
    opacity: 1;
  }
}
.show {
  bottom: 30px;
}
</style>


