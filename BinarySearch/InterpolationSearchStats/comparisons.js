const fs = require('fs');
const interpolationSearchCounter = require('./interpolationSearch');

/**
 * Funkcja wyliczająca ile sprawdzeń potrzeba do odnalezienia kazdej z wartości w przedziale
 * @param array - tablica do wykonywania przeszukań
 * @param generatorName - nazwa generatora, wykorzystana przy zapisie pliku
 * @param saveFile - czy mamy zapisać plik z wynikami
 */
function doComparisonsCount(array, generatorName, saveFile = true) {
  // zmienna w której przechowamy wyniki
  const results = [];

  // iteracja przechodząca po kolei po przedziale liczb
  for (let i = 0; i < array.length; i++) {
    // wywołujemy funkcję wyszukującą binarnie naszą liczbę
    const count = interpolationSearchCounter(array, array[i]);
    // dodajemy rezultat w postaci [element, liczba sprawdzeń]  
    results.push([array[i], count]);
  }

  // przerabiamy naszą tablicę dwuwymiarową na zapis w postaci CSV, aby mozna było łatwo zaimportować wartości do arkusza kalkulacyjnego
  const csv = results.map(x => x.join(';')).join('\n');

  if (saveFile) {
    // zapisujemy plik, jezeli wskazuje na to argument naszej funkcji
    fs.writeFile(`comparisons-${generatorName}.csv`, csv, 'utf8', (error) => {
      if (error) {
        console.error('Wystąpił błąd: ', error);
      } else {
        console.log(`Zapisano plik comparisons-${generatorName}.csv!`);
      }
    });
  }

  // zwracamy tablicę z wynikami
  return results;
}

module.exports = doComparisonsCount;