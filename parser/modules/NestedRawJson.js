import combineObjects from './combineObjects.js';

/** Вложенные объекты в основном */
export default class NestedRawJson extends Object {
  /**
     * Заполнить пространство для соответствия уровню
     * @param  {String|Number} spaceSymbol=0  Символ для заполнения "пробелов"
     * @param  {Boolean} usePush=false        Метод заполнения, в начало или в конец
     * @return {Object}                       Результат, помимо мутации основного объекта
   */
  fillSpace(spaceSymbol = 0, usePush = false) {
    const obj = this;

    for (const i of Object.keys(obj)) {
      if (ignoringHeaders.includes(i) || !Array.isArray(obj[i])) continue;
      while (obj[i].length < obj.maxLevel) {
        if (usePush) {
          obj[i].push(spaceSymbol);
        } else {
          obj[i].unshift(spaceSymbol);
        }
      }
    }
    return obj;
  }
  /**
   * Столкнуть 2 массива в один, разделитель - "!"
   * @param  {String} newName  Имя нового массива
   * @param  {String} key1     Имя массива 1
   * @param  {String} key2     Имя массива 2
   * @return {Object}          Результат, помимо мутации основного объекта
   */
  pushArrays(newName, key1, key2) {
    const obj = this;
    obj[newName] = [];

    for (let i = 0; i < obj.maxLevel; i++) {
      obj[newName].push(`${obj[key1][i]}!${obj[key2][i]}`);
    }
    [key1, key2].forEach((e) => delete obj[e]);
    return obj;
  }

  /**
   * Использовать "combineObjects" с ...
   * @param  {Object} obj
   * @return {Object} Результат, помимо мутации основного объекта
   * @abstract
   */
  combineWith(obj) {
    return combineObjects(this, obj);
  }
}
