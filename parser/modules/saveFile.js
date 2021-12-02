import prettier from 'prettier';
import { existsSync, mkdirSync } from 'fs';
import { dirname, resolve, parse, format, relative } from 'path';

import { writeFile2 } from '../utils/dir.js';
// import NestedRawJson from './NestedRawJson.js';
// import byTypes from '../config/byTypes.js';
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
    const path = format({
        ...originalFile,
        ext: `.${type}`,
        base: null,
        dir: resolve(CONFIG.pathSave, relative(CONFIG.pathRaw, originalFile.dir)),
    });

    if (!type in CONFIG.saveFile) {
        throw new Error(`Неправильный или не поддерживаемый тип для сохранения файлов: "${type}"`);
    }

    const { formatting, opts } = CONFIG.saveFile[type];
    if (!existsSync(dirname(path))) {
        mkdirSync(dirname(path));
    }
    return writeFile2(path, prettier.format(
        formatting(data, metadata.runnerName), {
            ...opts,
            ...raw.prettierConfig,
        }))
        .then(() => {
            console.log('Файл', `"\x1b[32m${path}\x1b[0m"`, 'создан');
        });
}

// // добавить захардкоженый контент
// function addContent(json) {
//     const needData = /(\w+)\..+?/.exec(json.metadata.originalFile)[1];
//     const byType = byTypes[needData] || {};
//     const result = {};
//     let registered = [];
//
//     result.export = 'data';
//     if (json[Object.keys(json)[0]].constructor !== NestedRawJson) {
//         return result; // нет вложенных объектов - просто данные
//     }
//     Object.keys(byType)
//         .forEach((key) => registered = registered.concat(byType[key]));
//     const notRegistered = Object.keys(json)
//         .filter((key) => !registered.includes(key));
//     if (notRegistered.length !== 0) {
//         if (Object.keys(byType).length !== 0) {
//             byType.notregistered = notRegistered;
//         } else {
//             byType.default = notRegistered;
//         }
//     }
//     result.content = `let byTypes= ${JSON.stringify(byType, null, 2)}`;
//     result.export += ', byTypes';
//     return result;
// }
