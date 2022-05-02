import { join } from 'path';

import CONFIG from '../../parser/config.js';
import loadFile from '../../parser/modules/loadFile.js';

/**
 * Загрузить и распарсить через ранер файл
 * @param {String} file путь до файла относительно папки с сырыми данными
 * @param {Function<Runner>} runner
 * @return {Promise<Object>}
 */
export default async function(file, runner) {
    const path = join(CONFIG.pathRaw, file);
    // noinspection JSCheckFunctionSignatures
    const { data } = await loadFile(path, [ runner ]).then((e) => e.render());

    return data;
}
