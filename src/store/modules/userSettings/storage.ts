import defaultSettings from './defaultSettings';

const LOCAL_STORAGE_KEY = 'settings';

export function getSettings(): Settings {
    let res = defaultSettings;

    if (localStorage.getItem(LOCAL_STORAGE_KEY)) {
        try {
            res = { ...res, ...JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '{}') };
        } catch (e) {
            console.error(e);
            localStorage.removeItem(LOCAL_STORAGE_KEY);
        }
    }

    return res;
}
export function setSettings(data: object): void {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
}

export function hasStoredLanguage(): boolean {
    const rawSettings = localStorage.getItem(LOCAL_STORAGE_KEY);

    if (!rawSettings) {
        return false;
    }

    try {
        const settings = JSON.parse(rawSettings);

        return Object.prototype.hasOwnProperty.call(settings, 'language');
    } catch (e) {
        return false;
    }
}
