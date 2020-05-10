const mainJs = require('../generateGameData.js')

function generateShips(args) {
  let obj = args.rawData
  for (let cerb of args.cerberusList) {
    obj = fixModulesShipsData(obj, cerb, 'InitialModule', 'InitialModuleLevels')
  }
  obj = fixModulesShipsData(obj, 'CorpFlagship', 'FlagshipModules', 'FlagshipModuleLevels')
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
  let result = {}
  for (let i in modules) {
    let moduleArr = modules[i].split('!')
    let levelArr = String(levels[i]).split('!')
    for (let k in moduleArr) {
      let key = moduleArr[k]
      let value = Number(levelArr[k]) + 1
      let stokValue = result[key]
      if (stokValue === undefined || stokValue === "") {
        result[key] = value
      } else {
        if (typeof (stokValue) == 'object') {
          result[key].push(value)
        } else {
          result[key] = []
          result[key].push(stokValue, value)
        }
      }
    }
  }
  result.maxLevel = obj[name]['maxLevel']
  result = {
    [name]: mainJs.fillSpace(result)
  }
  delete obj[name][Modules]
  delete obj[name][ModuleLevels]
  return combineObjects(obj, result)
}

exports.default = generateShips 