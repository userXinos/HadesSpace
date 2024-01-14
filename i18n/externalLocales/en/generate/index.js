import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import serviceLines from './serviceLines.json' assert {type: 'json'};
import enLocale from '../../../dist/en.json' assert {type: 'json'};

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_PATH = path.join(__dirname, `../../../../`);

const rawLocale = await import(path.join(ROOT_PATH, 'parser/dist/loc_strings/en.js')).then((m) => m.default);
const allowedKeys = Object.keys(enLocale);

Object.keys(rawLocale).forEach((k) => {
    if (!allowedKeys.includes(k)) {
        delete rawLocale[k];
    }
});


saveJson({ ...rawLocale, ...serviceLines }, '../index');

function saveJson(object, fileName) {
    const data = JSON.stringify(object, null, 2);
    const filePath = path.join(__dirname, `${fileName}.json`);

    fs.writeFileSync(filePath, data, 'utf-8');
    console.log(`Saved as ${filePath}`);
}
