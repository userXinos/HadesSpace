"use strict";
const starFix = require('./star_sectorsLib.js')

let star = 'white'

module.exports = function (obj) {
  return starFix(obj, star);
}