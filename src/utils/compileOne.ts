import byTypes from '@Regulation/byTypes.js';

export default function(obj: Record<string, object>, { filterByType: { path } }: {filterByType: {path: string}}): object {
    const res: Record<string, any> = {};
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
