import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const PARSER_DIST_PATH = '../parser/dist';
const REGULATION_LOC_PATH = '../src/regulation/locKeys.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const { gameCharsLocKeys, gameSlostLocKeys } = await import(REGULATION_LOC_PATH);
const dist = await importAllFiles(PARSER_DIST_PATH);

const allKeys = [...new Set([...getUniqueStringValues(dist), ...Object.values(gameCharsLocKeys), ...Object.values(gameSlostLocKeys)])];

saveJson(allKeys, 'usedLocKeys');

async function importAllFiles(dir) {
    const files = fs.readdirSync(dir).map(async (file) => {
        const filePath = path.join(dir, file);

        if (path.extname(file) === '.js') {
            return await import(filePath).then((m) => m.default);
        }
    });

    return await Promise.all(files);
}
function getUniqueStringValues(obj) {
    const result = [];

    // Рекурсивная функция для обхода объекта
    function traverse(obj) {
        for (const key in obj) {
            if (typeof obj[key] === 'string' && obj[key].startsWith('TID_')) {
                if (!result.includes(obj[key])) {
                    result.push(obj[key]);
                }
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                traverse(obj[key]);
            }
        }
    }

    obj.forEach((item) => traverse(item));

    return result;
}
function saveJson(object, fileName) {
    const data = JSON.stringify(object, null, 2);
    const filePath = path.relative(__dirname, `${fileName}.json`);

    fs.writeFileSync(filePath, data, 'utf-8');
    console.log(`Saved as ${filePath}`);
}
