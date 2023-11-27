import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import usedLocKeys from './usedLocKeys.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_PATH = path.join(__dirname, `../../../../`);


const rawLocale = await import(path.join(ROOT_PATH, 'parser/dist/loc_strings/en.js')).then((m) => m.default);


saveJson(getObjByKeys(rawLocale, await usedLocKeys()), '../index');

function getObjByKeys(obj, keys) {
    const res = {};

    keys.forEach((k) => {
        if (k in obj) {
            res[k] = obj[k];
        } else {
            console.log(k);
        }
    });
    return res;
}
function saveJson(object, fileName) {
    const data = JSON.stringify(object, null, 2);
    const filePath = path.join(__dirname, `${fileName}.json`);

    fs.writeFileSync(filePath, data, 'utf-8');
    console.log(`Saved as ${filePath}`);
}
