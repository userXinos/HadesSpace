<template>
  <div>
    <v-head><title>{{ title }}</title></v-head>

    <div class="portrait-container">
      <img
        v-if="portrait"
        class="portrait"
        :src="portrait.src"
        :alt="portrait.alt"
      >
      <h1 class="topic"> {{ title }} </h1>
    </div>

    <slot />

    <v-content :args="contentArgs" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { Head as VHead } from '@vueuse/head';
import VContent, { Props as VContentProps } from '../components/Content.vue';

export interface Props {
    contentArgs: typeof VContentProps
    titleLocKey: string
    portrait?: {src: string, alt: string}|null
}

const { t } = useI18n();
const props = withDefaults(defineProps<Props>(), {
    portrait: null,
});
const title = computed(() => t(props.titleLocKey));
</script>

<style scoped src="../style/page.scss" lang="scss"></style>
