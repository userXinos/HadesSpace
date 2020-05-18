"use strict";
const main = require('../generateGameData.js')

exports.default = function (obj) {
    obj.array.splice(0, 1)
    return obj
}