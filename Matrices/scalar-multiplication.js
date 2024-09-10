function multiplyByScalar(matrix, scalar) {
  // pobierzmy wymiary macierzy
  const rows = matrix.length;
  const cols = matrix[0].length;
  // tworzymy nową macierz o tych samych wymiarach
  const result = Array.from({ length: rows }, () => Array(cols).fill(0));
  // w pętli mnożymy każdy element przez skalar
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[i][j] = matrix[i][j] * scalar;
    }
  }
  return result;
}

const A = [
  [1, 2],
  [3, 4],
  [5, 6],
];

console.log(multiplyByScalar(A, 2));
