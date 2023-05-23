import rules from '@Regulation/statsStyle.js';


export default function(key: string): string {
    for (const name in rules) {
        if (rules[name].includes(key)) {
            return name;
        }
    }
    return '';
}
