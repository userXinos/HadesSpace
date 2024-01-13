<template>
  <div class="container">
    <Head><title>{{ title }}</title></Head>
    <h1 class="topic"> {{ title }} </h1>

    <div class="warn-banner">
      <div>
        <img
          src="@Img/icons/info.png"
          alt="info icon"
        >
      </div>
      <p v-t="'THIRD_PARTY_TOOLS_NOTE'" />
    </div>

    <ul class="list">
      <li
        v-for="item in items"
        :key="item.href"
      >
        <a
          :href="item.href"
          target="_blank"
        >
          {{ item.name }}
        </a>
        <span>by {{ item.authors.join(', ') }} [{{ item.tags.join(', ') }}]</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Head } from '@vueuse/head';
import { useI18n } from 'vue-i18n';

import items from '@Regulation/thirdPartyTools.js';

const { t } = useI18n();
const title = t('THIRD_PARTY_TOOLS');

</script>

<style scoped lang="scss">
@import "../style/page.scss";

.container {
    max-width: 680px;
    margin-top: 2%;
    margin-left: auto;
    margin-right: auto;
}

.list {
    margin: 5% 0 20%;

    li {
        margin: 1% 0;
    }
}

.warn-banner {
    display: flex;
    align-items: stretch;
    background-color: #b69200;
    margin-bottom: 2%;
    border-radius: 5px;

    div:first-child {
        background-color: #7e6400;
        display: flex;
        align-items: center;
        padding: 10px;
        border-bottom-left-radius: 5px;
        border-top-left-radius: 5px;

        img {
            width: 20px;
            height: 20px;
        }
    }
    p {
        padding: 10px;
        font-size: 90%;
    }
}
</style>
