function generateSolarSys(args) {
  let result = {}
  let obj = args.rawData

  for (let name of Object.keys(obj)) {
    name = obj[name]
    for (let key in name) {
      let value = name[key]
      let stokValue = result[key]
      if (stokValue == undefined || stokValue === "") {
        startObj(key, value, result)
      } else {
        if (Array.isArray(stokValue)) {
          result[key].push(value)
        } else {
          result[key] = []
          result[key].push(stokValue, value)
        }
      }
    }
    addScannerInfo(name.MinScannerLevel, result, args.scannersData)
    addCerberus(name.CerbGroup, result, args.cerberusData)
    endObj(result)
  }
  // небольшие фиксы 
  result['maxLevel'] = result['maxLevel'].length
  result['Name'] = 'YSS'
  result['MinScannerLevel'].forEach((e, i, arr) => {
    if (e !== ' ')
      arr[i] = e + 1
  });
  return result
}
function getType(val) {
  // if(!isNaN(val) && val !== ' '){
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
// добавить записи в начало, для соотвествия уровня
function startObj(key, value, obj) {
  let length = getLength(obj['maxLevel'])
  obj[key] = value
  if (!length) return
  obj[key] = [value]
  for (let k = 0; k < length; k++) {
    obj[key].unshift(getType(value))
  }
}
// добавить записи в конец, для соотвествия уровня
function endObj(obj) {
  let length = getLength(obj['maxLevel'])
  for (let key in obj) {
    for (let i = 0; i < length; i++) {
      if (obj[key].length < length) {
        obj[key].push(getType(obj[key][0]))
      } else {
        continue
      }
    }
  }
}
function addScannerInfo(scanner, obj, scanners) {
  let ststs = ['Cost', 'SectorUnlockTime']
  if (obj[ststs[0]] == undefined) {
    for (let i of ststs) {
      obj[i] = []
    }
  }
  for (let i of ststs) {
    obj[i].push(scanners[i][scanner])
  }
}
function addCerberus(cerb, obj, cerberus) {
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
  let index = obj.CerbGroup.indexOf(cerb)
  obj.CerbGroup[index] = cerbObj()
}

module.exports = { generateSolarSys } 