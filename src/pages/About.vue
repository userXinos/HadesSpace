<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div class="container">
    <Head><title>{{ $t('ABOUT') }}</title></Head>

    <p class="text">
      This web app is an <Link text="open source" :to="gh" /> project that runs on <Link text="Hades' Star" to="https://hadesstar.com/" /> parsed <Link text="data" :to="`${gh}/tree/master/parser/raw`" /> owned by Parallel Space Inc.
      <br><br>
      If you have problems or suggestions, you can contact me on the discord <Link text="Xinos#2003" to="https://discord.com/users/359208482290925568" /> both on the <Link text="official Hades' Star server" to="https://discord.gg/hadesstar" /> and via direct messages, as well as <Link text="open an issue" :to="`${gh}/issues/new`" /> on GitHub
    </p>
    <br><br><br>
    <p class="min-text">
      made with ❤️ on GitHub
    </p>
  </div>
</template>

<script>
import { Head } from '@vueuse/head';
import { h } from 'vue';

function Link({ text, to }) {
    return h('a', {
        href: to,
        target: '_blank',
    }, [text, h('img', { src: require('@Img/icons/outbound.svg') })]);
}

export default {
    name: 'About',
    components: { Head, Link },
    data() {
        return { gh: 'https://github.com/userXinos/HadesSpace' };
    },
};
</script>

<style scoped lang="scss">
.container {
    max-width: 650px;
    margin-top: 5%;
    margin-left: auto;
    margin-right: auto;

    .text {
        font-size: 130%;
        margin: 0 6%;
    }
    .min-text {
        font-size: 80%;
        text-align: center;
    }
}
</style>
