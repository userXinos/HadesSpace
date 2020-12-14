const {parse} = require('node-html-parser');

module.exports = function(html, data, opts) {
  const document = parse(html);
  renderTable(document, data, opts.lang);
  document.querySelector('table').setAttribute('class', 'theme-' + opts.theme);
  return document.toString();
};

function renderTable(document, data, lang) {
  const obj = {
    lvl: Array.from(
        {length: data.maxLevel},
        (_, i) => i + 1,
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
        '<th>' + key + '</th>',
    );
  });

  for (let i = 0; i < obj.maxLevel; i++) {
    let result = '';
    arraysKeys.forEach((k, keyIndex) => {
      const num = bodyData[keyIndex][i].rowspan;
      const value = bodyData[keyIndex][i].value;
      const rowspan = (num) ? `rowspan="${num}" class="rowspaned"` : '';
      if (value != null) {
        result += `<td ${rowspan}>` + bodyData[keyIndex][i].value + '</td>';
      }
    });
    $tbody.insertAdjacentHTML(
        'beforeend',
        '<tr>'+ result + '</tr>',
    );
  }
}

function rowspanMask(rawArray, mergeCells) {
  return rawArray
      .map((item, index, arr) => {
        if (item == arr[index - 1] && mergeCells) {
          item = null;
        }
        return {value: item};
      })
      .map((item, index, arr) => {
        if (item.value === null) {
          let rowspan = 1;
          let lastItemIndex = index;

          while (arr[lastItemIndex].value == null) {
            lastItemIndex--;
            rowspan++;
          }
          arr[lastItemIndex].rowspan = rowspan;
        }
        return item;
      });
}
