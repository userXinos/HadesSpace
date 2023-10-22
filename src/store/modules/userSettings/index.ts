import { MutationTree } from 'vuex';

import types from './types';
import languages from '@Data/languages.js';
import { setI18nLanguage } from '@Utils/Vue/i18n';

const LOCAL_STORAGE_KEY = 'settings';
const SUPPORT_LOCALES = Object.values(languages).map((l) => l.Code);
const DEFAULT_LANG = 'en';

const settings = getSettings(LOCAL_STORAGE_KEY);
const browserLang = window.navigator.language.slice(0, 2);
const isDev = (process.env.NODE_ENV === 'development');

const mutations = <MutationTree<UserSettings>> {
    [types.SET_LANGUAGE](state, code) {
        state.language = code;
        setSettings(LOCAL_STORAGE_KEY, state);
        return setI18nLanguage(code);
    },
    [types.SWITCH_DISABLE_FILTERS](state) {
        state.disableFilters = !state.disableFilters;
        setSettings(LOCAL_STORAGE_KEY, state);
        return state.disableFilters;
    },
    [types.SWITCH_COMPACT_MODULES_BY_ART_TYPE_TABLE](state) {
        state.compactModulesByArtTypeTable = !state.compactModulesByArtTypeTable;
        setSettings(LOCAL_STORAGE_KEY, state);
        return state.compactModulesByArtTypeTable;
    },
    [types.DEBUG_SWITCH_SHOW_KEYS](state) {
        state.showKeys = !state.showKeys;
        setSettings(LOCAL_STORAGE_KEY, state);
        return state.showKeys;
    },
    [types.SET_LAST_CHECKED_VERSION_CHANGELOG](state, ver) {
        state.lastVersionChangelog = ver;
        setSettings(LOCAL_STORAGE_KEY, state);
        return state.lastVersionChangelog;
    },
};


export default {
    namespaced: false,
    strict: isDev,

    state: {
        language: settings.language || ((browserLang in SUPPORT_LOCALES) ? browserLang : DEFAULT_LANG),
        disableFilters: settings.disableFilters,
        compactModulesByArtTypeTable: settings.compactModulesByArtTypeTable,
        showKeys: settings.showKeys,
        lastVersionChangelog: settings.lastVersionChangelog,
    },
    mutations: mutations,
};


function setSettings(key: string, data: object): void {
    localStorage.setItem(key, JSON.stringify(data));
}
function getSettings(key: string): Settings {
    let res: Settings = {
        language: DEFAULT_LANG,
        disableFilters: false,
        compactModulesByArtTypeTable: true,
        showKeys: false,
        lastVersionChangelog: '0.0.0',
    };

    if (localStorage.getItem(key)) {
        try {
            res = { ...res, ...JSON.parse(localStorage.getItem(key) || '{}') };
        } catch (e) {
            console.error(e);
            localStorage.removeItem(key);
        }
    }

    return res;
}
