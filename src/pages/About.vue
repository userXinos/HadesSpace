<!-- eslint-disable vue/max-attributes-per-line -->
<!--suppress VueUnrecognizedSlot -->
<template>
  <div class="container">
    <v-head><title>{{ $t('ABOUT') }}</title></v-head>

    <i18n-t
      keypath="ABOUT_BODY"
      tag="p"
      class="text"
    >
      <template #open_source>
        <Link :text="$t('OPEN_SOURCE')" :to="homepage" />
      </template>

      <template #hades_star>
        <Link text="Hades' Star" to="https://hadesstar.com/" />
      </template>

      <template #data>
        <Link :text="$t('data')" :to="`${homepage}/tree/master/parser/raw`" />
      </template>

      <template #game_developer>
        Parallel Space Inc
      </template>

      <template #artist_name>
        Gabriel Björk Stiernström
      </template>
      <template #his_website>
        <Link :text="$t('HIS_WEBSITE')" to="https://www.gabrielbjorkstiernstrom.com/#/projects/hades-star" />
      </template>

      <template #list_of_people>
        <ul class="translation-members">
          <li v-for="(members, code) in translationMembers" :key="code">
            {{ members.join(', ') }} - {{ languagesNames[code] }}
          </li>
        </ul>
      </template>

      <template #platforms>
        <template v-for="({host, href}) in funding">
          <Link :text="host" :to="href" />
        </template>
      </template>

      <template #discord_username>
        <Link text="userxinos" to="https://discord.com/users/359208482290925568" />
      </template>

      <template #hso>
        <Link :text="$t('HSO')" to="https://discord.gg/hadesstar" />
      </template>

      <template #open_an_issue>
        <Link :text="$t('OPEN_AN_ISSUE')" :to="`${homepage}/issues/new`" />
      </template>

      <template #github>
        GitHub
      </template>
    </i18n-t>
    <br><br><br>

    <i18n-t
      keypath="ABOUT_BODY_MADE_WITH"
      tag="p"
      class="min-text"
    >
      <template #emoji>❤️</template>
      <template #github>GitHub</template>
    </i18n-t>
  </div>
</template>

<script setup lang="ts">
import { Head as VHead } from '@vueuse/head';
import { h, ref, onMounted, computed } from 'vue';
import { homepage } from '../../package.json';
import languages from '@/../i18n/dist/index.json';

const languagesNames = computed(() => Object.fromEntries(
    Object.values(languages).map((e) => [e.Code, e.Name]),
));
const funding = ref<{host: string, href: string}[]>([]);
const translationMembers = { // @TODO https://developer.crowdin.com/api/v2/#operation/api.projects.members.getMany
    'de': ['Knalli'],
    'es': ['MiniPoli Gloti', 'uke_waza'],
    'fr': ['Gabriel', 'MiniPoli Gloti', 'Etoile de Feu', 'Lkn Empire', 'fr3d On Bass'],
    // 'it': [],
    'jp': ['しゅーじろー'],
    // 'ko': [],
    // 'pt': [],
    // 'ru': ['Xinos'],
    'tr': ['Astro Algebra'],
    'uk': ['Євген'],
    'zh-si': ['233dada'],
};

onMounted(() => {
    import('../../.github/FUNDING.yml')
        .then((resp) => fetch(resp.default))
        .then((resp) => resp.text())
        .then((t) => funding.value = t
            .split('\n')
            .map((e) => {
                if (e) {
                    const { host, href } = new URL(e.split(': ')[1]);
                    return { host: host.split('.')[0], href };
                }
            })
            .filter(Boolean),
        );
});

function Link({ text, to }) {
    return h('a', {
        href: to,
        target: '_blank',
    }, text);
}
</script>

<style scoped lang="scss">
.container {
    max-width: 680px;
    margin: 5% auto;

    .text {
        font-size: 110%;
        margin: 0 6%;
        white-space: pre-line;
    }
    .min-text {
        font-size: 80%;
        text-align: center;
    }
}
.translation-members {
    padding: 20px;
    font-size: 80%;

    li {
        padding: 2px;
    }
}
</style>
