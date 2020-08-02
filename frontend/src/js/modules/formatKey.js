'use strict';

import stringKeys from '../stringKeys';

export default function($t, tableName, value) {
  const funcs = {
    tedrs: (v) => `${$t('lvl')} ${v++}`,
    orbsCristals: (v) => `${$t('lvl')} ${v}`,
    wsTicks: (v) => {
      if (/Score/.test(v)) {
        return (
          $t('ScoreNThresholds') + ' ' + v.replace(/Score(\d).*/, '$1')
        );
      } else {
        return $t(v);
      }
    },
  };
  const type = getType(tableName);
  if (type) {
    return funcs[type](value);
  } else {
    if (value in stringKeys) {
      value = stringKeys[value];
    }
    return $t(value);
  }
}

function getType(tableName) {
  const data = {
    tedrs: ['blueprintsSupport'],
    orbsCristals: ['blueprintsCombat', 'blueprintsUtility'],
    wsTicks: ['WhiteStar'],
  };
  for (const key in data) {
    if (data[key].includes(tableName)) {
      return key;
    }
  }
  return null;
}
