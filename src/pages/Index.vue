<template>
  <div>
    <v-head><title>Hades Space</title></v-head>

    <nebula-banner />

    <catalog :sections="sections" />
  </div>
</template>

<script>
import { Head as VHead } from '@vueuse/head';
import Catalog from '../components/Catalog';
import NebulaBanner from '@/components/NebulaBanner';

import { getSectionsPages } from '@Scripts/parsePages.ts';

export default {
    components: { VHead, Catalog, NebulaBanner },
    data() {
        return {
            sections: getSectionsPages(),
        };
    },
};
</script>
