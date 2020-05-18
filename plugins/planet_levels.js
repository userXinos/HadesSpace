"use strict";
const main = require('../generateGameData.js')

exports.default = function (obj) {
    return main.compileOne(obj)
}