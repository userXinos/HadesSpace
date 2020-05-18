"use strict";
const starFix = require('./star_sectorsLib.js').default

let star = 'white'

exports.default = function (obj) {
  return starFix(obj, star);
}