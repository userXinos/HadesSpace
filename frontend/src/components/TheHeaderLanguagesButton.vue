<template>
  <div class="container">
    <div class="btn-langs"
         @click="swithHide"
         v-click-outside="hide"
         :style="{color:(isShow) ? '#5fdba7' : ''}"
    >
      <template
          v-if="isMinMode"
      >
        {{ currentLang }}
      </template>
    </div>
    <ul class="langs"
        v-if="isShow"
    >
      <li v-for="(value, key) in langs" :key="key">
        <button class="btn"
                @click="swithLang(key)"
        >
          {{ value }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import {loadLanguageAsync} from '../js/modules/i18n';

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
  name: 'Langs',
  props: {
    isMinMode: {type: Boolean},
  },
  data() {
    return {
      isShow: false,
      currentLang: localStorage.getItem('language'),
      langs,
    };
  },
  methods: {
    swithLang(languageKey) {
      localStorage.setItem('language', languageKey);
      loadLanguageAsync(languageKey);
      this.currentLang = languageKey;
      this.swithHide();
    },
    swithHide() {
      this.isShow = !this.isShow;
    },
    hide() {
      this.isShow = false;
    },
  },
};
</script>

<style scoped>
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
  top: var(--header-height);
  z-index: 1;
  position: absolute;
  list-style-type: none;
  right: 1%;
}
.langs li .btn {
  border: none;
  background-color: var(--bnt-color);
  color: white;
  padding: 12px 26px;
  display: block;
  font-size: 13px;
  cursor: pointer;
  width: 100%;
}
.langs li .btn:hover {
  background-color: var(--btn-hover-color);
}

@media screen and (max-width: 960px) {
  .container {
    height: 100%;
    padding-top: 10%;
  }
  .btn-langs {
    background-image: none;
    color: white;
    text-align: center;
    width: 100%;
  }
  .btn-langs {
    left: 2%;
    position: static;
  }
  .langs {
    position: inherit;
  }
}
</style>
