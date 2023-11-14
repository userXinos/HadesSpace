
export type Raw = {
    head: Record<string, string[]>,
    body: Record<string, unknown[][]>
}
export type Out = {
    head: {value: string, rowspan?: number, colspan?: number}[][],
    body: {key: string, value: unknown, rowspan?: number, colspan?: number, hide: boolean}[][]
}

export default function({ head, body }: Raw, mergeCells: boolean) {
    const newHead: Out['head'] = [[]];
    const newBody: Out['body'] = [];

    Object.entries(head)
        .sort((_, [b]: [string, string[]]) => (b === 'default') ? 1 : -1)
        .forEach(([category, keys], i, array) => {
            headMask(category, keys, array.length - i, newHead);
            bodyMask(category, keys, body[category], mergeCells, newBody);
        });

    return {
        head: newHead,
        body: newBody,
    };
}

function headMask(category: string, keys: string[], depp: number, out: Out['head']) {
    if (category === 'default') {
        out[0].push(
            ...keys
                .map((e, index) => {
                    let colspan = 1;
                    let i = index + 1;

                    if (e.startsWith('_')) {
                        return null as unknown as Out['head'][0][0];
                    }

                    while (keys[i]?.startsWith('_')) {
                        colspan++;
                        i++;
                    }

                    return {
                        value: e,
                        rowspan: depp,
                        colspan,
                    };
                })
                .filter(Boolean),
        );
    } else {
        if (!out[1]) {
            out[1] = [];
        }

        out[0].push({
            value: category,
            colspan: keys.length,
        });
        out[1].push(...keys
            .map((value) => ({ value })),
        );
    }
}

function bodyMask(category: string, keys: string[], srcBody: unknown[][], mergeCells: boolean, out: Out['body']) {
    srcBody = rotateMatrix(srcBody as [][]);
    const hideByRow: string[] = [];
    // const colZero = [];

    if (category === 'default') {
        out.push(...srcBody.map(runRow));
    } else {
        if (!out.length) {
            out.push(...srcBody.map(runRow));
            return;
        }
        out.forEach((_: unknown, index: number) => {
            out[index].push(...runRow(srcBody[index], index, out));
        });
    }


    function rotateMatrix(matrix: [][]) {
        return matrix[0]
            .map((value, column) => matrix
                .map((row) => row[column]),
            );
    }

    function runRow(e: unknown[], rowIndex: number, arr: unknown[][]) {
        if (!e) {
            return [];
        }
        return e.map((value, elemIndex) => {
            const hideByR = hideByRow.includes(`${rowIndex}>${elemIndex}`);
            // const hideByC = colZero.includes(`${rowIndex}>${elemIndex}`);
            let rowspan = 1;
            const colspan = 1;

            if (!hideByR && mergeCells) {
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
