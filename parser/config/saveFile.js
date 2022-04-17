import path from 'path';
import CONFIG from '../config.js';

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
        extensions: [ '.js', '._js', '.bones', '.es', '.es6', '.frag', '.gs', '.jake', '.jsb', '.jscad', '.jsfl', '.jsm', '.jss', '.mjs', '.njs', '.pac', '.sjs', '.ssjs', '.xsjs', '.xsjslib' ],

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
        extensions: [ '.json', '.avsc', '.geojson', '.gltf', '.JSON-tmLanguage', '.jsonl', '.tfstate', '.tfstate.backup', '.topojson', '.webapp', '.webmanifest' ],
        opts: { ...DEFAULT_OPTS, trailingComma: 'es6', parser: 'json' },

        formatting(content) {
            return JSON.stringify(content);
        },
    },
];
