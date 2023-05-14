/* eslint-disable guard-for-in */
// noinspection DuplicatedCode

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/* CONFIGURATION  */
const PARSER_DIST_PATH = '../parser/dist/Nebula';
const REGULATION_PATH = '../src/regulation/';
const BLACK_LIST_REG_FILES = ['pages', 'patchCommits', 'byTypes'];
const IGNORED_KEYS = [
    'valueX',
    'valueY',
    'valueZ',
    '*',
    '_',
    'Name2',
    'TID2',
];
/* CONFIGURATION  */

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const parser = await compileModules(PARSER_DIST_PATH);
const AllUsesKeys = collectKeysFromObj(parser);
const regulation = await compileModules(REGULATION_PATH).then((o) => {
    BLACK_LIST_REG_FILES.forEach((k) => delete o[k]);
    return o;
});
const regulationByKeys = collectKeysFromArrays(regulation);
const output = Object.keys(regulationByKeys).reduce((acc, key) => {
    const arr = regulationByKeys[key].filter((k) => {
        if (k instanceof RegExp) {
            return AllUsesKeys.some((s) => k.test(s));
        }
        if (typeof k == 'string' && k.includes('.')) {
            k = k.split('.').pop();
        }
        return !AllUsesKeys.includes(k) && !IGNORED_KEYS.includes(k);
    });
    if (arr.length) {
        acc[key] = arr;
    }
    return acc;
}, {});

saveJson(output, 'deprecatedKeysReport');


async function compileModules(directory) {
    const files = fs.readdirSync(path.join(__dirname, directory));
    const modules = {};

    for (const file of files) {
        const filePath = path.join(__dirname, directory, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const subModules = compileModules(path.join(directory, file));
            await Object.assign(modules, subModules);
        } else if (file.endsWith('.js') || file.endsWith('.mjs')) {
            const moduleName = path.parse(file).name;
            const modulePath = path.relative(__dirname, filePath);
            let importedModule;

            try {
                importedModule = await import(`./${modulePath}`);
            } catch (e) {
                const file = fs.readFileSync(`./${modulePath}`, 'utf-8');
                let [, fileExport] = file.match(/(export default ([{[])[\s\S]*?([}\]]);)/);

                fileExport = `const isNebulaBuild = false;\n${fileExport}`; // shh...
                if (moduleName == 'formatValueRules') { // SHH...
                    fileExport = fileExport
                        .replace(/\.\.\.formatValueRulesTime\.map\(\(\[keys, formatter]\) => \[\s*keys,\s*\(v\) => Array\.isArray\(v\) \? v\.map\(\(e\) => sec2str\(formatter\(e, globals\)\)\)\.join\(', '\) : sec2str\(formatter\(v, globals\)\),\s*]\),/, '');
                    fileExport = `function formatMixMax(v) {} ${fileExport}`;
                }

                try {
                    importedModule = await import(`data:text/javascript,${encodeURIComponent(fileExport)}`);
                } catch (e) {
                    console.error(e);
                    importedModule = { default: { } };
                }
            }
            modules[moduleName] = importedModule.default;
        }
    }

    return modules;
}
function collectKeysFromObj(modules) {
    const keys = [];

    const traverseModules = (obj) => {
        if (typeof obj === 'object' && obj !== null) {
            const objKeys = Object.keys(obj);
            objKeys.forEach((key) => {
                if (!keys.includes(key)) {
                    keys.push(key);
                }

                traverseModules(obj[key]);
            });
        }
    };
    traverseModules(modules);

    return keys;
}
function collectKeysFromArrays(data) {
    const result = {};

    const traverse = (data) => {
        const array = [];

        if (Array.isArray(data)) {
            for (const e of data) {
                if (Array.isArray(e)) {
                    array.push(...new Set(e[0]));
                } else {
                    array.push(e);
                }
            }
        } else if (typeof data === 'object' && data !== null) {
            for (const d in data) {
                array.push(...new Set(traverse(data[d])));
            }
        } else {
            console.log(data);
        }

        return array;
    };


    for (const dName in data) {
        if (Object.values(data[dName]).some((v) => typeof v == 'object')) {
            result[dName] = traverse(data[dName]);
        } else {
            result[dName] = Object.keys(data[dName]);
        }
    }


    return result;
}
function saveJson(object, fileName) {
    const data = JSON.stringify(object, regexReplacer, 2);
    const filePath = path.relative(__dirname, `${fileName}.json`);

    fs.writeFileSync(filePath, data, 'utf-8');
    console.log(`Saved as ${filePath}`);

    function regexReplacer(key, value) {
        if (value instanceof RegExp) {
            return value.toString();
        }
        return value;
    }
}


