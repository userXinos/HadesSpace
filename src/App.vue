<template>
  <div id="app">
    <Head><title>HadesSpace</title></Head>

    <!--suppress HtmlUnknownTag -->
    <vue-progress-bar />
    <the-header />

    <router-view />

    <go-top />
  </div>
</template>

<script>
import { Head } from '@vueuse/head';
import GoTop from '@/components/GoTop.vue';
import TheHeader from '@/components/TheHeader.vue';

export default {
    name: 'App',
    components: { Head, GoTop, TheHeader },
    mounted() {
        this.$Progress.finish();
    },
    created() {
        this.progressBar();
    },
    methods: {
        progressBar() {
            this.$Progress.start();

            this.$router.beforeEach(async (to, from, next) => {
                if (to.fullPath === from.fullPath) {
                    return next();
                }

                this.$Progress.start();
                this.$Progress.set(30);
                next();
            });
            this.$router.afterEach(async () => {
                this.$Progress.finish();
            });
        },
    },
};
</script>
