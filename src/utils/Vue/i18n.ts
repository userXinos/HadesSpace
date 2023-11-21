// noinspection TypeScriptCheckImport

import { nextTick } from 'vue';
import { createI18n, VueMessageType, LocaleMessages } from 'vue-i18n';

const i18nInstance = createI18n<false>({
    allowComposition: true,
    legacy: false,
    missingWarn: false,
});

export default i18nInstance;

export async function setI18nLanguage(locale: string): Promise<void> {
    // first, so that Google Translate does not rush to translate the translated page
    document.querySelector('html')?.setAttribute('lang', locale);

    await loadLocaleMessages(locale);
    i18nInstance.global.locale.value = locale;
}

export async function loadLocaleMessages(locale: string): Promise<void> {
    const messages = await import(`@i18n/${locale}.json`);

    i18nInstance.global.setLocaleMessage<LocaleMessages<VueMessageType>>(locale, messages);
    return nextTick();
}
