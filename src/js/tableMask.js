export default function({ head, body }) {
    const newHead = [[]];
    const newBody = [];

    Object.entries(head)
        .sort((_, [b]) => (b === 'default') ? 1 : -1)
        .forEach(([category, keys]) => {
            headMask(category, keys, newHead);
            bodyMask(category, keys, body[category], newBody);
        });

    return {
        head: newHead,
        body: newBody,
    };
}

function headMask(category, keys, out) {
    if (category === 'default') {
        out[0].push(...keys.map((e) => ({
            value: e,
            rowspan: keys.length,
        })));
    } else {
        out[1] = [];

        out[0].push({
            value: category,
            colspan: keys.length,
        });
        out[1].push(...keys
            .map((value) => ({ value })),
        );
    }
}

function bodyMask(category, keys, srcBody, out) {
    srcBody = rotateMatrix(srcBody);
    const hideByRow = [];
    // const colZero = [];

    if (category === 'default') {
        out.push(...srcBody.map(runRow));
    } else {
        if (!out.length) {
            out.push(...srcBody.map(runRow));
            return;
        }
        out.forEach((_, index) => {
            out[index].push(...runRow(srcBody[index], index, out));
        });
    }


    function rotateMatrix(matrix) {
        return matrix[0]
            .map((value, column) => matrix
                .map((row) => row[column]),
            );
    }

    function runRow(e, rowIndex, arr) {
        return e.map((value, elemIndex) => {
            const hideByR = hideByRow.includes(`${rowIndex}>${elemIndex}`);
            // const hideByC = colZero.includes(`${rowIndex}>${elemIndex}`);
            let rowspan = 1;
            const colspan = 1;

            if (!hideByR) {
                let r = rowIndex + 1;
                while (r < arr.length && value === arr[r][elemIndex]) {
                    hideByRow.push(`${r}>${elemIndex}`);
                    rowspan++;
                    r++;
                }
            }

            // // TODO фикс багованая рень
            // // сделать скрытие сложнее прямоугольника (2 точки) по типу буквы P (3 точки)

            // if (!hideByC) {
            //     let c = elemIndex + 1;
            //     while (c < arr[rowIndex].length && value === arr[rowIndex][c]) {
            //         colZero.push(`${rowIndex}>${c}`);
            //         colspan++;
            //         c++;
            //     }
            // }

            return {
                key: keys[elemIndex],
                value,
                rowspan,
                colspan,
                hide: hideByR,
            };
        });
    }
}
