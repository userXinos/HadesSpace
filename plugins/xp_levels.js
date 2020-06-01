"use strict";
const main = require('../generateGameData.js')

module.exports = function (obj) {
    obj.array.splice(0, 1)
    return obj
}