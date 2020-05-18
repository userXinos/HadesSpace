"use strict";
const main = require('../generateGameData.js')

exports.default = function (obj) {
    for (let i of Object.keys(obj)) {
        obj[i] = obj[i]['Value']
    }
    return obj
}
exports.getGlobalsBy = function (str) {
    let obj = exports.default(main.readCSV('globals'))
    let result = {}
    Object.keys(obj).forEach(e => {
        if (e.includes(str)) {
            result[e] = obj[e]
        }
    })
    return result
}