<!--suppress HtmlUnknownAttribute -->
<!--suppress HtmlUnknownTag -->

<template>
  <div>
    <v-head><title>Hades Space</title></v-head>
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

    <the-footer />
    <go-top />
    <changelog
      :is-open="changelogIsOpen"
      @close="changelogOnClose"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, getCurrentInstance } from 'vue';
import router from '@Utils/Vue/router';

import { Head as VHead } from '@vueuse/head';
import GoTop from '@/components/GoTop.vue';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import Sidebar from '@/components/TheSidebar.vue';
import Changelog from '@/components/Changelog.vue';

import appSidebar from '@/composables/appSidebar';
import appChangelog from '@/composables/appChangelog';

const MAX_WIDTH = 1000;

const internalInstance = getCurrentInstance();
const { $Progress } = internalInstance.appContext.config.globalProperties;
const isMinMode = ref(window.innerWidth < MAX_WIDTH);

const { setShow: setShowSidebar, swipeHandler, isOpen: sidebarIsOpen } = appSidebar(isMinMode);
const { isOpen: changelogIsOpen, onClose: changelogOnClose } = appChangelog();

$Progress.start();

onMounted(() => window.addEventListener('resize', resize));
onUnmounted(() => window.removeEventListener('resize', resize));

router.beforeEach(async (to, from, next) => {
    if (to.path !== from.path) {
        $Progress.start();
        $Progress.set(30);
    }
    next();
});
router.afterEach(async () => $Progress.finish());
router.beforeEach(() => setShowSidebar(false));

function resize() {
    isMinMode.value = (window.innerWidth < MAX_WIDTH);
}
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
