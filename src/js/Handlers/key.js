import i18n from '@/js/Vue/i18n';
import rules from '@Regulation/formatKeyRules.js';
import locKeys from '@Regulation/locKeys.mjs';
import postfixes, { regex as FIX_KEY_REGEX } from '@Regulation/postfixes.mjs';

const GET_POSTFIX_KEY_REGEX = new RegExp(`.+?_?(${postfixes.join('|')})$`);
const { t, te } = i18n.global;

export default function(key, pageName) {
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

    const newKey = locKeys[key] || key;
    if (te(newKey)) {
        return t(newKey);
    }

    if (FIX_KEY_REGEX.test(key)) {
        const fixedKey = key.replace(FIX_KEY_REGEX, '');

        if (fixedKey in locKeys) {
            const keyPart2 = key.replace(GET_POSTFIX_KEY_REGEX, '$1');
            return `${t(locKeys[fixedKey])} (${t(locKeys[keyPart2] || keyPart2)})`;
        }
    }

    return key;
}
