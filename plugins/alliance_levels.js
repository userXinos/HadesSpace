"use strict";
const main = require('../generateGameData.js')

module.exports = function (obj) {
    obj = main.compileOne(obj)
    obj.Name = 'alliance_levels'
    return obj
}