import CONFIG from '../config.js';
import loadLocale from './loadLocale.js';

export default async function compileLocale(name, parsedData, defaultLocale) {
    const locale = await loadLocale(name);

    return { ...fixWords(parsedData), ...{ ...defaultLocale, ...locale } };
    /*                                                       ^ заполнить пробелы, если есть  */
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
