<template>
  <div id="app">
    <Head><title>HadesSpace</title></Head>
    <vue-progress-bar />
    <the-header />

    <router-view />

    <go-top />
  </div>
</template>

<script>
import { Head } from '@vueuse/head';
import GoTop from '@/components/GoTop.vue';
import TheHeader from './TheHeader';

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

            this.$router.beforeEach((to, from, next) => {
                if (to.fullPath === from.fullPath) {
                    return next();
                }
                if (to.meta.progress !== undefined) {
                    const meta = to.meta.progress;
                    this.$Progress.parseMeta(meta);
                }
                this.$Progress.start();
                next();
            });
            this.$router.afterEach(() => {
                this.$Progress.finish();
            });
        },
    },
};
</script>
