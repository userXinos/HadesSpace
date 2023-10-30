<template>
  <div>
    <v-head><title>Hades Space</title></v-head>

    <catalog :sections="sections" />
  </div>
</template>

<script setup>
import { Head as VHead } from '@vueuse/head';
import Catalog from '../components/Catalog';

import { getSectionsPages } from '@Utils/parsePages.ts';

const sections = getSectionsPages();
</script>
