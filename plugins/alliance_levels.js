'use strict';

module.exports = function(m, obj) {
  obj = obj.compileOne();
  obj.Name = 'alliance_levels';
  return obj;
};
