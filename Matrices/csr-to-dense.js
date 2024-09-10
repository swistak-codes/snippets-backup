function csrToDense(A) {
  // pobieramy liczbę wierszy z długości macierzy indptr
  const rows = A.indptr.length - 1;
  // tworzymy pustą macierz wynikową o tych samych wymiarach co wejściowa
  const result = Array.from({ length: rows }, () => Array(A.cols).fill(0));
  // iterujemy po kolejnych wierszach
  for (let row = 0; row < rows; row++) {
    // na podstawie tablicy indptr wyznaczamy, które dane są w aktualnym wierszu
    for (let i = A.indptr[row]; i < A.indptr[row + 1]; i++) {
      // pobieramy, w której kolumnie znajdzie się aktualna wartość
      const col = A.indices[i];
      // wstawiamy wartość w odpowiednie miejsce
      result[row][col] = A.data[i];
    }
  }
  // zwracamy tablicę dwuwymiarową
  return result;
}

console.log(
  csrToDense({
    data: [1, 10, 2, 11, 5, 3, 12, 6, 4],
    indices: [0, 1, 1, 2, 0, 2, 3, 1, 3],
    indptr: [0, 2, 4, 7, 9],
    cols: 4,
  }).join("\n"),
);

console.log("");

console.log(
  csrToDense({
    data: [1, 2, 3, 4],
    indices: [1, 1, 0, 1],
    indptr: [0, 1, 2, 2, 4],
    cols: 4,
  }).join("\n"),
);
