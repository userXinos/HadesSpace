import mutations from './mutations';
import defaultSettings from './defaultSettings';
import languages from '@/../i18n/dist/index.json';
import { getSettings, hasStoredLanguage } from './storage';

type Language = {
    Code: string;
    LocaleAndCountry: string;
};

const isDev = (process.env.NODE_ENV === 'development');
const settings = getSettings();
const availableLanguages = Object.values(languages) as Language[];

function detectLanguage(): string {
    const browserLanguages = window.navigator.languages?.length ?
        window.navigator.languages :
        [window.navigator.language];

    for (const tag of browserLanguages) {
        const normalizedTag = tag.toLowerCase();

        const exactMatch = availableLanguages.find(
            ({ LocaleAndCountry }) => LocaleAndCountry.toLowerCase() === normalizedTag,
        );

        if (exactMatch) {
            return exactMatch.Code;
        }

        const [browserCode] = normalizedTag.split('-');
        const primaryMatch = availableLanguages.find(
            ({ LocaleAndCountry }) => LocaleAndCountry.toLowerCase().split('-')[0] === browserCode,
        );

        if (primaryMatch) {
            return primaryMatch.Code;
        }
    }

    return defaultSettings.language;
}

const language = hasStoredLanguage() ?
    settings.language :
    detectLanguage();

export default {
    namespaced: false,
    strict: isDev,
    state: {
        ...settings,
        language,
    },
    mutations,
};
