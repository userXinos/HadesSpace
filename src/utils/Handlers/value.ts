import memoize from '@Utils/memoize';
import rules from '@Regulation/formatValueRules.js';
import { regex as postfixRegex } from '@Regulation/postfixes.mjs';

const numberFormat = new Intl.NumberFormat('ru-RU').format;
const memorized: Map<(typeof rules)[0][1], (typeof rules)[0][1]> = new Map();

export default function(key: string, value: unknown, dataName?: string):unknown {
    if (value === undefined || value === null) {
        return;
    }

    const fixedKey = key.replace(postfixRegex, '');

    for (const [keys, func, dataNames = []] of rules) {
        if (
            (dataName && dataNames.includes(dataName) && ((keys[0] === '*' ) ? true : keys.includes(fixedKey))) ||
            (!dataNames.length && keys.includes(fixedKey)) ||
            keys.includes(key)
        ) {
            if (!memorized.has(func)) {
                memorized.set(func, memoize(func));
            }
            return memorized.get(func)?.(value);
        }
    }
    if (Number.isInteger(value)) {
        return numberFormat(value as number);
    }
    return value;
}
