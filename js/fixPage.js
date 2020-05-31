"use strict";

window.onload = function () {
  reSize()
}
function reSize() {
  let gTables = document.querySelectorAll('div.gTable-stats > table');
  let lvlTables = document.querySelectorAll('div.gTable-lvls > table');

  for (let i = 0; i < gTables.length; i++) {
    let gTable = gTables[i];
    let lvlTable = lvlTables[i];

    gTable.style.paddingLeft = lvlTable.rows[0].offsetWidth + 'px' // сместить таблицу от колонки лвл
    autoMergeByRow(gTables[i].id, 0, 0, -1);
    for (let r = 0; r < gTable.rows.length; r++) {
      let tHeadSize = gTable.rows[r].offsetHeight;

      lvlTable.rows[r].style.height = tHeadSize + 'px';
    }
  };
  console.log('change size')
};
function autoMergeByRow(tableId,
  rowStartIndex,	// 0 или 1
  colStart,		// 0 или 1
  colEnd,		// равно colStart или больше, чем colStart или отрицательное
) {
  if ($('#' + tableId)[0].classList.contains('noFixTable')) return
  var trArr = $('#' + tableId).find('tr');
  for (var rowIndex = rowStartIndex; rowIndex < trArr.length; rowIndex++) {
    var tdArr = $(trArr[rowIndex]).find('td');
    if (colEnd < 0) colEnd = tdArr.length - 1;
    for (var colIndex = colStart; colIndex < tdArr.length && colIndex <= colEnd; colIndex++) {
      var span = 1;
      var theCell = $(tdArr)[colIndex];
      let regex = new RegExp('.*img.*src=".*'); // если картинка,
      if (regex.test(theCell['innerHTML'])) continue  // иначе крашнеться
      if ($(theCell).attr('colspan')) continue
      var cellBelow = $($(theCell).parent().next().children()[colIndex]);
      while (cellBelow != undefined
        && $(theCell).text() == $(cellBelow).text()) {
        span++;
        cellBelow.hide();
        cellBelow = $($(cellBelow).parent().next().children()[colIndex]);
      }
      if (span > 1) $(theCell).attr('rowspan', span);
    }
  }
}

(function () {
  let time;
  window.onresize = function () {
    if (time)
      clearTimeout(time);
    time = setTimeout(() => {
      reSize();
    }, 100);
  }
})();