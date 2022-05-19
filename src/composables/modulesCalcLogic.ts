import { reactive } from 'vue';

import { InputRecord, OutputRecord, InputKeys, OutputKeys, Level } from '@/typings/calculators';
import modules from '@Data/modules';
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
    [key: string]: number|number[]
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
    };

    function update(input: InputRecord, name?: string) {
        const planMapFn = (name: string, level: number, [k]: [string, unknown]) => [
            k, calcDiffChars(name, k, input.actually[name], level),
        ];
        const actuallyMapFn = (name: string, level: number, [k, v]: [string, unknown]) => [
            k, Array.isArray(v) ? v[level - 1] : v,
        ];

        Object.keys(output.total)
            .forEach((k) => output.total[k as keyof Output['total']] = 0);

        if (name) {
            calcModule(output.plan, name, (...args) => planMapFn(name, input.plan[name], ...args));
            calcModule(output.actually, name, (...args) => actuallyMapFn(name, input.actually[name], ...args));
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
    function calcModule(target: {[k: string]: Module}, name: string, map: ([k, v]: [string, number[]]) => (string | number)[]) {
        if (!modulesChars[name]) {
            modulesChars[name] = getChars((modules as {[k: string]: object})[name] as Module);
        }
        target[name] = objectArrayify(modulesChars[name], { map }) as Module;
    }
    function calcInput(entries: Level, target: {[k: string]: Module}, moduleMapFn: (name: string, level: number, [k]: [string, unknown]) => (string | number)[]) {
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
    function calcDiffChars(name: string, key: string, levelOne: number, levelTwo: number) {
        const char = modulesChars[name][key] as number[];
        const one = ((levelOne > 0) ? char[levelOne - 1] : 0);
        let two = char[levelTwo - 1];

        if (!Array.isArray(char)) {
            return char;
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

    function getChars(module: Module) {
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
                            removeNotArrayChars(value as {[key: string]: object});
                            if (!Object.keys(value).length) {
                                delete obj[key];
                            }
                            continue;
                        }
                        if (!Array.isArray(value) && !STACK_CHARS.includes(key)) {
                            delete obj[key];
                            continue;
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
