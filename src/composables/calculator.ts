import { reactive } from 'vue';

import objectArrayify from '@/js/objectArrayify';
import { getCharsWithHideStatus } from '@/components/DataHeadStats.vue';

type InputKeys = 'actually'|'plan';
export type Element = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Name: string,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    TID: string,

    [key: string]: number|number[]|{[k: string]: number[]}
}
export interface Level {[key: string]: number}
export type Input = Record<InputKeys, Level>
export interface Output extends Record<InputKeys|'total', unknown> {
    actually: {[key: string]: Element}
    plan: {[key: string]: Element}
    total: {
        intermediate: {
            [key: string]: {
                [key in 'actually'|'plan'|'sum']: number
            }
        },
        result: {[key: string]: number}
    }
}
export type ElementsStore = { [key: string]: Element }
export type getElementsCB = (getChars: <Type extends object>(element: Type, maxLevel: number) => Element, elementsStore: ElementsStore) => unknown

type mapFnArgs = Parameters<(elem: [string, unknown], i: number, arr: [string, unknown][]) => number>

export default function planetsCalcLogic(stackChars: string[], initCalcTotal: (store: ElementsStore, output: Output) => (name: string, input: Input) => void) {
    const output = reactive({
        actually: {},
        plan: {},
        total: { intermediate: {}, result: {} },
    }) as Output;
    const elementsCharsStore = {} as ElementsStore;

    for (const k of stackChars) {
        output.total.result[k] = 0;
    }
    const calcTotal = initCalcTotal(elementsCharsStore, output);

    return {
        provideGetterElements,
        output,
        update,
    };

    function provideGetterElements(callback: getElementsCB) {
        return callback(getChars, elementsCharsStore);
    }
    function update(input: Input, name?: string) {
        const planMapFn = (name: string, level: number, ...args: mapFnArgs) =>
            mapFnWrap(([k], i, arr) => calcDiffChars(Object.fromEntries(arr), k, input.actually[name], level), name, ...args);
        const actuallyMapFn = (name: string, level: number, ...args: mapFnArgs) =>
            mapFnWrap(([, v]) => Array.isArray(v) ? v[level - 1] : v, name, ...args);

        if (name) {
            calcElement(output.plan, name, (...args: mapFnArgs) => planMapFn(name, input.plan[name], ...args));
            calcElement(output.actually, name, (...args: mapFnArgs) => actuallyMapFn(name, input.actually[name], ...args));
        } else {
            calcInput(input.plan, output.plan, planMapFn);
            calcInput(input.actually, output.actually, actuallyMapFn);
        }

        setAllKeysZero(output.total);

        for (const [name, element] of Object.entries(output.plan)) {
            if (Object.keys(element).length) {
                for (const k of stackChars) {
                    output.total.result[k] += element[k] as number;
                }
                calcTotal(name, input);
            }
        }
    }
    function mapFnWrap(mapFnElement: (...args: mapFnArgs) => number, name: string, ...args: mapFnArgs) {
        const [[key]] = args;

        if (isObject(elementsCharsStore[name][key])) {
            const obj = objectArrayify(elementsCharsStore[name][key], {
                map: (...args : mapFnArgs) => [args[0][0], mapFnElement(...args)],
            }) as number; // <- тсс
            return [key, obj];
        }
        return [key, mapFnElement(...args)];
    }
    function calcElement(target: {[k: string]: Element}, name: string, map: (...args: mapFnArgs) => (string | number)[]) {
        target[name] = objectArrayify(elementsCharsStore[name], { map }) as Element;
    }
    function calcInput(entries: Level, target: {[k: string]: Element}, elementMapFn: (name: string, level: number, ...args: mapFnArgs) => (string | number)[]) {
        if (Object.keys(entries).length) {
            for (const [n, lvl] of Object.entries(entries)) {
                if (!lvl) {
                    target[n] = {} as Element;
                } else {
                    calcElement(target, n, (...args) => elementMapFn(n, lvl, ...args));
                }
            }
        } else {
            for (const k of Object.keys(target)) {
                delete target[k];
            }
        }
    }
    function calcDiffChars(obj: {[k: string]: unknown}, key: string, levelOne: number, levelTwo: number) {
        const char = obj[key] as number[];
        const one = ((levelOne > 0) ? char[levelOne - 1] : 0);
        let two = char[levelTwo - 1];

        if (!Array.isArray(char)) {
            if (!levelOne && levelTwo) {
                return char;
            }
            return 0;
        }

        if (stackChars.includes(key)) {
            two = 0;
            let i = (levelOne > 0) ? levelOne - 1 : 0;
            while (i <= (levelTwo - 1)) {
                two += char[i];
                i++;
            }
        }
        return two - one;
    }
    function setAllKeysZero(obj: {[k: string]: unknown}) {
        for (const k in obj) {
            if (k in obj) {
                if (isObject(obj[k])) {
                    setAllKeysZero(obj[k] as Record<string, unknown>);
                    continue;
                }
                obj[k] = 0;
            }
        }
    }

    function getChars<Type extends object>(element: Type, maxLevel: number) {
        type ObjAndVisible = [object, boolean];

        const raw = getCharsWithHideStatus(element);
        removeNotArrayChars(raw as {[key: string]: ObjAndVisible});

        return raw as Element;

        // TODO настройка для отключения этого поведения
        function removeNotArrayChars(obj: {[key: string]: ObjAndVisible|object}) {
            for (const key in obj) {
                if (key in obj) {
                    const oav = obj[key] as ObjAndVisible;
                    const value = (typeof oav[1] == 'boolean') ? oav[0] : oav;

                    if (isObject(value)) {
                        const subChars = getChars(value as Type, maxLevel);

                        if (Object.keys(subChars).length) {
                            obj[key] = subChars;
                        } else {
                            delete obj[key];
                        }
                        continue;
                    } else {
                        if (!(Array.isArray(value) && value.length == maxLevel) && !stackChars.includes(key)) {
                            delete obj[key];
                            continue;
                        }
                    }
                    if (typeof oav[1] == 'boolean') {
                        obj[key] = value;
                    }
                }
            }
            return obj;
        }
    }
}

function isObject(o: unknown) {
    return (typeof o === 'object' && !Array.isArray(o) && o !== null);
}
