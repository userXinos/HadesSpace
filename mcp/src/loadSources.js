import { basename } from 'node:path';
import { isPlainObject } from '../utils/types.js';

export async function loadSources(files) {
    const modules = await Promise.all(files.map((file) => import(file)));

    return files.map((file, i) => ({
        id: basename(file, '.js'),
        file,
        data: modules[i]?.default,
    }));
}

export function normalize(data, name) {
    if (Array.isArray(data)) {
        return { [name]: { $list: data } };
    }

    if (!isPlainObject(data)) {
        return { [name]: { $value: data } };
    }

    const values = Object.values(data);
    if (values.length > 0 && values.every(isPlainObject)) {
        return data;
    }

    return { [name]: { ...data } };
}
