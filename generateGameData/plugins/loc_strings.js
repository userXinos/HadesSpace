import {existsSync, readFileSync} from 'fs';
import {join} from 'path';
import YAML from 'yaml';
import RawJson from '../modules/RawJson.js';
import * as config from '../config/loc_strings.js';
import stringKeys from '../config/stringKeys.js';

const defaultLang = 'en';
const homePath = join('./plugins/loc_strings/');

export default function(json) {
  const lang = json.metadata.originalFile.replace(/.*\/loc_strings_(.+)\..+$/, '$1');
  const customDesc = getYaml(`${lang}/customDesc`);
  const newJson = new RawJson();

  Object.defineProperty(newJson,
      'metadata', { // скрытый объект от перебора
        configurable: true,
        writable: true,
        value: json.metadata,
      });
  Object.keys(json).forEach((i) => {
    newJson[json[i].key] = (json[i].value) ? json[i].value : ''; // в оригинальных таблицах есть пустые значения
  });
  json.metadata.saveAs = json.metadata.saveAs.replace(/loc_strings_(.+)\.(js)$/, '$1.js');

  return addContent(fixStrings(newJson), customDesc, lang);
};

// исправить регистр строк, убрать лишние
function fixStrings(obj) {
  Object.keys(obj).forEach((key) => {
    if (config.trashStrings.includes(key)) {
      delete obj[key];
      return;
    }
    obj[key] = fixWords(obj[key]);
  });
  return obj;

  // вернуть сточку в нижем регистре, но с заглавной буквой, если такая есть
  function fixWords(rawStr) {
    const firstLetterRaw = rawStr.slice(0, 1); // '«'
    let result = rawStr.toLowerCase();

    result = result.replace(/(«)(\W)/g,
        (math, s, w) => s + w.toUpperCase());
    for (const key of config.upperCaseKeys) {
      const w = obj[key];
      // const regex = /(?<=[\s,.:;"']|^)+w+(?=[\s,.:;"']|$)/gi;
      // \b word \b, а всё потому что regex адекватно не работает с юникодом :/
      const regex = new RegExp(`\(\?\<\=\[\\s\,\.\:\;\"\'\]\|\^\)`+w+`\(\?\=\[\\s\,\.\:\;\"\'\]\|\$\)`, 'gi');

      result = result.replace(regex, w);
    }
    if (firstLetterRaw.toUpperCase() === firstLetterRaw) { // первая буква была заглавной ?
      const firstLetter = result.slice(0, 1);
      result = result.replace(firstLetter, firstLetter.toUpperCase());
    }
    return regexFix(result);

    // убрать лишний хлам
    function regexFix(str) {
      return str
          .replace(/(\s\(?<\w+>).*?(<\/\w+>(\s.{2}\.\))?)/g, '') // BBCode eng/ru "<color>N</color>"/"(<color>N</color> шт.)"
          .replace(/:\s?$/, '')
          .replace(/\s({0\})$/, '')
          .replace(/({\d})(.+?)({\d})(.+?)({\d})/, 'N$2X$4Y')
          .replace(/({\d})(.+?)({\d})/, 'N$2X')
          .replace(/({\d})/, 'N');
    }
  }
}
function addContent(obj, customDesc, lang) {
  addGeneralPart();
  addCustomDesc();
  return obj;

  function addGeneralPart() {
    const defaultLangFile = getYaml(`${defaultLang}/strings`);
    const currentLangFile = getYaml(`${lang}/strings`);
    const starHeaders = JSON.parse(readFileSync('./config/stringsStarHeaders.json', 'utf-8'));

    compareStrings(currentLangFile, defaultLangFile, true); // добавить ключи из доп файла которых нету в defaultLangFile
    compareStrings(defaultLangFile, currentLangFile);

    Object.keys(starHeaders).forEach((k) => {
      starHeaders[k].forEach((star) => {
        const starKey = star.replace(/_?(\w\w)/, '$1');
        const key = (k in stringKeys) ? stringKeys[k] : k;

        obj[k + star] = `${obj[key]} (${obj[starKey]})`;
      });
    });
    return obj;

    function compareStrings(one, two, info = false) {
      Object.keys(one).forEach((key) => {
        if (key in two) {
          obj[key] = two[key];
        } else {
          if (info) console.log(`добавлен доп ключ: ${key} | язык: ${lang}`);
          obj[key] = one[key];
        }
      });
    }
  }
  function addCustomDesc() {
    if (!customDesc) return;

    Object.keys(customDesc).forEach((key) => {
      obj[key+'_customDesc'] = customDesc[key];
    });
  }
}
function getYaml(pathFile) {
  pathFile = join(homePath, pathFile) + '.yaml';

  if (!existsSync(pathFile)) return null;
  return YAML.parse(readFileSync(pathFile, 'utf8'));
}
