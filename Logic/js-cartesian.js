function cartesian(first, second) {
  // tworzymy tablicę przechowującą wynik
  const result = [];
  // iterujemy po elementach pierwszej tablicy
  for (const a of first) {
    // i po elementach drugiej tablicy
    for (const b of second) {
      // dodajemy do wyniku
      result.push([a, b]);
    }
  }
  // zwracamy wynik
  return result;
}

// deklarujemy dwie tablice
const A = [1, 3, 5];
const B = [2, 4, 5];
// wypisujemy rezultat użycia funkcji cartesian()
console.log(cartesian(A, B));
/*
[
  [ 1, 2 ], [ 1, 4 ],
  [ 1, 5 ], [ 3, 2 ],
  [ 3, 4 ], [ 3, 5 ],
  [ 5, 2 ], [ 5, 4 ],
  [ 5, 5 ]
]
*/
console.log(cartesian(B, A));
/*
[
  [ 2, 1 ], [ 2, 3 ],
  [ 2, 5 ], [ 4, 1 ],
  [ 4, 3 ], [ 4, 5 ],
  [ 5, 1 ], [ 5, 3 ],
  [ 5, 5 ]
]
*/