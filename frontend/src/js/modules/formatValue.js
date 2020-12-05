'use strict';

import secToStringTime from './secToStringTime';
import stringKeys from '../../../../generateGameData/config/stringKeys';
import {default as data, objectEdition} from '../../../../generateGameData/config/frontend/formatValue';

export default function($t, $te, iconDir, key, value) {
  const fixTime = (...args) => secToStringTime(getStr, ...args);
  const getStr = (key) => {
    if (key in stringKeys) key = stringKeys[key];
    return $t(key);
  };
  const opts = {getStr, fixTime, iconDir};

  if (key === undefined || value === undefined) {
    console.log(`Ошибка в ${key} : ${value}`);
    return;
  }
  if (value.constructor === Object) {
    return objectEdition[0](value, opts);
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i][0].includes(key)) {
      return data[i][1](value, opts);
    }
  }
  return value;
}
