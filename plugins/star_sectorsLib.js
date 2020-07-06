'use strict';

module.exports = function(main, obj, star) {
  const scannersData = main.readCSV('spacebuildings').ShortRangeScanner;
  const cerberusData = main.readCSV('cerb_groups');
  const cerberusStationsData = main.readCSV('cerberus_stations');
  const result = new main.RawJson();

  for (let name of Object.keys(obj)) {
    name = obj[name];
    for (const key in name) {
      const value = name[key];
      const stockValue = result[key];

      if (stockValue == undefined || stockValue === '') {
        startObj(key, value);
      } else {
        if (Array.isArray(stockValue)) {
          result[key].push(value);
        } else {
          result[key] = [];
          result[key].push(stockValue, value);
        }
      }
    }
    if (star == 'yellow') addScannerInfo(name.MinScannerLevel, scannersData);
    addCerberus(name.CerbGroup);
    fixCerbBaseName(name.BaseType);
    endObj();
  }
  // небольшие фиксы
  result.maxLevel = result.maxLevel.length;
  result.Name = star + 'StarSectors';
  if (result.MinScannerLevel != undefined) {
    result.MinScannerLevel.forEach((e, i, arr) => {
      if (e !== ' ') arr[i] = e + 1;
    });
  }
  return result;

  // добавить записи в начало, для соотвествия уровня
  function startObj(key, value) {
    const length = getLength(result['maxLevel']);
    result[key] = value;
    if (!length) return;
    result[key] = [value];
    for (let k = 0; k < length; k++) {
      result[key].unshift(getType(value));
    }
  }
  // добавить записи в конец, для соотвествия уровня
  function endObj() {
    const length = getLength(result['maxLevel']);
    for (const key in result) {
      for (let i = 0; i < length; i++) {
        if (Array.isArray(result[key]) && result[key].length < length) {
          result[key].push(getType(result[key][0]));
        } else {

        }
      }
    }
  }
  function addScannerInfo(scanner, scanners) {
    const ststs = ['SectorUnlockCost', 'SectorUnlockTime'];
    if (result[ststs[0]] == undefined) {
      for (const i of ststs) {
        result[i] = [];
      }
    }
    for (const i of ststs) {
      result[i].push(scanners[i][scanner]);
    }
  }
  function addCerberus(cerb) {
    if (!cerb) return;
    const cerbObj = () => {
      const r = cerberusData[cerb];
      for (let i in r) {
        const data = r[i];
        delete r[i];
        if (!ignoringHeaders.includes(i)) {
          i = i.replace(/Num(\w*)/, '$1');
          r[i] = data;
        }
      }
      return r;
    };
    if (!Array.isArray(result.CerbGroup)) result.CerbGroup = [result.CerbGroup];
    const index = result.CerbGroup.indexOf(cerb);
    result.CerbGroup[index] = cerbObj();
  }
  function fixCerbBaseName(base) {
    if (!base) return;
    const index = result.BaseType.indexOf(base);
    result.BaseType[index] = cerberusStationsData[base].TID;
  }
};
function getType() {
  return ' ';
}
function getLength(v, r = null) {
  if (v != undefined) {
    r = v.length;
  }
  return r || 0;
}
