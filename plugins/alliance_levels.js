'use strict';

module.exports = function(main, obj) {
  obj = main.compileOne(obj);
  obj.Name = 'alliance_levels';
  return obj;
};
