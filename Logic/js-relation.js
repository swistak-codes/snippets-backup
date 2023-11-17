function relation(first, second, predicate) {
  // tworzymy tablicę przechowującą wynik
  const result = [];
  // iterujemy po elementach pierwszej tablicy
  for (const a of first) {
    // i po elementach drugiej tablicy
    for (const b of second) {
      // sprawdzamy, czy elementy spełniają warunek
      if (predicate(a, b)) {
        // jeśli tak, dodajemy do wyniku
        result.push([a, b]);
      }
    }
  }
  // zwracamy wynik
  return result;
}

// deklarujemy dwie tablice
const A = [1, 3, 5];
const B = [2, 4, 5];
// deklarujemy relację pomiędzy dwoma elementami
const R = (a, b) => b < a;
// wypisujemy rezultat użycia funkcji relation()
console.log(relation(A, B, R)); // [ [ 3, 2 ], [ 5, 2 ], [ 5, 4 ] ]
console.log(relation(B, A, R)); // [ [ 2, 1 ], [ 4, 1 ], [ 4, 3 ], [ 5, 1 ], [ 5, 3 ] ]