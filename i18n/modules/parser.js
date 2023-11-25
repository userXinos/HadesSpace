import { join } from 'path';

import CONFIG from '../../parser/config.js';
import loadFile from '../../parser/modules/loadFile.js';
import { options } from './program.js';

import runner from '../../parser/runners/LocStrings.js';

/**
 * Загрузить и распарсить через ранер файл
 * @param {String} file путь до файла относительно папки с сырыми данными
 * @param {Function<Runner>} runner
 * @return {Promise<Object>}
 */
export default async function(file) {
    const path = join(options.rawContent ? options.rawContent : CONFIG.pathRaw, file);
    const { data } = await loadFile(path, [ runner ]).then((e) => e.render());

    return data;
}
