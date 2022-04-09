import values from '@Regulation/values.js';

export default function(key, value, opts) {
    for (const [keys, func] of values) {
        if (keys.includes(key)) {
            return func(value, opts);
        }
    }
    return value;
}
