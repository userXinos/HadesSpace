import { dirname, join } from 'path';
import { existsSync, mkdirSync, readdirSync } from 'fs';

import Timer from '../parser/modules/Timer.js';
import Modules from '../parser/runners/Modules.js';
import { writeFile2 } from '../parser/modules/dirUtils.js';

import CONFIG from './config.js';
import program from './modules/program.js';
import loadLocale from './modules/loadLocale.js';
import parser from './modules/parser.js';
import compileLocale from './modules/compileLocale.js';
import genStringsStarHeaders from './modules/genStringsStarHeaders.js';

program.parse();

const time = new Timer();
const modules = await parser('modules.csv', Modules);
const defaultLocale = await loadLocale(CONFIG.defaultLang);
const starHeaders = genStringsStarHeaders(modules);
const files = readdirSync(CONFIG.additionalContent).map(handler);


await Promise.all(files);
console.log('\x1b[32m[✓] \x1b[0m Done! (%s сек.)', time.final);


async function handler(locale) {
    const data = await compileLocale(locale, defaultLocale, starHeaders);
    const path = join(CONFIG.savePath, `${locale}.json`);

    if (!existsSync(dirname(path))) {
        mkdirSync(dirname(path));
    }

    await writeFile2(path, JSON.stringify(data, null, 2));
    console.log('File', `"\x1b[32m${path}\x1b[0m"`, 'created');
}
