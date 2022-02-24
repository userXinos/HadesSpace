import Runner from '../../parser/modules/Runner.js';
import Modules from '../../parser/Runners/Modules.js';

const config = Modules.config.runner;

export default function genStringsStarHeaders(data) {
    const res = {};

    Object.entries(data)
        .map(([ key, value ]) => {
            if (value.constructor === Object) {
                Runner.combineObjects(res, genStringsStarHeaders(value));
            }
            return key;
        })
        .filter((k) => {
            const regex = new RegExp(`${'.+?_?' + '('}${ config.starsOrder.join('|') })$`, 'm');
            return regex.test(k) && !config.excludeKeysStringStar.includes(k);
        })
        .forEach((k) => {
            const key = k.replace(/(.+?)_?\w\w$/m, '$1');
            const [ star ] = /(_?\w\w$)/.exec(k);

            if (!Object.keys(res).includes(key)) {
                res[key] = [];
            }
            if (!res[key].includes(star)) {
                res[key].push(star);
            }
        });
    return res;
}
