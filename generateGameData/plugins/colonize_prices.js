import {readCsv} from '../modules/loadFile.js';
import byTypes from './modification/byTypes.js';

export default function(obj) {
  const planets = readCsv('planets');
  const names = [];

  byTypes.planets.yellowstar.forEach((item) => {
    names.push(planets[item].TID);
  });
  obj.TID = names;
  return obj;
};
