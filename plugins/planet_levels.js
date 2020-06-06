'use strict';
const main = require('../generateGameData.js');

module.exports = function(obj) {
  return main.compileOne(obj);
};
