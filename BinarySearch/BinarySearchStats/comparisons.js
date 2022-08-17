const fs = require('fs');
const binarySearchCounter = require('./binarySearch');

/**
 * Funkcja wyliczająca ile sprawdzeń potrzeba do odnalezienia kazdej z wartości w przedziale
 * @param start - dolna granica przedziału
 * @param end - górna granica przedziału
 */
function doComparisonsCount(start = 1, end = 100) {
  // zmienna w której przechowamy wyniki
  const results = [];

  // iteracja przechodząca po kolei po przedziale liczb
  for (let i = start; i <= end; i++) {
    // wywołujemy funkcję wyszukującą binarnie naszą liczbę
    const count = binarySearchCounter(start - 1, end, i);
    // dodajemy rezultat w postaci [element, liczba sprawdzeń]  
    results.push([i, count]);
  }

  // przerabiamy naszą tablicę dwuwymiarową na zapis w postaci CSV, aby mozna było łatwo zaimportować wartości do arkusza kalkulacyjnego
  const csv = results.map(x => x.join(';')).join('\n');

  // zapisujemy plik
  fs.writeFile('comparisons.csv', csv, 'utf8', (error) => {
    if (error) {
      console.error('Wystąpił błąd: ', error);
    } else {
      console.log('Zapisano plik comparisons.csv!');
    }
  });
}

module.exports = doComparisonsCount;