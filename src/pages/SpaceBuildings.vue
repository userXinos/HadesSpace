<template>
  <Page
    title-loc-key="TID_PRODUCTION_DLG_STATIONS"
    :content-args="{data, iconDir: 'game/SpaceBuildings'}"
    :portrait="{src: img, alt: 'spacebuildings'}"
  />
</template>

<!--suppress JSUnresolvedVariable -->
<script>
import Page from '@/components/Page.vue';

import CustomIcon from '@Scripts/CustomIcon';
import objectArrayify from '@Scripts/objectArrayify';
import spaceBuildings from '@Data/spacebuildings.js';

spaceBuildings.WarpLaneHub.Model = new CustomIcon('WarpLane');
spaceBuildings.TimeModulator.Model = new CustomIcon('TimeModulator');

export default {
    components: { Page },
    data() {
        return {
            data: objectArrayify(spaceBuildings, {
                filter: ([k, v]) => !k.startsWith('#') && v?.CanBeBuilt,
            }),
            img: require(`@Img/game/portraits/BlackCitadel.png`),
        };
    },
};
</script>
