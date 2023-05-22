import byTypes from '@Regulation/byTypes.js';
import type { Callbacks } from './objectArrayify.js';

/**
 * @param {String} pathType path.to.array
 * @return {Object}
 */
export default function getFilterByType(pathType: string) {
    const list = pathType
        .split('.')
        .reduce(<T>(acc: Record<string, unknown>, p: string) => acc[p] as T, byTypes) as unknown as string[];

    return {
        filter: ([name]) => list.includes(name),
        sort: ([a], [b]) => list.indexOf(a) - list.indexOf(b),
    } as Callbacks;
}
