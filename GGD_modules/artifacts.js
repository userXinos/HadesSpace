"use strict";

const mainJs = require('../generateGameData.js')

exports.default = function (args) {
    let obj = args.rawData
    let artsTypes = args.artsByTypes
    let tableNames = args.blueprints
    let result = {}

    for (let name of artsTypes) {
        let obj1 = {} // собрать объекты одного типа в одном месте 

        let keys = Object.keys(obj).map(e => {
            if (e.startsWith(name))
                return e
        });
        keys.forEach(k => obj1[k] = obj[k]);
        result[name] = mainJs.compileOne(obj1)
        result[name]['Name'] = name
        result[name]['TID_Description'] = result[name]['TID_Description'][0]
        delete result[name]['Model']
    }
    return fixBlueprintsCredHydroMinMax(result, tableNames)
}
function fixBlueprintsCredHydroMinMax(obj, tableNames) {
    for (let a of Object.keys(obj)) {
        let obj1 = obj[a]
        let minArr = obj1.BlueprintsMin
        let maxArr = obj1.BlueprintsMax
        let blueprints = {} // "таблица" Blueprints получилась большой, было принято решение сохранить отдельно

        mainJs.pushArrays(obj1, 'Credits', 'CreditsMin', 'CreditsMax')
        mainJs.pushArrays(obj1, 'Hydrogen', 'HydrogenMin', 'HydrogenMax')
        for (let i = 0; i < minArr.length; i++) {
            let min = String(minArr[i]).split('!')
            let max = String(maxArr[i]).split('!')
            let arr = []
            for (let j = 0; j < min.length; j++) {
                arr.push(min[j] + '!' + max[j])
            }
            blueprints[i + 1] = arr
        }
        let i = Object.keys(obj).indexOf(a);
        blueprints.maxLevel = obj1.maxLevel
        obj[tableNames[i]] = mainJs.fillSpace(blueprints, ' ', 'push')
        obj[tableNames[i]]['Name'] = tableNames[i];
        ['BlueprintsMin', 'BlueprintsMax'].forEach(e => delete obj1[e]);
    }
    return obj
}