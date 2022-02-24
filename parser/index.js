import { readdirSync } from 'fs';
import { pathToFileURL } from 'url';
import { basename, resolve } from 'path';

import CONFIG from './config.js';
import Timer from './modules/Timer.js';
import loadFile from './modules/loadFile.js';
import saveFile from './modules/saveFile.js';
import { validRunner } from './modules/Runner.js';
import program, { options } from './modules/program.js';
import { wipeDir } from './modules/dirUtils.js';

program.parse();

const time = new Timer();
const ignoreFiles = CONFIG.ignoreFiles || [];

const runners = await Promise.all(
    readdirSync(CONFIG.runnersPath)
        .filter((file) => file.endsWith('.js'))
        .map((file) => import(pathToFileURL(resolve(CONFIG.runnersPath, file)).href)),
)
    .then((runs) => runs
        .map((e) => e.default)
        .filter(({ config, name }) => {
            if (!validRunner(config)) {
                console.log('\x1b[31m %s \x1b[0m', `Invalid runner "${name}" - pass`);
                return false;
            }
            return true;
        }),
    )
    .catch(err);

if (options.wipe) {
    wipeDir(CONFIG.pathSave);
}

runners.forEach(({ config }) => {
    if ('ignoreFiles' in config) {
        ignoreFiles.push(...config.ignoreFiles);
    }
});

await Promise.all(CONFIG.files
    .filter((f) => !ignoreFiles.includes(basename(f, '.csv')))
    .map((file) => loadSaveFile(file, runners)),
)
    .catch(err);

console.log('\x1b[32m[✓] \x1b[0m Готово! (%s сек.)', time.final);


async function loadSaveFile(file, runners) {
    const data = await loadFile(file, runners);
    return saveFile(data);
}

function err(error) {
    console.log('\x1b[31m[х]\x1b[0m', `Ошибки в выполнении.`, error, error.stack);
    process.exit(-1);
}

