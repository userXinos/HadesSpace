import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import saveFile from './config/saveFile.js';
import { walkDir } from './modules/dirUtils.js';
import program from './modules/program.js';

const ROOT_DIR = dirname(fileURLToPath(import.meta.url));

export default Object.freeze({
    runnersPath: join(ROOT_DIR, './runners'),
    pathRaw: join(ROOT_DIR, './raw'),
    pathSave: join(ROOT_DIR, './dist'),
    ignoreFiles: [ 'credits' ],
    saveFile,
    get files() {
        const files = program.args.map((f) => join(ROOT_DIR, f));

        if (files.length) {
            return files;
        }
        return walkDir(this.pathRaw)
            .filter((e) => (e !== undefined && e.endsWith('.csv')));
    },
});
