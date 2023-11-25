import mutations from './mutations';
import defaultSettings from './defaultSettings';
import languages from '@/../i18n/dist/index.json';
import { getSettings } from './storage';


const isDev = (process.env.NODE_ENV === 'development');
const settings = getSettings();
const supportLocales = Object.values(languages).map((l) => l.Code);
const browserLang = window.navigator.language.slice(0, 2);

export default {
    namespaced: false,
    strict: isDev,
    state: {
        ...settings,
        language: settings.language || ((browserLang in supportLocales) ? browserLang : defaultSettings.language),
    },
    mutations: mutations,
};
