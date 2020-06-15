'use strict';
const main = require('../generateGameData.js');

const whiteList = main.dataByTypes.player_goals.all;
module.exports = function(obj) {
  const newKeys = {
    CRRewardPerDay: 'CRReward',
    FuelRewardPerDay: 'FuelReward',
  };

  Object.keys(obj).forEach((e) => { // фикс модулей ГЗ квестов
    if (e.startsWith('WinBSWith')) {
      obj[e].module = e.replace(/WinBSWith(.+?)(\d?)$/, '$1!$2');
    }
  });
  for (const key of Object.keys(obj)) {
    const obj1 = obj[key];

    main.fillSpace(obj1, ' ', 'push');
    if (!whiteList.includes(key)) continue;
    if (key == 'SalvageArtifacts') { // фикс значения "уровень арта", не удобно форматировать и локализировать
      obj1.artLevel = [];
      obj1.StringParam.forEach((e) => {
        obj1.artLevel.push(e.split('!')[0]);
      });
      delete obj1.StringParam;
      obj[key] = obj1;
    }
    for (const i in obj1) { // пофиксить награды, тк они равны за 1 день
      if (Object.keys(newKeys).includes(i)) {
        if (Array.isArray(obj1[i])) {
          obj1[i].forEach((e, i, arr) => {
            arr[i] = e * obj1.TimeLimitDays[i] || e * obj1.TimeLimitDays;
          });
        } else {
          obj1[i] = obj1[i] * obj1.TimeLimitDays;
        }
        obj[key] = main.renameKeys(obj1, newKeys);
      }
    }
    if (key.startsWith('WinBSWith')) { // собрать квесты ГЗ в одну таблицу
      const obj1 = obj[key];
      for (const i in obj1) {
        if (obj.WinBSWith == undefined) {
          obj.WinBSWith = {};
        }
        const WinBSWith = obj.WinBSWith;
        WinBSWith.Name = 'WinBSWith';

        if (ignoringHeaders.includes(i) || ['TimeLimitDays', 'GoalTarget', 'Name'].includes(i)) {
          if (i != 'maxLevel') {
            WinBSWith[i] = obj1[i];
          } else {
            if (WinBSWith.maxLevel != undefined) {
              WinBSWith.maxLevel++;
            } else {
              WinBSWith.maxLevel = 1;
            }
          }
        } else {
          if (i in obj.WinBSWith) {
            WinBSWith[i].push(obj1[i]);
          } else {
            WinBSWith[i] = [];
            WinBSWith[i].push(obj1[i]);
          }
        }
      }
      main.fillSpace(obj.WinBSWith, ' ', 'push');
      delete obj[key];
    }
  }
  return obj;
};
