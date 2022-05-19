import i18n from '@/js/Vue/i18n';
import rules from '@Regulation/formatKeyRules.js';
import locKeys from '@Regulation/locKeys.js';

const { t, te } = i18n.global;

export default function(key, pageName) {
    const newKey = locKeys[key] || key;

    if (key === '_' || key === undefined) {
        return '';
    }

    for (const [keys, func, pageNames = []] of rules) {
        if (pageNames.includes(pageName) && ((keys[0] === '*' ) ? true : keys.includes(key))) {
            return func(key);
        }
        if (keys.includes(key)) {
            return func(key);
        }
    }

    if (te(newKey)) {
        return t(newKey);
    }
    return key;
}
