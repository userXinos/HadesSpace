import RawJson from '../modules/RawJson.js';
import NestedRawJson from '../modules/NestedRawJson.js';
import byTypes from './modification/byTypes.js';
import compileOne from '../modules/compileOne.js';

const artsTypes = byTypes.artifacts.data;
const tableNames = byTypes.artifacts.blueprints;

export default function(obj) {
  const result = new RawJson;

  for (const name of artsTypes) {
    const obj1 = new NestedRawJson;

    Object.keys(obj) // собрать объекты одного типа в одном месте
        .filter((e) => (e.startsWith(name)))
        .forEach((k) => obj1[k] = obj[k]);

    result[name] = compileOne(obj1);
    result[name].Name = name;
    result[name].TID_Description = result[name].TID_Description[0];
    result[name].MaxModuleLevelToAward = result[name].MaxModuleLevelToAward[0];
    ['BlueprintTypes', 'Model', 'MaxModuleLevelToAward'].forEach((e) => delete result[name][e]);
  }
  Object.keys(result).forEach((a) => {
    genTableBP(a, result);
    result[a].pushArrays('Credits', 'CreditsMin', 'CreditsMax');
    result[a].pushArrays('Hydrogen', 'HydrogenMin', 'HydrogenMax');
  });
  Object.defineProperty(result,
      'metadata', { // скрытый объект от перебора
        configurable: true,
        writable: true,
        value: obj.metadata,
      });
  return result;
};

function genTableBP(art, result) { // "таблица" Blueprints получилась большой, было принято решение сохранить отдельно
  const obj = result[art];
  const blueprints = new NestedRawJson();
  const minArr = obj['BlueprintsMin'];
  const maxArr = obj['BlueprintsMax'];

  for (let i = 0; i < minArr.length; i++) {
    const min = String(minArr[i]).split('!');
    const max = String(maxArr[i]).split('!');
    const arr = [];

    for (let j = 0; j < min.length; j++) {
      arr.push(min[j] + '!' + max[j]);
    }
    let index = i + 1;

    if (obj.Name === 'Support') index++;
    blueprints[index] = arr;
  }
  const i = Object.keys(result).indexOf(art);
  blueprints.maxLevel = obj.maxLevel;
  result[tableNames[i]] = blueprints.fillSpace(' ', true);
  result[tableNames[i]]['Name'] = tableNames[i];
  ['BlueprintsMin', 'BlueprintsMax'].forEach((e) => delete obj[e]);
}
