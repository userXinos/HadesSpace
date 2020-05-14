"use strict";
const mainJs = require('../generateGameData.js')

// создать одну таблицу со всеми планками
exports.default = function (args) {
    let compileOne = mainJs.compileOne
    let stars = args.categories
    let obj = args.rawData
    let result = {}

    for (let s in stars) {
        let obj1 = {}

        stars[s].forEach(e => {
            obj1[e] = obj[e]
        })
        result[s + 'Table'] = compileOne(obj1)
    }
    return result
}