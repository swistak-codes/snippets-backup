const fs = require('fs');
const binarySearchCounter = require('./binarySearch');

/**
 * Funkcja wyliczająca średnią oraz maksymalną liczbę sprawdzeń dla róznych wielkości przedziałów liczb
 * @param start - górna granica przedziału od której zaczynamy
 * @param end - górna granica przedziału na której kończymy
 */
function doAveragesCount(start = 5, end = 10000) {
  // zmienna w której przechowamy wyniki
  const results = [];

  // pierwsza iteracja będzie nam powiększać przedział liczb
  for (let i = start; i <= end; i++) {
    // zmienna na sumę sprawdzeń, do wyliczenia średniej
    let sum = 0;
    // zmienna przechowująca największą liczbę sprawdzeń
    let max = 0;

    // druga iteracja przechodząca po kolei po przedziale liczb
    for (let j = 1; j <= i; j++) {
      // wywołujemy funkcję wyszukującą binarnie naszą liczbę
      const count = binarySearchCounter(0, i, j);
      // dodajemy wynik do sumy
      sum += count;
      // sprawdzamy, czy mozemy zaktualizowac wartosc maksymalna
      max = Math.max(max, count);
    }

    // obliczamy srednia wynikow
    const avg = sum / i;
    // dodajemy rezultat w postaci [liczba elementów, średnia, maksimum]
    results.push([i, avg, max]);
  }

  // przerabiamy naszą tablicę dwuwymiarową na zapis w postaci CSV, aby mozna było łatwo zaimportować wartości do arkusza kalkulacyjnego
  const csv = results.map(x => x.join(';')).join('\n');

  // zapisujemy plik
  fs.writeFile('averages.csv', csv, 'utf8', (error) => {
    if (error) {
      console.error('Wystąpił błąd: ', error);
    } else {
      console.log('Zapisano plik averages.csv!');
    }
  });
}

module.exports = doAveragesCount;