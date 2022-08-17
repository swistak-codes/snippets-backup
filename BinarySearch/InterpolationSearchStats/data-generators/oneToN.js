/**
 * Generator kolejnych liczb naturalnych
 * @param elements - liczba elementów do wygenerowania
 */
function oneToN(elements = 100) {
  // szybki sposób na uzyskanie liczb od 0 do n
  return [...Array(elements).keys()];
}

module.exports = oneToN;