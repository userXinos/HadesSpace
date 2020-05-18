"use strict";
const main = require('../generateGameData.js')

exports.default = function (obj) {
    obj = main.compileOne(obj)
    obj.Name = 'alliance_levels'
    return obj
}