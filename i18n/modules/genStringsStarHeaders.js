import Modules from '../../parser/runners/Modules.js';
import CONFIG from '../config.js';

const starsPostfixes = [ ...Modules.config.runner.starsOrder, ...CONFIG.additionalStarAliases ];
const STAR_REGEX = new RegExp(`(.+?)(_?(${starsPostfixes.join('|')}))$`, 'm');

export default function genStringsStarHeaders(data, res = {}) {
    Object.entries(data)
        .map(([ key, value ]) => {
            if (value?.constructor === Object) {
                genStringsStarHeaders(value, res);
            }
            return key;
        })
        .filter((k) => STAR_REGEX.test(k) && !CONFIG.excludeFromStringsStarHeaders.includes(k))
        .forEach((k) => {
            const [ , key, star ] = STAR_REGEX.exec(k);

            if (!(key in res)) {
                res[key] = [];
            }
            if (!res[key].includes(star)) {
                res[key].push(star);
            }
        });
    return res;
}
