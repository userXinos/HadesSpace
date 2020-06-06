'use strict';
const main = require('../generateGameData.js');

const stars = main.dataByTypes.planets;
const compileOne = main.compileOne;
const onlyYS = ['MaxUpgradeLevel', 'CreditIncomeModifier', 'FuelIncomeModifier', 'CreditStorageModifier', 'FuelStorageModifier', 'CreditShipmentModifier', 'MaxShipments', 'ShipmentsPerHour'];

// создать одну таблицу со всеми планками
module.exports = function(obj) {
  const result = {};

  for (const s in stars) {
    const obj1 = {};

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
    result[s + 'Table'] = compileOne(obj1);
  }
  return result;
};
