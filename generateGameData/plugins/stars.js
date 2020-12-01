import {getGlobalsBy} from './globals.js';
import {readCsv} from '../modules/loadFile.js';
import combineObjects from '../modules/combineObjects.js';
import fixValue from '../modules/fixValue.js';

const solarSysGenData = readCsv('solar_system_gen_data');
const globalsData = {
  BlueStar: getGlobalsBy('BlueStar_'),
  WhiteStar: getGlobalsBy('WS'),
  RedStar: getGlobalsBy('RS'),
};

export default function(obj) {
  Object.keys(obj).forEach((key) => {
    const obj1 = (solarSysGenData[key]) ? combineObjects(obj[key], solarSysGenData[key]) : obj[key];

    addGlobals(key, obj1);
    fixSSD(key, obj1);
    fixArrays(key, obj1);
    fixWS(key, obj1);

    obj1.fillSpace(' ');
  });

  obj.RedStar.pushArrays(
      'RegularInfuenceRange',
      'RegularInfuenceRange_Min',
      'RegularInfuenceRange_Max',
  );
  obj.RedStar.pushArrays(
      'InfluenceAwardThreshold',
      'InfluenceAwardThreshold_Min',
      'InfluenceAwardThreshold_Max',
  );
  return obj;
}

function addGlobals(key, obj) {
  if (key in globalsData) {
    obj = combineObjects(obj, globalsData[key]);
  }
  if (key === 'RedStar') {
    delete obj.GhostSpawnSecs; // лучше пусть будет в ships
  }
  delete obj['Models'];
}
function fixSSD(key, obj) {
  if (key in solarSysGenData) { // фикс лвл из "solar_system_gen_data" т.к. в stars == 1
    obj.maxLevel = solarSysGenData[key].maxLevel;
  }
}
function fixArrays(key, obj) { // фикс массивов из сточки (в основном глобалс)
  Object.keys(obj).forEach((k) => {
    if (Array.isArray(obj[k]) || ignoringHeaders.includes(k)) return;
    const arr = String(obj[k])
        .split('!')
        .map((e) => fixValue(key, k, e))
        .filter((e) => (e != null));

    if (arr.length > 1) {
      obj[k] = arr;
      if (arr.length > obj.maxLevel) {
        obj.maxLevel = arr.length;
      }
    } else if (arr.length === 1) {
      obj[k] = arr[0];
    } else {
      delete obj[k];
    }
  });
}
function fixWS(key, obj) {
  if (key === 'WhiteStar') {
    obj.Lifetime = obj.Lifetime * obj.TimeSlowdownFactor; // фикс времени
    fixWSScoreThresholds(obj);
  }

  function fixWSScoreThresholds(obj) {
    let matrix = [];
    const keys = []; // надежнее будет запомнить ключи
    const regex = /Score(\d+?)Thresholds/;

    Object.keys(obj).forEach((key) => {
      if (regex.test(key)) keys.push(key);
    });
    keys.forEach((k) => {
      matrix.push(obj[k]);
    });

    matrix = transpose(matrix);
    keys.forEach((k, i) => {
      obj[k] = matrix[i];
    });


    function transpose(a) {
      return Object.keys(a[0]).map(function(c) {
        return a.map(function(r) {
          return r[c];
        });
      });
    }
  }
}
