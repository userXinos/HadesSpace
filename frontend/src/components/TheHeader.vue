<template>
  <header class="header">
    <div class="btn-langs" @click="swithHide" v-click-outside="hide">
      <ul class="langs"
          v-if="!isHidden"
      >
        <li v-for="(value, key) in langs" :key="key">
          <button class="btn" @click="swithLang(key)">
            {{ value }}
          </button>
        </li>
      </ul>
    </div>
    <div class="logo">
      <router-link to="/">
        <img src="../img/logo.png" alt="logo">
      </router-link>
    </div>
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
      this.swithHide();
    },
    swithHide() {
      this.isHidden = !this.isHidden;
    },
    hide() {
      this.isHidden = true;
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
  display: flex;
  justify-content: center;
}
.logo img {
  height: 80px;
}
.logo a {
  display: contents;
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
  right: 2%;
  width: 50px;
}
.langs {
  top: 80px;
  z-index: 1;
  position: absolute;
  list-style-type: none;
  right: 0;
}
.langs li .btn {
  border: none;
  background-color: #101415;
  color: white;
  padding: 12px 26px;
  display: block;
  font-size: 13px;
  cursor: pointer;
  width: 100%;
}
.langs li .btn:hover {
  background-color: #242e2f;
}
/* #buttonLangs:hover {
    filter: invert(6%) sepia(4%) saturate(2544%) hue-rotate(153deg) brightness(100%) contrast(91%);
} */
</style>
