import rules from '@Regulation/hideKeys.js';

const OPTS = {
    asMeta: false,
    asTitle: false,
};

const [byPath, byRegex] = rules.byPath.reduce(([path, regex], elem) => {
    if (typeof elem == 'string') {
        return [[...path, elem], regex];
    } else {
        return [path, [...regex, elem as RegExp]];
    }
}, [[], []] as [string[], RegExp[]]);

export default function(key: string, parentKey:string|null, opts = OPTS) {
    if (opts.asMeta) {
        return rules.meta.includes(key);
    }
    if (opts.asTitle) {
        return rules.forceTitle.includes(key);
    }

    const glob = rules.global.includes(key);

    if (parentKey) {
        const kp = `${parentKey}.${key}`;

        return glob || (byPath.includes(kp) || byRegex.some((e) => e.test(kp)));
    }
    return glob;
}
