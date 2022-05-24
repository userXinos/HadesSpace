<template>
  <div>
    <Head><title>Hades Space</title></Head>

    <catalog :sections="sections" />
  </div>
</template>

<script>
import { Head } from '@vueuse/head';
import Catalog from '../components/Catalog';

import { getSectionsPages } from '@Scripts/parsePages.ts';

export default {
    components: { Head, Catalog },
    data() {
        return {
            sections: getSectionsPages(),
        };
    },
};
</script>
