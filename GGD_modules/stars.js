"use strict";
const mainJs = require('../generateGameData.js')

exports.default = function (args) {
    let obj = args.rawData

    for (let k in obj) {
        if (k in args.solarSysGenData) {
            obj[k].maxLevel = args.solarSysGenData[k].maxLevel
        }
        delete obj[k].Models
    }
    obj = mainJs.combineObjects(obj, args.solarSysGenData)
    mainJs.fillSpace(obj.RedStar, ' ')
    mainJs.pushArrays(obj.RedStar, 'RegularInfuenceRange', 'RegularInfuenceRange_Min', 'RegularInfuenceRange_Max')
    mainJs.pushArrays(obj.RedStar, 'InfluenceAwardThreshold', 'InfluenceAwardThreshold_Min', 'InfluenceAwardThreshold_Max')
    delete obj.RedStar.GhostSpawnSecs // лучше пусть будет в ships
    return obj
}