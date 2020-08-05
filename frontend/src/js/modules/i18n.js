import Vue from 'vue';
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const defaultLanguage = 'en';
const loadedLanguages = []; // список локализаций, которые загружены
// const staticData = {
//   'en': import('../../../../generateGameData/data/loc_strings/en'),
//   'ru': import('../../../../generateGameData/data/loc_strings/ru'),
//   'es': import('../../../../generateGameData/data/loc_strings/es'),
//   'de': import('../../../../generateGameData/data/loc_strings/de'),
//   'fr': import('../../../../generateGameData/data/loc_strings/fr'),
//   'it': import('../../../../generateGameData/data/loc_strings/it'),
//   'pt': import('../../../../generateGameData/data/loc_strings/pt'),
//   'jp': import('../../../../generateGameData/data/loc_strings/jp'),
//   'ko': import('../../../../generateGameData/data/loc_strings/ko'),
//   'zh-si': import('../../../../generateGameData/data/loc_strings/zh-si'),
// };
const i18n = new VueI18n();
// let userLang = localStorage.getItem('language');

export default i18n;

// if (!userLang) {
//   if (Object.keys(staticData).includes(window.navigator.language.slice(0, 2))) {
//     userLang = window.navigator.language.slice(0, 2);
//   }
// }
// loadLanguageAsync(userLang || defaultLanguage);
import {data} from '../../../../generateGameData/data/loc_strings/en';
i18n.setLocaleMessage('en', data);

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
  // return staticData[lang]
  //     .then((file) => {
  //       i18n.setLocaleMessage(lang, file.data);
  //       loadedLanguages.push(lang);
  //       setI18nLanguage(lang);
  //       console.log(lang.toUpperCase() + ' language loaded successfully');
  //     })
  //     .catch(console.error);
}
function setI18nLanguage(lang) {
  i18n.locale = lang;
  return lang;
}
