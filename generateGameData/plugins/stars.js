'use strict';

const globals = require('./globals.js');

module.exports = function(main, obj) {
  const solarSysGenData = main.readCSV('solar_system_gen_data');
  const globalsData = {
    BlueStar: globals.getGlobalsBy(main, 'BlueStar_'),
    WhiteStar: globals.getGlobalsBy(main, 'WS'),
    RedStar: globals.getGlobalsBy(main, 'RS'),
  };

  for (const key in obj) {
    let obj1 = main.combineObjects(obj[key], solarSysGenData[key]);

    delete obj1.Models;
    if (key in globalsData) { // добавить "globals"
      obj1 = main.combineObjects(obj1, globalsData[key]);
    }
    if (key in solarSysGenData) { // фикс лвл из "solar_system_gen_data" т.к. в stars == 1
      obj1.maxLevel = solarSysGenData[key].maxLevel;
    }
    for (const i in obj1) { // фикс массивов из сточки (в основном глобалс)
      if (Array.isArray(obj1[i]) || ignoringHeaders.includes(i)) continue;
      const arr = String(obj1[i])
          .split('!')
          .map((e) => main.fixValue(key, i, e))
          .filter((e) => (e != null));

      if (arr.length > 1) {
        obj1[i] = arr;
        if (arr.length > obj1.maxLevel) {
          obj1.maxLevel = arr.length;
        }
      } else if (arr.length == 1) {
        obj1[i] = arr[0];
      } else {
        delete obj1[i];
      }
    }
    if (key == 'WhiteStar') {
      const matrix = [];
      const keys = Object.keys(obj1);
      const regex = /Score(\d+?)Thresholds/;

      obj1.Lifetime = obj1.Lifetime * obj1.TimeSlowdownFactor; // фикс времени
      keys.forEach((e) => { // фикс очков за режимы
        if (regex.test(e)) {
          matrix.push([]);
        }
      });
      keys.forEach((e) => {
        if (regex.test(e)) {
          obj1[e].forEach((e, i) => {
            matrix[i].push(e);
          });
        }
      });
      keys.forEach((e) => {
        if (regex.test(e)) {
          const index = e.replace(regex, '$1') - 1;
          obj1[e] = matrix[index];
        }
      });
    }
    obj1.fillSpace(' ');
  }
  delete obj.RedStar.GhostSpawnSecs; // лучше пусть будет в ships
  obj.RedStar.pushArrays('RegularInfuenceRange', 'RegularInfuenceRange_Min', 'RegularInfuenceRange_Max');
  obj.RedStar.pushArrays('InfluenceAwardThreshold', 'InfluenceAwardThreshold_Min', 'InfluenceAwardThreshold_Max');
  return obj;
};
