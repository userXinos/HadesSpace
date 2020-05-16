"use strict";
const mainJs = require('../generateGameData.js')

// создать одну таблицу со всеми планками
exports.default = function (args) {
    let compileOne = mainJs.compileOne
    let stars = args.categories
    let obj = args.rawData
    let result = {}
    let onlyYS = ['MaxUpgradeLevel', 'CreditIncomeModifier', 'FuelIncomeModifier', 'CreditStorageModifier', 'FuelStorageModifier', 'CreditShipmentModifier', 'MaxShipments', 'ShipmentsPerHour']

    for (let s in stars) {
        let obj1 = {}

        stars[s].forEach(e => {
            obj1[e] = obj[e]
        })
        for (let k in obj1) {
            for (let i in obj1[k]) {
                if (s != 'yellowstar' && onlyYS.includes(i)) {
                    delete obj1[k][i]
                }
            }
        }
        result[s + 'Table'] = compileOne(obj1)
    }
    return result
}