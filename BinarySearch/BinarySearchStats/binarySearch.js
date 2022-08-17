/**
 * Funkcja licząca ile trafień jest potrzebnych aby znaleźć liczbę
 * @param lowerBound - początek zakresu
 * @param upperBound - koniec zakresu
 * @param toFind - szukana wartość
 */
function binarySearchCounter(lowerBound, upperBound, toFind) {
  // licznik w którym przechowamy liczbę trafień
  let counter = 1;

  // rekurencyjna funkcja do szukania liczby
  function binarySearch(start, end) {
    // aktualny element to środek zakresu
    const element = Math.round((start + end) / 2);

    if (element === toFind) {
      // jezeli trafiliśmy, przerywamy rekurencję
      return;
    }

    // nie trafiliśmy, zwiększamy licznik
    counter++;

    if (toFind < element) {
      // jezeli szukana liczba jest mniejsza, przesuwamy koniec zakresu na aktualną liczbę
      return binarySearch(start, element);
    } else {
      // jezeli szukana liczba jest wieksza, przesuwamy poczatek zakresu na aktualną liczbę
      return binarySearch(element, end);
    }
  }

  // wywołujemy funkcję rekurencyjną szukającą liczby
  binarySearch(lowerBound, upperBound);

  // zwracamy wskazanie licznika
  return counter;
}

module.exports = binarySearchCounter;