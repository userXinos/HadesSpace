const {JSDOM} = require('jsdom');

module.exports = function(html, data) {
  const {document} = (new JSDOM(html)).window;
  renderTable(document, data);
  return document.documentElement.outerHTML;
};

function renderTable(document, obj) {
  const arraysKeys = Object.keys(obj).filter((k) => Array.isArray(obj[k]));

  const $table = document.querySelector('table');
  const $thead = $table.querySelector('thead');
  const $tbody = $table.querySelector('tbody');

  arraysKeys.forEach((key) => {
    const elem = document.createElement('th');
    elem.append(key);

    $thead.querySelector('tr').append(elem);
  });

  for (let i = 0; i < obj.maxLevel; i++) {
    const row = document.createElement('tr');
    arraysKeys.forEach((key) => {
      const elem = document.createElement('th');
      elem.append(obj[key][i]);
      row.append(elem);
    });
    $tbody.append(row);
  }
};

// function rowspanMask(rawArray, mergeCells) {
//   return rawArray
//       .map((item, index, arr) => {
//         if (item == arr[index - 1] && mergeCells) {
//           item = null;
//         }
//         return {value: item};
//       })
//       .map((item, index, arr) => {
//         if (item.value === null) {
//           let rowspan = 1;
//           let lastItemIndex = index;

//           while (arr[lastItemIndex].value == null) {
//             lastItemIndex--;
//             rowspan++;
//           }
//           arr[lastItemIndex].rowspan = rowspan;
//         }
//         return item;
//       });
// }
