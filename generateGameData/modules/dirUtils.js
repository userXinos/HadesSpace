import {existsSync, readdirSync, statSync, unlinkSync, lstatSync, rmdirSync} from 'fs';
import {writeFile} from 'fs/promises';
import {join} from 'path';

// Рекурсивная читалка директории
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
// Рекурсивная удалялка директории
export function wipeDir(dir) {
  if (existsSync(dir)) {
    readdirSync(dir).forEach((file) => {
      const curDir = join(dir, file);
      if (lstatSync(curDir).isDirectory()) {
        wipeDir(curDir);
      } else {
        unlinkSync(curDir);
      }
    });
    rmdirSync(dir);
  }
}
/**
 * Сохранение файла с нормализацией переноса строк CRLF
 * @param {String} path
 * @param {String} content
 * @return {Promise<void>}
 * @abstract
 */
export function writeFile2(path, content) {
  content = content
      .replace(/\r\n/gm, '\n') // normalize
      .replace(/\n/gm, '\r\n'); // CR+LF  -  Windows EOL
  return writeFile(path, content);
}
