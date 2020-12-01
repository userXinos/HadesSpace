import {readCsv} from '../modules/loadFile.js';
import {getGlobalsBy} from './globals.js';
import {isHide, isWhiteListBS} from '../modules/fixValue.js';

const shipsData = readCsv('capital_ships');
const projectilesData = readCsv('projectiles');
const artifacts = readCsv('artifacts');
const starHeaders = [
  'EffectDurationx10',
  'ActivationDelay',
  'ActivationPrep',
  'MaxDPSTime',
  'APTPIOTTP',
  'DisableTime',
  'ProximityTriggerSec',
];

export default function(obj) {
  ['Recoil', 'Immolation', 'EMPRocket'].forEach((e) => obj[e].ShowWSInfo = 1);

  Object.keys(obj).forEach((key) => {
    const obj1 = obj[key];

    addGlobals(key, obj1);
    addArt(obj1);
    addProjectiles(obj1, obj, key);
    addDrones(obj1, obj, key);
    addMaxBonusDS(obj1);
    fixBarrage(obj1);
    fixDestiny(obj1);
    fixWSStats(obj1);
    fixSalvage(obj1);
    addStarInfo(obj1, 'WS');
    addStarInfo(obj1, 'BS');

    ['WeaponEffectType', 'WeaponFx', 'Hide']
        .forEach((e) => delete obj1[e]);
  });

  obj.TimeWarp.Icon = 'Mod_TimeWarp_Icon'; // ошибка в таблице, 'w' в иконках в верхнем регистре
  obj['MiningBoost']['WhiteStarScore'].unshift(0); // ошибка в таблице, не хватает "0"
  obj['Destiny']['WhiteStarScore'].unshift(0); // ошибка в таблице, не хватает "0"
  obj['MiningDrone']['MiningSpeed'] = [29.1, 33.3, 37.5, 41.7, 45.8, 52.2, 58.8, 65.2, 74.1, 85.7]; // хз как считать это
  return obj;
};

// фикс модулей, добавление БЗ/ГЗ стат
function addStarInfo(obj, star) {
  const coefficient = (v) => (star === 'WS') ? v * 600 : v * 2;
  const showKey = 'Show' + star + 'Info';

  if (obj[showKey] !== 1) {
    delete obj[showKey];
    return;
  } else {
    delete obj[showKey];
  }
  Object.keys(obj).forEach((stata) => {
    if (starHeaders.includes(stata)) {
      if (star === 'BS' && !isWhiteListBS(stata, obj.Name)) return; // пока тлоько для ГЗ
      if (!Object.keys(obj).includes(stata + star)) {
        const value = obj[stata];

        if (!Array.isArray(value)) {
          obj[stata + star] = coefficient(value);
        } else if (Array.isArray(value)) {
          obj[stata + star] = value.map((e) => {
            return coefficient(e);
          });
        }
        if (isHide(obj.Name, stata, true)) delete obj[stata]; // удалить оригинальную стату, если не нужна
      }
    }
  });
}
function addGlobals(key, obj) {
  const matches = getGlobalsBy(key);

  Object.keys(matches).forEach((k) => {
    if (!isHide('globals', k)) {
      obj[k] = matches[k];
    }
  });
}
function addArt(obj) {
  if (!obj['Hide']) {
    Object.keys(artifacts).forEach((key) => {
      const art = artifacts[key];

      if (!art['BlueprintTypes']) return;
      const types = art['BlueprintTypes'].split('!');
      if (art['MaxModuleLevelToAward'] === obj['AwardLevel'] && types.includes(obj['SlotType'])) {
        obj.TID_Artifact = art.TID;
      }
    });
  }
}
function addProjectiles(obj, generalObj, key) {
  if (obj['WeaponEffectType'] === 'projectile') {
    generalObj[key].combineWith(projectilesData[obj['WeaponFx']]);
  }
}
function addDrones(obj, generalObj, key) {
  if (obj.SpawnLifetime) {
    generalObj[key].combineWith(shipsData[obj.Name]);
  }
}
function addMaxBonusDS(obj) {
  if (obj.DroneShipmentBonus) {
    obj.DroneShipmentBonusMax = [];
    obj.DroneShipmentBonus.forEach((e, i) => {
      obj.DroneShipmentBonusMax.push(
          (obj.SpawnCapacity[i] - 1) * e,
      );
    });
  }
}
function fixWSStats(obj) {
  if (obj['EffectDurationx10WS']) {
    obj['EffectDurationx10WS'].forEach((e, i, arr) => {
      arr[i] = e * 60;
    });
  }
}
function fixSalvage(obj) {
  if (obj.SalvageHullPercent) {
    obj.SalvageHullPercentWS = [];
    // obj.SalvageHullPercentBS = [];
    obj.SalvageHullPercent.forEach((e, i) => {
      const arr = e.split('!');
      obj.SalvageHullPercent[i] = Number(arr[0]);
      obj.SalvageHullPercentWS[i] = Number(arr[1]);
      // obj.SalvageHullPercentBS[i] = Number(arr[2]); ГЗ == КЗ
    });
  }
}
function fixBarrage(obj) {
  if (obj.BarrageMaxAdditionalEnemies) {
    const arr = obj.BarrageMaxAdditionalEnemies.split('!');
    obj.BarrageMaxAdditionalEnemies = Number(arr[0]);
    obj.BarrageMaxAdditionalEnemiesWS = Number(arr[1]);
  }
}
function fixDestiny(obj) {
  if (obj.DestinyDisableTimes) {
    const arr = obj.DestinyDisableTimes.split('!');
    obj.DestinyDisableTimes = Number(arr[0]);
    obj.DestinyDisableTimesWS = Number(arr[1] / 6 * 3600);
  }
}
