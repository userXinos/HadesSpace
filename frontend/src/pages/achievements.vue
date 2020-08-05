<template>
  <div>
    <h1 id="title">{{ $t("TID_PLAYER_INFO_DLG_TAB_ACHIEVEMENTS") }}</h1>

    <v-content
      v-bind:args="{
        data: 'achievements',
        category: 'default',
      }"
    >
    </v-content>
  </div>
</template>

<script>
import VContent from '../components/Content.vue';
import i18n from '../js/modules/i18n';

export default {
  i18n,
  name: 'achievements',
  components: {VContent},
};
</script>

<style src="../css/style.css"></style>
