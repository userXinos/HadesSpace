import { t, tk, te } from '../i18n.js';
import { postfixes } from '../regulation.js';

export default {
    name: 'i18n',

    transform(entity) {
        const out = {};

        for (const [key, value] of Object.entries(entity)) {
            let name = tk(key);
            if (postfixes.regex.test(key)) {
                const fixedKey = key.replace(postfixes.regex, '');
                const fixedKey2 = postfixes.regex.exec(key)?.[1];

                name = `${tk(fixedKey)} (${tk(fixedKey2)})`;
            }

            out[name] = (key.startsWith('TID') && typeof value === 'string' && te(value)) ? t(value) : value;
        }

        return out;
    },
};
