import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import string from './configKeys/string.js';
import upperCase from './configKeys/upperCase.js';

const ROOT_DIR = dirname(fileURLToPath(import.meta.url));

export default Object.freeze({
    defaultLang: 'en',
    savePath: join(ROOT_DIR, './dist'),
    additionalContent: join(ROOT_DIR, './locales'),

    excludeFromStringsStarHeaders: [ 'NoCerbBondTeleportPRS' ],
    upperCaseKeys: upperCase,
    stringKeys: string,
});
