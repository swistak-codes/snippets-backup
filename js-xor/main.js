function symmetricDifference(first, second) {
  // wyciągamy z pierwszej tablicy elementy,
  // które nie znajdują się w drugiej
  const firstDiff = first.filter(x => !second.includes(x));
  // na odwrót dla drugiej tablicy
  const secondDiff = second.filter(x => !first.includes(x));
  // zwracamy złączone obie pośrednie tablice
  return firstDiff.concat(secondDiff);
}

// deklarujemy dwie tablice
const A = [1, 3, 5];
const B = [2, 4, 5];
// wypisujemy rezultat użycia funkcji symmetricDifference()
console.log(symmetricDifference(A, B));  // [ 1, 3, 2, 4 ]
console.log(symmetricDifference(B, A));  // [ 2, 4, 1, 3 ]