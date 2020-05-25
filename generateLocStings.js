"use strict";
const fs = require("fs");

const langs = ['en', 'ru', 'es', 'fr', 'it', 'jp', 'ko', 'pt', 'de', 'zh-si'];
const path = './rawData/loc_strings/'
const pathSave = './data/'

generateFiles(path, langs, pathSave)
generateFiles(path, langs, './dist/') // сборшик чёт не может сам
generateFiles(path, langs, './docs/')

function generateFiles(pathCsvs, langs, pathSave) {
  for (let lang of langs) {
    let json = loadStrings(lang)
    let file = `${pathSave}${lang}Strings.json`
    saveToFile(file, json)
  }
}
function saveToFile(file, json) {
  fs.writeFileSync(file, JSON.stringify(json, null, 2))
  console.log(`Файл ${file} создан`)
}
// парсер в обектJS
function loadStrings(lang) {
  let result = {}
  let strings = fs.readFileSync(`${path}loc_strings_${lang}.txt`, "utf8").split('\n')

  for (let i = 0; i < strings.length; i++) {
    let string = strings[i];
    if (string == "") continue
    string = string.match(/"(?<key>.+?)","(?<value>.+?)"/).groups;
    if (!isTrash(string.key)) {
      if (['TID_MODULE_EMP', 'AU'].includes(string.key)) {
        result[string.key] = string.value; // они нужны с "капсом"
      } else {
        result[string.key] = fixWorlds(string.value);
      }
    }
  }
  return addStrings(result, lang);
}
function addStrings(obj, lang) {
  let jsonStrings = require(`${path}modification/addStringsFile.js`, "utf8").default
  let defaultLang = require(`${path}modification/addStringsFile.js`, "utf8").default.en
  obj = combineObjects(obj, jsonStrings[lang])
  let addStringsToJson = {
    TID_MODULE_EFFECT_DURATION_DESCR: [
      'EffectDurationx10WS',
      'EffectDurationx10BS'
    ],
    TID_MODULE_EFFECT_RANGE_DESCR: [
      'EffectRadiusWS',
      'EffectRadiusBS'
    ],
    TID_MODULE_AOE_STAT: [
      'AOEDamage_WS',
      'AOEDamage_BS',
    ],
    TID_MODULE_ACTIVATION_PREP_TIME: [
      'ActivationPrepWS',
      'ActivationPrepBS'
    ],
    TID_DRONE_LIFETIME: [
      'SpawnLifetime_WS'
    ],
    TID_MODULE_COOLDOWN_STAT: [
      'ActivationDelayWS',
      'ActivationDelayBS'
    ],
    TID_MODULE_DESCR_MAX_DPS_TIME: [
      'MaxDPSTimeWS',
      'MaxDPSTime_BS',
    ],
    TID_DISPATCH_PREP_TIME: [
      'APTPIOTTPWS'
    ],
    DisableTime: [
      'DisableTimeWS'
    ],
    BarrageMaxAdditionalEnemies: [
      'BarrageMaxAdditionalEnemiesWS'
    ],
    TID_MODULE_TRIGGER_TIME: [
      'ProximityTriggerSecWS'
    ],
    TID_MODULE_SALVAGE_HULL_DESCR: [
      'SalvageHullPercentWS',
      'SalvageHullPercentBS'
    ]
  }
  let result = {};
  let keys = Object.keys(addStringsToJson)

  for (let key of keys) {
    let items = addStringsToJson[key]
    for (let i of items) {
      let startVal = obj[key] || defaultLang[key]
      let endVal = obj[i.slice(-2)]

      result[i] = `${startVal} (${endVal})`
    }
  }
  return combineObjects(obj, result);
}
// хлам
function isTrash(key) {
  let trash = JSON.parse(fs.readFileSync(`${path}modification/trashStrings.json`, "utf8"));
  return trash.includes(key)
}
// вернуть сточку в нижем регистре, но с заглавной буквой, если такая есть
function fixWorlds(rawStr) {
  let firstLetterRaw = rawStr.slice(0, 1); // '«'
  let lower = rawStr.toLowerCase();
  let firstLetter = lower.slice(0, 1)

  lower = lower.replace(/(«)(\W)/g,
    (math, symb, w) => symb + w.toUpperCase())
  if (firstLetterRaw.toUpperCase() == firstLetterRaw) { // первая буква была заглавной ?
    let result = lower.replace(firstLetter, firstLetter.toUpperCase());
    return regexFix(result);
  }
  return lower;
  // TODO рефакторинг 2
  function regexFix(str) {
    str = str.replace(/\s<color>\{0\}<\/color>|\s\(<color>\{0\}<\/color> шт\.\)/, '')
    str = str.replace(/:\s?$/, '')
    str = str.replace(/\s(\{0\})$/, '')
    if (/\{0\}.+?\{1\}.+?\{2\}/.test(str)) {
      str = str.replace(/(\{0\})(.*)(\{1\})(.+?)(\{2\})/, 'N$2X$4Y')
    }
    if (/\{0\}.+?\{1\}/.test(str)) {
      str = str.replace(/(\{0\})(.*)(\{1\})/, 'N$2X')
    }
    if (/\{\d\}/.test(str)) {
      str = str.replace(/(\{0\})/, 'N')
    }
    return str
  }
}
function combineObjects(obj1, obj2) {
  for (var p in obj2) {
    try {
      if (obj2[p].constructor == Object) {
        obj1[p] = combineObjects(obj1[p], obj2[p]);
      } else {
        obj1[p] = obj2[p];
      }
    } catch (e) {
      obj1[p] = obj2[p];
    }
  }
  return obj1;
}