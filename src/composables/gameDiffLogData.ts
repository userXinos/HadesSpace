import hideKeys from '@Regulation/hideKeys';
import objectArrayify from '@/js/objectArrayify';

export type LocaleObject = {[k: string]: string}

export default function gameDiffLogData() {
    return {
        createDiff,
        isObject,
        createLocaleFromDiff,
        addMetadata,
    };

    function createDiff(parent: object, obj: object): object|null {
        if (isObject(parent)) {
            return compareObject(parent, obj);
        }
        return null;

        function compareObject(parent: object, obj: object) {
            const res = {} as {[k: string]: unknown};

            for (const key in parent) {
                if (key in parent && key in obj) {
                    const parentElem = (parent as {[k: string]: unknown})[key];
                    const objElem = (obj as {[k: string]: unknown})[key];

                    if (isObject(parentElem)) {
                        const child = compareObject(parentElem as object, objElem as object);
                        if (child) {
                            res[key] = child;
                        }
                        continue;
                    }
                    if (Array.isArray(parentElem) ? !isEqualArrays(parentElem, objElem as unknown[]) : parentElem !== objElem) {
                        res[key] = parentElem;
                        if (Array.isArray(parentElem)) {
                            res[`__>>${key}`] = Array.from({ length: parentElem.length }, () => '>>');
                        }
                        res[`_${key}`] = objElem;
                    }
                }
            }

            return (Object.keys(res).length) ? res : null;
        }
    }

    function addMetadata(target: {[k: string]: unknown}, src: object, filename?: string) {
        for (const key of Object.keys(target)) {
            const targetElem = target as {[k: string]: object};
            const srcElem = src as {[k: string]: object};

            if (isObject(targetElem[key])) {
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
