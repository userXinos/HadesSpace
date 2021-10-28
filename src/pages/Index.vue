<template>
  <catalog :data="pages"/>
</template>

<script>
import {pages} from '../js/pages';
import Catalog from '../components/Catalog';

export default {
  components: {Catalog},
  data() {
    return {
      pages,
    };
  },
  metaInfo() {
    return {
      title: 'Hades\' Star Data',
    };
  },
};
</script>
