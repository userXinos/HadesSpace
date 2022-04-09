<template>
  <div class="container">
    <div
      v-click-outside="hide"
      class="btn-languages"
      :style="{color:(isShow) ? '#5fdba7' : ''}"
      @click="switchHide"
    >
      <template
        v-if="isMinMode"
      >
        {{ currentLang }}
      </template>
    </div>
    <ul
      v-if="isShow"
      class="languages"
    >
      <li
        v-for="{Code, UnityLocale} of languages"
        :key="Code"
      >
        <button
          class="btn"
          @click="switchLang(Code)"
        >
          {{ UnityLocale }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
import { setI18nLanguage } from '@Scripts/Vue/i18n.js';
import languages from '@Data/languages.js';

export default {
    name: 'LanguagesButton',
    props: {
        isMinMode: { type: Boolean },
    },
    data() {
        return {
            isShow: false,
            currentLang: localStorage.getItem('language'),
            languages,
        };
    },
    methods: {
        switchLang(code) {
            localStorage.setItem('language', code);
            setI18nLanguage(code);
            this.currentLang = code;
            this.switchHide();
        },
        switchHide() {
            this.isShow = !this.isShow;
        },
        hide() {
            this.isShow = false;
        },
    },
};
</script>

<style scoped>
.btn-languages {
  background-image: url(../img/icons/language.svg);
  background-size: 40%;
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
.languages {
  top: var(--header-height);
  z-index: 1;
  position: absolute;
  list-style-type: none;
  right: 1%;
}
.languages li .btn {
  border: none;
  background-color: var(--bnt-color);
  color: white;
  padding: 12px 26px;
  display: block;
  font-size: 13px;
  cursor: pointer;
  width: 100%;
}
.languages li .btn:hover {
  background-color: var(--btn-hover-color);
}

@media screen and (max-width: 960px) {
  .container {
    height: 100%;
    padding-top: 10%;
  }
  .btn-languages {
    background-image: none;
    color: white;
    text-align: center;
    width: 100%;
  }
  .btn-languages {
    left: 2%;
    position: static;
  }
  .languages {
    position: inherit;
  }
}
</style>
