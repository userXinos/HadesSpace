<template>
  <header class="header">
    <div class="btn-langs" @click="swithHide">
      <ul class="langs"
          v-if="!isHidden"
          @focusout="swithHide"
          tabindex="0"
      >
        <li v-for="(value, key) in langs" :key="key">
          <button class="btn" @click="swithLang(key)">{{ value }}</button>
        </li>
      </ul>
    </div>
    <router-link to="/">
      <div class="logo"></div>
    </router-link>
  </header>
</template>

<script>
import i18n, {loadLanguageAsync} from '../js/modules/i18n';

const langs = {
  'en': 'English',
  'ru': 'Pусский',
  'fr': 'Français',
  'de': 'Deutsch',
  'es': 'Español',
  'it': 'Italiano',
  'pt': 'Português',
  'ko': '한국어',
  'jp': '日本語',
  'zh-si': '简体中文',
};

export default {
  i18n,
  data() {
    return {
      isHidden: true,
      langs,
    };
  },
  methods: {
    swithLang(languageKey) {
      localStorage.setItem('language', languageKey);
      loadLanguageAsync(languageKey);
    },
    swithHide() {
      this.isHidden = !this.isHidden;
    },
  },
};
</script>

<style scoped>
.header {
  background: #101415;
  position: fixed;
  width: 100%;
  height: 80px;
  top: 0;
  z-index: 10;
  left: 0;
  border-bottom: 2px solid #20282b;
  transition: top 0.2s ease-in-out;
}
.logo {
  width: 100%;
  height: 100%;
  background-position: center;
  background-image: url(../img/logo.png);
  background-size: 200px;
  background-repeat: no-repeat;
}
.btn-langs {
  background-image: url(../img/icons/lang.svg);
  background-size: 70%;
  background-repeat: no-repeat;
  background-position: center;
  padding: 23px 26px;
  display: block;
  cursor: pointer;
  position: absolute;
  top: 24%;
  left: 2%;
  width: 50px;
}
.langs {
  top: 100%;
  z-index: 1;
  position: absolute;
  opacity: 0.8;
  list-style-type: none;
}
.langs li .btn {
  border: none;
  background-color: #101415;
  color: white;
  padding: 12px 26px;
  display: block;
  font-size: 13px;
  width: 120%;
  text-align: left;
  cursor: pointer;
}
.langs li .btn:hover {
  border-left: 5px solid #253033;
}
/* #buttonLangs:hover {
    filter: invert(6%) sepia(4%) saturate(2544%) hue-rotate(153deg) brightness(100%) contrast(91%);
} */
</style>
