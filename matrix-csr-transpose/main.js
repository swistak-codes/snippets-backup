function transposeCsrMatrix(A) {
  // liczba wierszy po transpozycji = liczba kolumn aktualnie
  const rows = A.cols;
  // liczba kolumn po transpozycji = liczba wierszy aktualnie
  const cols = A.indptr.length - 1;
  // tworzymy puste tablice formatu CSR, od razu o odpowiednich długościach
  const data = Array(A.data.length).fill(0);
  const indices = Array(cols).fill(0);
  const indptr = Array(rows + 1).fill(0);
  // zaczynamy od stworzenia nowej tablicy indptr
  // zliczamy liczbę elementów w każdej kolumnie macierzy
  for (let i = 0; i < A.indices.length; i++) {
    const col = A.indices[i] + 1;
    indptr[col] = indptr[col] + 1;
  }
  // następnie powiększamy wartości w indptr o liczbę elementów w poprzedniej kolumnie
  for (let i = 0; i < rows; i++) {
    indptr[i + 1] += indptr[i];
  }
  // po ułożeniu indptr możemy przejsć do przepisania odpowiednio wartości
  // tworzymy kopię indptr, aby śledzić sobie aktualne pozycje
  const position = [...indptr];
  // iterujemy po kolejnych wierszach
  for (let row = 0; row < cols; row++) {
    // pobieramy początek i koniec wiersza
    const rowStart = A.indptr[row];
    const rowEnd = A.indptr[row + 1];
    // teraz przechodzimy po wszystkich wartościach niezerowych w wierszu
    for (let i = rowStart; i < rowEnd; i++) {
      // pobieramy indeks kolumny
      const col = A.indices[i];
      // z kopii indptr bierzemy indeks elementu
      const pos = position[col];
      // przepisujemy wartość w odpowiednie miejsce tablicy wynikowej
      data[pos] = A.data[i];
      // to samo robimy z indeksem wiersza
      indices[pos] = row;
      // w kopii indptr zwiększamy indeks dla aktualnej kolumny
      position[col]++;
    }
  }
  // zwracamy macierz w formacie CSR
  return {
    data,
    indices,
    indptr,
    cols,
  };
}

function csrToDense(matrix) {
  const rows = matrix.indptr.length - 1;
  const result = Array.from({ length: rows }, () => Array(matrix.cols).fill(0));
  for (let row = 0; row < rows; row++) {
    for (let i = matrix.indptr[row]; i < matrix.indptr[row + 1]; i++) {
      const col = matrix.indices[i];
      result[row][col] = matrix.data[i];
    }
  }
  return result;
}

const transposed = transposeCsrMatrix({
  data: [1, 2, 3, 4],
  indices: [1, 1, 0, 1],
  indptr: [0, 1, 2, 2, 4],
  cols: 4,
});
const dense = csrToDense(transposed).join("\n");
console.log(transposed);
console.log(dense);
