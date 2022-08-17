/**
 * Funkcja licząca ile trafień jest potrzebnych aby znaleźć liczbę
 * @param array - tablica w której szukamy
 * @param toFind - szukana wartość
 */
function interpolationSearchCounter(array, toFind) {
  // licznik w którym przechowamy liczbę trafień
  let counter = 1;

  // rekurencyjna funkcja do szukania liczby
  function interpolationSearch(start, end) {
    // aktualny indeks wyliczamy ze wzoru na interpolację liniową
    const index = Math.floor(start + ((toFind - array[start]) / (array[end] - array[start])) * (end - start));
    
    // pobieramy wybrany element z tablicy
    const element = array[index];


    if (element === toFind) {
      // jezeli trafiliśmy, przerywamy rekurencję
      return;
    }

    // nie trafiliśmy, zwiększamy licznik
    counter++;

    if (toFind < element) {
      // jezeli szukana liczba jest mniejsza, przesuwamy koniec zakresu na aktualną liczbę
      return interpolationSearch(start, index - 1);
    } else {
      // jezeli szukana liczba jest wieksza, przesuwamy poczatek zakresu na aktualną liczbę
      return interpolationSearch(index + 1, end);
    }
  }

  // wywołujemy funkcję rekurencyjną szukającą liczby
  interpolationSearch(0, array.length - 1);

  // zwracamy wskazanie licznika
  return counter;
}

module.exports = interpolationSearchCounter;