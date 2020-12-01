import byTypes from './modification/byTypes.js';
import renameKeys from '../modules/renameKeys.js';
import NestedRawJson from '../modules/NestedRawJson.js';

const whiteList = byTypes.player_goals.all;
const newKeys = {
  CRRewardPerDay: 'CRReward',
  FuelRewardPerDay: 'FuelReward',
};

export default function(obj) {
  Object.keys(obj).forEach((key) => {
    const obj1 = obj[key];

    obj1.fillSpace( ' ', true);
    if (!whiteList.includes(key)) return;

    fixBSModule(obj, key);
    fixArt(obj1, obj, key);
    fixDestroy(obj, key);
    fixRewards(obj1, obj, key);
    fixWinBSWith(obj, key);
  });
  return obj;
};

function fixBSModule(generalObj, key) {
  if (key.startsWith('WinBSWith')) {
    generalObj[key].module = key.replace(/WinBSWith(.+?)(\d?)$/, '$1!$2');
  }
}
function fixArt(obj, generalObj, key) {
  if (key === 'SalvageArtifacts') {
    obj.artLevel = [];
    obj.StringParam.forEach((e) => {
      obj.artLevel.push(e.split('!')[0]);
    });
    delete obj.StringParam;
    generalObj[key] = obj;
  }
}
function fixDestroy(generalObj, key) {
  if (/Destroy(\w+)/.test(key)) {
    generalObj[key].GoalTarget.forEach((e, i, arr) => {
      arr[i] = e * generalObj[key]['TimeLimitDays'][i];
    });
  }
}
function fixRewards(obj, generalObj, key) { // пофиксить награды, тк они равны за 1 день
  Object.keys(obj).forEach((i) => {
    if (Object.keys(newKeys).includes(i)) {
      if (Array.isArray(obj[i])) {
        obj[i].forEach((e, i, arr) => {
          arr[i] = e * obj['TimeLimitDays'][i] || e * obj['TimeLimitDays'];
        });
      } else {
        obj[i] = obj[i] * obj['TimeLimitDays'];
      }
      generalObj[key] = renameKeys(obj, newKeys);
    }
  });
}
function fixWinBSWith(generalObj, key) { // собрать квесты ГЗ в одну таблицу
  if (key.startsWith('WinBSWith')) {
    const obj = generalObj[key];
    Object.keys(obj).forEach((k) => {
      if (generalObj.WinBSWith === undefined) {
        generalObj.WinBSWith = new NestedRawJson;
      }
      const WinBSWith = generalObj.WinBSWith;

      WinBSWith.Name = 'WinBSWith';
      if (ignoringHeaders.includes(k) || ['TimeLimitDays', 'GoalTarget'].includes(k)) {
        if (k !== 'maxLevel') {
          WinBSWith[k] = obj[k];
        } else {
          if (WinBSWith.maxLevel !== undefined) {
            WinBSWith.maxLevel++;
          } else {
            WinBSWith.maxLevel = 1;
          }
        }
      } else {
        if (k in generalObj.WinBSWith) {
          WinBSWith[k].push(obj[k]);
        } else {
          WinBSWith[k] = [obj[k]];
        }
      }
    });
    generalObj.WinBSWith.fillSpace(' ', true);
    delete generalObj[key];
  }
}
