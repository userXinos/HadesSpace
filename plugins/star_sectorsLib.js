"use strict";
const main = require('../generateGameData.js')

let scannersData = main.readCSV('spacebuildings').ShortRangeScanner
let cerberusData = main.readCSV('cerb_groups')
let cerberusStationsData = main.readCSV('cerberus_stations')

exports.default = function (obj, star) {
  let result = {}

  for (let name of Object.keys(obj)) {
    name = obj[name]
    for (let key in name) {
      let value = name[key]
      let stokValue = result[key]
      if (stokValue == undefined || stokValue === "") {
        startObj(key, value)
      } else {
        if (Array.isArray(stokValue)) {
          result[key].push(value)
        } else {
          result[key] = []
          result[key].push(stokValue, value)
        }
      }
    }
    if (star == 'yellow') addScannerInfo(name.MinScannerLevel, scannersData)
    addCerberus(name.CerbGroup)
    fixCerbBaseName(name.BaseType)
    endObj()
  }
  // небольшие фиксы 
  result.maxLevel = result.maxLevel.length
  result.Name = star + 'StarSectors'
  if (result.MinScannerLevel != undefined) {
    result.MinScannerLevel.forEach((e, i, arr) => {
      if (e !== ' ') arr[i] = e + 1
    });
  }
  return result;

  // добавить записи в начало, для соотвествия уровня
  function startObj(key, value) {
    let length = getLength(result['maxLevel'])
    result[key] = value
    if (!length) return
    result[key] = [value]
    for (let k = 0; k < length; k++) {
      result[key].unshift(getType(value))
    }
  }
  // добавить записи в конец, для соотвествия уровня
  function endObj() {
    let length = getLength(result['maxLevel'])
    for (let key in result) {
      for (let i = 0; i < length; i++) {
        if (result[key].length < length) {
          result[key].push(getType(result[key][0]))
        } else {
          continue
        }
      }
    }
  }
  function addScannerInfo(scanner, scanners) {
    let ststs = ['SectorUnlockCost', 'SectorUnlockTime']
    if (result[ststs[0]] == undefined) {
      for (let i of ststs) {
        result[i] = []
      }
    }
    for (let i of ststs) {
      result[i].push(scanners[i][scanner])
    }
  }
  function addCerberus(cerb) {
    if (!cerb) return
    let cerbObj = (() => {
      let r = cerberusData[cerb]
      for (let i in r) {
        let data = r[i]
        delete r[i]
        if (!ignoringHeaders.includes(i)) {
          i = i.replace(/Num(\w*)/, '$1')
          r[i] = data
        }
      }
      return r
    })
    let index = result.CerbGroup.indexOf(cerb)
    result.CerbGroup[index] = cerbObj()
  }
  function fixCerbBaseName(base) {
    if (!base) return
    let index = result.BaseType.indexOf(base)
    result.BaseType[index] = cerberusStationsData[base].TID
  }
}
function getType(v) {
  return ' '
}
function getLength(v, r = null) {
  if (v != undefined) {
    r = v.length
  }
  return r || 0
}