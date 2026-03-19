function minimum(A) {
  let n = 0;
  let min = A[0];
  for (let i = 1; i < A.length; i++) {
    if (A[i] < min) {
      min = A[i];
    }
    n++;
  }
  console.log(`Minimum: ${n} porównań`);
  return min;
}

function maximum(A) {
  let n = 0;
  let max = A[0];
  for (let i = 1; i < A.length; i++) {
    if (A[i] > max) {
      max = A[i];
    }
    n++;
  }
  console.log(`Maksimum: ${n} porównań`);
  return max;
}

function minimumMaximum(A) {
  let n = 0;
  // inicjalizujemy zmienne, w których przechowamy minimum i maksimum
  // tym razem ustawiamy je na wartości skrajne
  let min = Number.MAX_SAFE_INTEGER;
  let max = Number.MIN_SAFE_INTEGER;
  // indeks, od którego zaczniemy pętlę
  let startIndex = 0;
  // jeśli tablica ma nieparzystą liczbę elementów,
  // to inicjalizujemy min i max pierwszym elementem
  if (A.length % 2 !== 0) {
    min = max = A[0];
    startIndex = 1;
  }
  for (let i = startIndex; i < A.length; i += 2) {
    let localMin, localMax;
    // najpierw określamy minimum i maksimum z pary
    if (A[i] < A[i + 1]) {
      localMin = A[i];
      localMax = A[i + 1];
    } else {
      localMin = A[i + 1];
      localMax = A[i];
    }
    n++;
    // następnie aktualizujemy globalne min i max
    if (localMin < min) {
      min = localMin;
    }
    n++;
    if (localMax > max) {
      max = localMax;
    }
    n++;
  }
  console.log(`Minimum i maksimum: ${n} porównań`);
  return { min, max };
}

const test1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const test2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const test3 = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
];

console.log(`${test1.length} elementów`);
console.log(minimum(test1));
console.log(maximum(test1));
console.log(`Przewidywane ${3 * Math.floor(test1.length / 2)} porównań`);
console.log(minimumMaximum(test1));
console.log("-------------------------------");
console.log(`${test2.length} elementów`);
console.log(minimum(test2));
console.log(maximum(test2));
console.log(`Przewidywane ${3 * Math.floor(test2.length / 2)} porównań`);
console.log(minimumMaximum(test2));
console.log("-------------------------------");
console.log(`${test3.length} elementów`);
console.log(minimum(test3));
console.log(maximum(test3));
console.log(`Przewidywane ${3 * Math.floor(test3.length / 2)} porównań`);
console.log(minimumMaximum(test3));
