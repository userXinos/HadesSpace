"use strict";
const fs = require("fs")
const prettier = require('prettier')

var pathCSVs = './rawData/csv/'
var pathSave = './data/'
var modulesPath = './GGD_modules/'
var optionalFiles = ['cerberus_stations.csv', 'projectiles.csv', 'ship_spawners.csv']
var dataByTypes = require(`${pathCSVs}modification/byTypes.js`).default
global.ignoringHeaders = ['maxLevel', 'Name', 'TID', 'TID_Description', 'Icon', 'SlotType', 'Model']

module.exports = {
  combineObjects,
  renameKeys,
  isHide,
  compileOne,
  fillSpace,
  pushArrays
}

let f = ['spacebuildings.csv']
generateFiles(pathCSVs, pathSave)

async function generateFiles(pathCSVs, pathSave, files) {
  let startTime = new Date().getTime()
  let funcs = {
    modules: fixModules,
    ships: fixShips,
    yellow_star_sectors: fixSolarSys,
    white_star_sectors: fixSolarSys,
    blue_star_sectors: fixSolarSys,
    planet_levels: fixPlanet_levels,
    planets: fixPlanets,
    artifacts: fixArtifacts,
    solar_system_gen_data: fixSolar_system_gen_data,
    spacebuildings: fixSpaceBuildings,
    globals: fixGlobals,
    player_goals: fixPlayer_goals,
    alliance_levels: fixAlliance_levels,
    //xp_levels: fixXp_levels,
  };

  if (!files || files.length == 0) {
    files = fs.readdirSync(pathCSVs).filter(e => {
      if (!e.endsWith('.csv')) return
      if (e != undefined && !optionalFiles.includes(e)) {
        return e
      }
    });
  }
  let promises = files.map(loadSaveFile)
  await Promise.all(promises) // .then() не хочет работать
    .catch(error => console.log(`Ошибки в выполнении. \n ${error}`))
  let time = (new Date().getTime() - startTime) / 1000
  console.log(`Готово! (${time} сек.)`)

  function loadSaveFile(file) {
    return new Promise((resolve, reject) => {
      fs.readFile(pathCSVs + file, 'utf8', (err, data) => {
        if (err) return reject(`Ошибка загрузки файла "${file}": ${err}`)
        let json = CSVtoJSON(data)
        file = file.replace(/(.*)\.csv/, '$1')
        if (file in funcs) {
          json = funcs[file](json, file)
        }
        saveToFile(`${pathSave}${file}Data.js`, fixOrder(json))
        resolve()
      })
    })
  }
  function fixModules(obj) {
    let func = require(`${modulesPath}modules.js`).default
    return func({
      rawData: obj,
      shipsData: CSVtoJSON(fs.readFileSync(`${pathCSVs}ships.csv`, "utf8")),
      projectilesData: CSVtoJSON(fs.readFileSync(`${pathCSVs}projectiles.csv`, "utf8")),
      fixValue: require(`${pathCSVs}modification/fixValue.js`),
      dronesList: dataByTypes['ships']['drones']
    })
  }
  function fixShips(obj, file) {
    let func = require(`${modulesPath}ships.js`).default
    return func({
      rawData: obj,
      cerberusList: dataByTypes[file]['cerberus'],
      ship_spawners: CSVtoJSON(fs.readFileSync(`${pathCSVs}ship_spawners.csv`, "utf8")),
      GhostSpawnSecs: CSVtoJSON(fs.readFileSync(`${pathCSVs}solar_system_gen_data.csv`, "utf8"))['RedStar']['GhostSpawnSecs']
    })
  }
  function fixSolarSys(obj, file) {
    let func = require(`${modulesPath}solarSystem.js`).default
    return func({
      star: file.replace(/(.+?)_.*/, '$1'),
      rawData: obj,
      scannersData: CSVtoJSON(fs.readFileSync(`${pathCSVs}spacebuildings.csv`, "utf8")).ShortRangeScanner,
      cerberusData: CSVtoJSON(fs.readFileSync(`${pathCSVs}cerb_groups.csv`, "utf8")),
    })
  }
  function fixPlanet_levels(obj) {
    return compileOne(obj)
  }
  function fixPlanets(obj, file) {
    let func = require(`${modulesPath}planets.js`).default
    return func({
      rawData: obj,
      categories: dataByTypes[file]
    })
  }
  function fixArtifacts(obj, file) {
    let func = require(`${modulesPath}artifacts.js`).default
    return func({
      rawData: obj,
      artsByTypes: dataByTypes[file]['data'],
      blueprints: dataByTypes[file]['blueprints']
    })
  }
  function fixSolar_system_gen_data(obj) {
    fillSpace(obj.RedStar, ' ')
    pushArrays(obj.RedStar, 'RegularInfuenceRange', 'RegularInfuenceRange_Min', 'RegularInfuenceRange_Max')
    pushArrays(obj.RedStar, 'InfluenceAwardThreshold', 'InfluenceAwardThreshold_Min', 'InfluenceAwardThreshold_Max')
    delete obj.RedStar.GhostSpawnSecs // лучше пусть будет в ships
    return obj
  }
  function fixSpaceBuildings(obj) {
    let func = require(`${modulesPath}spaceBuildings`).default
    return func({
      rawData: obj
    })
  }
  function fixGlobals(obj) {
    for (let i of Object.keys(obj)) {
      obj[i] = obj[i]['Value']
    }
    return obj
  }
  function fixPlayer_goals(obj, file) {
    let func = require(`${modulesPath}playerGoals`).default
    return func({
      rawData: obj,
      needFix: dataByTypes[file]['all']
    })
  }
  function fixAlliance_levels(obj) {
    obj = compileOne(obj)
    obj.Name = 'alliance_levels'
    return obj
  }
  // function fixXp_levels(obj) {
  //   delete obj.array[0]
  // }
}
function saveToFile(file, jsonObj) {
  let name = file.replace(/.*\/(.*)Data\.js/, '$1')
  let addData = addContent(jsonObj, name)

  const content = `
// generated by ${__filename}
// at ${new Date().toDateString()}

let data = ${JSON.stringify(jsonObj, null, 2)}

${addData['content'] || ""}

export {${addData['export']}}
`
  fs.writeFile(
    file,
    prettier.format(content, {
      parser: 'babel',
      trailingComma: 'es5',
      printWidth: 410, // чтоб массивы выстраивались в одну линию
    }),
    () => console.log(`Файл "${file}" создан`)
  )
}

