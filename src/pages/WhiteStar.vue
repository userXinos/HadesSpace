<template>
  <div>
    <Page
      title-loc-key="TID_WHITE_STAR"
      :content-args="{data: stars, iconDir: 'game/Stars'}"
      :portrait="{src: img, alt: 'whiteStars'}"
    />

    <div>
      <h1
        id="Planets"
        class="topic"
      >
        <a
          v-t="'PLANETS'"
          href="#Planets"
          class="link-topic"
        />
      </h1>

      <v-content
        :args="{
          data: planets,
          tableOpts: {lvlColKey: '№'}
        }"
      />
    </div>

  </div>
</template>

<script>
import Page from '@/components/Page.vue';
import VContent from '../components/Content.vue';

import stars from '@Data/stars.js';
import planets from '@Data/planets.js';
import filterByType from '@Scripts/filterByType.js';

export default {
    components: { Page, VContent },
    data() {
        return {
            stars: { WhiteStar: stars.WhiteStar },
            planets: filterByType(planets, 'planets.whitestar'),
            img: require(`@Img/game/portraits/whiteStars.png`),

        };
    },
};
</script>
<style scoped src="../css/page.css"></style>
