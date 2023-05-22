/* eslint-disable guard-for-in */
// noinspection DuplicatedCode

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/* CONFIGURATION  */
const PARSER_DIST_PATH = '../parser/dist/Nebula';
const PARSER_DIST_BLACK_LIST_FILES = [
    'globals', 'iap', 'badge_colors',
    'languages', 'news', 'steam_prices',
    'tutorial', 'player_goals', 'module_scenes',
    'player_default_names', 'regions', 'static_object_names',
    'xp_levels',
];

const REGULATION_RULES_PATH = '../src/regulation/formatValueRules.utils';
const REGULATION_RULES_TIME_PATH = '../src/regulation/formatValueRulesTime.mjs';
const POSTFIXES = '../src/regulation/postfixes.mjs';
const REGULATION_LOC_PATH = '../src/regulation/locKeys.mjs';
const REGULATION_HIDE_PATH = '../src/regulation/hideKeys.utils';
/* CONFIGURATION  */

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const parser = await compileModules(PARSER_DIST_PATH);
PARSER_DIST_BLACK_LIST_FILES.forEach((k) => delete parser[k]);
const AllUsesKeys = collectKeysAndClassification(parser);
const rules = await importModule(REGULATION_RULES_PATH);
const rulesTime = await importModule(REGULATION_RULES_TIME_PATH);
const postfixes = await importModule(POSTFIXES);
const loc = await importModule(REGULATION_LOC_PATH);
const hide = await importModule(REGULATION_HIDE_PATH);
const rulesByKeys = collectKeysFromArrays({ ...rules.default, ...rulesTime.default });
const hideByKeys = collectKeysFromArrays(hide.default);
const isHide = (key) => (
    hideByKeys.some((k) => {
        if (typeof k == 'string' && k.includes('.')) {
            k = k.split('.').pop();
        }
        if (k instanceof RegExp) {
            return k.test(`ae.${key}`);
        }
        return key == k;
    })
);
const output = Object.entries(AllUsesKeys).reduce((acc, [key, [type, fileName]]) => {
    key = key.replace(postfixes.regex, '');
    if (rulesByKeys.includes(key) || isHide(key) || key in loc.default) {
        return acc;
    }
    if (!(type in acc)) {
        acc[type] = {};
    }
    acc[type][key] = fileName;
    return acc;
}, {});

saveJson(output, 'unformattedKeysReport');


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
            const importedModule = await importModule(modulePath);

            modules[moduleName] = importedModule.default;
        }
    }

    return modules;
}
async function importModule(modulePath) {
    const moduleName = path.parse(modulePath).name;
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

    return importedModule;
}
function collectKeysAndClassification(modules) {
    const keys = {};

    const traverseModules = (obj, isTop = false, topName = '') => {
        if (typeof obj === 'object' && obj !== null) {
            const objKeys = Object.keys(obj);

            objKeys.forEach((key) => {
                if (typeof obj[key] !== 'object') {
                    keys[key] = [typeof obj[key], topName];
                }

                if (Array.isArray(obj[key])) {
                    if (!obj[key].some((e) => typeof e == 'object')) {
                        keys[key] = [`Array<${typeof obj[key][0]}>`, topName];
                    }
                    return;
                }

                traverseModules(obj[key], ...((isTop || topName) ? [false, topName || key] : []));
            });
        }
    };
    traverseModules(modules, true);

    return keys;
}
function collectKeysFromArrays(data) {
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

    return traverse(data);
}
function saveJson(object, fileName) {
    const data = JSON.stringify(object, null, 2);
    const filePath = path.relative(__dirname, `${fileName}.json`);

    fs.writeFileSync(filePath, data, 'utf-8');
    console.log(`Saved as ${filePath}`);
}
