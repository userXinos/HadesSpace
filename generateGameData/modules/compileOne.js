/**
 * Из объекта с маленькими объектами в один Мега-обект
 * @param  {Object} obj  Объект
 * @return {Object}      Результат, мутация объекта
 */
export default function compileOne(obj) {
  const copyObj = Object.assign({}, obj);

  Object.keys(obj).forEach((key) => {
    delete obj[key];
    const obj1 = copyObj[key];

    Object.keys(obj1).forEach((k) =>{
      const value = obj1[k];
      k = k.replace(/\s+/g, ''); // напр "Credit Storage"
      const stockValue = obj[k];

      if (stockValue === undefined || stockValue === '') {
        obj[k] = value;
      } else if (Array.isArray(stockValue)) {
        obj[k].push(value);
      } else {
        obj[k] = [];
        obj[k].push(stockValue, value);
      }
    });
  });
  obj.maxLevel = obj.maxLevel.length;
  return obj;
}
