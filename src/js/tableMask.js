export default function({ head, body }) {
    const newHead = [[]];
    const newBody = [];

    Object.entries(head)
        .forEach(([key, value]) => {
            headMask([key, value], newHead);
            bodyMask([key, body[key]], newBody);
        });

    return {
        head: newHead,
        body: rotateMatrix(newBody),
    };
}

function headMask([key, value], head) {
    if (key === 'default') {
        head[0].push(...value.map((e) => ({
            value: e,
            rowspan: value.length,
        })));
    } else {
        head[1] = [];

        head[0].push({
            value: key,
            colspan: value.length,
        });
        head[1].push(...value
            .map((value) => ({ value })),
        );
    }
}

// TODO рефакторинг без rotateMatrix и ключами hide
function bodyMask([key, value], body) {
    body.push(...value.map((e) => (
        e.map((value, index, arr) => {
            let rowspan = 1;
            let i = index + 1;

            while (value && arr[i] === value) {
                arr[i] = undefined;
                rowspan++;
                i++;
            }

            return {
                key,
                value,
                rowspan,
            };
        })
    )));
}
function rotateMatrix(matrix) {
    return matrix[0]
        .map((value, column) => matrix
            .map((row) => ({
                value: row[column]?.value,
                key: row[column]?.key,
                rowspan: row[column]?.rowspan,
            })),
        );
}
