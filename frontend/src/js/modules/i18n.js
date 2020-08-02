import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const defaultLanguage = 'en';
const loadedLanguages = []; // список локализаций, которые загружены
const staticData = {
  'en': import('../../../../data/loc_strings/en'),
  'ru': import('../../../../data/loc_strings/ru'),
  'es': import('../../../../data/loc_strings/es'),
  'de': import('../../../../data/loc_strings/de'),
  'fr': import('../../../../data/loc_strings/fr'),
  'it': import('../../../../data/loc_strings/it'),
  'pt': import('../../../../data/loc_strings/pt'),
  'jp': import('../../../../data/loc_strings/jp'),
  'ko': import('../../../../data/loc_strings/ko'),
  'zh-si': import('../../../../data/loc_strings/zh-si'),
};
const i18n = new VueI18n();
let userLang = localStorage.getItem('language');

export default i18n;

if (!userLang) {
  if (Object.keys(staticData).includes(window.navigator.language.slice(0, 2))) {
    userLang = window.navigator.language.slice(0, 2);
  }
}
loadLanguageAsync(userLang || defaultLanguage);

export function loadLanguageAsync(lang) {
  // Если локализация та же
  if (i18n.locale === lang) {
    return Promise.resolve(setI18nLanguage(lang));
  }
  // Если локализация уже была загружена
  if (loadedLanguages.includes(lang)) {
    return Promise.resolve(setI18nLanguage(lang));
  }
  // Если локализация ещё не была загружена
  return staticData[lang]
      .then((file) => {
        i18n.setLocaleMessage(lang, file.data);
        loadedLanguages.push(lang);
        setI18nLanguage(lang);
        console.log(lang.toUpperCase() + ' language loaded successfully');
      })
      .catch((err) => console.log(err));
}
function setI18nLanguage(lang) {
  i18n.locale = lang;
  return lang;
}
