import memoize from '@Utils/memoize';
import i18n from '@Utils/Vue/i18n';
import rules from '@Regulation/formatKeyRules.js';
import locKeys from '@Regulation/locKeys.mjs';
import postfixes, { regex as FIX_KEY_REGEX } from '@Regulation/postfixes.mjs';

const memorized: Map<(typeof rules)[0][1], (typeof rules)[0][1]> = new Map();
const GET_POSTFIX_KEY_REGEX = new RegExp(`.+?_?(${postfixes.join('|')})$`);
const { t, te } = i18n.global;

export default function(key: string, pageName:string): string {
    if (typeof key == 'undefined' || key == null || key.startsWith('_')) {
        return '';
    }

    for (const [keys, func, pageNames = []] of rules) {
        if (
            (pageNames.includes(pageName) && ((keys[0] === '*' ) ? true : keys.includes(key))) ||
            (keys.includes(key))
        ) {
            if (!memorized.has(func)) {
                memorized.set(func, memoize(func));
            }
            return memorized.get(func)?.(key) as string;
        }
    }

    const newKey = locKeys[key] || key;
    if (te(newKey)) {
        return t(newKey);
    }

    if (FIX_KEY_REGEX.test(key)) {
        const fixedKey = key.replace(FIX_KEY_REGEX, '');
        const fixedKey2 = key.replace(GET_POSTFIX_KEY_REGEX, '$1');

        return `${t(locKeys[fixedKey] || fixedKey)} (${t(locKeys[fixedKey2] || fixedKey2)})`;
    }

    return key;
}
