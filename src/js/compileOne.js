import byTypes from '@Regulation/byTypes.js';

/**
 * Из кучи маленьких в один большой объект
 * @param {Object.<String, Object>} obj
 * @param {Object} opts
 * @param {Object} opts.filterByType
 * @param {String} opts.filterByType.path
 * @return {Object}
 */
export default function(obj, { filterByType: { path } }) {
    const res = {};
    const list = (path) ? path.split('.').reduce((acc, p) => acc[p], byTypes) : null;

    Object.entries(obj)
        .filter(([name]) => (list) ? list.includes(name) : true)
        .sort(([a], [b]) => (list) ? (list.indexOf(a) - list.indexOf(b)) : 0)

        .forEach(([, e]) => {
            // noinspection DuplicatedCode
            Object.entries(e)
                .forEach(([key, value]) => {
                    if (key in res) {
                        if (Array.isArray(res[key])) {
                            res[key].push(value);
                        } else {
                            res[key] = [res[key], value];
                        }
                    } else {
                        res[key] = value;
                    }
                });
        });

    return res;
}
