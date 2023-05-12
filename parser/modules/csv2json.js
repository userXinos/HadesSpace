/**
 * Парсер из таблицы в обект
 * @param  {String} csv Сырая таблица
 * @return {Object}     Результат
 */
export default function csv2json(csv) {
    const obj = {};
    let subName = null;

    const [ headers, ...data ] = csv
        .trim()
        .split(/\r?\n/)
        .filter((s) => s.length)
        .map((s) => s.split(','));

    if (headers.length <= 1) {
        return simpleArray(data);
    }

    data.forEach((string, sIndex) => {
        if (string[0]) {
            if (string[0].startsWith('#')) {
                delete string[0];
            } else {
                splitSeparators(obj, subName);
                subName = string[0].trim();
                obj[subName] = {};
            }
        }

        string.forEach((elem, i) => {
            const header = headers[i];
            const subObj = obj[subName];
            const stockValue = subObj[header];
            const value = fixValue(elem);

            if (typeof value === 'string' && !value) return;
            if (stockValue === undefined || stockValue === '') {
                subObj[header] = value;
            } else if (Array.isArray(stockValue)) {
                if (Array.isArray(value) && !stockValue.some(Array.isArray)) {
                    subObj[header] = [ stockValue, value ];
                } else {
                    stockValue.push(value);
                }
            } else {
                subObj[header] = [ stockValue, value ];
            }
        });

        if (sIndex + 1 === data.length) {
            splitSeparators(obj, subName);
        }
    });

    return removeDupsFromArrays(obj);
}

function fixValue(val) {
    const parsed = parseInt(val, 10);
    if (isNaN(val) || isNaN(parsed)) {
        return val.trim();
    }
    return parsed;
}

/**
 * {key:[1,1,1,1]} => {key:1}
 * @param {Object} obj
 * @return {Object}
 */
export function removeDupsFromArrays(obj) {
    return Object.fromEntries(
        Object.entries(obj).map(([ key, value ]) => [
            key,
            (value.constructor === Object) ? removeDupsFromArrays(value) : fixArray(value),
        ]),
    );

    function fixArray(value) {
        if (Array.isArray(value)) {
            const firstElem = value[0];

            if (value.every((e) => everyCB(e, firstElem))) {
                return firstElem;
            }
        }
        return value;

        function everyCB(elem, match) {
            if (Array.isArray(elem) && Array.isArray(match)) {
                return elem.every((e, i) => everyCB(e, match[i]));
            }
            return elem === match;
        }
    }
}

/**
 * Разделители в массивах
 * @param {Object} obj
 * @param {string} name
 * @param {string} symbol
 */
function splitSeparators(obj, name, symbol = '!') {
    for (const key in obj[name]) {
        if (Object.prototype.hasOwnProperty.call(obj[name], key)) {
            const elem = obj[name][key];

            if (Array.isArray(elem)) {
                obj[name][key] = elem.map((e) => {
                    if (typeof e == 'string' && e.includes(symbol)) {
                        return e.split(symbol).map(fixValue);
                    }
                    return e;
                });
            } else if (typeof elem === 'string' && elem.includes(symbol)) {
                obj[name][key] = elem.split(symbol).map(fixValue);
            }
        }
    }
}

// если не таблица, а просто данные в столбик
function simpleArray(array) {
    return array
        .flat()
        .map(fixValue);
}
