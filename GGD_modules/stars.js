"use strict";
const mainJs = require('../generateGameData.js')

exports.default = function (args) {
    let obj = args.rawData

    obj = mainJs.combineObjects(obj, args.solarSysGenData)
    delete obj.RedStar.GhostSpawnSecs // лучше пусть будет в ships
    for (let key in obj) {
        let obj1 = obj[key]

        delete obj1.Models
        if (key in args.globals) { // добавить "globals"
            obj1 = mainJs.combineObjects(obj1, args.globals[key])
        }
        if (key in args.solarSysGenData) { // фикс лвл из "solar_system_gen_data" т.к. в stars == 1 
            obj1.maxLevel = args.solarSysGenData[key].maxLevel
        }
        if (key == 'WhiteStar') {
            obj1.Lifetime = obj1.Lifetime * obj1.TimeSlowdownFactor
        }
        for (let i in obj1) { // фикс массивов из сточки
            if (Array.isArray(obj1[i]) || ignoringHeaders.includes(i)) continue;
            let arr = String(obj1[i]).split('!')

            arr = arr.map(e => mainJs.fixValue(key, i, e))
            if (arr.length > 1) obj1[i] = arr
            if (arr[0] == null) delete obj1[i]
            if (arr.length > obj1.maxLevel) {
                obj1.maxLevel = arr.length
            }
        }
        mainJs.fillSpace(obj1, ' ')
    }
    mainJs.pushArrays(obj.RedStar, 'RegularInfuenceRange', 'RegularInfuenceRange_Min', 'RegularInfuenceRange_Max')
    mainJs.pushArrays(obj.RedStar, 'InfluenceAwardThreshold', 'InfluenceAwardThreshold_Min', 'InfluenceAwardThreshold_Max')
    return obj
}