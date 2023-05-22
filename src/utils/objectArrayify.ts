/* eslint-disable @typescript-eslint/no-explicit-any */

export declare type Callback = (elem: [string, any], i: number, arr: [string, any][]) => [string, any]
export declare type Callbacks = {
    filter?: (...args: Parameters<Callback>) => boolean
    sort?: (a: Parameters<Callback>[0], b: Parameters<Callback>[0]) => number
    map?: Callback
}

export default function objectArrayify <T extends object>(obj: T, callbacks: Callbacks): T {
    let entries = Object.entries(obj);

    for (const key in callbacks) {
        if (Object.prototype.hasOwnProperty.call(callbacks, key)) {
            entries = (Array.prototype as Record<string, any>)[key].call(entries, callbacks[key as keyof Callbacks]);
        }
    }

    return Object.fromEntries(entries) as T;
}
