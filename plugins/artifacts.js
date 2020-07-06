'use strict';

module.exports = function(main, obj) {
  const result = new main.RawJson;
  const artsTypes = main.dataByTypes.artifacts.data;
  const tableNames = main.dataByTypes.artifacts.blueprints;

  for (const name of artsTypes) {
    const obj1 = new main.RawJson; // собрать объекты одного типа в одном месте

    const keys = Object.keys(obj).map((e) => {
      if (e.startsWith(name)) {
        return e;
      }
    });
    keys.forEach((k) => obj1[k] = obj[k]);
    result[name] = obj1.compileOne();
    result[name].Name = name;
    result[name].TID_Description = result[name].TID_Description[0];
    result[name].MaxModuleLevelToAward = result[name].MaxModuleLevelToAward[0];
    // result[name].BlueprintTypes = result[name].BlueprintTypes[0]
    ['BlueprintTypes', 'Model', 'MaxModuleLevelToAward'].forEach((e) => delete result[name][e]);
  }

  for (const a of Object.keys(result)) {
    const obj1 = result[a];
    const minArr = obj1.BlueprintsMin;
    const maxArr = obj1.BlueprintsMax;
    const blueprints = new main.NestedRawJson(); // "таблица" Blueprints получилась большой, было принято решение сохранить отдельно
    Object.setPrototypeOf(obj1, new main.NestedRawJson());

    obj1.pushArrays('Credits', 'CreditsMin', 'CreditsMax');
    obj1.pushArrays('Hydrogen', 'HydrogenMin', 'HydrogenMax');
    for (let i = 0; i < minArr.length; i++) {
      const min = String(minArr[i]).split('!');
      const max = String(maxArr[i]).split('!');
      const arr = [];
      for (let j = 0; j < min.length; j++) {
        arr.push(min[j] + '!' + max[j]);
      }
      blueprints[i + 1] = arr;
    }
    const i = Object.keys(result).indexOf(a);
    blueprints.maxLevel = obj1.maxLevel;
    result[tableNames[i]] = blueprints.fillSpace(' ', 'push');
    result[tableNames[i]]['Name'] = tableNames[i];
    ['BlueprintsMin', 'BlueprintsMax'].forEach((e) => delete obj1[e]);
  }
  return result;
};
