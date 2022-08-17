/**
 * Funkcja zwracająca losową liczbę z rozkładu Gaussa w podanym zakresie
 * @param min 
 * @param max 
 */
function getRandomGaussianNumber(min, max) {
  // implementacja transformacji Boxa-Mullera
  let u = 0,
    v = 0;
  while (u === 0) {
    u = Math.random();
  }
  while (v === 0) {
    v = Math.random();
  }
  const randomNumber = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v) + 4;
  return Math.floor(randomNumber * (max - min)) + min;
}

/**
 * Generator kolejnych liczb generowanych losowo z rozkładu Gaussa
 * @param elements - liczba elementów do wygenerowania
 */
function gaussian(elements = 100) {
  // zmienna do przechowania rezultatu
  // jest ona zbiorem, aby mieć pewność, ze nie powtórzymy wartości
  const result = new Set();
  // określamy górny zakres przedziału losowania liczb
  const max = Math.min(elements * 1000, Number.MAX_SAFE_INTEGER / 10);

  while (result.size < elements) {
    // iterujemy tak długo, az zbiór będzie mieć poządaną liczbę elementów
    // pobieramy losową liczbę
    const number = getRandomGaussianNumber(0, max);

    // dodajemy do zbioru
    result.add(number);
  }

  // zwracamy wygenerowany, posortowany ciąg
  return [...result.keys()].sort((a, b) => a - b);
}

module.exports = gaussian;