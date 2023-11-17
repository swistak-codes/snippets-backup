function intersection(first, second) {
  // wyciągamy z pierwszej tablicy elementy,
  // które znajdują się w drugiej
  return first.filter(x => second.includes(x));
}

// deklarujemy trzy tablice
const A = [1, 3, 5];
const B = [2, 4, 5];
const C = [6, 7, 8];
// wypisujemy rezultat użycia funkcji intersection()
console.log(intersection(A, B));  // [ 5 ]
console.log(intersection(A, C));  // []