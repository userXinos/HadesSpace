import values from '@Regulation/values.js';

const numberFormat = new Intl.NumberFormat('ru-RU').format;

export default function(key, value, dataName, opts) {
    const fixedKey = key.replace(/_?(RS|WS|BS)$/, '');

    if (value === undefined) {
        return;
    }
    for (const [keys, func, dataNames = []] of values) {
        if (dataNames.includes(dataName) && ((keys[0] === '*' ) ? true : keys.includes(fixedKey))) {
            return func(value, opts);
        }
        if (keys.includes(fixedKey)) {
            return func(value, opts);
        }
    }
    if (Number.isInteger(value)) {
        return numberFormat(value);
    }
    return value;
}
