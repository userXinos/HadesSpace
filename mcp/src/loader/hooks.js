import { dirname, join } from 'node:path';
import { existsSync, statSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const STUBS = join(HERE, 'stubs');
const SRC = join(HERE, '../../../src');
const PARSER = join(HERE, '../../../parser/dist');
const REGULATION = join(SRC, 'regulation');
const UTILS = join(SRC, 'utils');

// Node's ESM resolver cannot resolve extension-less specifiers like
// `@Data/globals` or `@Utils/crystalConverter`. probe() tries the candidate
// extensions ourselves so those imports work without a build step.
const EXTENSIONS = ['', '.js', '.ts', '.mjs', '/index.js', '/index.ts'];

function probe(path) {
    if (existsSync(path) && statSync(path).isFile()) return path;
    for (const ext of EXTENSIONS) {
        const candidate = ext ? `${path}${ext}` : path;
        if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
    }
    return path;
}

const EXACT = {
    'vue-router': join(STUBS, 'vue-router.js'),
    'vuex': join(STUBS, 'vuex.js'),
    '@/components/Icon.vue': join(STUBS, 'Icon.js'),
    '@Utils/Vue/i18n': join(HERE, '../i18n.js'),
    '@Utils/sec2str': join(HERE, '../sec2str.js'),
};

const PREFIX = [
    ['@Utils/', UTILS],
    ['@Regulation/', REGULATION],
    ['@Data/', PARSER],
    ['@Img/', join(SRC, 'img')],
    ['@/components/', join(SRC, 'components')],
    ['@/', SRC],
];

export function resolve(specifier, context, nextResolve) {
    if (Object.hasOwn(EXACT, specifier)) {
        return { url: pathToFileURL(probe(EXACT[specifier])).href, shortCircuit: true };
    }

    for (const [prefix, dir] of PREFIX) {
        if (specifier.startsWith(prefix)) {
            return {
                url: pathToFileURL(probe(join(dir, specifier.slice(prefix.length)))).href,
                shortCircuit: true,
            };
        }
    }

    return nextResolve(specifier);
}
