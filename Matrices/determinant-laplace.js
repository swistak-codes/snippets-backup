function det(matrix) {
  // pobieramy stopień macierzy
  const n = matrix.length;
  // wyznacznik macierzy 1-stopnia to jej jedyna wartość
  if (n === 1) {
    return matrix[0][0];
  }
  // tworzymy zmienną w której będziemy trzymać wartość wyznacznika
  let result = 0;
  // iterujemy po kolumnach macierzy
  for (let i = 0; i < n; i++) {
    // tworzymy nową macierz
    const subMatrix = matrix
      // odcinając pierwszy (0) wiersz, stąd "slice" zwróci tablicę od 1 do końca
      .slice(1)
      // dla pozostałych wierszy odcinamy i-tą kolumnę
      .map((row) => row.filter((_, j) => j !== i));
    // obliczamy wartość na podstawie wzoru, wywołując funkcję rekurencyjnie
    result += matrix[0][i] * det(subMatrix) * (i % 2 === 0 ? 1 : -1);
  }
  // zwracamy obliczony wyznacznik
  return result;
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
