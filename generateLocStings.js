'use strict';
const fs = require('fs');
const YAML = require('yaml');

const defaultLang = 'en';
const path = './rawData/loc_strings/';
const pathSave = './data/loc_strings/';
const langs = fs.readdirSync(path)
    .filter((e) => (e.endsWith('.txt')))
    .map((e) => e.replace(/loc_strings_(.*)\.txt/, '$1'));

for (const lang of langs) {
  const trashStrings = getYaml('trashStrings').file;
  const upperCaseKeys = getYaml('upperCaseKeys').file;
  const customDesc = getYaml(`add content/${lang}/customDesc`);
  const json =
      addContent(
          fixStrings(
              parseStrings(
                  fs.readFileSync(`${path}loc_strings_${lang}.txt`, 'utf8'),
              ),
          ));
  saveToFile(`${pathSave}${lang}.json`, json);

  // исправить регистр строк, убрать лишние
  function fixStrings(obj) {
    for (const key in obj) {
      if (trashStrings.includes(key)) {
        delete obj[key];
        continue;
      }
      obj[key] = fixWords(obj[key]);
    }
    return obj;
    // вернуть сточку в нижем регистре, но с заглавной буквой, если такая есть
    function fixWords(rawStr) {
      const firstLetterRaw = rawStr.slice(0, 1); // '«'
      let result = rawStr.toLowerCase();

      result = result.replace(/(«)(\W)/g,
          (math, symb, w) => symb + w.toUpperCase());
      for (const key of upperCaseKeys) {
        const w = obj[key];
        // const regex = /(?<=[\s,.:;"']|^)+w+(?=[\s,.:;"']|$)/gi;
        // \b word \b, а всё потому что regex адекватно не работает с юникодом :/
        const regex = new RegExp(`\(\?\<\=\[\\s\,\.\:\;\"\'\]\|\^\)`+w+`\(\?\=\[\\s\,\.\:\;\"\'\]\|\$\)`, 'gi');

        result = result.replace(regex, w);
      }
      if (firstLetterRaw.toUpperCase() == firstLetterRaw) { // первая буква была заглавной ?
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
  function addContent(obj) {
    part1();
    part2();
    return obj;

    function part1() {
      const defaultLangFile = getYaml(`add content/${defaultLang}/strings`).file;
      const currentLangFile = getYaml(`add content/${lang}/strings`).file;
      const starStrings = getYaml('starStrings').file;

      compareStrings(currentLangFile, defaultLangFile, true); // добавить ключи из доп файла которых нету в defaultLangFile
      compareStrings(defaultLangFile, currentLangFile);

      Object.keys(starStrings).forEach((key) => {
        const items = starStrings[key];

        for (const i of items) {
          const startVal = obj[key];
          const endVal = obj[i.slice(-2)];

          obj[i] = `${startVal} (${endVal})`;
        }
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
    function part2() {
      if (customDesc.replaced) return;
      const file = customDesc.file;

      if (!file) return;
      Object.keys(file).forEach((key) => {
        obj[key+'_customDesc'] = file[key];
      });
    }
  }
  function getYaml(pathFile) {
    let replaced = false;

    if (!fs.existsSync(`${path}modification/${pathFile}.yaml`)) {
      const oldPath = pathFile;
      replaced = true;

      pathFile = pathFile.replace(new RegExp(lang), defaultLang);
      console.log(`Файл "${path}modification/${oldPath}.yaml" не найден, заменён на ${path}modification/${pathFile}.yaml`);
    }
    return {
      file: YAML.parse(
          fs.readFileSync(`${path}modification/${pathFile}.yaml`, 'utf8'),
      ),
      replaced,
    };
  }
}
// парсер в обектJS
function parseStrings(txt) {
  const strings = txt.split('\n');
  const result = {};

  strings.forEach((string) => {
    if (string == '') return;
    string = string.match(/"(?<key>.+?)","(?<value>.+?)"/).groups;
    result[string.key] = string.value;
  });
  return result;
}
function saveToFile(file, json) {
  fs.writeFile(
      file,
      JSON.stringify(json, null, 2),
      () => console.log(`Файл ${file} создан`),
  );
}
