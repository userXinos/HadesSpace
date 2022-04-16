import byTypes from '@Regulation/byTypes.js';
import objectArrayify from '@Scripts/objectArrayify.js';

/**
 * @param {Object} rawData - obj
 * @param {String} pathType path.to.array
 * @param {Object.<String, Function>} [extraCallbacks] to objectArrayify
 * @return {Object}
 */
export default function(rawData, pathType, extraCallbacks) {
    const list = pathType.split('.').reduce((acc, p) => acc[p], byTypes);

    return objectArrayify(rawData, {
        filter: ([name]) => list.includes(name),
        sort: ([a], [b]) => list.indexOf(a) - list.indexOf(b),
        ...extraCallbacks,
    });
}
