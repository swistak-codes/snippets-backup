let comparisons = 0;
let sortComparisons = 0;

// właściwa funkcja wykonująca algorytm magicznych piątek
// istotna zmiana - zwraca indeks elementu, a nie jego wartość
function select(A, low, high, k) {
  // jeśli tablica ma tylko jeden element, to zwracamy go
  if (low === high) {
    return low;
  }
  // najpierw znajdujemy piwot jako medianę median
  let pivotIndex = pivot(A, low, high);
  // następnie dzielimy tablicę na dwie części
  // w wyniku tej operacji otrzymujemy nowy indeks piwota
  pivotIndex = partition(A, low, high, pivotIndex);
  // sprawdzamy, gdzie znajduje się k-ty najmniejszy element
  // robimy to analogicznie jak w quickselect
  if (k === pivotIndex) {
    return k;
  } else if (k < pivotIndex) {
    return select(A, low, pivotIndex - 1, k);
  } else {
    return select(A, pivotIndex + 1, high, k);
  }
}

// pomocnicza funkcja zamieniająca dwa elementy miejscami
// przyda się nam, bo będziemy często zamieniać elementy miejscami
function swap(list, i, j) {
  let temp = list[i];
  list[i] = list[j];
  list[j] = temp;
}

// funkcja wyznaczająca piwot jako medianę median
function pivot(A, low, high) {
  // dla małych tablic zwracamy medianę
  if (high - low < 5) {
    return partition5(A, low, high);
  }
  // dzielimy tablicę na podtablice
  for (let i = low; i <= high; i += 5) {
    let subRight = i + 4;
    // specjalny przypadek dla ostatniej podtablicy
    // która może mieć mniej niż 5 elementów
    if (subRight > high) subRight = high;
    // sortujemy podtablicę i znajdujemy jej medianę
    let median5 = partition5(A, i, subRight);
    // przenosimy medianę na początek tablicy
    let nextMedianPos = low + Math.floor((i - low) / 5);
    swap(A, median5, nextMedianPos);
  }
  // rekurencyjnie wywołujemy cały algorytm aby znaleźć medianę median
  let numMedians = Math.floor((high - low) / 5) + 1;
  let mid = low + Math.floor(numMedians / 2);
  return select(A, low, low + numMedians - 1, mid);
}

// funkcja dzieląca tablicę względem piwota
// jedyna różnica względem quickselect to że mamy narzucony piwot
function partition(A, low, high, pivotIndex) {
  let pivot = A[pivotIndex];
  swap(A, pivotIndex, high);
  let i = low;
  for (let j = low; j < high; j++) {
    comparisons++;
    if (A[j] < pivot) {
      swap(A, i, j);
      i++;
    }
  }
  swap(A, i, high);
  return i;
}

// funkcja sortująca podtablicę i zwracająca indeks mediany
function partition5(A, low, high) {
  // implementacja sortowania przez wstawianie
  for (let i = low + 1; i <= high; i++) {
    let j = i;
    while (j > low && A[j - 1] > A[j]) {
      sortComparisons++;
      swap(A, j - 1, j);
      j--;
    }
    sortComparisons++;
  }
  // zwracamy indeks mediany
  return Math.trunc((low + high) / 2);
}

// funkcja zwracająca k-ty najmniejszy element w tablicy A
function medianOfMedians(A, low, high, k) {
  const idx = select(A, low, high, k - 1);
  return A[idx];
}

function test(array) {
  let comparisonsSum = 0;
  let totalComparisonsSum = 0;
  comparisons = 0;
  sortComparisons = 0;
  console.log(
    "Najmniejszy element",
    medianOfMedians(array, 0, array.length - 1, 1),
    "Porównań przy selekcji",
    comparisons,
    "Porównań przy sortowaniu",
    sortComparisons,
    "Porównań łącznie",
    comparisons + sortComparisons,
  );
  comparisonsSum += comparisons;
  totalComparisonsSum += comparisons + sortComparisons;
  comparisons = 0;
  sortComparisons = 0;
  console.log(
    "Największy element",
    medianOfMedians(array, 0, array.length - 1, array.length),
    "Porównań przy selekcji",
    comparisons,
    "Porównań przy sortowaniu",
    sortComparisons,
    "Porównań łącznie",
    comparisons + sortComparisons,
  );
  comparisonsSum += comparisons;
  totalComparisonsSum += comparisons + sortComparisons;
  comparisons = 0;
  sortComparisons = 0;
  console.log(
    "Dolna mediana",
    medianOfMedians(array, 0, array.length - 1, Math.floor(array.length / 2)),
    "Porównań przy selekcji",
    comparisons,
    "Porównań przy sortowaniu",
    sortComparisons,
    "Porównań łącznie",
    comparisons + sortComparisons,
  );
  comparisonsSum += comparisons;
  totalComparisonsSum += comparisons + sortComparisons;
  comparisons = 0;
  sortComparisons = 0;
  console.log(
    "Górna mediana",
    medianOfMedians(array, 0, array.length - 1, Math.ceil(array.length / 2)),
    "Porównań przy selekcji",
    comparisons,
    "Porównań przy sortowaniu",
    sortComparisons,
    "Porównań łącznie",
    comparisons + sortComparisons,
  );
  comparisonsSum += comparisons;
  totalComparisonsSum += comparisons + sortComparisons;
  comparisons = 0;
  sortComparisons = 0;
  console.log(
    "Drugi najmniejszy",
    medianOfMedians(array, 0, array.length - 1, 2),
    "Porównań przy selekcji",
    comparisons,
    "Porównań przy sortowaniu",
    sortComparisons,
    "Porównań łącznie",
    comparisons + sortComparisons,
  );
  comparisonsSum += comparisons;
  totalComparisonsSum += comparisons + sortComparisons;
  comparisons = 0;
  sortComparisons = 0;
  console.log(
    "Drugi największy",
    medianOfMedians(array, 0, array.length - 1, array.length - 1),
    "Porównań przy selekcji",
    comparisons,
    "Porównań przy sortowaniu",
    sortComparisons,
    "Porównań łącznie",
    comparisons + sortComparisons,
  );
  comparisonsSum += comparisons;
  totalComparisonsSum += comparisons + sortComparisons;
  console.log("Średnia liczba porównań (bez sortowania)", comparisonsSum / 6);
  console.log(
    "Średnia liczba porównań (z sortowaniem)",
    totalComparisonsSum / 6,
  );
}

function randomize(array) {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const baseArray = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

console.log("n =", baseArray.length);
console.log("n log n =", baseArray.length * Math.log2(baseArray.length));
console.log("n^2 =", baseArray.length ** 2);
console.log("--------------------------------");
console.log("Posortowana tablica");
test(baseArray);
console.log("--------------------------------");
console.log("Odwrócona tablica");
test(baseArray.reverse());
console.log("--------------------------------");
console.log("Tablica z losową kolejnością (1)");
test(randomize(baseArray));
console.log("--------------------------------");
console.log("Tablica z losową kolejnością (2)");
test(randomize(baseArray));
console.log("--------------------------------");
console.log("Tablica z losową kolejnością (3)");
test(randomize(baseArray));
console.log("--------------------------------");
console.log("Tablica z losową kolejnością (4)");
test(randomize(baseArray));
console.log("--------------------------------");
console.log("Tablica z losową kolejnością (5)");
test(randomize(baseArray));
