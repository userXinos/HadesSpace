import { readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

export function walkDir(dir) {
    const files = [];

    for (const entry of readdirSync(dir)) {
        const path = join(dir, entry);
        if (statSync(path).isDirectory()) files.push(...walkDir(path));
        else files.push(path);
    }

    return files.sort();
}