// парсер из таблицы в обектJS
function CSVtoJSON(csv) {
  let data = csv.split('\n');
  let headers = data[0].split(',')
  let jsonObj = {}
  let name = null

  if (headers.length == 1) return simpleArray(data)
  for (let i = 1; i < data.length; i++) {
    let string = data[i].split(',')

    if (string == "") continue
    if (string[0] !== "") {
      name = string[0]
      jsonObj[name] = {}
      jsonObj[name]['maxLevel'] = 1
    } else {
      jsonObj[name]['maxLevel']++
    }
    for (let j = 0; j < string.length; j++) {
      let header = headers[j].trim()
      let value = string[j].trim()
      let stokValue = jsonObj[name][header]

      if (isTrashHeader(header) || value === undefined || value === "") continue
      value = fixValue(name, header, value)
      if (value == null) continue
      if (stokValue == undefined || stokValue === "") {
        jsonObj[name][header] = value
      } else {
        if (Array.isArray(stokValue)) {
          jsonObj[name][header].push(value)
        } else {
          jsonObj[name][header] = []
          jsonObj[name][header].push(stokValue, value)
        }
      }
    }
  }
  return removeDupsFromArrays(jsonObj)
}

// скрыть/исправить значения для красоты результата
function fixValue(name, header, value) {
  if (ignoringHeaders.includes(header)) {
    return value
  }
  let fixValue = require(`${pathCSVs}modification/fixValue.js`).fixValue
  if (isHide(name, header)) return null
  for (let i in fixValue) {
    if (fixValue[i]['header'].includes(header)) {
      return fixValue[i]['func'](value)
    }
  }
  if (value >= 0) {
    return parseInt(value)
  }
  return value
}
function isHide(name, header, strict = false) { // скрывает невалидные данные: "0", " " или просто ненужные,  strict - скрыть валидные данные (2я проверка)
  let path = (strict) ? 'hide2' : 'hide'
  let hide = require(`${pathCSVs}modification/fixValue.js`)[path]
  for (let i in hide) {
    if (hide[i]['name'].includes(name)) {
      if (hide[i]['headers'].includes(header)) {
        return true
      }
    }
  }
  return false
}
// массив, сравнивать i и i+1, если все элементы равны установить вместо массива i[0] || {key:[1,1,1,1]} => {key:1}
function removeDupsFromArrays(obj) {
  let names = Object.keys(obj)
  for (let name of names) {
    let headlers = Object.keys(obj[name])
    for (let headler of headlers) {
      let item = obj[name][headler]
      if (!Array.isArray(item)) continue
      let isBreak = false
      for (let i = 0; i < item.length; i++) {
        if (item[i] !== item[i + 1] && item[i + 1] !== undefined) {
          isBreak = true // пока хз как лучше
          break
        }
      }
      if (!isBreak) {
        obj[name][headler] = item[0]
      }
    }
  }
  return obj
}
// добавить захардкоженый контент
function addContent(obj, needData) {
  let byType = dataByTypes[needData] || {}
  let result = {}
  let registered = []
  let notRegistered = []

  result['export'] = 'data'
  if (obj[Object.keys(obj)[0]].constructor !== Object) {
    return result // нет вложенных объектов - просто данные 
  }
  for (let i in byType) {
    byType[i].forEach(e => {
      registered.push(e)
    });
  }
  for (let key of Object.keys(obj)) {
    if (!registered.includes(key)) {
      notRegistered.push(key)
    }
  }
  if (notRegistered.length != 0) {
    if (Object.keys(byType).length != 0) {
      byType['notregistered'] = notRegistered
    } else {
      byType['default'] = notRegistered
    }
  }
  result['content'] = 'let byTypes= ' + JSON.stringify(byType, null, 2)
  result['export'] += ', byTypes'
  return result
}

