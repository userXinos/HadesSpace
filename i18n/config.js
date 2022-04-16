import { join, dirname } from 'path';

import string from './configKeys/string.js';
import upperCase from './configKeys/upperCase.js';

const ROOT_DIR = dirname(import.meta.url.replace('file:///', ''));

export default Object.freeze({
    defaultLang: 'en',
    savePath: join(ROOT_DIR, './dist'),
    parsedContent: join(ROOT_DIR, '../parser/dist/loc_strings'),
    additionalContent: join(ROOT_DIR, './locales'),

    upperCaseKeys: upperCase,
    stringKeys: string,
});
