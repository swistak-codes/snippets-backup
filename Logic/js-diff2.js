function difference(first, second) {
  // wyciągamy z pierwszej tablicy elementy,
  // które nie znajdują się w drugiej
  return first.filter(x => !second.includes(x));
}

// deklarujemy dwie tablice
const A = [1, 3, 5];
const B = [2, 4, 5];
// wypisujemy rezultat użycia funkcji difference()
console.log(difference(A, B));  // [ 1, 3 ]
console.log(difference(B, A));  // [ 2, 4 ]