import {readCsv} from '../modules/loadFile.js';
import RawJson from '../modules/RawJson.js';

const scannersData = readCsv('spacebuildings')['ShortRangeScanner'];
const cerberusData = readCsv('cerb_groups');
const cerberusStationsData = readCsv('cerberus_stations');

export default function(obj) {
  const star = /(\w+)(_star_sectors)/.exec(obj.metadata.originalFile)[1];
  const result = new RawJson();

  Object.keys(obj).forEach((key) => {
    const name = obj[key];

    Object.keys(name).forEach((key) => {
      const value = name[key];
      const stockValue = result[key];

      if (stockValue === undefined || stockValue === '') {
        startObj(key, value);
      } else {
        if (Array.isArray(stockValue)) {
          result[key].push(value);
        } else {
          result[key] = [stockValue, value];
        }
      }
    });
    if (star === 'yellow') {
      addScannerInfo(name.MinScannerLevel);
    }
    addCerberus(name.CerbGroup);
    fixCerbBaseName(name.BaseType);
    endObj();
  });
  // небольшие фиксы
  result.maxLevel = result.maxLevel.length;
  result.Name = star + 'StarSectors';
  if (result.MinScannerLevel !== undefined) {
    result.MinScannerLevel.forEach((e, i, arr) => {
      if (e !== ' ') arr[i] = e + 1;
    });
  }
  Object.defineProperty(result,
      'metadata', { // скрытый объект от перебора
        configurable: true,
        writable: true,
        value: obj.metadata,
      });
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
    Object.keys(result).forEach((key) => {
      for (let i = 0; i < length; i++) {
        if (Array.isArray(result[key]) && result[key].length < length) {
          result[key].push(getType(result[key][0]));
        } else {

        }
      }
    });
  }
  function addScannerInfo(scanner) {
    const ststs = ['SectorUnlockCost', 'SectorUnlockTime'];
    if (result[ststs[0]] === undefined) {
      for (const i of ststs) {
        result[i] = [];
      }
    }
    for (const i of ststs) {
      result[i].push(scannersData[i][scanner]);
    }
  }
  function addCerberus(cerb) {
    if (!cerb) return;
    const cerbObj = () => {
      const r = cerberusData[cerb];
      Object.keys(r).forEach((i) => {
        const data = r[i];
        delete r[i];
        if (!ignoringHeaders.includes(i)) {
          i = i.replace(/Num(\w*)/, '$1');
          r[i] = data;
        }
      });
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
  if (v !== undefined) {
    r = v.length;
  }
  return r || 0;
}
