import hideKeys from '../../../src/regulation/hideKeys.js';

const GLOBAL_KEYS = new Set(hideKeys.global);
const BY_PATH = hideKeys.byPath;
const BY_PATH_STRINGS = new Set(BY_PATH.filter((e) => typeof e === 'string'));
const BY_PATH_REGEX = BY_PATH.filter((e) => e instanceof RegExp);

export function isHidden(key, parentKey) {
    if (GLOBAL_KEYS.has(key)) return true;

    if (!parentKey) return false;

    const path = `${parentKey}.${key}`;
    return BY_PATH_STRINGS.has(path) || BY_PATH_REGEX.some((re) => re.test(path));
}

export default {
    name: 'hide',

    transform(entity) {
        const parentKey = typeof entity.Name === 'string' ? entity.Name : null;
        const out = {};

        for (const [key, value] of Object.entries(entity)) {
            if (isHidden(key, parentKey)) continue;
            out[key] = value;
        }

        return out;
    },
};
