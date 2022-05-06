import path from 'path';
import CONFIG from '../config.js';

import jsonToTSType from 'json-to-ts';

const relativePath = (p) => {
    const root = path.join(CONFIG.pathRaw, '..');
    const relative = path.relative(root, p);
    return relative.split(path.sep).join(path.posix.sep);
};

const DEFAULT_OPTS = {
    printWidth: 120, // чтоб массивы выстраивались в одну линию,
    tabWidth: 4,
};

// noinspection SpellCheckingInspection
export default [
    {
        name: 'JavaScript',
        opts: { ...DEFAULT_OPTS, trailingComma: 'all', parser: 'babel' },
        extensions: [ '.js', '._js', '.jsm', '.mjs' ],

        formatting(content, { runnerName, originalFile, usedFiles }) {
            const head = [];

            runnerName = (!runnerName || runnerName === 'Runner') ? 'default' : `${runnerName}.js`;
            head.push(`@GeneratedBy ${runnerName} runner`);
            head.push(`@OriginalFile ${relativePath(originalFile)}`);

            if (usedFiles.length) {
                head.push(`@UsedFiles ${usedFiles.map((e) => `${e}.csv`).join(', ')}`);
            }

            return `
            /**
            ${head.map((e) => `* ${e}`).join('\n')}
            */

            export default ${JSON.stringify(content)}
            `;
        },
    },
    {
        name: 'JSON',
        extensions: [ '.json' ],
        opts: { ...DEFAULT_OPTS, trailingComma: 'es5', parser: 'json' },

        formatting(content) {
            return JSON.stringify(content);
        },
    },
    {
        name: 'TypeScriptType',
        opts: { ...DEFAULT_OPTS, trailingComma: 'none', parser: 'typescript' },
        extensions: [ '.ts' ],

        formatting(content) {
            return jsonToTSType(content).reduce((acc, e) => `${e}\n${acc}`, '');
        },
    },
];
