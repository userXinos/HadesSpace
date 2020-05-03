function generateSolarSys(args) {
  let result = {}
  let obj = args.rawData

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
    if (args.star == 'yellow') {
      addScannerInfo(name.MinScannerLevel, args.scannersData)
    }
    addCerberus(name.CerbGroup, args.cerberusData)
    endObj()
  }
  // небольшие фиксы 
  result['maxLevel'] = result['maxLevel'].length
  result['Name'] = args.star + 'StarSectors'
  if (result['MinScannerLevel'] != undefined) {
    result['MinScannerLevel'].forEach((e, i, arr) => {
      if (e !== ' ')
        arr[i] = e + 1
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
    let ststs = ['Cost', 'SectorUnlockTime']
    if (result[ststs[0]] == undefined) {
      for (let i of ststs) {
        result[i] = []
      }
    }
    for (let i of ststs) {
      result[i].push(scanners[i][scanner])
    }
  }
  function addCerberus(cerb, cerberus) {
    if (!cerb) return
    let cerbObj = (() => {
      let r = cerberus[cerb]
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
}
function getType(v) {
  // if(!isNaN(v) && v !== ' '){
  //   return 0
  // }
  return ' '
}
function getLength(v) {
  let r
  if (v != undefined) {
    r = v.length
  }
  return r || 0
}

module.exports = { generateSolarSys } 