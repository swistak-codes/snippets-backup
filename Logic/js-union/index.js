const _ = require('lodash');

// deklarujemy dwie tablice
const A = [1, 3, 5];
const B = [2, 4, 5];
// wypisujemy rezultat użycia funkcji _.union()
console.log(_.union(A, B));  // [ 1, 3, 5, 2, 4 ]
// dla porównania zwykłe połączenie tablic (concat())
console.log(A.concat(B)); // [ 1, 3, 5, 2, 4, 5 ]