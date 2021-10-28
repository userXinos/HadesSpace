import {default as data, hide} from '../config/fixValue.js';

/**
 * Исправить табличные значения
 * @param  {String} header  Ключ заголовка
 * @param  {String} value  Значение, которое надо исправить
 * @return {String|Number}
 */
export default function(header, value) {
  for (let i = 0; i < data.length; i++) {
    if (data[i][0].includes(header)) {
      return data[i][1](value);
    }
  }
  if (value >= 0) return parseInt(value);
  return value;
};
/**
 * Скрывает невалидные данные: "0", " " или просто ненужные
 * @param {...String} path Путь до значения
 * @return {Boolean}
 */
export function isHide(...path) {
  const pathStr = path.join('.');
  return hide.includes(pathStr);
}
