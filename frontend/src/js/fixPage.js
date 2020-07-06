'use strict';

window.onload = function() {
  reSize();
};
function reSize() {
  const gTables = document.querySelectorAll('div.gTable-stats > table');
  const lvlTables = document.querySelectorAll('div.gTable-lvls > table');

  for (let i = 0; i < gTables.length; i++) {
    const gTable = gTables[i];
    const lvlTable = lvlTables[i];

    gTable.style.paddingLeft = lvlTable.rows[0].offsetWidth + 'px'; // сместить таблицу от колонки лвл
    autoMergeByRow(gTables[i].id, 0, 0, -1);
    for (let r = 0; r < gTable.rows.length; r++) {
      const tHeadSize = gTable.rows[r].offsetHeight;

      lvlTable.rows[r].style.height = tHeadSize + 'px';
    }
  }
  console.log('change size');
}
function autoMergeByRow(tableId,
    rowStartIndex, // 0 или 1
    colStart, // 0 или 1
    colEnd, // равно colStart или больше, чем colStart или отрицательное
) {
  const table = $('#' + tableId);

  if (table[0].classList.contains('noFixTable')) return;
  const trArr = table.find('tr');
  for (let rowIndex = rowStartIndex; rowIndex < trArr.length; rowIndex++) {
    const tdArr = $(trArr[rowIndex]).find('td');
    if (colEnd < 0) colEnd = tdArr.length - 1;
    for (let colIndex = colStart; colIndex < tdArr.length && colIndex <= colEnd; colIndex++) {
      let span = 1;
      const theCell = $(tdArr)[colIndex];
      const regex = new RegExp('.*img.*src=".*'); // если картинка,
      if (regex.test(theCell['innerHTML'])) continue; // иначе крашнеться
      if ($(theCell).attr('colspan')) continue;
      let cellBelow = $($(theCell).parent().next().children()[colIndex]);
      while (cellBelow != undefined &&
        $(theCell).text() == $(cellBelow).text()) {
        span++;
        cellBelow.hide();
        cellBelow = $($(cellBelow).parent().next().children()[colIndex]);
      }
      if (span > 1) $(theCell).attr('rowspan', span);
    }
  }
}

(function() {
  let time;
  window.onresize = function() {
    if (time) {
      clearTimeout(time);
    }
    time = setTimeout(() => {
      reSize();
    }, 100);
  };
})();
