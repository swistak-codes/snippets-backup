// dodawanie
function add(A, B) {
  // pobierzmy wymiary z pierwszej macierzy
  // załóżmy, że użytkownik podał obie z tymi samymi wymiarami
  const rows = A.length;
  const cols = A[0].length;
  // tworzymy nową macierz o tych samych wymiarach
  const result = Array.from({ length: rows }, () => Array(cols).fill(0));
  // w pętli dodajemy elementy na tych samych pozycjach
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[i][j] = A[i][j] + B[i][j];
    }
  }
  return result;
}

// odejmowanie
function substract(A, B) {
  // pobierzmy wymiary z pierwszej macierzy
  // załóżmy, że użytkownik podał obie z tymi samymi wymiarami
  const rows = A.length;
  const cols = A[0].length;
  // tworzymy nową macierz o tych samych wymiarach
  const result = Array.from({ length: rows }, () => Array(cols).fill(0));
  // w pętli odejmujemy elementy na tych samych pozycjach
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      result[i][j] = A[i][j] - B[i][j];
    }
  }
  return result;
}

const A = [
  [1, 2],
  [3, 4],
  [5, 6],
];

const B = [
  [6, 1],
  [4, 3],
  [2, 5],
];

console.log(add(A, B));
console.log(substract(A, B));
