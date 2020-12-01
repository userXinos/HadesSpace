import compileOne from '../modules/compileOne.js';

export default function(obj) {
  obj = compileOne(obj);
  obj.Name = 'alliance_levels';
  return obj;
};
