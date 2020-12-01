import byTypes from './modification/byTypes.js';
import RawJson from '../modules/RawJson.js';
import NestedRawJson from '../modules/NestedRawJson.js';
import compileOne from '../modules/compileOne.js';

const stars = byTypes.planets;
const onlyYS = [
  'MaxUpgradeLevel',
  'CreditIncomeModifier',
  'FuelIncomeModifier',
  'CreditStorageModifier',
  'FuelStorageModifier',
  'CreditShipmentModifier',
  'MaxShipments',
  'ShipmentsPerHour',
];

export default function(obj) {
  const result = new RawJson;

  Object.keys(stars).forEach((s) => {
    const obj1 = new NestedRawJson;

    stars[s].forEach((e) => {
      obj1[e] = obj[e];
    });
    Object.keys(obj1).forEach((k) => {
      for (const i in obj1[k]) {
        if (s !== 'yellowstar' && onlyYS.includes(i)) {
          delete obj1[k][i];
        }
      }
    });
    result[s + 'Table'] = compileOne(obj1);
  });
  Object.defineProperty(result,
      'metadata', { // скрытый объект от перебора
        configurable: true,
        writable: true,
        value: obj.metadata,
      });
  return result;
};
