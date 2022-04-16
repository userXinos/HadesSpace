import Modules from '../../parser/Runners/Modules.js';

const config = Modules.config.runner;
const STAR_REGEX = new RegExp(`(.+?)(_?(${ config.starsOrder.join('|') }))$`, 'm');

export default function genStringsStarHeaders(data, res = {}) {
    Object.entries(data)
        .map(([ key, value ]) => {
            if (value.constructor === Object) {
                genStringsStarHeaders(value, res);
            }
            return key;
        })
        .filter((k) => STAR_REGEX.test(k) && !config.excludeKeysStringStar.includes(k))
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
