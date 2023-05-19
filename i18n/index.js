import { dirname, join } from 'path';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { writeFile } from 'fs/promises';

import Timer from '../parser/modules/Timer.js';

import CONFIG from './config.js';
import program from './modules/program.js';
import loadLocale from './modules/loadLocale.js';
import compileLocale from './modules/compileLocale.js';

program.parse();

const time = new Timer();
const defaultLocale = await loadLocale(CONFIG.defaultLang);
const files = readdirSync(CONFIG.additionalContent).map(handler);


await Promise.all(files);
console.log('\x1b[32m[✓] \x1b[0m Done! (%s sec.)', time.final);


async function handler(locale) {
    const data = await compileLocale(locale, defaultLocale);
    const path = join(CONFIG.savePath, `${locale}.json`);

    if (!existsSync(dirname(path))) {
        mkdirSync(dirname(path));
    }

    await writeFile(path, JSON.stringify(data, null, 2));
    console.log('File', `"\x1b[32m${path}\x1b[0m"`, 'created');
}