function combineObjects(obj1, obj2) {
  for (var p in obj2) {
    try {
      if (ignoringHeaders.includes(p)) continue
      if (obj2[p].constructor == Object) {
        obj1[p] = combineObjects(obj1[p], obj2[p])
      } else {
        obj1[p] = obj2[p]
      }
    } catch (e) {
      obj1[p] = obj2[p]
    }
  }
  return obj1
}

function renameKeys(obj, newKeys) {
  const keyValues = Object.keys(obj).map(key => {
    const newKey = newKeys[key] || key
    return { [newKey]: obj[key] }
  })
  return Object.assign({}, ...keyValues)
}

// глобально скрытые значения - не имеют важности
function isTrashHeader(str) {
  let trashHeaders = JSON.parse(fs.readFileSync(`${pathCSVs}modification/trashHeaders.json`, "utf8").toLowerCase())
  str = str.toLowerCase()
  return (trashHeaders.includes(str) || str.startsWith('is') || str.includes('fx'))
}

// исправление порядка объекта
function fixOrder(obj) {
  let headers = JSON.parse(fs.readFileSync(`${pathCSVs}modification/headersOrder.json`, "utf8"));
  let result = {}

  for (let i = 0; i < ObjectLength(obj); i++) {
    let objCopy = Object.assign({}, obj); // сделать копию, чтобы не помять основной объект
    let path = null // уровень 0
    let key = Object.keys(objCopy)[i]
    //определение глубины 
    let depth = 0
    while (typeof objCopy[key] === 'object' && objCopy[key].constructor.name == 'Object') {
      path = (path == null) ? key : path + '.' + key
      key = Object.keys(objCopy[path])[depth]
      objCopy = objCopy[path]
      depth++
    }
    // создание объекта с ключами (+индекс)
    let objKeys = Object.keys(objCopy)
    let indexes = [];
    for (key in objCopy) {
      let elem = {}
      let index = (headers.includes(key)) ? headers.indexOf(key) : 666
      elem['index'] = index
      elem['key'] = key
      indexes.push(elem)
    }
    // сортировка по идексу
    let objSorted = indexes.slice(0);
    objSorted.sort(function (a, b) {
      return a.index - b.index;
    });
    // сборка готового массива и объекта 
    let newKeys = []
    for (let k of objSorted) {
      newKeys.push(k.key)
    }
    let result2 = {}
    for (key of newKeys) {
      result2[key] = objCopy[key]
    }
    if (path != null) {
      setToValue(result, result2, path)
    } else {
      result = result2
    }
  }
  return result
}
function setToValue(obj, value, path) {
  var i;
  path = path.split('.');
  for (i = 0; i < path.length - 1; i++)
    obj = obj[path[i]];

  obj[path[i]] = value;
}
function ObjectLength(object) {
  let length = 0
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      ++length
    }
  }
  return length
}
// если не таблица, а просто данные в столбик
function simpleArray(array) {
  array.forEach((e, i, arr) => {
    if (e == '') {
      arr.splice(i, 1)
      return
    }
    arr[i] = fixValue(null, null, e)
  });
  return {
    maxLevel: array.length,
    array: array
  }
}
// из кучи объеков в один
function compileOne(obj) {
  let result = {}
  for (let name of Object.keys(obj)) {
    name = obj[name]
    for (let key in name) {
      let value = name[key]
      key = key.replace(/\s+/g, '')
      let stokValue = result[key]
      if (stokValue == undefined || stokValue === "") {
        result[key] = value
      } else {
        if (Array.isArray(stokValue)) {
          result[key].push(value)
        } else {
          result[key] = []
          result[key].push(stokValue, value)
        }
      }
    }
  }
  result['maxLevel'] = result['maxLevel'].length
  return result
}
// заполнить пространство для соответствия уровню 
function fillSpace(obj, spaceSymbol = 0, method = 'unshift') {
  for (let i of Object.keys(obj)) {
    if (ignoringHeaders.includes(i) || !Array.isArray(obj[i])) continue
    while (obj[i].length < obj.maxLevel) {
      obj[i][method](spaceSymbol)
    }
  }
  return obj
}
function pushArrays(obj, newName, key1, key2) {
  obj[newName] = []
  for (let i = 0; i < obj.maxLevel; i++) {
    obj[newName].push(obj[key1][i] + '!' + obj[key2][i])
  }
  [key1, key2].forEach(e => delete obj[e]);
  return obj
}