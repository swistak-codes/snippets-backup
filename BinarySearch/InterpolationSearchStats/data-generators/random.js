/**
 * Funkcja zwracająca losową liczbę w podanym zakresie
 * @param min 
 * @param max 
 */
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Generator kolejnych liczb generowanych losowo
 * @param elements - liczba elementów do wygenerowania
 */
function random(elements = 100) {
  // zmienna do przechowania rezultatu
  // jest ona zbiorem, aby mieć pewność, ze nie powtórzymy wartości
  const result = new Set();
  // określamy górny zakres przedziału losowania liczb
  const max = Math.min(elements * 1000, Number.MAX_SAFE_INTEGER / 10);

  while (result.size < elements) {
    // iterujemy tak długo, az zbiór będzie mieć poządaną liczbę elementów
    // pobieramy losową liczbę
    const number = getRandomNumber(0, max);

    // dodajemy do zbioru
    result.add(number);
  }

  // zwracamy wygenerowany, posortowany ciąg
  return [...result.keys()].sort((a, b) => a - b);
}

module.exports = random;