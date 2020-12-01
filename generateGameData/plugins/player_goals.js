import byTypes from './modification/byTypes.js';
import renameKeys from '../modules/renameKeys.js';
import NestedRawJson from '../modules/NestedRawJson.js';

export default function(obj) {
  const whiteList = byTypes.player_goals.all;
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

    obj1.fillSpace( ' ', true);
    if (!whiteList.includes(key)) continue;
    if (key === 'SalvageArtifacts') { // фикс значения "уровень арта", не удобно форматировать и локализировать
      obj1.artLevel = [];
      obj1.StringParam.forEach((e) => {
        obj1.artLevel.push(e.split('!')[0]);
      });
      delete obj1.StringParam;
      obj[key] = obj1;
    }
    if (/Destroy(\w+)/.test(key)) { // фикс квестов на уничтожение Церберов
      obj[key].GoalTarget.forEach((e, i, arr) => {
        arr[i] = e * obj[key].TimeLimitDays[i];
      });
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
        obj[key] = renameKeys(obj1, newKeys);
      }
    }
    if (key.startsWith('WinBSWith')) { // собрать квесты ГЗ в одну таблицу
      const obj1 = obj[key];
      for (const i in obj1) {
        if (obj.WinBSWith === undefined) {
          obj.WinBSWith = new NestedRawJson;
        }
        const WinBSWith = obj.WinBSWith;

        WinBSWith.Name = 'WinBSWith';
        if (ignoringHeaders.includes(i) || ['TimeLimitDays', 'GoalTarget'].includes(i)) {
          if (i !== 'maxLevel') {
            WinBSWith[i] = obj1[i];
          } else {
            if (WinBSWith.maxLevel !== undefined) {
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
      obj.WinBSWith.fillSpace(' ', true);
      delete obj[key];
    }
  }
  return obj;
};
