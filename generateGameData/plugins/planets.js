import byTypes from './modification/byTypes.js';
import RawJson from '../modules/RawJson.js';
import NestedRawJson from '../modules/NestedRawJson.js';
import compileOne from '../modules/compileOne.js';

// создать одну таблицу со всеми планками
export default function(obj) {
  const stars = byTypes.planets;
  const onlyYS = ['MaxUpgradeLevel', 'CreditIncomeModifier', 'FuelIncomeModifier', 'CreditStorageModifier', 'FuelStorageModifier', 'CreditShipmentModifier', 'MaxShipments', 'ShipmentsPerHour'];
  const result = new RawJson;

  for (const s in stars) {
    const obj1 = new NestedRawJson;

    stars[s].forEach((e) => {
      obj1[e] = obj[e];
    });
    for (const k in obj1) {
      for (const i in obj1[k]) {
        if (s !== 'yellowstar' && onlyYS.includes(i)) {
          delete obj1[k][i];
        }
      }
    }
    result[s + 'Table'] = compileOne(obj1);
  }
  Object.defineProperty(result,
      'metadata', { // скрытый объект от перебора
        configurable: true,
        writable: true,
        value: obj.metadata,
      });
  return result;
};
