'use strict';

module.exports = function(main, obj) {
  const planets = main.readCSV('planets');
  const names = [];

  main.dataByTypes.planets.yellowstar.forEach((item) => {
    names.push(planets[item].TID);
  });
  obj.TID = names;
  return obj;
};
