function getInitialSeed(a) {
  // przekształcamy a na ciąg znaków
  const stringified = a.toString();
  let d;
  if (a >= 1) {
    // wariant dla a >= 1
    // pobieramy liczbę cyfr przed znakiem dziesiętnym
    d = stringified.split('.')[0].length;
  } else {
    const decimal = stringified.split('.')[1];
    if (!decimal) {
      // jeśli nie ma części dziesiętnej, zwracamy zero
      d = 0;
    } else {
      // zliczamy ilość zer na początku
      // stosuję do tego proste wyrażenie regularne
      const match = decimal.match(/^0+/);
      if (match && match.length > 0) {
        d = -match[0].length;
      } else {
        d = 0;
      }
    }
  }
  // stosujemy wzór
  if (d === 0) {
    return 1;
  } else if (d % 2 === 0) {
    return 6 * Math.pow(10, (d - 2) / 2)
  } else {
    return 2 * Math.pow(10, (d - 1) / 2);
  }
}

// a - pierwiastkowana liczba
// epsilon - dokładność (domyślna wartość 0.0000000001)
function sqrt(a, epsilon = 0.0000000001) {
  // aby sprawdzać dokładność, przechowujemy dwie wartości:
  // starą, której nadajemy odpowiednio wysoką wartość
  let old = Number.POSITIVE_INFINITY;
  // aktualną, czyli teraz wartość początkową
  let current = getInitialSeed(a);

  // licznik iteracji
  let iterations = 0;

  // wykonujemy obliczenia tak długo, 
  // jak różnica między dwoma wartościami
  // jest większa od zadanej dokładności
  while (Math.abs(old - current) > epsilon) {
    // aktualna wartość staje się "starą"
    old = current;
    // nową wartość wyliczamy ze wzoru z metody Newtona
    current = (old + a / old) / 2;
    // inkrementujemy licznik iteracji
    iterations++;
  }

  // zwracamy obliczoną wartość i licznik iteracji
  return { result: current, iterations };
}

const testedValues = [0, 0.1, 0.009, 1.2e-13, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1024, 210037, 1234567, Number.MAX_SAFE_INTEGER];

for (const value of testedValues) {
  console.log('--- Testowana liczba: ', value);
  console.log('Początkowa wartość', getInitialSeed(value));
  const t0 = process.hrtime.bigint();
  const { result, iterations } = sqrt(value);
  const t1 = process.hrtime.bigint();
  console.log('Wynik: ', result);
  console.log('Liczba iteracji: ', iterations);
  console.log('Czas wykonania (ns): ', t1 - t0);
  const jsResult = Math.sqrt(value);
  console.log('Wynik z wbudowanej funkcji: ', jsResult);
  console.log('Różnica między wynikami: ', Math.abs(jsResult - result));
}