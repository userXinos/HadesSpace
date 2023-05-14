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

<script>
import { Head as VHead } from '@vueuse/head';
import VContent from '../components/Content.vue';

export default {
    components: { VHead, VContent },
    props: {
        contentArgs: { type: Object, required: true },
        titleLocKey: { type: String, required: true },
        portrait: { type: Object, default: null, validator: (v) => ['src', 'alt'].every((k) => k in v) },
    },
    computed: {
        title() {
            return this.$t(this.titleLocKey);
        },
    },
};
</script>

<style scoped src="../style/page.scss" lang="scss"></style>
