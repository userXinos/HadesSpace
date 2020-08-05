<template>
  <div id="app">
<TheHeader/>
<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link>-->
<!--    </div>-->
    <router-view/>
  </div>
</template>

<script>
import i18n from '../js/modules/i18n';
import TheHeader from './TheHeader';

export default {
  i18n,
  name: 'App',
  components: {TheHeader},
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
/*#nav {*/
/*  padding: 30px;*/
/*  a {*/
/*    font-weight: bold;*/
/*    color: #2c3e50;*/
/*    &.router-link-exact-active {*/
/*      color: #42b983;*/
/*    }*/
/*  }*/
/*}*/
</style>
