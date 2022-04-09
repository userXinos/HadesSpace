<template>
  <div>
    <Page
      title-loc-key="TID_RED_STAR"
      :content-args="{
        data: star,
        iconDir: 'game/Stars',
        tableOpts: {colLvlStartAt: 0}
      }"
      :portrait="{src: img, alt: 'RedStar'}"
    />

    <h1
      id="Artifacts"
      class="topic"
    >
      <a
        v-t="'TID_OBJECT_ACTION_ARTIFACTS'"
        href="#Artifacts"
        class="art-title"
      />
    </h1>

    <div
      v-for="(_, name) in ARTS"
      :key="name"
    >
      <div
        v-for="args in getArt(name)"
        :key="`${name}${args.data.a.Name}`"
      >
        <v-content :args="args" />
      </div>

    </div>
  </div>
</template>

<script>
import VContent from '../components/Content.vue';
import Page from '@/components/Page.vue';

import stars from '@Data/stars.js';
import artifacts from '@Data/artifacts.js';

const ARTS = {
    Combat: 'COMBAT_ART',
    Utility: 'UTILITY_ART',
    Support: 'SUPPORT_ART',
};

export default {
    components: { Page, VContent },
    data() {
        return {
            ARTS,
            artifacts,
            star: { RedStar: stars.RedStar },
            img: require(`@Img/game/portraits/redStar.png`),
        };
    },
    methods: {
        getArt(name) {
            const tableOpts = {
                lvlColKey: 'N',
                colLvlStartAt: (name == 'Support') ? 2 : 1,
            };

            return [
                {
                    data: { a: {
                        ...this.artifacts[name],
                        TID2: this.artifacts[name].TID,
                        TID: ARTS[name],
                    } },
                    tableOpts,
                },
                {
                    data: { a: {
                        TID: 'BLUEPRINTS',
                        ...this.artifacts[`${name}Blueprints`],
                    } },
                    tableOpts,
                },
            ];
        },
    },
};
</script>
<style scoped lang="scss">
@import "../css/vars";

$mw: 900px;

.art-title {
    padding: 0;
    color: $text-color;
}

</style>
