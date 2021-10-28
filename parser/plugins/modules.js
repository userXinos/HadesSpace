import {readCsv} from '../modules/loadFile.js';
import {getGlobalsBy} from './globals.js';
import {isHide} from '../modules/fixValue.js';
import * as config from '../config/modules.js';
import byTypes from '../config/byTypes.js';
import {writeFile2} from '../modules/dirUtils.js';

const shipsData = readCsv('capital_ships');
const projectilesData = readCsv('projectiles');
const artifacts = readCsv('artifacts');
const stringsStarHeaders = {};

export default function(obj) {
  byTypes.modules.flagship.forEach((e) => obj[e].AllowedStarTypes = 2);

  Object.keys(obj)
      .filter((e) => !Object.values(config.combineKeys).includes(e))
      .forEach((key) => {
        combine(obj, key);
        addGlobals(obj[key], key);
        addArt(obj[key]);
        addProjectiles(obj[key], obj, key);
        addDrones(obj[key], obj, key);
        addMaxBonusDS(obj[key]);
        addLaserTurret(obj[key], obj, key);
        fixBarrage(obj[key]);
        fixDestiny(obj[key]);
        fixWSStats(obj[key]);
        fixSalvage(obj[key]);
        fixRelicLoad(obj[key], obj, key);
        addStartsInfo(obj[key]);
        generateStringsStarHeaders(obj[key]);
      });
  saveStringsStarHeaders();
  config.otherFix(obj);
  return obj;
};

function addGlobals(obj, key) {
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
  delete obj['Hide'];
}
function addProjectiles(obj, generalObj, key) {
  if (obj['WeaponEffectType'] === 'projectile') {
    generalObj[key].combineWith(projectilesData[obj['WeaponFx']]);
  }
  delete obj['WeaponFx'];
  delete obj['WeaponEffectType'];
}
function addDrones(obj, generalObj, key) {
  if (key.includes('Drone')) {
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
function addLaserTurret(obj, generalObj, key) {
  if (key === 'LaserTurret') {
    generalObj[key].combineWith(shipsData.LaserTurret);
    generalObj[key].combineWith({...generalObj.LaserTurret_Laser});
    generalObj.LaserTurret_Laser = {};
  }
}
function fixDestiny(obj) {
  if (obj.DestinyDisableTimes) {
    const arr = obj.DestinyDisableTimes.split('!');
    obj.DestinyDisableTimes = Number(arr[0]);
    obj.DestinyDisableTimesWS = Number(arr[1] / 6 * 3600);
  }
}
function fixRelicLoad(obj, generalObj, key) {
  if (obj['RelicLoadTicks']) {
    obj.RelicLoad = obj['RelicLoadTicks'].map((e) => e / 5);
    delete generalObj[key]['RelicLoadTicks'];
  }
}
function combine(obj, key) {
  const keys = config.combineKeys;
  if (Object.keys(keys).includes(key)) {
    obj[key].combineWith(obj[keys[key]]);
    delete obj[keys[key]];
  }
}
function addStartsInfo(obj) {
  const keysRemove = []; // кешировать ключи, т.к. нельзя их просто удалить сразу, на их основе надо добавить другие статы

  if (obj['AllowedStarTypes'] !== undefined) {
    config.starsOrder.forEach((star, starIndex) => {
      if (Array.isArray(obj['AllowedStarTypes'])) {
        if (obj['AllowedStarTypes'].includes(starIndex)) {
          addStarInfo(obj, star);
        } else {
          removeStarInfo(obj, star);
        }
      } else {
        if (obj['AllowedStarTypes'] === starIndex) {
          addStarInfo(obj, star);
        } else {
          removeStarInfo(obj, star);
        }
      }
    });
  } else {
    config.starsOrder.forEach((e) => addStarInfo(obj, e));
  }
  keysRemove.push('AllowedStarTypes');
  keysRemove.forEach((e) => delete obj[e]);

  function addStarInfo(obj, star) {
    const coefficient = (v) => {
      if (star === 'WS') return v * 600;
      if (star === 'BS') return v * 2;
      return v;
    };

    if (star === 'YS') return;
    Object.keys(obj)
        .filter((e) => config.starHeaders.includes(e))
        .filter((e) => !Object.keys(obj).includes(e + star))
        .forEach((key) => {
          const matches = Object.keys(obj) // где-то есть "_", где-то нету...
              .filter((e) => new RegExp(key +'.+?' + star).test(e));
          if (!matches.length) {
            const newKey = key + star;
            const value = obj[key];
            let newValue;
            let isEqual;

            if (Array.isArray(value)) {
              newValue = value.map((e) => coefficient(e));
              isEqual = newValue[0] === value[0];
            } else {
              newValue = coefficient(value);
              isEqual = newValue === value;
            }
            if (keysRemove.includes(key) || !isEqual) { // дубликаты RS == YS
              obj[newKey] = newValue;
            }
          }
        });
  }
  function removeStarInfo(obj, star) {
    Object.keys(obj)
        .filter((e) => config.starHeaders.includes(e))
        .forEach((key) => {
          let regex;

          if (star === 'YS') {
            regex = new RegExp(key);
          } else {
            regex = new RegExp(key +'.+?' + star);
          }
          const matches = Object.keys(obj)
              .filter((e) => regex.test(e));
          if (matches.length) {
            keysRemove.push(matches[0]);
          }
        });
  }
}
function generateStringsStarHeaders(obj) {
  const stars = config.starsOrder;

  Object.keys(obj)
      .filter((e) => {
        const regex = new RegExp('.+?_?' + '(' + stars.join('|') + ')$', 'm');
        return regex.test(e) && !config.excludeKeysStringStar.includes(e);
      })
      .forEach((k) => {
        const key = k.replace(/(.+?)_?\w\w$/m, '$1');
        const star = /(_?\w\w$)/.exec(k)[0];

        if (!Object.keys(stringsStarHeaders).includes(key)) {
          stringsStarHeaders[key] = [];
        }
        if (!stringsStarHeaders[key].includes(star)) {
          stringsStarHeaders[key].push(star);
        }
      });
}
function saveStringsStarHeaders() {
  writeFile2(
      './config/stringsStarHeaders.json',
      JSON.stringify(stringsStarHeaders, null, 2),
  ).catch((err) => {
    throw err;
  });
}
