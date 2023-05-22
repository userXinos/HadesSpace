import rules from '@Regulation/formatValueRules.js';
import { regex as postfixRegex } from '@Regulation/postfixes.mjs';

const numberFormat = new Intl.NumberFormat('ru-RU').format;

export default function(key: string, value:unknown, dataName:string|null):unknown {
    const fixedKey = key
        .replace(/^_/, '')
        .replace(postfixRegex, '');

    if (value === undefined || value === null) {
        return;
    }
    for (const [keys, func, dataNames = []] of rules) {
        if (dataName != null && dataNames.includes(dataName) && ((keys[0] === '*' ) ? true : keys.includes(fixedKey || key))) {
            return func(value);
        }
        if (!dataNames.length && keys.includes(fixedKey || key)) {
            return func(value);
        }
    }
    if (Number.isInteger(value)) {
        return numberFormat(value as number);
    }
    return value;
}
