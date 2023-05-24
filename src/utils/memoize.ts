/* eslint-disable @typescript-eslint/no-explicit-any */

export default function<T>(fn: (...args: any[]) => T): (...args: any[]) => T {
    const cache: { [key: string]: T } = {};

    return (...args: any[]): T => {
        const key = JSON.stringify(args);

        if (cache[key]) {
            return cache[key];
        }

        const result = fn(...args);
        cache[key] = result;

        return result;
    };
}


