import objectArrayify from '@/js/objectArrayify';
import isHide from '@Handlers/isHide';

export type LocaleObject = {[k: string]: string}
export type ObjectKString = { [k: string]: unknown }

export default function gameDiffLogData() {
    return {
        createDiff,
        isObject,
        createLocaleFromDiff,
        addMetadata,
    };

    function createDiff(parent: object, obj: object): object|null {
        class Cell {
            constructor(public data: unknown = null, public status: string = 'unknown') {}
        }

        if (isObject(parent)) {
            const [res, topLevel] = compareObject(parent as ObjectKString, obj as ObjectKString);

            if (res || topLevel) {
                return {
                    ...res,
                    ...topLevel,
                };
            }
        }
        return null;

        function compareObject(parent: ObjectKString, obj: ObjectKString): [{[k: string]: Cell}|null, ObjectKString|null] {
            const stats: {[k: string]: Cell} = {};
            let topLevel: ObjectKString = {};

            for (const key in parent) {
                if (key in parent) {
                    const cell = stats[key] = new Cell();

                    if (key in obj) {
                        const parentElem = parent[key];
                        const objElem = obj[key];

                        if (isObject(parentElem)) {
                            const [child, topLvl] = compareObject(parentElem as ObjectKString, objElem as ObjectKString);

                            if (child || topLvl) {
                                cell.status = 'modified';

                                if (child) {
                                    cell.data = child;
                                }
                                if (topLvl) {
                                    topLevel = {
                                        ...topLevel,
                                        [key]: topLvl,
                                    };
                                }
                            } else {
                                delete stats[key];
                            }

                            continue;
                        }
                        if (Array.isArray(parentElem)) {
                            if (isHide(key, null)) {
                                delete stats[key];
                                continue;
                            }
                            topLevel[key] = [...parentElem];
                            topLevel[`__>>${key}`] = Array.from({ length: parentElem.length }, () => '>>');

                            if (Array.isArray(objElem)) {
                                if (!isEqualArrays(parentElem, objElem) && typeof objElem[0] != 'object') {
                                    topLevel[`_${key}`] = [...objElem];
                                } else {
                                    delete topLevel[key];
                                    delete topLevel[`__>>${key}`];
                                }
                            } else {
                                topLevel[`_${key}`] = Array.from({ length: parentElem.length }, () => objElem);
                            }

                            delete stats[key];
                            continue;
                        }
                        if (parentElem !== objElem) {
                            cell.status = 'modified';
                            cell.data = [parentElem, objElem];
                        }
                    } else {
                        cell.status = 'deleted';
                        cell.data = parent[key];
                    }


                    if (!cell.data) {
                        delete stats[key];
                    }
                }
            }
            if (!isEqualArrays(Object.keys(parent), Object.keys(obj))) {
                Object.keys(obj)
                    .filter((k) => !(k in parent))
                    .forEach((k) => {
                        stats[k] = new Cell(obj[k], 'added');
                    });
            }

            return [
                (Object.keys(stats).length) ? stats : null,
                (Object.keys(topLevel).length) ? topLevel : null,
            ];
        }

        function isEqualArrays(arr1: unknown[], arr2: unknown[]): boolean {
            return arr1.every((e, i) => {
                if (Array.isArray(e) && Array.isArray(arr2[i])) {
                    return isEqualArrays(e, arr2[i] as unknown[]);
                }
                return e === arr2[i];
            });
        }
    }

    function addMetadata(target: {[k: string]: unknown}, sources: {[k: string]: unknown}[], filename: string) {
        for (const key in target) {
            if (key in target) {
                const sourcesByKey = sources.map((src) => src[key]);
                const filtered = sourcesByKey.filter(isObject);

                if (isObject(target[key]) && filtered.length) {
                    addMetadata(target[key] as typeof target, filtered as typeof sources, filename);
                }

                sources.forEach((src) => {
                    if (isObject(src)) {
                        ['TID', 'Icon', 'Name']
                            .filter((k) => k in src && !(k in target))
                            .forEach((k) => target[k] = src[k]);
                    }

                    const needNameKey = Object.values(target).some((e) => !isObject(e));
                    if (needNameKey) {
                        ['Name', 'TID']
                            .filter((k) => !(k in target && typeof target[k] == 'string'))
                            .forEach((k) => {
                                if (Array.isArray(target[k])) {
                                    target[`${k}2`] = [...target[k] as string[]];
                                }
                                target[k] = filename;
                            });
                    }
                });
            }
        }

        return target;
    }

    function createLocaleFromDiff(diff: LocaleObject, diffParent: LocaleObject, currentLocale: LocaleObject) {
        const copyCurrentLocale = { ...currentLocale };

        // REMOVE_LOC_KEYS.forEach((k) => delete copyCurrentLocale[k]);
        return {
            ...copyCurrentLocale,
            ...objectArrayify(diff, {
                map: ([k, v]) => [k, v.replaceAll('\\n\\n', '\n')],
            }),
        };
    }

    function isObject(elem: unknown) {
        return typeof elem == 'object' && !Array.isArray(elem);
    }
}
