import hideKeys from '@Regulation/hideKeys';
import objectArrayify from '@/js/objectArrayify';

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
                            topLevel[key] = [...parentElem];
                            topLevel[`__>>${key}`] = Array.from({ length: parentElem.length }, () => '>>');

                            if (Array.isArray(objElem)) {
                                if (!isEqualArrays(parentElem, objElem)) {
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
            if (Object.keys(parent).length < Object.keys(obj).length) {
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
    }

    function addMetadata(target: ObjectKString, src: object, filename?: string) {
        for (const key of Object.keys(target)) {
            const targetElem = target as {[k: string]: object};
            const srcElem = src as {[k: string]: object};

            if (isObject(targetElem[key]) && key in srcElem) {
                const t = targetElem[key] as typeof target;
                addMetadata(t, srcElem[key]);

                if (!t.Name) {
                    t.Name = filename;
                }
                if (!t.TID) {
                    t.TID = filename;
                }
            }

            if (srcElem) {
                hideKeys.meta
                    .filter((k) => k in srcElem)
                    .forEach((k) => targetElem[k] = srcElem[k]);
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
    function isEqualArrays(arr1: unknown[], arr2: unknown[]) {
        return arr1.every((e, i) => e === arr2[i]);
    }
}
