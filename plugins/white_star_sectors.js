'use strict';
const starFix = require('./star_sectorsLib.js');

const star = 'white';

module.exports = function(m, obj) {
  return starFix(m, obj, star);
};
