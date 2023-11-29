import { reactive } from 'vue';
import { useStore } from 'vuex';

import objectArrayify from '@Utils/objectArrayify';
import isHide from '@Handlers/isHide';

import type { Callback as mapFn } from '@Utils/objectArrayify';
import type { InputValue, Input, OutputValue, OutputMap, Output } from '@/typings/calculator';
import type { ElementsStore, getElementsCB, InitCalcTotalCB, GetMapFn, ValueHandlerToMapFnTarget } from '@/typings/calculator';

export default function calculator(stackChars: string[], initCalcTotal: InitCalcTotalCB) {
    const output: Output = reactive({ actually: {}, plan: {}, total: { intermediate: {}, result: {} } });
    const elementsCharsStore: ElementsStore = {};

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
        const getPlanMapFn: GetMapFn = (name: string, level: number) =>
            valueHandlerToMapFn(name,
                ([k], i, arr) => calcDiffChars(Object.fromEntries(arr), k, input.actually[name], level),
            );
        const getActuallyMapHandler: GetMapFn = (name: string, level: number) =>
            valueHandlerToMapFn(name,
                ([, v]) => Array.isArray(v) ? v[level - 1] : v,
            );

        if (name) {
            calcOutputValue(output.plan, name, getPlanMapFn(name, input.plan[name]));
            calcOutputValue(output.actually, name, getActuallyMapHandler(name, input.actually[name]));
        } else {
            calcAllOutputValues(input.plan, output.plan, getPlanMapFn);
            calcAllOutputValues(input.actually, output.actually, getActuallyMapHandler);
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
    function valueHandlerToMapFn(name: string, valueHandler: ValueHandlerToMapFnTarget): mapFn {
        return (...args) => {
            const [[key]] = args;

            if (isObject(elementsCharsStore[name][key])) {
                const obj = objectArrayify(elementsCharsStore[name][key] as object, {
                    map: (...args) => [args[0][0], valueHandler(...args)],
                });
                return [key, obj];
            }
            const number = valueHandler(...args);
            return [key, number];
        };
    }
    function calcOutputValue(target: OutputMap, name: string, map: mapFn): void {
        if (!elementsCharsStore[name]) {
            return;
        }
        target[name] = objectArrayify(elementsCharsStore[name], { map });
    }
    function calcAllOutputValues(inputLevels: InputValue, target: OutputMap, getMapFn: GetMapFn): void {
        if (Object.keys(inputLevels).length) {
            for (const [n, lvl] of Object.entries(inputLevels)) {
                if (!lvl) {
                    target[n] = {} as OutputValue;
                } else {
                    calcOutputValue(target, n, getMapFn(n, lvl));
                }
            }
        } else {
            for (const k of Object.keys(target)) {
                delete target[k];
            }
        }
    }
    function calcDiffChars(obj: {[k: string]: unknown}, key: string, levelOne: number, levelTwo: number): number {
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
    function setAllKeysZero(obj: {[k: string]: unknown}): void {
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

    function getChars(element: object, maxLevel: number): OutputValue {
        type ObjAndVisible = [object, boolean];

        const raw = getCharacteristicsLEGACY(element as Record<string, unknown>);
        removeNotArrayChars(raw as {[key: string]: ObjAndVisible});

        return raw as OutputValue;

        function removeNotArrayChars(obj: {[key: string]: ObjAndVisible|object}) {
            for (const key in obj) {
                if (key in obj) {
                    const oav = obj[key] as ObjAndVisible;
                    const value = (typeof oav[1] == 'boolean') ? oav[0] : oav;

                    if (isObject(value)) {
                        const subChars = getChars(value, maxLevel);

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

function getCharacteristicsLEGACY(d: Record<string, unknown>): object {
    const store = useStore();

    const res = objectArrayify(d, {
        map: ([k, value]) => [
            k,
            [
                value,
                isHide(k, d.Name as string),
            ],
        ],
        filter: ([k, [, remove]]) => (
            k.startsWith('_') || isHide(k, null, { asMeta: true, asTitle: false }) ? false : (store.state.userSettings.disableFilters ? true : !remove)
        ),
    }) as Record<string, [unknown|string, boolean]>;

    if (d.projectile) { // перенести вниз
        const { projectile } = res;
        delete res.projectile;
        res.projectile = projectile;
    }
    return res;
}
