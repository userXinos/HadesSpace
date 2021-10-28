<template>
  <catalog :data="stars"/>
</template>

<script>
import {pages} from '../js/pages';
import Catalog from '../components/Catalog';

const stars = [pages[1]['childrens'][3]];

export default {
  components: {Catalog},
  data() {
    return {
      stars,
    };
  },
  metaInfo() {
    return {
      title: this.$t('stars'),
    };
  },
};
</script>
