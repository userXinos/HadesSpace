
const mainJs = require('../generateGameData.js')

function generateModules(args) {
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
  let starHeaders = ['EffectDurationx10', 'ActivationDelay', 'ActivationPrep', 'MaxDPSTime', 'APTPIOTTP', 'DisableTime']
  let projectiles = renameKeys(args.projectilesData, projectilesKeys)
  let drones = {}
  for (let i of args.dronesList) {
    drones[i] = args.shipsData[i]
  }
  obj = combineObjects(obj, drones);
  obj = combineObjects(obj, projectiles);
  ['Recoil', 'Immolation', 'EMPRocket'].forEach(e => obj[e]['ShowWSInfo'] = 1);
  obj = addStarInfo(obj, args.fixValue, starHeaders, 'WS');
  obj = addStarInfo(obj, args.fixValue, starHeaders, 'BS');
  obj.TimeWarp.Icon = 'Mod_TimeWarp_Icon' // ошибка в таблице, 'w' в иконках в верхнем регистре 
  obj.MiningBoost.WhiteStarScore.unshift(0) // ошибка в таблице, не хватает "0"
  obj.Destiny.WhiteStarScore.unshift(0) // ошибка в таблице, не хватает "0"
  obj.MiningDrone.MiningSpeed = [29.1, 33.3, 37.5, 41.7, 45.8, 52.2, 58.8, 65.2, 74.1, 85.7]; // хз как считать это
  return obj;

}
// фикс модулей, добавление БЗ/ГЗ стат
function addStarInfo(obj, fixValue, starHeaders, star) {
  let isHide = mainJs.isHide
  let coefficient = (v) => (star == 'WS') ? v * 600 : v * 2
  let isWhiteListBS = (header, name) => fixValue.whiteListBS.checkList(header, name)
  let StarHeaders2 = []
  for (let i = 0; i < starHeaders.length; i++) {
    StarHeaders2[i] = starHeaders[i] + star
  }
  for (let name in obj) {
    let module = obj[name]
    let check = obj[name][`Show${star}Info`]
    delete obj[name][`Show${star}Info`]
    if (check != 1) continue
    for (let stata in module) {
      if (starHeaders.includes(stata)) {
        if (star == 'BS') { // пока тлоько для ГЗ
          if (!isWhiteListBS(stata, name)) continue
        }
        if (!Object.keys(module).includes(stata + star)) {
          let stokStata = module[stata]
          if (!Array.isArray(stokStata)) {
            obj[name][stata + star] = coefficient(stokStata)
            if (isHide(name, stata, true)) { // удалить оригинальную стату, если не нужна
              delete obj[name][stata]
            }
            continue
          }
          let arrayNoStar = stokStata
          let arrayStar = []
          for (let j in arrayNoStar) {
            arrayStar.push(coefficient(arrayNoStar[j]))
          }
          obj[name][stata + star] = arrayStar
          if (isHide(name, stata, true)) { // удалить оригинальную стату, если не нужна
            delete obj[name][stata]
          }
        }
      } else {
        continue
      }
    }
  }
  return obj
}

exports.default = generateModules 