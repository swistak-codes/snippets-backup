// mnożenie macierzy
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

// funkcja tworząca macierz jednostkową
function identity(n) {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => (i === j ? 1 : 0)),
  );
}

// potęgowanie macierzy
function power(matrix, exponent) {
  // A^0 = I
  if (exponent === 0) {
    return identity(matrix.length);
  }
  if (exponent % 2 === 1) {
    // obsługa nieparzystych wykładników
    return multiply(matrix, power(matrix, exponent - 1));
  } else {
    // obsługa parzystych wykładników
    const halfPower = power(matrix, Math.floor(exponent / 2));
    return multiply(halfPower, halfPower);
  }
}

const A = [
  [1, 2],
  [3, 4],
];

const B = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

console.log(power(A, 0));
console.log(power(A, 1));
console.log(power(A, 2));
console.log(power(A, 3));
console.log(power(A, 4));
console.log(power(A, 5));
console.log(power(B, 2));
console.log(power(B, 3));
console.log(power(B, 4));
