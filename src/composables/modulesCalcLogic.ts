import { reactive } from 'vue';

import { InputRecord, OutputRecord, InputKeys, OutputKeys, Level } from '@/typings/calculators';
import { getBySlotType } from '@/components/ModulePage.vue';
import { getCharsWithHideStatus } from '@/components/DataHeadStats.vue';
import objectArrayify from '@Scripts/objectArrayify';

export const STACK_CHARS = ['UnlockPrice', 'UnlockTime'];

/* eslint-disable @typescript-eslint/ban-ts-comment */
export type Module = {
    // @ts-ignore
    TID: string,
    // @ts-ignore
    Name: string,

    UnlockPrice: number|number[],
    UnlockTime: number|number[],
    [key: string]: number|number[]|{[k: string]: number[]}
}
export interface Output extends OutputRecord {
    actually: {[key: string]: Module}
    plan: {[key: string]: Module}
    total: {
        [key in 'UnlockPrice'|'UnlockTime'|'ReqBank']: number
    }
}
export {
    InputRecord as Input,
    InputKeys,
    OutputKeys,
};

type mapFnArgs = Parameters<(args: [string, unknown], i: number, arr: [string, unknown][]) => number>

export default function modulesCalcLogic() {
    const output = reactive({
        actually: {},
        plan: {},
        total: { UnlockPrice: 0, UnlockTime: 0, ReqBank: 0 },
    }) as Output;
    const modulesChars = {} as { [key: string]: Module };

    return {
        output,
        update,
        getModulesBySlotType,
    };

    function update(input: InputRecord, name?: string) {
        const planMapFn = (name: string, level: number, ...args: mapFnArgs) =>
            mapFnWrap(([k], i, arr) => calcDiffChars(Object.fromEntries(arr), k, input.actually[name], level), name, ...args);
        const actuallyMapFn = (name: string, level: number, ...args: mapFnArgs) =>
            mapFnWrap(([, v]) => Array.isArray(v) ? v[level - 1] : v, name, ...args);

        Object.keys(output.total)
            .forEach((k) => output.total[k as keyof Output['total']] = 0);

        if (name) {
            calcModule(output.plan, name, (...args: mapFnArgs) => planMapFn(name, input.plan[name], ...args));
            calcModule(output.actually, name, (...args: mapFnArgs) => actuallyMapFn(name, input.actually[name], ...args));
        } else {
            calcInput(input.plan, output.plan, planMapFn);
            calcInput(input.actually, output.actually, actuallyMapFn);
        }

        for (const [name, module] of Object.entries(output.plan)) {
            if (Object.keys(module).length) {
                const UnlockPrices = modulesChars[name].UnlockPrice;
                const UnlockPrice = (Array.isArray(UnlockPrices)) ? UnlockPrices[input.plan[name] - 1] : UnlockPrices;

                output.total.UnlockPrice += module.UnlockPrice as number;
                output.total.UnlockTime += module.UnlockTime as number;
                output.total.ReqBank = (UnlockPrice > output.total.ReqBank) ? UnlockPrice : output.total.ReqBank;
            }
        }
    }
    function mapFnWrap(mapFnElement: (...args: mapFnArgs) => number, name: string, ...args: mapFnArgs) {
        const [[key]] = args;

        if (isObject(modulesChars[name][key])) {
            const obj = objectArrayify(modulesChars[name][key], {
                map: (...args : mapFnArgs) => [args[0][0], mapFnElement(...args)],
            }) as number; // <- тсс
            return [key, obj];
        }
        return [key, mapFnElement(...args)];
    }
    function calcModule(target: {[k: string]: Module}, name: string, map: (...args: mapFnArgs) => (string | number)[]) {
        target[name] = objectArrayify(modulesChars[name], { map }) as Module;
    }
    function calcInput(entries: Level, target: {[k: string]: Module}, moduleMapFn: (name: string, level: number, ...args: mapFnArgs) => (string | number)[]) {
        if (Object.keys(entries).length) {
            for (const [n, lvl] of Object.entries(entries)) {
                if (!lvl) {
                    target[n] = {} as Module;
                } else {
                    calcModule(target, n, (...args) => moduleMapFn(n, lvl, ...args));
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

        if (STACK_CHARS.includes(key)) {
            two = 0;
            let i = (levelOne > 0) ? levelOne - 1 : 0;
            while (i <= (levelTwo - 1)) {
                two += char[i];
                i++;
            }
        }
        return two - one;
    }

    function getModulesBySlotType(type: string) {
        const modules = getBySlotType(type) as { [k: string]: Module };

        return Object.entries(modules).map(([name, module]) => {
            let maxLevel = 1;

            for (const [, value] of Object.entries(module)) {
                if (Array.isArray(value) && value.length > maxLevel) {
                    maxLevel = value.length;
                }
            }

            modulesChars[name] = getChars((modules as {[k: string]: object})[name] as Module, maxLevel);

            return [module, maxLevel];
        });
    }

    function getChars(module: Module, maxLevel: number) {
            type ObjAndVisible = [object, boolean];

            const raw = getCharsWithHideStatus(module);
            removeNotArrayChars(raw as {[key: string]: ObjAndVisible});

            return raw as Module;

            // TODO настройка для отключения этого поведения
            function removeNotArrayChars(obj: {[key: string]: ObjAndVisible|object}) {
                for (const key in obj) {
                    if (key in obj) {
                        const oav = obj[key] as ObjAndVisible;
                        const value = (typeof oav[1] == 'boolean') ? oav[0] : oav;

                        if (isObject(value)) {
                            const subChars = getChars(value as Module, maxLevel);

                            if (Object.keys(subChars).length) {
                                obj[key] = subChars;
                            } else {
                                delete obj[key];
                            }
                            continue;
                        } else {
                            if (!(Array.isArray(value) && value.length == maxLevel) && !STACK_CHARS.includes(key)) {
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
    function isObject(o: unknown) {
        return (typeof o === 'object' && !Array.isArray(o) && o !== null);
    }
}
