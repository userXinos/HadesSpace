<template>
  <div>
    <VHead><title>Hades Space</title></VHead>

    <!--suppress HtmlUnknownTag -->
    <vue-progress-bar />

    <div
      v-touch:swipe="swipeHandler"
    >
      <div>

        <TheHeader
          :is-min-mode="isMinMode"
          :open-sidebar="() => setShowSidebar(true)"
        >

          <div class="target-wrap"><div id="table-head-target" /></div>
          <RouterView />

          <div
            v-if="renderError"
            id="render-error"
          >
            <div class="bg">
              <div class="title">
                <span>There was a page rendering error 😓 Please contact me. For example on </span><a
                  target="_blank"
                  href="https://discord.com/users/359208482290925568"
                >Discord</a>
              </div>
              <p>{{ renderError }}</p>
            </div>
          </div>

        </TheHeader>

        <Sidebar
          v-if="isMinMode"
          v-model:open="sidebarIsOpen"
          :swipe-handler="swipeHandler"
        />

      </div>
    </div>

    <TheFooter />
    <GoTop />
    <TheConfirm />
    <Changelog
      :is-open="changelogIsOpen"
      @close="changelogOnClose"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, onErrorCaptured, ref, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
import { stop as compendiumStop } from '@Utils/compendium';

import { Head as VHead } from '@vueuse/head';
import GoTop from '@/components/GoTop.vue';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import Sidebar from '@/components/TheSidebar.vue';
import Changelog from '@/components/Changelog.vue';
import TheConfirm from '@/components/TheConfirm.vue';

import appSidebar from '@/composables/appSidebar';
import appChangelog from '@/composables/appChangelog';

const MAX_WIDTH = 1000;

const router = useRouter();
const internalInstance = getCurrentInstance();
const { $Progress } = internalInstance?.appContext.config.globalProperties; // eslint-disable-line no-unsafe-optional-chaining
const isMinMode = ref(window.innerWidth < MAX_WIDTH);
const renderError = ref<Error>();

const { setShow: setShowSidebar, swipeHandler, isOpen: sidebarIsOpen } = appSidebar(isMinMode);
const { isOpen: changelogIsOpen, onClose: changelogOnClose } = appChangelog();

$Progress.start();

onMounted(() => window.addEventListener('resize', resize));
onUnmounted(() => {
    window.removeEventListener('resize', resize);
    compendiumStop();
});
onErrorCaptured((err) => {
    renderError.value = err;
});

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
$mw: 960px;

.target-wrap {
    position: fixed;
    z-index: 1; // <- либо ставить под router-view, но нужно прописать отступ от шапки в top, либо z-index
    width: 100%;

    #table-head-target {
        margin: -1% 3% 0;
    }
}

#render-error {
    padding: 0 12%;
    margin-top: 1%;

    .bg {
        padding: 1%;
        background-color: #b94054;

        .title {
            font-size: 120%;
            padding-bottom: 10px;
        }
    }

    @media screen and (max-width: $mw) {
        padding: 0;
    }
}

</style>
