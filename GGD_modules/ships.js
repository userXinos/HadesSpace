"use strict";
const mainJs = require('../generateGameData.js')

exports.default = function (args) {
  let obj = args.rawData
  args.cerberusList.forEach(e => {
    fixModulesShipsData(obj, e, 'InitialModule', 'InitialModuleLevels')
  })
  fixModulesShipsData(obj, 'CorpFlagship', 'FlagshipModules', 'FlagshipModuleLevels')
  Object.keys(args.ship_spawners.Ghosts).forEach(k => {
    if (!ignoringHeaders.includes(k))
      obj.CerberusGhosts[k] = args.ship_spawners.Ghosts[k]
  })
  obj.CerberusGhosts.GhostSpawnSecs = args.GhostSpawnSecs
  return obj
}
// из "{key:[module1!module2], key2:[1!2]}" в "{module1:[1], module2:[2]}"
function fixModulesShipsData(obj, name, Modules, ModuleLevels) {
  let combineObjects = mainJs.combineObjects
  let modules = (Array.isArray(obj[name][Modules])) ? obj[name][Modules] : [obj[name][Modules]]
  let levels = (Array.isArray(obj[name][ModuleLevels])) ? obj[name][ModuleLevels] : [obj[name][ModuleLevels]]
  let obj1 = obj[name]
  for (let i in modules) {
    let moduleArr = modules[i].split('!')
    let levelArr = String(levels[i]).split('!')
    for (let k in moduleArr) {
      let key = moduleArr[k]
      let value = Number(levelArr[k]) + 1
      let stokValue = obj1[key]
      if (stokValue === undefined || stokValue === "") {
        obj1[key] = value
      } else {
        if (typeof (stokValue) == 'object') {
          obj1[key].push(value)
        } else {
          obj1[key] = []
          obj1[key].push(stokValue, value)
        }
      }
    }
  }
  obj1.maxLevel = obj[name]['maxLevel']
  mainJs.fillSpace(obj1)
  delete obj1[Modules]
  delete obj1[ModuleLevels]
}