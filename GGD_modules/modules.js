
"use strict";
const mainJs = require('../generateGameData.js')

exports.default = function (args) {
  let renameKeys = mainJs.renameKeys
  let combineObjects = mainJs.combineObjects
  let obj = args.rawData
  let projectilesKeys = { // новые ключи для объединения 
    "Alpha": "AlphaRocket",
    "Delta": "DeltaRocket",
    "Omega": "OmegaRocket",
    "Dart": "DartLauncher",
    "EMPRocket": "EMPRocket",
    "HydroRocket": "HydroRocket",
    "BomberRocket": "BomberLauncher",
  }
  let starHeaders = ['EffectDurationx10', 'ActivationDelay', 'ActivationPrep', 'MaxDPSTime', 'APTPIOTTP', 'DisableTime'];
  let projectiles = renameKeys(args.projectilesData, projectilesKeys);
  let drones = {};

  args.dronesList.forEach(e => { // собрать дронов по списку 
    drones[e] = args.shipsData[e];
  });
  obj = combineObjects(obj, drones);
  obj = combineObjects(obj, projectiles);
  ['Recoil', 'Immolation', 'EMPRocket'].forEach(e => obj[e]['ShowWSInfo'] = 1);
  addStarInfo(obj, args.fixValue, starHeaders, 'WS');
  addStarInfo(obj, args.fixValue, starHeaders, 'BS');
  obj.TimeWarp.Icon = 'Mod_TimeWarp_Icon' // ошибка в таблице, 'w' в иконках в верхнем регистре 
  obj.MiningBoost.WhiteStarScore.unshift(0) // ошибка в таблице, не хватает "0"
  obj.Destiny.WhiteStarScore.unshift(0) // ошибка в таблице, не хватает "0"
  obj.MiningDrone.MiningSpeed = [29.1, 33.3, 37.5, 41.7, 45.8, 52.2, 58.8, 65.2, 74.1, 85.7]; // хз как считать это
  for (let key in obj) {
    let obj1 = obj[key]
    Object.keys(args.globals).forEach(e => {  // добавить глобальные к модулям 
      if (e.includes(key)) {
        obj1[e] = args.globals[e]
      }
    })
    let check = obj1.Hide
    delete obj1.Hide
    if (check) continue;
    for (let key2 in args.artifacts) {// ур артефакта
      let art = args.artifacts[key2]
      if (!art.BlueprintTypes) continue;
      let types = art.BlueprintTypes.split('!')
      if (art.MaxModuleLevelToAward == obj1.AwardLevel && types.includes(obj1.SlotType)) {
        obj1.TID_Artifact = art.TID
      }
    }
  }
  return obj;
}
// фикс модулей, добавление БЗ/ГЗ стат
function addStarInfo(obj, fixValue, starHeaders, star) {
  let isHide = mainJs.isHide
  let coefficient = (v) => (star == 'WS') ? v * 600 : v * 2
  let isWhiteListBS = (header, name) => fixValue.whiteListBS.checkList(header, name)

  for (let name in obj) {
    let module = obj[name]
    let check = obj[name][`Show${star}Info`]

    delete obj[name][`Show${star}Info`]
    if (check != 1) continue
    for (let stata in module) {
      if (starHeaders.includes(stata)) {
        if (star == 'BS' && !isWhiteListBS(stata, name)) continue; // пока тлоько для ГЗ
        if (!Object.keys(module).includes(stata + star)) {
          let value = module[stata]
          if (!Array.isArray(value)) {
            obj[name][stata + star] = coefficient(value);
          } else if (Array.isArray(value)) {
            obj[name][stata + star] = value.map(e => {
              return coefficient(e)
            })
          }
          if (isHide(name, stata, true)) delete obj[name][stata]; // удалить оригинальную стату, если не нужна
        }
      }
    }
  }
}