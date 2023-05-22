<template>
  <div>
    <v-head><title>Hades Space</title></v-head>

    <nebula-banner />

    <catalog :sections="sections" />
  </div>
</template>

<script setup>
import { Head as VHead } from '@vueuse/head';
import Catalog from '../components/Catalog';
import NebulaBanner from '@/components/NebulaBanner';

import { getSectionsPages } from '@Utils/parsePages.ts';

const sections = getSectionsPages();
</script>
