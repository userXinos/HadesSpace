import {join, relative} from 'path';
import {readFileSync, readdirSync} from 'fs';
import csvToJson from './csvToJson.js';

const pathSave = join('./data');
const pathCSVs = join('./rawData');
const pluginsPath = join('./plugins');

const plugins = readdirSync(pluginsPath)
    .filter((e) => e.endsWith('.js'))
    .map((e) => e.replace(/(.*)\..+/, '$1'));

/**
 * Загруженный файл обработать плагинами, если такие есть
 * @param  {String} fileName  Имя оригинального файла
 * @param  {String} data      Сырые данные
 * @return {Promise<Object>}  Готовый объект
 * @async
 */
export default async function loadFile(fileName, data) {
  const headers = (fileName.includes('loc_strings_')) ? ['key', 'value'] : undefined; // TODO избавиться от харкода
  let json = csvToJson(data, headers);
  let pluginName = fileName.replace(/.*\/(.+)\.csv/, '$1');
  pluginName = plugins.find(((e) => pluginName.includes(e)));

  Object.defineProperty(json,
      'metadata', { // скрытый объект от перебора
        configurable: true,
        writable: true,
        value: {
          originalFile: fileName,
          saveAs: join(
              pathSave,
              relative(pathCSVs, fileName).replace(/csv$/, 'js'),
          ),
          pluginName: null,
        },
      });

  if (pluginName) {
    json = await import('../' + pluginsPath + '/' + pluginName + '.js')
        .then((plugin) => plugin.default(json))
        .then((json) => {
          json.metadata.pluginName = pluginName;
          return json;
        })
        .catch((err) => {
          throw err;
        });
  }
  return json;
}
/**
 * Загрузить не изменённый плагинами объект
 * @param  {String} file  Имя файла, в директории с сырыми данными
 * @return {Object}       Готовый объект
 */
export function readCsv(file) {
  const pathCsv = join(pathCSVs, '/', file) + '.csv';
  return csvToJson(readFileSync(pathCsv, 'utf8'));
}
