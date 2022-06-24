import { readdirSync, statSync } from 'fs';
import { join } from 'path';

/**
 * Рекурсивная читалка директории
 * @param  {String} dir
 * @return {Array}
 */
export function walkDir(dir) {
    let results = [];
    readdirSync(dir)
        .forEach((file) => {
            file = join(dir, '/', file);
            const stat = statSync(file);
            if (stat && stat.isDirectory()) {
                results = results.concat(walkDir(file));
            } else {
                results.push(file);
            }
        });
    return results;
}
