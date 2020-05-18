"use strict";
const main = require('../generateGameData.js')

let stars = main.dataByTypes.planets
let compileOne = main.compileOne
let onlyYS = ['MaxUpgradeLevel', 'CreditIncomeModifier', 'FuelIncomeModifier', 'CreditStorageModifier', 'FuelStorageModifier', 'CreditShipmentModifier', 'MaxShipments', 'ShipmentsPerHour']

// создать одну таблицу со всеми планками
exports.default = function (obj) {
    let result = {}

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