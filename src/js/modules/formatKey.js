'use strict';

import stringKeys from '../../../../generateGameData/config/stringKeys.js';
import {default as data} from '../../../../generateGameData/config/frontend/formatKey.js';

export default function($t, tableName, value) {
  const getStr = (key) => {
    if (key in stringKeys) key = stringKeys[key];
    return $t(key);
  };
  const opts = {getStr};

  for (let i = 0; i < data.length; i++) {
    if (data[i][0].includes(tableName)) {
      return data[i][1](value, opts);
    }
  }
  return getStr(value);
}
