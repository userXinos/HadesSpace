import i18n from '@/js/Vue/i18n';
import rules from '@Regulation/formatKeyRules.js';
import locKeys from '@Regulation/locKeys.mjs';

const { t, te } = i18n.global;

export default function(key, pageName) {
    const newKey = locKeys[key] || key;

    if (typeof key == 'undefined' || key == null || key.startsWith('_')) {
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
