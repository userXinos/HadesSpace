const mainJs = require('../generateGameData.js')

function generateShips(args) {
  let obj = args.rawData
  for (let cerb of cerberusList) {
    obj = fixModulesShipsData(obj, cerb, 'InitialModule', 'InitialModuleLevels')
  }
  obj = fixModulesShipsData(obj, 'CorpFlagship', 'FlagshipModules', 'FlagshipModuleLevels')
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
  // изменить путь значений нового объекта для объединения результата с оригиналом и
  // добавить недостающие нули, чтобы элементы массивов соответствовали уровню
  let result2 = { [name]: {} }
  for (let key in result) {
    let needInts = obj[name]['maxLevel']
    for (let i = 0; i < needInts; i++) {
      if (result[key].length < needInts) {
        result[key].unshift(0)
      } else {
        result2[name][key] = result[key]
        continue
      }
    }
  }
  delete obj[name][Modules]
  delete obj[name][ModuleLevels]
  return combineObjects(obj, result2)
}

module.exports = { generateShips }