"use strict";
const main = require('../generateGameData.js')
const globals = require('./globals.js')

let shipsData = main.readCSV('capital_ships')
let projectilesData = main.readCSV('projectiles')
let artifacts = main.readCSV('artifacts')
let globalsData = globals(main.readCSV('globals'))
let starHeaders = ['EffectDurationx10', 'ActivationDelay', 'ActivationPrep', 'MaxDPSTime', 'APTPIOTTP', 'DisableTime', 'ProximityTriggerSec'];

module.exports = function (obj) {
  for (let key in obj) {  //TODO рефакторинг 
    let obj1 = obj[key]

    // добавить глобальные к модулям 
    Object.keys(globalsData).forEach(e => {
      if (e.includes(key) && !main.isHide('globals', e)) {
        obj1[e] = globalsData[e]
      }
    })
    // добавить ур. артефакта
    if (!obj1.Hide) {
      for (let key2 in artifacts) {
        let art = artifacts[key2]
        if (!art.BlueprintTypes) continue;
        let types = art.BlueprintTypes.split('!')
        if (art.MaxModuleLevelToAward == obj1.AwardLevel && types.includes(obj1.SlotType)) {
          obj1.TID_Artifact = art.TID
        }
      }
    }
    // добавить projectiles к ракетоподобным 
    if (obj1.WeaponEffectType == 'projectile') {
      obj[key] = main.combineObjects(obj1, projectilesData[obj1.WeaponFx]);
    }
    // добавить данные дронов
    if (obj1.SpawnLifetime) {
      obj[key] = main.combineObjects(obj1, shipsData[obj1.Name]);
    }
    // фикс Арты
    if (obj1.BarrageMaxAdditionalEnemies) {
      let arr = obj1.BarrageMaxAdditionalEnemies.split('!')
      obj1.BarrageMaxAdditionalEnemies = Number(arr[0])
      obj1.BarrageMaxAdditionalEnemiesWS = Number(arr[1])
    }
    // фикс Рока
    if (obj1.DestinyDisableTimes) {
      let arr = obj1.DestinyDisableTimes.split('!')
      obj1.DestinyDisableTimes = Number(arr[0])
      obj1.DestinyDisableTimesWS = Number(arr[1] / 6 * 3600)
    }
    // + макс бонус у торг. дрона 
    if (obj1.DroneShipmentBonus) {
      obj1.DroneShipmentBonusMax = []
      obj1.DroneShipmentBonus.forEach((e, i) => {
        obj1.DroneShipmentBonusMax.push(
          (obj1.SpawnCapacity[i] - 1) * e
        )
      });
    }
    // фикс БЗ стат
    if (obj1.EffectDurationx10WS) {
      obj1.EffectDurationx10WS.forEach((e, i, arr) => {
        arr[i] = e * 60
      })
    }
    // фикс Утиля
    if (obj1.SalvageHullPercent) {
      obj1.SalvageHullPercentWS = []
      obj1.SalvageHullPercentBS = []
      obj1.SalvageHullPercent.forEach((e, i) => {
        let arr = e.split('!')
        obj1.SalvageHullPercent[i] = Number(arr[0])
        obj1.SalvageHullPercentWS[i] = Number(arr[1])
        obj1.SalvageHullPercentBS[i] = Number(arr[2])
      });
    }
    ['WeaponEffectType', 'WeaponFx', 'Hide'].forEach(e => delete obj1[e]);
  }
  ['Recoil', 'Immolation', 'EMPRocket'].forEach(e => obj[e].ShowWSInfo = 1);
  addStarInfo(obj, starHeaders, 'WS');
  addStarInfo(obj, starHeaders, 'BS');
  obj.TimeWarp.Icon = 'Mod_TimeWarp_Icon' // ошибка в таблице, 'w' в иконках в верхнем регистре 
  obj.MiningBoost.WhiteStarScore.unshift(0) // ошибка в таблице, не хватает "0"
  obj.Destiny.WhiteStarScore.unshift(0) // ошибка в таблице, не хватает "0"
  obj.MiningDrone.MiningSpeed = [29.1, 33.3, 37.5, 41.7, 45.8, 52.2, 58.8, 65.2, 74.1, 85.7]; // хз как считать это
  return obj;
}
// фикс модулей, добавление БЗ/ГЗ стат
function addStarInfo(obj, starHeaders, star) {
  let isHide = main.isHide
  let coefficient = (v) => (star == 'WS') ? v * 600 : v * 2

  for (let name in obj) {
    let module = obj[name]
    let check = obj[name][`Show${star}Info`]

    delete obj[name][`Show${star}Info`]
    if (check != 1) continue
    for (let stata in module) {
      if (starHeaders.includes(stata)) {
        if (star == 'BS' && !main.isWhiteListBS(stata, name)) continue; // пока тлоько для ГЗ
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