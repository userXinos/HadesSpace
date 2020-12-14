import pkg from 'node-html-parser';
import formatValue from '../../../frontend/src/js/modules/formatValue.js';
import formatKey from '../../../frontend/src/js/modules/formatKey.js';
import rowspanMask from '../../../frontend/src/js/modules/rowspanMask.js';
const {parse} = pkg;

export default function(html, data, opts) {
  const document = parse(html);
  const t = (key) => data.locStrings[key];

  renderTable(document, data.raw, t);
  document.querySelector('table').setAttribute('class', 'theme-' + opts.theme);
  document.querySelector('body').setAttribute('class', tableSize(data.tableName));
  return document.toString();
};

function renderTable(document, data, t) {
  const obj = {
    lvl: Array.from(
        {length: data.maxLevel},
        (e, i) => i + 1,
    ),
    ...data,
  };
  const arraysKeys = Object.keys(obj).filter((k) => Array.isArray(obj[k]));
  const bodyData = arraysKeys.map((e) => rowspanMask(obj[e], true));
  const $thead = document.querySelector('thead');
  const $tbody = document.querySelector('tbody');

  arraysKeys.forEach((key) => {
    $thead.querySelector('tr').insertAdjacentHTML(
        'beforeend',
        '<th>' + formatKey(t, data.tableName, key) + '</th>',
    );
  });

  for (let i = 0; i < obj.maxLevel; i++) {
    let result = '';
    arraysKeys.forEach((k, keyIndex) => {
      const num = bodyData[keyIndex][i].rowspan || 0;
      let value = bodyData[keyIndex][i].value;
      const rowspan = (num) ? `rowspan="${num}" class="rowspaned"` : '';
      if (value != null) {
        value = formatValue(t, null, null, k, bodyData[keyIndex][i].value);
        result += `<td ${rowspan}>` + value + '</td>';
      }
    });
    $tbody.insertAdjacentHTML(
        'beforeend',
        '<tr>'+ result + '</tr>',
    );
  }
}
function tableSize(name) {
  const data = {
    long: ['yellowstarTable', 'RedStar'],
    short: ['EMPRocket', 'FlagshipDartBarrage', 'FlagshipAreaShield', 'ColonizationPlanets'],
  };
  const search = Object.keys(data).filter((key) => data[key].includes(name));
  return search.pop() || 'default';
}
