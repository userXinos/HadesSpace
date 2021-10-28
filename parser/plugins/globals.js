import {readCsv} from '../modules/loadFile.js';

export default function globals(obj) {
  for (const i of Object.keys(obj)) {
    obj[i] = obj[i]['Value'] || ' ';
  }
  return obj;
};

/**
 * Получить глобальные которые содержат искомую строчку
 * @param  {String} str   Искомая строчка
 * @return {Object}       Все совпадения
 */
export function getGlobalsBy(str) {
  const obj = globals(readCsv('globals'));
  const result = {};
  Object.keys(obj).forEach((e) => {
    if (e.includes(str)) result[e] = obj[e];
  });
  return result;
}
