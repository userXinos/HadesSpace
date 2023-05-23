import rules from '@Regulation/statsStyle.js';
import { regex } from '@Regulation/postfixes.mjs';


export default function(key: string): string {
    const fixedKey = key.replace(regex, '');

    for (const name in rules) {
        if (rules[name].includes(fixedKey)) {
            return name;
        }
    }
    return '';
}
