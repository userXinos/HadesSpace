import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { walkDir } from './utils/dirUtils.js';

const ROOT_DIR = dirname(fileURLToPath(import.meta.url));
const RAW_PATH = join(ROOT_DIR, '../parser/dist/');
const LOCALE_FILE = join(ROOT_DIR, '../i18n/dist/en.json');

const ignoreFiles = ['module_scenes.js', 'artifacts.js', 'loc_strings/'];

const OPTIONS = {
    numberLocale: 'ru-RU',
};

const BASE_ICONS_DIR = join(ROOT_DIR, '../src/img/game');
const FILES = walkDir(RAW_PATH).filter((file) => file.endsWith('.js') && ignoreFiles.every((skip) => !file.includes(skip)));
const LOCALE_MAP = await import(LOCALE_FILE, { with: { type: 'json' } }).then((m) => m.default);

const SERVER = {
    name: 'hades-data',
    dataset: join(ROOT_DIR, 'dist/dataset.json'),
    hiddenFields: ['icon', 'icons'],
    limits: {
        defaultLimit: 50,
        maxLimit: 200,
        defaultSearchLimit: 20,
        maxFieldBytes: 4096,
        maxResultBytes: 65536,
        maxScanElements: 200,
        snippetRadius: 60,
    },
    http: {
        interface: '127.0.0.1',
        port: 3000,
        path: '/mcp',
    },
};

export {
    FILES,
    LOCALE_MAP,
    BASE_ICONS_DIR,
    OPTIONS,
    SERVER,
};
