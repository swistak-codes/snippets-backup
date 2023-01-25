// a - pierwiastkowana liczba
// k = stopień potęgi
// epsilon - dokładność (domyślna wartość 0.0000000001)
function root(a, k, epsilon = 0.0000000001) {
  // aby sprawdzać dokładność, przechowujemy dwie wartości:
  // starą, której nadajemy odpowiednio wysoką wartość
  let old = Number.POSITIVE_INFINITY;
  // aktualną, czyli teraz wartość początkową
  let current = 1;

  // licznik iteracji
  let iterations = 0;

  // wykonujemy obliczenia tak długo, 
  // jak różnica między dwoma wartościami
  // jest większa od zadanej dokładności
  while (Math.abs(old - current) > epsilon) {
    // aktualna wartość staje się "starą"
    old = current;
    // nową wartość wyliczamy ze wzoru z metody Newtona
    current = ((k - 1) * old + a / Math.pow(old, k - 1)) / k;
    // inkrementujemy licznik iteracji
    iterations++;
  }

  // zwracamy obliczoną wartość i licznik iteracji
  return { result: current, iterations };
}

const testedValues = [[0.1, 3], [0.009, 10], [1.2e-13, 2], [1, 3], [2, 3], [3, 3], [4, 2], [5, 8], [8, 3], [1024, 10], [210037, 1000], [1234567, 6]];

for (const [value, degree] of testedValues) {
  console.log('--- Testowana liczba i stopień: ', value, degree);
  console.log('Początkowa wartość', getInitialSeed(value));
  const t0 = process.hrtime.bigint();
  const { result, iterations } = root(value, degree);
  const t1 = process.hrtime.bigint();
  console.log('Wynik: ', result);
  console.log('Liczba iteracji: ', iterations);
  console.log('Czas wykonania (ns): ', t1 - t0);
}