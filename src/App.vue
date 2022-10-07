<!--suppress HtmlUnknownAttribute -->
<!--suppress HtmlUnknownTag -->

<template>
  <div>
    <Head><title>Hades Space</title></Head>
    <vue-progress-bar />

    <div
      v-touch:swipe="swipeHandler"
    >
      <div>


        <the-header
          :is-min-mode="isMinMode"
          :open-sidebar="() => setShowSidebar(true)"
        >

          <div class="target-wrap"><div id="table-head-target" /></div>
          <router-view />

        </the-header>

        <Sidebar
          v-if="isMinMode"
          v-model:open="sidebarIsOpen"
          :swipe-handler="swipeHandler"
        />

      </div>
    </div>

    <go-top />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

import { Head } from '@vueuse/head';
import GoTop from '@/components/GoTop.vue';
import TheHeader from '@/components/TheHeader.vue';
import Sidebar from '@/components/TheSidebar.vue';
// import PWAPrompt from '@/components/PWAPrompt.vue';

import appSidebar from '@/composables/appSidebar';

const MAX_WIDTH = 1000;

export default defineComponent({
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
        resize() {
            this.isMinMode = (window.innerWidth < MAX_WIDTH);
            this.onResize();
        },
    },
});
</script>
<style scoped lang="scss">

.target-wrap {
    position: fixed;
    z-index: 1; // <- либо ставить под router-view, но нужно прописать отступ от шапки в top, либо z-index
    width: 100%;

    #table-head-target {
        margin: -1% 3% 0;
    }
}
</style>
