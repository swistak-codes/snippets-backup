function addCsrMatrices(A, B) {
  // zakładamy, że obie macierze możemy do siebie dodać
  // tworzymy puste tablice formatu CSR
  const data = [];
  const indices = [];
  // pierwsza wartość w indptr zawsze będzie wynosić 0
  const indptr = [0];
  // iterujemy po kolejnych wierszach macierzy
  for (let row = 0; row < A.indptr.length - 1; row++) {
    // tworzymy dwa kursory do przechodzenia po tym samym wierszu obu macierzy
    let i = A.indptr[row];
    let j = B.indptr[row];
    // pobieramy gdzie kończą się wiersze w obu macierzach
    const rowAEnd = A.indptr[row + 1];
    const rowBEnd = B.indptr[row + 1];
    // iterujemy po kolei, po wierszach obu macierzy jednocześnie
    while (i < rowAEnd || j < rowBEnd) {
      // pobieramy aktualną kolumnę z obu macierzy
      // jeśli wykroczyliśmy poza zakres wiersza, ustawiamy nieskończoność
      let colA = i < rowAEnd ? A.indices[i] : Infinity;
      let colB = j < rowBEnd ? B.indices[j] : Infinity;
      // wykonujemy dodawanie, mamy trzy przypadki do rozpatrzenia
      if (colA === colB) {
        // przypadek 1: obie macierze mają element w tej samej kolumnie
        // dodajemy wartości
        const sumValue = A.data[i] + B.data[j];
        // jeśli wartość jest różna od zera, to wstawiamy ją do macierzy
        if (sumValue !== 0) {
          indices.push(colA);
          data.push(sumValue);
        }
        // inkrementujemy oba kursory
        i++;
        j++;
      } else if (colA < colB) {
        // przypadek 2: tylko macierz A ma niezerowy element
        // kopiujemy wartość do macierzy, analogicznie jak wyżej
        indices.push(colA);
        data.push(A.data[i]);
        // inkrementujemy jedynie kursor i
        i++;
      } else {
        // przypadek 3: tylko macierz B ma niezerowy element
        // kod analogiczny jak wyżej
        indices.push(colB);
        data.push(B.data[j]);
        j++;
      }
    }
    // liczba zapisanych wartości, to wartość, jaką musimy wstawić do indptr
    indptr.push(data.length);
  }
  // zwracamy macierz w formacie CSR
  return {
    data,
    indices,
    indptr,
    cols: A.cols,
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
const sum = addCsrMatrices(A, B);
const dense = csrToDense(sum).join("\n");
console.log(sum);
console.log(dense);
