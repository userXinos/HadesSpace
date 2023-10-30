import { readFileSync } from 'fs';
import { join } from 'path';

import JsonRaw from './JsonRaw.js';
import csv2json from './csv2json.js';

import CONFIG from '../config.js';


export default class Runner {
    /**
     * @namespace
     * @property {String|null} args.runnerName - name or null of the runner to write to the final file for reporting
     * @property {String} args.originalFile - path to original file
     * @property {Array<String>} args.ignoreFiles - global ignore files
     * @property {String} [args.saveAs] - save as file name
     */
    static config = {
        file: undefined,
        ignoreFiles: [],
        runner: {},
    };

    /**
     * Runner args
     * @namespace
     * @property {Object} args
     * @property {String|null} args.runnerName - name or null of the runner to write to the final file for reporting
     * @property {String} args.originalFile - path to original file
     * @property {String} [args.saveAs] - save as file name
     *
     * @property {Object} raw
     */
    args = {
        metadata: {
            runnerName: null,
            originalFile: null,
            saveAs: null,
        },
        raw: {},
    };

    /**
     * Prettier parser config
     * @namespace
     * @property {Object} prettierConfig
     */
    prettierConfig = {};

    constructor(args) {
        this.args = args;
        this.metadata = this.args.metadata || {};
        this.metadata.runnerName = this.constructor.name;
        this.metadata.usedFiles = [];
    }

    run(rawData) {
        return rawData;
    }

    async render() {
        const raw = this.constructor.parse(this.args.raw);
        const data = await this.run(raw);

        if (Array.isArray(data)) {
            this.prettierConfig.printWidth = 5;
        }
        return this._newJson(data);
    }

    multiReadCsv(names) {
        return names.map(this.readCsv.bind(this));
    }

    /**
     * Загрузить не изменённый ранерами объект
     * @param  {String} fileName  Имя файла, в директории с сырыми данными
     * @return {Object}           Готовый объект
     */
    readCsv(fileName) {
        const path = `${join(CONFIG.pathRaw, fileName)}.csv`;
        const file = readFileSync(path, 'utf8');

        if (!this.metadata.usedFiles.includes(fileName)) {
            this.metadata.usedFiles.push(fileName);
        }

        return csv2json(file);
    }

    _newJson(...args) {
        return new JsonRaw(...args, this.metadata);
    }

    // ===============================
    //              STATIC
    // ===============================

    static parse(s) {
        return csv2json(s);
    }

    /**
     * Глубокое слияние объектов
     * @param  {Object} obj1   Объект 1
     * @param  {Object} obj2   Объект 2
     * @return {Object}        Результат, мутация объекта 1
     */
    static combineObjects(obj1, obj2) {
        Object.keys(obj2).forEach((p) =>{
            try {
                if (obj2[p].constructor === Object) {
                    obj1[p] = Runner.combineObjects(obj1[p], obj2[p]);
                } else {
                    obj1[p] = obj2[p];
                }
            } catch (e) {
                obj1[p] = obj2[p];
            }
        });
        return obj1;
    }

    /**
     * Transposing a 2D-array
     * @param {Array<Array>} matrix
     * @return {Array<Array>}
     */
    static transposeMatrix(matrix) {
        return matrix[0].map((x, i) => matrix.map((x) => x[i]));
    }

    /**
     * Из объекта с маленькими объектами в один общий
     * @param  {Object.<String, Object>} obj  Объект
     * @return {Object}                       Результат
     */
    static compileOne(obj) {
        const res = {};
        const mergedKeys = [];
        let maxIndex = 0;

        for (const e of Object.values(obj)) {
            // noinspection DuplicatedCode
            for (const [ key, value ] of Object.entries(e)) {
                if (key in res) {
                    if (Array.isArray(res[key]) && !Array.isArray(value)) {
                        res[key].push(value);
                        maxIndex = (res[key].length > maxIndex) ? res[key].length - 1 : maxIndex;
                    } else {
                        if (Array.isArray(res[key])) {
                            if (mergedKeys.includes(key)) {
                                res[key] = [ ...res[key], value ];
                            } else {
                                res[key] = [ res[key].filter((e) => e != null), value ];
                                mergedKeys.push(key);
                            }
                        } else {
                            res[key] = [ res[key], value ];
                            mergedKeys.push(key);
                        }

                        if (maxIndex > 0) {
                            while (res[key].length < maxIndex) {
                                res[key].unshift(null);
                            }
                        }
                    }
                } else {
                    res[key] = value;
                }
            }

            Runner.fillSpace(res, null, maxIndex, true);
        }

        return res;
    }

    /**
     * Заполнить пространство для соответствия индексам
     * @param  {Object} obj              Подопытный
     * @param  {*} spaceSymbol           Символ для заполнения "пробелов"
     * @param  {Number} to               Нужный результат размера
     * @param  {Boolean} usePush=false   Метод заполнения, в начало или в конец
     * @return {Object}                  Результат
     */
    static fillSpace(obj, spaceSymbol, to, usePush = false) {
        return Runner.objectArrayify(obj, {
            map: ([ k, v ]) => {
                if (Array.isArray(v)) {
                    while (v.length < to) {
                        (usePush) ? v.push(spaceSymbol) : v.unshift(spaceSymbol);
                    }
                }
                return [ k, v ];
            },
        });
    }

    /**
     * Сгруппировать значения stataMIN[] stataMAX[] в общий массив stata[[]]
     * @param {Object} obj
     */
    static combineMinMax(obj) {
        const keys = Object.keys(obj);

        for (const MinKey of keys) {
            if (MinKey.endsWith('Min') || MinKey.startsWith('Min')) {
                const newKey = MinKey.match(/(Min)?(.+?)_?(Min)?$/)[2]; // eslint-disable-line prefer-destructuring
                const MaxKey = keys.find((e) => e !== MinKey && new RegExp(`(Max)?${newKey}_?(Max)?`).test(e));

                if (MaxKey) {
                    const isArr = Array.isArray(obj[MinKey]);
                    const len = isArr ? obj[MinKey].length : 1;
                    const arr = [];

                    if (isArr !== Array.isArray(obj[MaxKey])) {
                        return;
                    }

                    for (let i = 0; i < len; i++) {
                        const min = isArr ? obj[MinKey][i] : obj[MinKey];
                        const max = isArr ? obj[MaxKey][i] : obj[MaxKey];

                        if (min === max) {
                            arr.push(min);
                        } else {
                            arr.push([ min, max ]);
                        }
                    }

                    obj[newKey] = (arr.length === 1) ? arr.flat() : arr;
                    delete obj[MinKey];
                    delete obj[MaxKey];
                }
            }
        }
    }

    /**
     * Использовать функции массива на объекте
     * @param {Object} obj
     * @param {Object.<String, Function>} callbacks - где key - имя функции из [Array.prototype]
     * @return {Object}
     */
    static objectArrayify(obj, callbacks) {
        let entries = Object.entries(obj);

        for (const key in callbacks) {
            if (Object.prototype.hasOwnProperty.call(callbacks, key)) {
                entries = Array.prototype[key].call(entries, callbacks[key]);
            }
        }

        return Object.fromEntries(entries);
    }
}

export function validRunner(config) {
    if (config) {
        return true;
    }
}
