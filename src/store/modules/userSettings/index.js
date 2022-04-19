import types from './types.js';
import languages from '@Data/languages.js';
import { setI18nLanguage } from '@Scripts/Vue/i18n.js';

const LOCAL_STORAGE_KEY = 'settings';
const SUPPORT_LOCALES = Object.values(languages).map((l) => l.Code);
const DEFAULT_LANG = 'en';

const settings = getSettings(LOCAL_STORAGE_KEY);
const browserLang = window.navigator.language.slice(0, 2);
const isDev = (process.env.NODE_ENV === 'development');

export default {
    namespaced: false,
    strict: isDev,

    state: {
        language: settings.language || ((browserLang in SUPPORT_LOCALES) ? browserLang : DEFAULT_LANG),
    },
    mutations: {
        [types.setLanguage](state, code) {
            state.language = code;
            setSettings(LOCAL_STORAGE_KEY, state);
            return setI18nLanguage(code);
        },
    },
};


function setSettings(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}
function getSettings(key) {
    let res = {};

    if (localStorage.getItem(key)) {
        try {
            res = JSON.parse(localStorage.getItem(key));
        } catch (e) {
            console.error(e);
            localStorage.removeItem(key);
        }
    }

    return res;
}
