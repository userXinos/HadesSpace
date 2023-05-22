import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';

import store from '@Store/index';

const i18n = createI18n({
    locale: store.state.userSettings.language,
    // fallbackLocale: DEFAULT_LANG, - уже скомпилировано с замещением
});

updateDocLang();
// noinspection JSIgnoredPromiseFromCall
loadLocaleMessages(i18n.global.locale);

export default i18n;

export async function setI18nLanguage(locale: string) {
    await loadLocaleMessages(locale);
    updateDocLang();

    i18n.global.locale = locale;
}
export async function loadLocaleMessages(locale: string) {
    const message = await import(`@i18n/${locale}.json`).then((m) => m.default);

    i18n.global.setLocaleMessage(locale, message);
    return nextTick();
}
function updateDocLang() {
    document.querySelector('html')?.setAttribute('lang', i18n.global.locale);
}
