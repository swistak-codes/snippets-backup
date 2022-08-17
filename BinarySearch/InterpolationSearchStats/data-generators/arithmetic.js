/**
 * Generator kolejnych liczb ciągu arytmetycznego określonego wzorem a_n = 2 + (n - 1) * 3
 * @param elements - liczba elementów do wygenerowania
 */
function arithmetic(elements = 100) {
  // funkcja obliczająca n-ty element
  const getElement = (n) => 2 + (n - 1) * 3;
  // zmienna do przechowania rezultatu
  const result = [];

  for (let i = 0; i < elements; i++) {
    // generujemy kolejne elementy ciągu
    result.push(getElement(i + 1));
  }

  // zwracamy wygenerowany ciąg
  return result;
}

module.exports = arithmetic;