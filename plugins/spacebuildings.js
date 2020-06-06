'use strict';

const main = require('../generateGameData.js');

module.exports = function(obj) {
  const timeFixModifiers = {
    ConstructionTimeSeconds: 1,
    ConstructionTimeMinutes: 60,
    ConstructionTimeHours: 3600,
  };
  const newValue = 'ConstructionTime';

  for (const key of Object.keys(obj)) {
    const obj1 = obj[key];
    for (const k of Object.keys(obj1)) {
      if (Object.keys(timeFixModifiers).includes(k)) {
        if (obj1[newValue] == undefined) {
          obj1[newValue] = [];
        }
        if (Array.isArray(obj1[k])) {
          obj1[k].forEach((e, i) => {
            obj1[newValue].push(obj1[k][i] * timeFixModifiers[k]);
          });
        } else {
          obj1[newValue].push(obj1[k] * timeFixModifiers[k]);
        }
        delete obj1[k];
      }
      if (k == 'TeleportShipmentsDurationHr') {
        obj1[k].forEach((e, i, arr) => {
          arr[i] = e * timeFixModifiers.ConstructionTimeHours;
        });
      }
    }
    for (const k of Object.keys(obj1)) { // исправить исправления) TODO рефакторинг
      if (obj1[newValue] != undefined && obj1[newValue].length == 1) {
        obj1[newValue] = obj1[newValue][0];
      }
    }
    main.fillSpace(obj1);
  }
  obj.TimeModulator.Model = 'TimeModulator';
  return obj;
};
