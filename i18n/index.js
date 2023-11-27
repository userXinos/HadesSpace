import { dirname, join } from 'path';
import { existsSync, mkdirSync, readdirSync } from 'fs';
import { writeFile, readFile } from 'fs/promises';

import Timer from '../parser/modules/Timer.js';

import CONFIG from './config.js';
import program from './modules/program.js';
import loadLocale from './modules/loadLocale.js';
import compileLocale from './modules/compileLocale.js';
import parser from './modules/parser.js';

program.parse();

const time = new Timer();
const defaultLocale = await loadLocale(CONFIG.defaultLang);
const externalLocales = readdirSync(CONFIG.externalLocales);
const languagesMap = await parser(`languages.csv`);
const files = readdirSync(CONFIG.additionalContent).map(handler);


await Promise.all(files);
await writeFile(join(CONFIG.savePath, `index.json`), JSON.stringify(languagesMap, null, 2));
console.log('\x1b[32m[✓] \x1b[0m Done! (%s sec.)', time.final);


async function handler(locale) {
    let parsedData;

    if (locale !== CONFIG.defaultLang && externalLocales.includes(locale)) {
        const config = await getJson(join(CONFIG.externalLocales, locale, `config.json`));
        const preLocale = await getJson(join(CONFIG.externalLocales, locale, 'index.json'));
        const preLocale2 = await parser(`loc_strings/loc_strings_${config.overwrites}.csv`);

        parsedData = { ...preLocale2, ...preLocale };
        languagesMap[config.languages.Name] = { ...config.languages };
    } else {
        parsedData = await parser(`loc_strings/loc_strings_${locale}.csv`);
    }
    const data = await compileLocale(locale, parsedData, defaultLocale);
    const path = join(CONFIG.savePath, `${locale}.json`);

    if (!existsSync(dirname(path))) {
        mkdirSync(dirname(path));
    }

    await writeFile(path, JSON.stringify(data, null, 2));
    console.log('File', `"\x1b[32m${path}\x1b[0m"`, 'created');

    function getJson(path) {
        return readFile(path, 'utf-8').then((f) => JSON.parse(f));
    }
}
