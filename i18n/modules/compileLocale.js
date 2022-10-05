import LocStrings from '../../parser/runners/LocStrings.js';

import CONFIG from '../config.js';
import loadLocale from './loadLocale.js';
import parser from './parser.js';

export default async function compileLocale(name, defaultLocale, starHeaders) {
    const parsedData = await parser(`loc_strings/loc_strings_${name}.csv`, LocStrings);
    const locale = await loadLocale(name);
    const result = { ...fixWords(parsedData), ...{ ...defaultLocale, ...locale } };
    /*                                                       ^ заполнить пробелы, если есть  */

    addStarKeys(result, starHeaders);

    return result;
}

/**
 * Исправить заглавные/все строчные и тд буквы, регексы
 * @param {Object} data
 * @return {Object}
 */
function fixWords(data) {
    return Object.fromEntries(
        Object.entries(data).map(([ key, value ]) => [ key, string(value) ]),
    );

    function string(rawStr) {
        rawStr = rawStr.replace(/\\n(\\n)?/g, '\n');

        if (rawStr !== rawStr.toUpperCase()) {
            return rawStr;
        }

        const firstLetterRaw = rawStr.slice(0, 1); // '«'
        let result = rawStr.toLowerCase();

        result = result.replace(/(«)(\W)/g, (math, s, w) => s + w.toUpperCase());
        for (const key of CONFIG.upperCaseKeys) {
            const w = data[key];
            // const regex = /(?<=[\s,.:;"']|^)+w+(?=[\s,.:;"']|$)/gi;
            // \b word \b, а всё потому что regex адекватно не работает с юникодом
            const regex = new RegExp(`\(\?\<\=\[\\s\,\.\:\;\"\'\]\|\^\)${ w }\(\?\=\[\\s\,\.\:\;\"\'\]\|\$\)`, 'gi');

            result = result.replace(regex, w);
        }
        if (firstLetterRaw.toUpperCase() === firstLetterRaw) {
            const firstLetter = result.slice(0, 1);
            result = result.replace(firstLetter, firstLetter.toUpperCase());
        }
        return result;
    }
}

/**
 *
 * @param {Object} data
 * @param {Object} starHeaders
 */
function addStarKeys(data, starHeaders) {
    Object.keys(starHeaders).forEach((k) => {
        starHeaders[k].forEach((star) => {
            const starKey = star.replace(/_?(\w\w)/, '$1');
            const key = CONFIG.stringKeys[k] || k;

            data[k + star] = `${data[key] || key} (${data[starKey] || starKey})`;
        });
    });
}
