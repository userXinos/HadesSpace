'use strict';

import stringKeys from '../stringKeys';

// загрузить описание
export function genDescr($t, $te, objName, TID, key) {
  if (TID == undefined || Array.isArray(TID)) return;
  let result = fixDesc($t(TID));
  const customDesc = getCustomDesc($t, $te, key ? key : objName);

  if (customDesc) {
    result += '<br/><br/>' + customDesc;
  }
  return result;

  // исправить написание с новой строки (\n)
  function fixDesc(descRaw) {
    return descRaw.replace(
        /(\\n\\n)(.)|(\\n)(.)/g,
        (str, n, firstLetter) => '<br/>' + firstLetter.toUpperCase(),
    );
  }
  // custom Desc
  function getCustomDesc($t, $te, key) {
    if ($te(key + '_customDesc')) {
      return $t(key + '_customDesc');
    }
    return null;
  }
}
export function getTextInfoStats($t, $te, key) {
  const result = genDescr($t, $te, null, getDescrKey(key));

  // console.log(window.location);
  return result ? result : null;

  // const url = `${location.protocol}//${location.hostname}/` +
  //         `${popUpResources[key].page.toLowerCase()}.html#${popUpResources[key].module}`;
  // result += '<br/><br/>' +
  //         `<a href="${url}" target="_blank">${$t('open')} ${$t('typeMod' + popUpResources[key].page).toLowerCase()}</a>`;

  function getDescrKey(key, loop2 = false) {
    const ends = ['_DESCR', '_INFO'];
    for (const i of ends) {
      const newKey = (loop2 ? key : stringKeys[key]) + i;
      if ($te(newKey)) {
        return newKey;
      }
    }
    return loop2 ? null : getDescrKey(key, true);
  }
}
