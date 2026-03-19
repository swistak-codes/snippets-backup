// podejście zrobione czysto na tablicach
function union1(first, second) {
  // definiujemy tablicę wynikową
  const result = [];
  // dodajemy wszystkie elementy z pierwszej tablicy;
  // oczywiście, zamiast pętli moglibyśmy użyć gotowych mechanizmów języka
  // np. w JavaScript `result = [...first]`
  // albo w innych językach funkcje typu Array.copy()
  for (const element of first) {
    result.push(element);
  }
  // dodajemy elementy z drugiej tablicy 
  for (const element of second) {
    // element dodajemy tylko wtedy, jeśli nie istnieje już w tablicy
    if (!result.includes(element)) {
      result.push(element);
    }
  }
  // zwracamy wynik
  return result;
}

// podejście sprytne
function union2(first, second) {
  // złączamy obie tablice w tradycyjny sposób
  const merged = first.concat(second);
  // usuńmy duplikaty w najprostszy możliwy sposób...
  // ...tworząc zbiór z tablicy
  // UWAGA! zbiory nie zapewniają zachowania kolejności elementów
  const set = new Set(merged);
  // konwertujemy zbiór na tablicę i zwracamy go
  return Array.from(set);
}

// deklarujemy dwie tablice
const A = [1, 3, 5];
const B = [2, 4, 5];
// wypisujemy rezultat użycia funkcji union
console.log(union1(A, B));  // [ 1, 3, 5, 2, 4 ]
console.log(union2(A, B));  // [ 1, 3, 5, 2, 4 ]