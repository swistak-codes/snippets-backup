let comparisons = 0;

// funkcja dzieląca tablicę względem piwota
function partition(A, low, high) {
  // wybieramy piwot jako ostatni element
  const pivot = A[high];
  // indeks mniejszego elementu
  let i = low - 1;
  // przechodzimy przez wszystkie elementy
  for (let j = low; j < high; j++) {
    // jeśli aktualny element jest mniejszy lub równy piwotowi
    comparisons++;
    if (A[j] <= pivot) {
      // zwiększamy indeks mniejszego elementu
      i++;
      // zamieniamy miejscami A[i] i A[j]
      const temp = A[i];
      A[i] = A[j];
      A[j] = temp;
    }
  }
  // zamieniamy miejscami A[i + 1] i A[high] (piwot)
  const temp = A[i + 1];
  A[i + 1] = A[high];
  A[high] = temp;
  // zwracamy indeks piwota
  return i + 1;
}

function partitionRandomPivot(A, low, high) {
  // wybieramy losowy indeks piwota
  const randomIndex = Math.trunc(Math.random() * (high - low + 1)) + low;
  // zamieniamy losowy piwot z ostatnim elementem
  const temp = A[randomIndex];
  A[randomIndex] = A[high];
  A[high] = temp;
  // kontynuujemy jak wcześniej
  const pivot = A[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    comparisons++;
    if (A[j] <= pivot) {
      i++;
      const temp = A[i];
      A[i] = A[j];
      A[j] = temp;
    }
  }
  const temp2 = A[i + 1];
  A[i + 1] = A[high];
  A[high] = temp2;
  return i + 1;
}

// właściwa funkcja implementująca quickselect
function quickselect(A, low, high, k) {
  // jeśli tablica ma tylko jeden element, to zwracamy go
  if (low === high) {
    return A[low];
  }
  // dzielimy tablicę i otrzymujemy indeks piwota
  const pivotIndex = partition(A, low, high);
  // sprawdzamy, gdzie znajduje się k-ty najmniejszy element
  if (k - 1 === pivotIndex) {
    // jeśli piwot jest k-tym elementem, to go zwracamy
    return A[k - 1];
  } else if (k - 1 < pivotIndex) {
    // jeśli k jest mniejsze niż indeks piwota, szukamy w lewej części
    return quickselect(A, low, pivotIndex - 1, k);
  } else {
    // jeśli k jest większe niż indeks piwota, szukamy w prawej części
    return quickselect(A, pivotIndex + 1, high, k);
  }
}

function quickselectRandomPivot(A, low, high, k) {
  if (low === high) {
    return A[low];
  }
  const pivotIndex = partitionRandomPivot(A, low, high);
  if (k - 1 === pivotIndex) {
    return A[k - 1];
  } else if (k - 1 < pivotIndex) {
    return quickselectRandomPivot(A, low, pivotIndex - 1, k);
  } else {
    return quickselectRandomPivot(A, pivotIndex + 1, high, k);
  }
}

function test(array) {
  let oldComparisonsSum = 0;
  let randomComparisonsSum = 0;
  comparisons = 0;
  console.log(
    "Najmniejszy element",
    quickselect(array, 0, array.length - 1, 1),
    "Porównań",
    comparisons,
  );
  oldComparisonsSum += comparisons;
  comparisons = 0;
  console.log(
    "Najmniejszy element (losowo)",
    quickselectRandomPivot(array, 0, array.length - 1, 1),
    "Porównań",
    comparisons,
  );
  randomComparisonsSum += comparisons;
  comparisons = 0;
  console.log(
    "Największy element",
    quickselect(array, 0, array.length - 1, array.length),
    "Porównań",
    comparisons,
  );
  oldComparisonsSum += comparisons;
  comparisons = 0;
  console.log(
    "Największy element (losowo)",
    quickselectRandomPivot(array, 0, array.length - 1, array.length),
    "Porównań",
    comparisons,
  );
  randomComparisonsSum += comparisons;
  comparisons = 0;
  console.log(
    "Dolna mediana",
    quickselect(array, 0, array.length - 1, Math.floor(array.length / 2)),
    "Porównań",
    comparisons,
  );
  oldComparisonsSum += comparisons;
  comparisons = 0;
  console.log(
    "Dolna mediana (losowo)",
    quickselectRandomPivot(
      array,
      0,
      array.length - 1,
      Math.floor(array.length / 2),
    ),
    "Porównań",
    comparisons,
  );
  randomComparisonsSum += comparisons;
  comparisons = 0;
  console.log(
    "Górna mediana",
    quickselect(array, 0, array.length - 1, Math.ceil(array.length / 2)),
    "Porównań",
    comparisons,
  );
  oldComparisonsSum += comparisons;
  comparisons = 0;
  console.log(
    "Górna mediana (losowo)",
    quickselectRandomPivot(
      array,
      0,
      array.length - 1,
      Math.ceil(array.length / 2),
    ),
    "Porównań",
    comparisons,
  );
  randomComparisonsSum += comparisons;
  comparisons = 0;
  console.log(
    "Drugi najmniejszy",
    quickselect(array, 0, array.length - 1, 2),
    "Porównań",
    comparisons,
  );
  oldComparisonsSum += comparisons;
  comparisons = 0;
  console.log(
    "Drugi najmniejszy (losowo)",
    quickselectRandomPivot(array, 0, array.length - 1, 2),
    "Porównań",
    comparisons,
  );
  randomComparisonsSum += comparisons;
  comparisons = 0;
  console.log(
    "Drugi największy",
    quickselect(array, 0, array.length - 1, array.length - 1),
    "Porównań",
    comparisons,
  );
  oldComparisonsSum += comparisons;
  comparisons = 0;
  console.log(
    "Drugi największy (losowo)",
    quickselectRandomPivot(array, 0, array.length - 1, array.length - 1),
    "Porównań",
    comparisons,
  );
  randomComparisonsSum += comparisons;
  console.log("Średnia liczba porównań", oldComparisonsSum / 6);
  console.log("Średnia liczba porównań (losowo)", randomComparisonsSum / 6);
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
