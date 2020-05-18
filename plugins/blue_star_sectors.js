"use strict";
const starFix = require('./star_sectorsLib.js').default

let star = 'blue'

exports.default = function (obj) {
  return starFix(obj, star);
}