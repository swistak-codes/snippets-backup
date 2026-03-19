function multiply(A, B) {
  // pobierzmy potrzebne wymiary z obu macierzy
  const rowsA = A.length;
  const colsA = A[0].length;
  const colsB = B[0].length;
  // tworzymy nową macierz o odpowiednich wymiarach
  const result = Array.from({ length: rowsA }, () => Array(colsB).fill(0));
  // w pętli mnożymy elementy z oryginalnych macierzy
  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      for (let k = 0; k < colsA; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return result;
}

const A = [
  [1, 2, 3],
  [4, 5, 6],
];

const B = [
  [6, 1],
  [4, 3],
  [2, 5],
];

console.log(multiply(A, B));
