import RawJson from './RawJson.js';
import NestedRawJson from './NestedRawJson.js';
import {default as headers} from '../config/headersOrder.js';

/**
 * Исправление порядка объекта согласно списку
 * @param  {Object} obj   Объект
 * @return {Object}       Результат, мутация объекта
 */
export default function fixOrder(obj) {
  if (obj.constructor === RawJson || obj.constructor === NestedRawJson || obj.constructor === Object) {
    const indexes = []; // создание объекта с ключами + индекс
    Object.keys(obj).forEach((key) => {
      const elem = {};
      elem.index = (headers.includes(key)) ? headers.indexOf(key) : 666;
      elem.key = key;
      indexes.push(elem);
    });
    indexes.sort((a, b) => a.index - b.index);

    // сборка готового объекта
    const result = Object.create(obj);
    Object.keys(indexes).forEach((i) => {
      result[indexes[i].key] = fixOrder(obj[indexes[i].key]);
    });
    return result;
  } else {
    return obj;
  }
}
