'use strict';
const main = require('../generateGameData.js');
const globals = require('./globals.js');

const solarSysGenData = main.readCSV('solar_system_gen_data');
const globalsData = {
  BlueStar: globals.getGlobalsBy('BlueStar_'),
  WhiteStar: globals.getGlobalsBy('WS'),
  RedStar: globals.getGlobalsBy('RS'),
};
module.exports = function(obj) {
  obj = main.combineObjects(obj, solarSysGenData);

  delete obj.RedStar.GhostSpawnSecs; // лучше пусть будет в ships
  for (const key in obj) {
    let obj1 = obj[key];

    delete obj1.Models;
    if (key in globalsData) { // добавить "globals"
      obj1 = main.combineObjects(obj1, globalsData[key]);
    }
    if (key in solarSysGenData) { // фикс лвл из "solar_system_gen_data" т.к. в stars == 1
      obj1.maxLevel = solarSysGenData[key].maxLevel;
    }
    for (const i in obj1) { // фикс массивов из сточки
      if (Array.isArray(obj1[i]) || ignoringHeaders.includes(i)) continue;
      let arr = String(obj1[i]).split('!');

      arr = arr.map((e) => main.fixValue(key, i, e));
      if (arr.length > 1) obj1[i] = arr;
      if (arr[0] == null) delete obj1[i];
      if (arr.length > obj1.maxLevel) {
        obj1.maxLevel = arr.length;
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
    main.fillSpace(obj1, ' ');
  }
  main.pushArrays(obj.RedStar, 'RegularInfuenceRange', 'RegularInfuenceRange_Min', 'RegularInfuenceRange_Max');
  main.pushArrays(obj.RedStar, 'InfluenceAwardThreshold', 'InfluenceAwardThreshold_Min', 'InfluenceAwardThreshold_Max');
  return obj;
};
