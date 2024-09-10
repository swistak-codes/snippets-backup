function det(matrix) {
  // pobieramy stopień macierzy
  const n = matrix.length;
  // kopiujemy macierz wejściową
  const B = matrix.map((row) => [...row]);
  // iterujemy po kolejnych elementach macierzy zgodnie z ideą algorytmu
  for (let k = 0; k < n; k++) {
    for (let i = k + 1; i < n; i++) {
      for (let j = k + 1; j < n; j++) {
        // obliczamy nową wartość elementu i,j
        const dividend = B[i][j] * B[k][k] - B[i][k] * B[k][j];
        const divider = k > 0 ? B[k - 1][k - 1] : 1;
        B[i][j] = dividend / divider;
      }
    }
  }
  // wartość w prawym dolnym rogu macierzy to wyznacznik wejściowej
  return B[n - 1][n - 1];
}

const matrix1 = [[1]];
const matrix2 = [
  [1, 2],
  [3, 4],
];
const matrix3 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];
const matrix4 = [
  [1, 2, 3, 4],
  [2, 2, 3, 4],
  [3, 3, 3, 4],
  [4, 4, 4, 4],
];
console.log(det(matrix1)); // 1
console.log(det(matrix2)); // -2
console.log(det(matrix3)); // 0
console.log(det(matrix4)); // -4
