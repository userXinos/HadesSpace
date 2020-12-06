import fixValue, {isHide} from './fixValue.js';
import RawJson from './RawJson.js';
import NestedRawJson from './NestedRawJson.js';
import trashHeaders from '../config/trashHeaders.js';

trashHeaders.forEach((e, i, arr) => {
  arr[i] = e.toLowerCase();
});

/**
 * Парсер из таблицы в обектJS
 * @param  {String} csv         Сырая таблица
 * @param  {Array=} headers=[]  Заголовки. По умолчанию первая строчка таблицы
 * @return {Object}             Результат
 */
export default function csvToJson(csv, headers) {
  const regexSplitStr = new RegExp(',(?!\\s)');
  const data = csv.trim().split(/\r?\n/);
  if (!headers) headers = data[0].split(regexSplitStr);
  const json = new RawJson();
  let subName = null;

  if (headers.length <= 1) return simpleArray(data);
  for (let i = 1; i < data.length; i++) {
    const string = data[i].split(regexSplitStr);

    if (!string.length) continue;
    if (string[0]) {
      subName = string[0].replace(/["']+/g, '').trim();
      json[subName] = new NestedRawJson();
      json[subName].maxLevel = 1;
    } else {
      json[subName].maxLevel++;
    }
    for (let j = 0; j < string.length; j++) {
      const header = headers[j];
      let value = string[j].replace(/["]+/g, '').trim();
      const stockValue = json[subName][header];

      if (isTrashHeader(header) || isHide(subName, header) || value === undefined || !value.length) continue;
      value = fixValue(header, value);

      if (stockValue === undefined || stockValue === '') {
        json[subName][header] = value;
      } else if (Array.isArray(stockValue)) {
        json[subName][header].push(value);
      } else {
        json[subName][header] = [stockValue, value];
      }
    }
  }
  return removeDupsFromArrays(json);

  // глобально скрытые значения - не имеют важности
  function isTrashHeader(str) {
    const whiteList = ['WeaponFx']; // нужен только для modules, а все FX удаляются

    if (whiteList.includes(str)) return false;
    str = str.toLowerCase();
    return (trashHeaders.includes(str) || str.startsWith('is') || str.includes('fx'));
  }
  // массив, сравнивать i и i+1, если все элементы равны установить вместо массива i[0] || {key:[1,1,1,1]} => {key:1}
  function removeDupsFromArrays(obj) {
    if (obj.constructor === NestedRawJson) {
      Object.keys(obj).forEach((key) => {
        const item = obj[key];
        if (!Array.isArray(item)) return;
        const isAllDups = item.every((v) => v === item[0]);
        if (isAllDups) obj[key] = item[0];
      });
      return obj;
    } else {
      Object.keys(obj).forEach((k) => {
        obj[k] = removeDupsFromArrays(obj[k]);
      });
      return obj;
    }
  }
  // если не таблица, а просто данные в столбик
  function simpleArray(array) {
    const result = new RawJson();

    result.array = array
        .filter((e) => e.length)
        .map((e) => fixValue( null, e));
    result.maxLevel = result.array.length;
    return result;
  }
}
