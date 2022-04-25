import { readdir, readFile } from 'fs/promises';
import { join, basename } from 'path';
import { existsSync } from 'fs';

import JSON5 from 'json5';

import CONFIG from '../config.js';
import program, { options } from './program.js';

/**
 * Загрузить файлы локали согласно аргументам программы
 * @param {String} lang
 * @return {Promise<Object>}
 */
export default async function loadLocale(lang) {
    const filesNames = (options.full) ? await readdir(join(CONFIG.additionalContent, lang)) : program.args;
    const loadFiles = filesNames.map(async (f) => {
        const path = join(CONFIG.additionalContent, lang, f);
        if (existsSync(path)) {
            return JSON5.parse(await readFile(path, 'utf-8'));
        }
        console.warn('\x1b[33m[⚠️]\x1b[0m Файл "%s" отсутствует', path);
        return {};
    });

    const files = await Promise.all(loadFiles);

    return files.reduce((acc, value, index) => {
        const fileName = basename(filesNames[index], '.json5');
        if (fileName === fileName.toUpperCase()) {
            value = postfixKeys(value, fileName);
        }
        return { ...acc, ...value };
    }, {});
}

function postfixKeys(file, postfixKey) {
    return Object.fromEntries(
        Object.entries(file).map(([ key, value ]) => (
            [ `${key}_${postfixKey}`, value ]
        )),
    );
}
