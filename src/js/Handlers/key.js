import locKeys from '@Regulation/locKeys.js';

export default function(key, opts) {
    const newKey = locKeys[key] || key;

    if (key === '_' || key === undefined) {
        return '';
    }

    if (opts.$te(newKey)) {
        return opts.$t(newKey);
    }
    return key;
}
