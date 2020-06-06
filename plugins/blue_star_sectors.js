'use strict';
const starFix = require('./star_sectorsLib.js');
const star = 'blue';

module.exports = function(obj) {
  return starFix(obj, star);
};
