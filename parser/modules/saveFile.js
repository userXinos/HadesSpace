import { existsSync, mkdirSync } from 'fs';
import { dirname, resolve, parse, format, relative, join } from 'path';

import prettier from 'prettier';

import { writeFile2 } from './dirUtils.js';
import CONFIG from '../config.js';
import { options } from './program.js';

/**
 * Сохранить в файл
 * @param  {Runner} raw  Объект, который нужно сохранить
 * @return {Promise<void>}
 */
export default async function(raw) {
    const { type, tsTypes } = options;
    const { data, metadata } = await raw.render();
    const originalFile = parse(metadata.saveAs || metadata.originalFile);
    const ext = `.${type}`;
    const path = format({
        ...originalFile,
        ext,
        base: null,
        dir: resolve(CONFIG.pathSave, relative(CONFIG.pathRaw, originalFile.dir)),
    });
    const language = CONFIG.saveFile.find(( e) => e.extensions.includes(ext));

    if (!language) {
        const supported = CONFIG.saveFile.map(({ extensions }) => extensions).flat();
        throw new Error(`Wrong or unsupported file save type: "${type}"
        Supported types: ${supported.map((e) => e.slice(1)).join(', ')} 
        `);
    }

    await writeFile(path, prettier.format(
        language.formatting(data, metadata),
        { ...language.opts, ...raw.prettierConfig },
    ));

    if (tsTypes && language.name === 'JavaScript' && !originalFile.dir.endsWith('loc_strings')) {
        await saveTSType(data, path);
    }
}

/**
 *
 * @param {Object} json
 * @param {string} pathJSFile
 * @return {Promise<void>}
 */
function saveTSType(json, pathJSFile) {
    const pathJS = parse(pathJSFile);
    const pathTS = format({
        ...pathJS,
        ext: '.ts',
        base: null,
        dir: join(pathJS.dir, '/types'),
    });
    const language = CONFIG.saveFile.find(( e) => e.name === 'TypeScriptType');

    if (!Array.isArray(json)) {
        return writeFile(pathTS, prettier.format(
            language.formatting(json),
            language.opts,
        ));
    }
}

/**
 *
 * @param {string} path
 * @param {string} data
 * @return {Promise<void>}
 */
function writeFile(path, data) {
    if (!existsSync(dirname(path))) {
        mkdirSync(dirname(path));
    }

    return writeFile2(path, data)
        .then(() => console.log('File', `"\x1b[32m${path}\x1b[0m"`, 'created'));
}
