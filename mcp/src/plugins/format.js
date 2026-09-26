import { regex as postfixRegex } from '../../../src/regulation/postfixes.mjs';
import { formatValueRules, createElement } from '../regulation.js';
import { isPlainObject } from '../../utils/types.js';

// правила, которые ждут объект: на массиве или строке они дают мусор, поэтому пропускаем
const OBJECT_SHAPED = new Set(['CerbGroup', 'valueZ', 'packagingData', 'ModulesByArtType']);

const isEmpty = (v) => (
    v === undefined || v === null || v === '' ||
    (typeof v === 'object' && Object.keys(v).length === 0)
);

const failed = new Set();

/**
 * @param {string} key
 * @param {string|null} dataName
 * @return {null | {rule: (v: unknown) => unknown, dataNames: Array<string>}}
 */
function matchRule(key, dataName) {
    const fixedKey = key.replace(postfixRegex, '');

    for (const [keys, rule, dataNames = []] of formatValueRules) {
        const matched = (
            (dataName && dataNames.includes(dataName) && (keys[0] === '*' || keys.includes(fixedKey))) ||
            (!dataNames.length && keys.includes(fixedKey)) ||
            keys.includes(key)
        );
        if (matched) return { rule, dataNames };
    }

    return null;
}

/**
 * @return {unknown}
 */
function applyRule(matched, value, key, dataName, numberFormat) {
    const { rule } = matched;

    if (OBJECT_SHAPED.has(key.replace(postfixRegex, '')) && !isPlainObject(value)) return value;

    let resolved;
    try {
        const result = rule(value);
        // VNode-правила (Model, ConceptImage, ModulesByArtType) на стабах отдают пустоту
        resolved = typeof result === 'function' ? result(createElement) : result;
    } catch (e) {
        const label = `${key}${dataName ? ` @ ${dataName}` : ''}: ${e.message}`;
        if (!failed.has(label)) {
            failed.add(label);
            console.warn(`  [format] error ${label}`);
        }
        return value;
    }

    if (isEmpty(resolved)) return value;

    return typeof resolved === 'number' ? numberFormat(resolved) : resolved;
}

export function formatValue(key, value, dataName, numberFormat) {
    const matched = matchRule(key, dataName);

    if (matched) {
        const { dataNames } = matched;
        const wholeArray = dataNames.length > 0;

        if (Array.isArray(value) && !wholeArray) {
            return value.map((v) => applyRule(matched, v, key, dataName, numberFormat));
        }
        return applyRule(matched, value, key, dataName, numberFormat);
    }

    // правила нет — числа всё равно приводим к локали, в том числе внутри массивов
    if (Array.isArray(value)) return value.map((v) => formatValue(key, v, dataName, numberFormat));
    if (Number.isInteger(value)) return numberFormat(value);
    return value;
}

export function getFailed() {
    return [...failed].sort();
}

export default {
    name: 'format',

    transform(entity, { options }) {
        const numberFormat = new Intl.NumberFormat(options.numberLocale).format;
        const dataName = typeof entity.Name === 'string' ? entity.Name : null;
        const out = {};

        for (const [key, value] of Object.entries(entity)) {
            if (value === undefined || value === null) continue;
            out[key] = formatValue(key, value, dataName, numberFormat);
        }

        return out;
    },
};
