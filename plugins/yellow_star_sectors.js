"use strict";
const starFix = require('./star_sectorsLib.js').default

let star = 'yellow'

exports.default = function (obj) {
  return starFix(obj, star);
}