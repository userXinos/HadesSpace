
import types from './types.js';

import { setI18nLanguage, SUPPORT_LOCALES, DEFAULT_LANG } from '@Scripts/Vue/i18n.js';

const isDev = (process.env.NODE_ENV === 'development');
const LOCAL_STORAGE_KEY = 'settings';
const settings = getSettings(LOCAL_STORAGE_KEY);

const browserLang = window.navigator.language.slice(0, 2);

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
