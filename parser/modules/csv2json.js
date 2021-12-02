/**
 * Парсер из таблицы в обект
 * @param  {String} csv Сырая таблица
 * @return {Object}     Результат
 */
export default function csv2json(csv) {
    let subName = null;
    const obj = {};
    const [ headers, ...data ] = csv
        .trim()
        .split(/\r?\n/)
        .filter(({ length }) => length)
        .map((s) => s.split(','));

    if (headers.length <= 1) {
        return simpleArray(data);
    }
    data.forEach((string) => {
        if (string[0]) {
            subName = string[0].trim();
            obj[subName] = {};
        }
        string.forEach((elem, i) => {
            const header = headers[i];
            const subObj = obj[subName];
            const stockValue = subObj[header];
            const value = fixValue(elem);

            if (value.constructor === String && !value) return;
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
    });
    return removeDupsFromArrays(obj);
}

function fixValue(val) {
    const parsed = parseInt(val, 10);
    if (isNaN(val) || isNaN(parsed)) {
        if (val.includes('!')) {
            return val.split('!').map(fixValue);
        }
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
            (((value.constructor === Object) ? removeDupsFromArrays(value) :
                ((Array.isArray(value) && value.every((v) => v === value[0]))) ? value[0] : value)),
        ]),
    );
}

// если не таблица, а просто данные в столбик
function simpleArray(array) {
    return array
        .flat()
        .map(fixValue);
}
