import rules from '@Regulation/formatValueRules.js';

const numberFormat = new Intl.NumberFormat('ru-RU').format;

export default function(key, value, dataName, opts) {
    const fixedKey = key.replace(/_?(RS|WS|BS)$/, '');

    if (value === undefined) {
        return;
    }
    for (const [keys, func, dataNames = []] of rules) {
        if (dataNames.includes(dataName) && ((keys[0] === '*' ) ? true : keys.includes(fixedKey || key))) {
            return func(value, opts);
        }
        if (!dataNames.length && keys.includes(fixedKey || key)) {
            return func(value, opts);
        }
    }
    if (Number.isInteger(value)) {
        return numberFormat(value);
    }
    return value;
}
