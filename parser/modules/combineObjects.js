/**
 * Улученная функция 2 объекта в 1
 * @param  {Object} obj1   Объект 1
 * @param  {Object} obj2   Объект 2
 * @return {Object}        Результат, мутация объекта 1
 */
export default function combineObjects(obj1, obj2) {
  Object.keys(obj2).forEach((p) =>{
    try {
      if (ignoringHeaders.includes(p)) return;
      if (obj2[p].constructor === Object) {
        obj1[p] = combineObjects(obj1[p], obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    } catch (e) {
      obj1[p] = obj2[p];
    }
  });
  return obj1;
}
