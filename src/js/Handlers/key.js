import rules from '@Regulation/formatKeyRules.js';
import locKeys from '@Regulation/locKeys.js';

export default function(key, pageName, opts) {
    const newKey = locKeys[key] || key;

    if (key === '_' || key === undefined) {
        return '';
    }

    for (const [keys, func, pageNames = []] of rules) {
        if (pageNames.includes(pageName) && ((keys[0] === '*' ) ? true : keys.includes(key))) {
            return func(key, opts);
        }
        if (keys.includes(key)) {
            return func(key, opts);
        }
    }

    if (opts.$te(newKey)) {
        return opts.$t(newKey);
    }
    return key;
}
