export default function(rawArray, mergeCells) {
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
