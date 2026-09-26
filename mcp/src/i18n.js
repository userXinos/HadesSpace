import { LOCALE_MAP } from '../config.js';
import locKeys from '../../src/regulation/locKeys.mjs';

const TEMPLATE = /\{(\d+)\}/g;

const unresolved = new Set();

export function te(key) {
    return typeof key === 'string' && Object.hasOwn(LOCALE_MAP, key);
}

export function t(key, params) {
    if (typeof key !== 'string') {
        return key;
    }

    const str = LOCALE_MAP[key];

    if (typeof str !== 'string') {
        unresolved.add(key);
        return key;
    }

    if (params === undefined || params === null) {
        return str;
    }

    const list = Array.isArray(params) ? params : [params];
    return str.replace(TEMPLATE, (match, i) => (i in list ? String(list[i]) : match));
}

export function tk(key) {
    return t(locKeys[key] || key);
}

export function getUnresolved() {
    return [...unresolved].sort();
}

// t обязана быть bound — правила regulation делают `const { t } = i18n.global` на уровне модуля
export default { global: { t, te } };
