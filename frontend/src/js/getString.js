'use strict';
import {stringKeys} from './stringKeys';

const defaultLang = 'en';
const locList = {
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
const langsList = Object.keys(locList);
let language;

if (localStorage.getItem('language') && langsList.includes(localStorage.getItem('language'))) {
  language = localStorage.getItem('language');
} else {
  if (langsList.includes(window.navigator.language.slice(0, 2))) {
    language = window.navigator.language.slice(0, 2);
  } else {
    language = defaultLang;
  }
}
// загрузить сточку из sessionStorage
// sessionStorage, чтобы качал новую версию кажый раз
function load(lang) {
  const key = 'locStrings' + lang.toUpperCase();
  if (sessionStorage.getItem(key) == null) {
    sessionStorage.setItem(key, JSON.stringify(ajax()));
    return ajax();
  } else {
    return JSON.parse(sessionStorage.getItem(key));
  }
  function ajax() {
    const r = $.ajax({
      url: `${lang}.json`,
      async: false,
      dataType: 'json',
    }).done(function(data) {
      return data;
    });
    return JSON.parse(r.responseText);
  }
}
// получить сточку
function getStr(key, lang = language) {
  const locStrings = load(lang);
  key = (locStrings[key]) ? key : getKey(key);
  if (locStrings[key]) {
    return locStrings[key];
  }
  return key;
  // else if (lang == defaultLang) {
  //   return key;
  // } else {
  //   return getStr(key, defaultLang);
  // }
}
function getKey(str) {
  if (str in stringKeys) return stringKeys[str];
  return str;
}
export {
  getStr,
  locList,
};
