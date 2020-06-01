"use strict";
const main = require('../generateGameData.js')

module.exports = function (obj) {
    for (let i of Object.keys(obj)) {
        obj[i] = obj[i]['Value']
    }
    return obj
}
module.exports.getGlobalsBy = function (str) {
    let obj = module.exports(main.readCSV('globals'))
    let result = {}
    Object.keys(obj).forEach(e => {
        if (e.includes(str)) {
            result[e] = obj[e]
        }
    })
    return result
}