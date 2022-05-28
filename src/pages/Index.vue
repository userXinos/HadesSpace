<template>
  <div>
    <Head><title>Hades Space</title></Head>

    <nebula-banner />

    <catalog :sections="sections" />
  </div>
</template>

<script>
import { Head } from '@vueuse/head';
import Catalog from '../components/Catalog';
import NebulaBanner from '@/components/NebulaBanner';

import { getSectionsPages } from '@Scripts/parsePages.ts';

export default {
    components: { Head, Catalog, NebulaBanner },
    data() {
        return {
            sections: getSectionsPages(),
        };
    },
};
</script>
