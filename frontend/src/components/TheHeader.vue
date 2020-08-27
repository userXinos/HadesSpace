<template>
  <header class="header">
    <div
        v-if="isMinMode"
        v-click-outside="hideSidebar"
    >
      <div class="btn-sidebar"
           @click="isShowSidebar = true"
      />
      <div class="bg-sidebar"
           @click.self="hideSidebar"
           v-if="isShowSidebar"
      />
      <div class="sidebar"
           :class="{'show-sidebar': isShowSidebar}"
      >
        <v-nav/>
        <langs :is-min-mode="true"/>
      </div>
    </div>
    <template v-else>
      <v-nav/>
      <langs/>
    </template>
    <div class="logo">
      <router-link to="/">
        <img src="../img/logo.png" alt="logo">
      </router-link>
    </div>
  </header>
</template>

<script>
import TheNavigation from './TheHeaderNavigation';
import TheLanguagesButton from './TheHeaderLanguagesButton';

export default {
  name: 'Header',
  components: {
    VNav: TheNavigation,
    Langs: TheLanguagesButton,
  },
  data() {
    return {
      isMinMode: (window.innerWidth < 960),
      isShowSidebar: false,
    };
  },
  watch: {
    isShowSidebar: function(val) {
      document.body.style.overflow = (val) ? 'hidden' : 'auto';
    },
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.isMinMode = (window.innerWidth < 960);
    });
  },
  methods: {
    hideSidebar() {
      this.isShowSidebar = false;
    },
  },
};
</script>

<style scoped>
.header {
  --header-height: 80px;
  --bnt-color: #101415;
  --btn-hover-color: #242e2f;

  background: #101415;
  position: fixed;
  width: 100%;
  height: var(--header-height);
  top: 0;
  z-index: 10;
  left: 0;
  border-bottom: 2px solid #20282b;
  transition: top 0.2s ease-in-out;
  display: flex;
  justify-content: center;
}
.logo img {
  height: var(--header-height);
}
.logo a {
  display: contents;
}
.bg-sidebar{
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.4;
}
.btn-sidebar {
  background-image: url("../img/icons/menu.svg");
  background-size: 100%;
  width: 40px;
  height: 40px;
  position: absolute;
  left: 25px;
  top: 25%;
  cursor: pointer;
}
.sidebar {
  background-color: #161b1d;
  height: 100%;
  width: 0;
  position: fixed;
  left: 0;
  z-index: 11;
  overflow-x: auto;
  transition: 0.5s;
}
.show-sidebar {
  width: 80%;
}
</style>
