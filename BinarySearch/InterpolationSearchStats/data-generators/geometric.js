/**
 * Generator kolejnych liczb ciągu geometrycznego określonego wzorem a_n = 2 * a_{n-1}
 * @param elements - liczba elementów do wygenerowania
 */
function geometric(elements = 50) {
  // zmienna do przechowania rezultatu, zainicjowana pierwszą wartością
  const result = [1];

  for (let i = 1; i < elements; i++) {
    // generujemy kolejne elementy ciągu wykorzystując poprzedni zapisany
    result.push(2 * result[i - 1]);
  }

  // zwracamy wygenerowany ciąg
  return result;
}

module.exports = geometric;