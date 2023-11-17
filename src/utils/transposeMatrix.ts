export default function(matrix: unknown[][]) {
    return matrix[0].map((x, i) => matrix.map((x) => x[i]));
}
