import {readCsv} from '../modules/loadFile.js';
import globals from './globals.js';
import {isHide, isWhiteListBS} from '../modules/fixValue.js';

const starHeaders = ['EffectDurationx10', 'ActivationDelay', 'ActivationPrep', 'MaxDPSTime', 'APTPIOTTP', 'DisableTime', 'ProximityTriggerSec'];

export default function(obj) {
  const shipsData = readCsv('capital_ships');
  const projectilesData = readCsv('projectiles');
  const artifacts = readCsv('artifacts');
  const globalsData = globals(readCsv('globals'));
  ['Recoil', 'Immolation', 'EMPRocket'].forEach((e) => obj[e].ShowWSInfo = 1);

  for (const key in obj) {
    const obj1 = obj[key];

    // добавить глобальные к модулям
    Object.keys(globalsData).forEach((e) => {
      if (e.includes(key) && !isHide('globals', e)) {
        obj1[e] = globalsData[e];
      }
    });
    // добавить ур. артефакта
    if (!obj1.Hide) {
      for (const key2 in artifacts) {
        const art = artifacts[key2];

        if (!art.BlueprintTypes) continue;
        const types = art.BlueprintTypes.split('!');
        if (art.MaxModuleLevelToAward === obj1.AwardLevel && types.includes(obj1.SlotType)) {
          obj1.TID_Artifact = art.TID;
        }
      }
    }
    // добавить projectiles к ракетоподобным
    if (obj1.WeaponEffectType === 'projectile') {
      obj[key].combineWith(projectilesData[obj1.WeaponFx]);
    }
    // добавить данные дронов
    if (obj1.SpawnLifetime) {
      obj[key].combineWith(shipsData[obj1.Name]);
    }
    // фикс Арты
    if (obj1.BarrageMaxAdditionalEnemies) {
      const arr = obj1.BarrageMaxAdditionalEnemies.split('!');
      obj1.BarrageMaxAdditionalEnemies = Number(arr[0]);
      obj1.BarrageMaxAdditionalEnemiesWS = Number(arr[1]);
    }
    // фикс Рока
    if (obj1.DestinyDisableTimes) {
      const arr = obj1.DestinyDisableTimes.split('!');
      obj1.DestinyDisableTimes = Number(arr[0]);
      obj1.DestinyDisableTimesWS = Number(arr[1] / 6 * 3600);
    }
    // + макс бонус у торг. дрона
    if (obj1.DroneShipmentBonus) {
      obj1.DroneShipmentBonusMax = [];
      obj1.DroneShipmentBonus.forEach((e, i) => {
        obj1.DroneShipmentBonusMax.push(
            (obj1.SpawnCapacity[i] - 1) * e,
        );
      });
    }
    // фикс БЗ стат
    if (obj1.EffectDurationx10WS) {
      obj1.EffectDurationx10WS.forEach((e, i, arr) => {
        arr[i] = e * 60;
      });
    }
    // фикс Утиля
    if (obj1.SalvageHullPercent) {
      obj1.SalvageHullPercentWS = [];
      // obj1.SalvageHullPercentBS = [];
      obj1.SalvageHullPercent.forEach((e, i) => {
        const arr = e.split('!');
        obj1.SalvageHullPercent[i] = Number(arr[0]);
        obj1.SalvageHullPercentWS[i] = Number(arr[1]);
        // obj1.SalvageHullPercentBS[i] = Number(arr[2]); ГЗ == КЗ
      });
    }
    addStarInfo(obj1, 'WS');
    addStarInfo(obj1, 'BS');
    ['WeaponEffectType', 'WeaponFx', 'Hide'].forEach((e) => delete obj1[e]);
  }

  obj.TimeWarp.Icon = 'Mod_TimeWarp_Icon'; // ошибка в таблице, 'w' в иконках в верхнем регистре
  obj.MiningBoost.WhiteStarScore.unshift(0); // ошибка в таблице, не хватает "0"
  obj.Destiny.WhiteStarScore.unshift(0); // ошибка в таблице, не хватает "0"
  obj.MiningDrone.MiningSpeed = [29.1, 33.3, 37.5, 41.7, 45.8, 52.2, 58.8, 65.2, 74.1, 85.7]; // хз как считать это
  return obj;

  // фикс модулей, добавление БЗ/ГЗ стат
  function addStarInfo(obj, star) {
    const coefficient = (v) => (star === 'WS') ? v * 600 : v * 2;
    const check = obj[`Show${star}Info`];

    delete obj[`Show${star}Info`];
    if (check !== 1) return;
    for (const stata in obj) {
      if (starHeaders.includes(stata)) {
        if (star === 'BS' && !isWhiteListBS(stata, obj.Name)) continue; // пока тлоько для ГЗ
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
    }
  }
};
