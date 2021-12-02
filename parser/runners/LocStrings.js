import { join, basename } from 'path';

import Runner from '../modules/Runner.js';
import Modules from './Modules.js';
import loadFile from '../modules/loadFile.js';
import CONFIG from '../config.js';

import stringKeys from '../../config/stringKeys.js';
import { pathToFileURL } from 'url';

const { data: modules } = await loadFile(join(CONFIG.pathRaw, 'modules.csv'), [ Modules ]).then((e) => e.render());
const starHeaders = generateStringsStarHeaders();

const RUNNER_CONFIG = Object.freeze({
    defaultLang: 'en',
    contentPath: join(CONFIG.runnersPath, 'loc_strings'),
    upperCaseKeys: [
        'TID_MODULE_EMP',
    ],
});

export default class LocStrings extends Runner {
    prettierConfig = {
        printWidth: 80085,
    }

    static config = {
        file: /loc_strings_\w+/,
        runner: RUNNER_CONFIG,
    }

    static parse(csv) {
        return Object.fromEntries(
            csv
                .trim()
                .split(/\r?\n/)
                .filter((s) => !s.startsWith('//'))
                .map((s) => s
                    .split(/"(.+?)","(.+?)"/)
                    .slice(1, 3),
                ),
        );
    }

    loadFile(name, land = RUNNER_CONFIG.defaultLang) {
        const path = join(RUNNER_CONFIG.contentPath, land, name);
        const { href } = pathToFileURL(path);

        return import(href).then((m) => m.default);
    }

    async run(data) {
        const md = this.metadata;
        const lang = basename(md.originalFile, '.csv').replace(/loc_strings_(.+)/, '$1');
        const defaultLangFile = await this.loadFile('strings.js');
        const currentLangFile = await this.loadFile('strings.js', lang);
        const customDesc = await this.loadFile('customDesc.js', lang).catch(() => null);

        md.saveAs = md.originalFile.replace(/loc_strings_(.+)\.(\w+)$/, '$1.$2');
        fixWords();
        addStarKeys();
        addCustomDesc();

        delete data['TID_INTRO_MESSAGE']; // ломает json, нету смысла спасать

        return data;


        function fixWords() {
            Object.keys(data).forEach((k) => data[k] = string(data[k]));

            function string(rawStr) {
                const firstLetterRaw = rawStr.slice(0, 1); // '«'
                let result = rawStr.toLowerCase();

                result = result.replace(/(«)(\W)/g,
                    (math, s, w) => s + w.toUpperCase());
                for (const key of RUNNER_CONFIG.upperCaseKeys) {
                    const w = data[key];
                    // const regex = /(?<=[\s,.:;"']|^)+w+(?=[\s,.:;"']|$)/gi;
                    // \b word \b, а всё потому что regex адекватно не работает с юникодом :/
                    const regex = new RegExp(`\(\?\<\=\[\\s\,\.\:\;\"\'\]\|\^\)${ w }\(\?\=\[\\s\,\.\:\;\"\'\]\|\$\)`, 'gi');

                    result = result.replace(regex, w);
                }
                if (firstLetterRaw.toUpperCase() === firstLetterRaw) {
                    const firstLetter = result.slice(0, 1);
                    result = result.replace(firstLetter, firstLetter.toUpperCase());
                }
                return result;
            }


            // function regexFix(str) {
            //     return str
            //         .replace(/(\s\(?<\w+>).*?(<\/\w+>(\s.{2}\.\))?)/g, '') // BBCode eng/ru "<color>N</color>"/"(<color>N</color> шт.)"
            //         .replace(/\\<(\w+)[^\]]*](.*?)\[\/\1>/g, '')
            //         .replace(/:\s?$/, '')
            //         .replace(/\s({0\})$/, '')
            //         .replace(/({\d})(.+?)({\d})(.+?)({\d})/, 'N$2X$4Y')
            //         .replace(/({\d})(.+?)({\d})/, 'N$2X')
            //         .replace(/({\d})/, 'N');
            // }
        }
        function addStarKeys(customDesc, lang) {
            compareStrings(currentLangFile, defaultLangFile, true); // добавить ключи из доп файла которых нету в defaultLangFile
            compareStrings(defaultLangFile, currentLangFile);

            Object.keys(starHeaders).forEach((k) => {
                starHeaders[k].forEach((star) => {
                    const starKey = star.replace(/_?(\w\w)/, '$1');
                    const key = (k in stringKeys) ? stringKeys[k] : k;

                    data[k + star] = `${data[key] || key} (${data[starKey]})`;
                });
            });

            function compareStrings(one, two, info = false) {
                Object.keys(one).forEach((key) => {
                    if (key in two) {
                        data[key] = two[key];
                    } else {
                        if (info) console.log(`добавлен доп ключ: ${key} | язык: ${lang}`);
                        data[key] = one[key];
                    }
                });
            }
        }
        function addCustomDesc() {
            if (!customDesc) return;

            Object.entries(customDesc).forEach(([ key, value ]) => {
                data[`${key}_customDesc`] = value;
            });
        }
    }
}

function generateStringsStarHeaders() {
    const config = Modules.config.runner;
    return run(modules);

    function run(value) {
        const res = {};

        Object.entries(value)
            .map(([ key, value ]) => {
                if (value.constructor === Object) {
                    Runner.combineObjects(res, run(value));
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
}
