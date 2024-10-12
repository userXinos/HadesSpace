// noinspection ES6PreferShortImport

import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import upperCase from './configKeys/upperCase.js';
import { gameCharsLocKeys } from '../src/regulation/locKeys.mjs';

const ROOT_DIR = dirname(fileURLToPath(import.meta.url));

export default Object.freeze({
    defaultLang: 'zh-si',
    savePath: join(ROOT_DIR, './dist'),
    additionalContent: join(ROOT_DIR, './locales'),
    externalLocales: join(ROOT_DIR, './externalLocales'),

    upperCaseKeys: upperCase,
    stringKeys: gameCharsLocKeys,
});
