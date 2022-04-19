<template>
  <Page
    title-loc-key="TID_BLUE_STAR"
    :content-args="{
      data,
      iconDir: 'game/Stars',
      tableOpts: { lvlColKey: '№' }
    }"
    :portrait="{src: img, alt: 'BlueStar'}"
  />
</template>

<script>
import Page from '@/components/Page.vue';
import stars from '@Data/stars.js';

export default {
    components: { Page },
    data() {
        return {
            data: { BlueStar: stars.BlueStar },
            img: require(`@Img/game/portraits/portrait_BlueStar.png`),
        };
    },
};
</script>
