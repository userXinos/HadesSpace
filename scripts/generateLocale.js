import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


import keys from './usedLocKeys.json' assert { type: 'json' };
const rawLocale = await import('../parser/dist/loc_strings/en.js').then((m) => m.default);


saveJson(getObjByKeys(rawLocale, keys), 'generateLocale');

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
    const filePath = path.relative(__dirname, `${fileName}.json`);

    fs.writeFileSync(filePath, data, 'utf-8');
    console.log(`Saved as ${filePath}`);
}
