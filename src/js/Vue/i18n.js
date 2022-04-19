import { nextTick } from 'vue';
import { createI18n } from 'vue-i18n';

import store from '@Store';

const i18n = createI18n({
    locale: store.state.userSettings.language,
    // fallbackLocale: DEFAULT_LANG, - уже скомпилировано с замещением
    // availableLocales: SUPPORT_LOCALES,
});

// noinspection JSIgnoredPromiseFromCall
loadLocaleMessages(i18n.global.locale);

export default i18n;

export async function setI18nLanguage(locale) {
    await loadLocaleMessages(locale);

    if (i18n.mode === 'legacy') {
        i18n.global.locale = locale;
    } else {
        i18n.global.locale.value = locale;
    }

    document.querySelector('html').setAttribute('lang', locale);
}

async function loadLocaleMessages(locale) {
    const message = await import(/* webpackChunkName: "locale-[request]" */ `@i18n/${locale}.json`)
        .then((m) => m.default);

    // fix for "json parser" by import()
    Object.entries(message).forEach(([k, v]) => message[k] = v.replaceAll('\\n', '\n'));

    i18n.global.setLocaleMessage(locale, message);
    return nextTick();
}
