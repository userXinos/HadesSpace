import prettier from 'prettier';
import { existsSync, mkdirSync } from 'fs';
import { dirname, resolve, parse, format, relative } from 'path';

import { writeFile2 } from './dirUtils.js';
import CONFIG from '../config.js';
import { options } from './program.js';

/**
 * Сохранить в файл
 * @param  {Runner} raw  Объект, который нужно сохранить
 * @return {Promise<void>}
 */
export default async function saveFile(raw) {
    const { type } = options;
    const { data, metadata } = await raw.render();
    const originalFile = parse(metadata.saveAs || metadata.originalFile);
    const ext = `.${type}`;
    const language = CONFIG.saveFile.find(( e) => e.extensions.includes(ext));
    const path = format({
        ...originalFile,
        ext,
        base: null,
        dir: resolve(CONFIG.pathSave, relative(CONFIG.pathRaw, originalFile.dir)),
    });

    if (!language) {
        const supported = CONFIG.saveFile.map(({ extensions }) => extensions).flat();
        throw new Error(`Wrong or unsupported file save type: "${type}"
        Supported types: ${supported.map((e) => e.slice(1)).join(', ')} 
        `);
    }

    if (!existsSync(dirname(path))) {
        mkdirSync(dirname(path));
    }
    return writeFile2(path, prettier.format(
        language.formatting(data, metadata),
        { ...language.opts, ...raw.prettierConfig },
    ))
        .then(() => {
            console.log('File', `"\x1b[32m${path}\x1b[0m"`, 'created');
        });
}
