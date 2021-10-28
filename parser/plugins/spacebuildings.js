const timeFixModifiers = {
  ConstructionTimeSeconds: 1,
  ConstructionTimeMinutes: 60,
  ConstructionTimeHours: 3600,
};

export default function(obj) {
  Object.keys(obj).forEach((key) => {
    const obj1 = obj[key];

    fixTime(obj1);
    fixRelayTp(obj1);
    obj1.fillSpace();
  });
  obj['TimeModulator'].Model = 'TimeModulator';
  return obj;
};
function fixTime(obj) {
  let result = [];
  const keysMatches = Object.keys(obj)
      .filter((key) => Object.keys(timeFixModifiers).includes(key));

  if (keysMatches.length) {
    keysMatches.sort((a, b) => {
      return timeFixModifiers[a] - timeFixModifiers[b];
    });
    keysMatches.forEach((key) => {
      if (Array.isArray(obj[key])) {
        result = result.concat(
            obj[key].map((e) => e * timeFixModifiers[key]),
        );
      } else {
        result.push(obj[key] * timeFixModifiers[key]);
      }
      delete obj[key];
    });
    if (result.length > 1) {
      obj['ConstructionTime'] = result;
    } else {
      obj['ConstructionTime'] = result[0];
    }
  }
}
function fixRelayTp(obj) {
  if (obj.Name === 'ShipmentRelay') {
    Object.keys(obj).forEach((key) => {
      if (key === 'TeleportShipmentsDurationHr') {
        obj[key].forEach((e, i, arr) => {
          arr[i] = e * timeFixModifiers.ConstructionTimeHours;
        });
      }
    });
  }
}
