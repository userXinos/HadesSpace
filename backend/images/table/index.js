const {parse} = require('node-html-parser');

module.exports = function(html, data) {
  const document = parse(html);
  renderTable(document, data);
  return document.toString();
};

function renderTable(document, obj) {
  const arraysKeys = Object.keys(obj).filter((k) => Array.isArray(obj[k]));
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
    arraysKeys.forEach((key) => {
      result += '<td>' + obj[key][i] + '</td>';
    });
    $tbody.insertAdjacentHTML(
        'beforeend',
        '<tr>'+ result + '</tr>',
    );
  }
}

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
