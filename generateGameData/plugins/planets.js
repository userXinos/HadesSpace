'use strict';

// создать одну таблицу со всеми планками
module.exports = function(main, obj) {
  const stars = main.dataByTypes.planets;
  const onlyYS = ['MaxUpgradeLevel', 'CreditIncomeModifier', 'FuelIncomeModifier', 'CreditStorageModifier', 'FuelStorageModifier', 'CreditShipmentModifier', 'MaxShipments', 'ShipmentsPerHour'];
  const result = new main.RawJson;

  for (const s in stars) {
    const obj1 = new main.NestedRawJson;

    stars[s].forEach((e) => {
      obj1[e] = obj[e];
    });
    for (const k in obj1) {
      for (const i in obj1[k]) {
        if (s != 'yellowstar' && onlyYS.includes(i)) {
          delete obj1[k][i];
        }
      }
    }
    result[s + 'Table'] = main.compileOne(obj1);
  }
  Object.defineProperty(result,
      'metadata', { // скрытый объект от перебора
        configurable: true,
        writable: true,
        value: obj.metadata,
      });
  return result;
};
