import CalculatorConfig from '@/composables/calculatorConfig';
import { Callback as mapFn } from '@Utils/objectArrayify';

// Core
export type InputValue = Record<string, number>
export type Input = Record<'actually'|'plan', InputValue>
export type OutputValue = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    Name: string,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    TID: string,

    [key: string]: number|number[]|{[k: string]: number[]}
}
export type OutputMap = {[key: string]: OutputValue};
export interface Output {
    actually: OutputMap
    plan: OutputMap
    total: {
        intermediate: {
            [key: string]: {
                [key in 'actually'|'plan'|'sum']: number
            }
        },
        result: {[key: string]: number}
    }
}
export type ElementsStore = { [key: string]: OutputValue }

// Logic
export type getElementsCB = (
    getChars: (element: object, maxLevel: number) => OutputValue,
    elementsStore: ElementsStore
) => unknown;
export type InitCalcTotalCB = (store: ElementsStore, output: Output) =>
    (name: string, input: Input) => void
export type ValueHandlerToMapFnTarget = (...args: Parameters<mapFn>) => number
export type GetMapFn = (name: string, level: number) => (...args: Parameters<mapFn>) => [string, number|{[k: string]: number}]

// Config
export interface Config {
    configs: { name: string, temporary?: boolean, value: Input }[],
    selected: number
}

// Component
type keyInput = keyof Input;
export type SetupGetElementsCB = (TIDs: CalculatorConfig['TIDs'], ...args: Parameters<getElementsCB>) => unknown
export interface SetupComponent {
    output: Output,
    isSelected: (type: keyInput, key: string, value: number) => boolean,
    isDisabled: (type: keyInput, key: string, value: number) => boolean,
    onChangeLvl: (type: keyInput, key: string, value: (number | string)) => number,
    outputClasses: (type: keyof Output, key: string, charName?: string) => object,
    format: { value: (k: string, v: unknown) => unknown, key: (k: string) => string }
    forceReCalc: () => void
    Config: Config
    provideGetterElements: (cb: SetupGetElementsCB) => unknown,
}


