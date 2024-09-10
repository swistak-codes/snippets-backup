function transpose(matrix) {
  // pobieramy wymiary macierzy
  const rows = matrix.length;
  const cols = matrix[0].length;
  // tworzymy nową macierz zamieniając ze sobą wymiary
  const result = Array.from({ length: cols }, () =>
    Array(rows).fill(0),
  );
  // iterujemy po wszystkich wartościach, aby przypisać je do nowej macierzy
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[j][i] = matrix[i][j];
    }
  }
  return result;
}

const originalMatrix = [
  [1, 2],
  [3, 4],
  [5, 6],
];
console.log(transpose(originalMatrix));
