'use strict';
const main = require('../generateGameData.js');

module.exports = function(obj) {
  for (const i of Object.keys(obj)) {
    obj[i] = obj[i]['Value'];
  }
  return obj;
};
module.exports.getGlobalsBy = function(str) {
  const obj = module.exports(main.readCSV('globals'));
  const result = {};
  Object.keys(obj).forEach((e) => {
    if (e.includes(str)) {
      result[e] = obj[e];
    }
  });
  return result;
};
