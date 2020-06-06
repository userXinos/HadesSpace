'use strict';

module.exports = function(obj) {
  obj.array.splice(0, 1);
  return obj;
};
