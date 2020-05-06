"use strict";

const mainJs = require('../generateGameData.js')

function generateArtifacts(args) {
    let obj = args.rawData
    let artsTypes = args.artsByTypes
    let tableNames = args.blueprints
    let result = {}

    for (let startName of artsTypes) {
        let keys = []
        let tmp = {}

        Object.keys(obj).forEach(e => {
            if (e.startsWith(startName))
                keys.push(e)
        });
        keys.forEach(k => {
            tmp[k] = obj[k]
        });
        result[startName] = mainJs.compileOne(tmp)

        result[startName]['Name'] = startName
        result[startName]['TID_Description'] = result[startName]['TID_Description'][0]
        delete result[startName]['Model']
    }
    return fixBlueprintsCredHydroMinMax(result, tableNames)
}
function fixBlueprintsCredHydroMinMax(obj, tableNames) {
    for (let a of Object.keys(obj)) {
        let art = obj[a]
        let minArr = art.BlueprintsMin
        let maxArr = art.BlueprintsMax
        let blueprints = {} // "таблица" Blueprints получилась большой, было принято решение сохранить отдельно

        mainJs.pushArrays(art, 'Credits', 'CreditsMin', 'CreditsMax')
        mainJs.pushArrays(art, 'Hydrogen', 'HydrogenMin', 'HydrogenMax')
        for (let i = 0; i < minArr.length; i++) {
            let min = String(minArr[i]).split('!')
            let max = String(maxArr[i]).split('!')
            let arr = []
            for (let j = 0; j < min.length; j++) {
                arr.push(min[j] + '-' + max[j])
            }
            blueprints[i + 1] = arr
        }
        let i = Object.keys(obj).indexOf(a);
        blueprints.maxLevel = art.maxLevel
        obj[tableNames[i]] = mainJs.fillSpace(blueprints, ' ', 'push')
        obj[tableNames[i]]['Name'] = tableNames[i];
        ['BlueprintsMin', 'BlueprintsMax'].forEach(e => delete art[e]);
    }
    return obj
}
exports.default = generateArtifacts