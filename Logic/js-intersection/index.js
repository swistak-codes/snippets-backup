const _ = require('lodash');

// deklarujemy trzy tablice
const A = [1, 3, 5];
const B = [2, 4, 5];
const C = [6, 7, 8];
// wypisujemy rezultat użycia funkcji _.intersection()
console.log(_.intersection(A, B));  // [ 5 ]
console.log(_.intersection(A, C));  // []