<!--suppress HtmlUnknownAttribute -->
<!--suppress HtmlUnknownTag -->

<template>
  <div id="app">
    <Head><title>Hades Space</title></Head>
    <vue-progress-bar />


    <Sidebar
      v-if="isMinMode"
      v-touch:swipe="swipeHandler"
      :is-open="sidebarIsOpen"
    />

    <div
      v-touch:swipe="swipeHandler"
      :class="{'mute': sidebarIsOpen}"
      @click.self="setShowSidebar(false)"
    >
      <div>

        <the-header
          :is-min-mode="isMinMode"
          :open-sidebar="() => setShowSidebar(true)"
        />
        <div class="target-wrap"><div id="table-head-target" /></div>

        <router-view />

      </div>
    </div>

    <go-top />
  </div>
</template>

<script>
import { ref } from 'vue';

import { Head } from '@vueuse/head';
import GoTop from '@/components/GoTop.vue';
import TheHeader from '@/components/TheHeader.vue';
import Sidebar from '@/components/Sidebar.vue';
// import PWAPrompt from '@/components/PWAPrompt.vue';

import appSidebar from '@/composables/appSidebar.js';

const MAX_WIDTH = 1000;

export default {
    name: 'App',
    components: { Head, GoTop, TheHeader, Sidebar },
    setup() {
        const isMinMode = ref(window.innerWidth < MAX_WIDTH);

        const { setShow, swipeHandler, onResize, isOpen } = appSidebar(isMinMode);

        return {
            isMinMode,
            setShowSidebar: setShow,
            sidebarIsOpen: isOpen,
            swipeHandler,
            onResize,
        };
    },
    mounted() {
        this.$Progress.finish();
        window.addEventListener('resize', this.resize);
    },
    unmounted() {
        window.removeEventListener('resize', this.resize);
    },
    created() {
        this.progressBar();
        this.$router.beforeEach(() => {
            this.setShowSidebar(false);
        });
    },
    methods: {
        progressBar() {
            this.$Progress.start();

            this.$router.beforeEach(async (to, from, next) => {
                if (to.path !== from.path) {
                    this.$Progress.start();
                    this.$Progress.set(30);
                }
                next();
            });
            this.$router.afterEach(async () => {
                this.$Progress.finish();
            });
        },
        resize(event) {
            this.isMinMode = (window.innerWidth < MAX_WIDTH);
            this.onResize(event);
        },
    },
};
</script>
<style scoped lang="scss">
.mute {
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.4;
    transition: 1s;

    > div {
        pointer-events: none;
    }
}

.target-wrap {
    position: fixed;
    z-index: 1;
    width: 100%;

    #table-head-target {
        margin: -1% 3% 0;
    }
}
</style>