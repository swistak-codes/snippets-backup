function multiplyCsrMatrices(A, B) {
  // zakładamy, że obie macierze możemy do siebie dodać
  // tworzymy puste tablice formatu CSR
  const data = [];
  const indices = [];
  // pierwsza wartość w indptr zawsze będzie wynosić 0
  const indptr = [0];
  // dla prostszego odczytu kolumn transponujemy macierz B
  const BT = transposeCsrMatrix(B);
  // iterujemy po kolejnych wierszach macierzy A
  for (let rowA = 0; rowA < A.indptr.length - 1; rowA++) {
    // pobieramy zakres indeksów wiersza
    const rowAStart = A.indptr[rowA];
    const rowAEnd = A.indptr[rowA + 1];
    // zmienne do których odłożymy wartości i kolumny do których należą
    const rowValues = [];
    const rowIndices = [];
    // iterujemy po kolejnych wartościach wiersza
    for (let i = rowAStart; i < rowAEnd; i++) {
      // pobieramy aktualną kolumnę i wartość
      const colA = A.indices[i];
      const valA = A.data[i];
      // pobieramy odpowiadającą kolumnę macierzy B (wiersz transponowanej)
      const rowBStart = BT.indptr[colA];
      const rowBEnd = BT.indptr[colA + 1];
      // teraz iterujemy po kolejnych wartościach kolumny z macierzy B
      for (let j = rowBStart; j < rowBEnd; j++) {
        // pobieramy wartość i wiersz/kolumnę do której należy
        const colB = BT.indices[j];
        const valB = BT.data[j];
        // szukamy, czy dla danego wiersza/kolumny z macierzy B już liczyliśmy wartość
        const indexInRow = rowIndices.indexOf(colB);
        if (indexInRow === -1) {
          // jeśli nie (indeks -1), to wstawiamy indeks
          rowIndices.push(colB);
          // oraz iloczyn wartości z A i B
          rowValues.push(valA * valB);
        } else {
          // jeśli już liczyliśmy, to dodajemy do aktualnej wartości iloczyn
          rowValues[indexInRow] += valA * valB;
        }
      }
    }
    // teraz wyciągamy wszystkie niezerowe wartości jakie obliczyliśmy i wstawiamy je do wyniku
    for (let k = 0; k < rowValues.length; k++) {
      if (rowValues[k] !== 0) {
        indices.push(rowIndices[k]);
        data.push(rowValues[k]);
      }
    }
    // do indptr, tak jak wcześniej, wstawiamy ile danych aktualnie jest w data
    indptr.push(data.length);
  }
  // zwracamy macierz w formacie CSR
  return {
    data,
    indices,
    indptr,
    cols: B.cols, // rezultat ma tyle kolumn ile macierz B
  };
}

function transposeCsrMatrix(A) {
  const rows = A.cols;
  const cols = A.indptr.length - 1;
  const data = Array(A.data.length).fill(0);
  const indices = Array(cols).fill(0);
  const indptr = Array(rows + 1).fill(0);
  for (let i = 0; i < A.indices.length; i++) {
    const col = A.indices[i] + 1;
    indptr[col] = indptr[col] + 1;
  }
  for (let i = 0; i < rows; i++) {
    indptr[i + 1] += indptr[i];
  }
  const position = [...indptr];
  for (let row = 0; row < cols; row++) {
    const rowStart = A.indptr[row];
    const rowEnd = A.indptr[row + 1];
    for (let i = rowStart; i < rowEnd; i++) {
      const col = A.indices[i];
      const pos = position[col];
      data[pos] = A.data[i];
      indices[pos] = row;
      position[col]++;
    }
  }
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

const A = {
  data: [1, 10, 2, 11, 5, 3, 12, 6, 4],
  indices: [0, 1, 1, 2, 0, 2, 3, 1, 3],
  indptr: [0, 2, 4, 7, 9],
  cols: 4,
};
const B = {
  data: [1, 2, 3, 4],
  indices: [1, 1, 0, 1],
  indptr: [0, 1, 2, 2, 4],
  cols: 4,
};
const product = multiplyCsrMatrices(A, B);
const dense = csrToDense(product).join("\n");
console.log(product);
console.log(dense);
