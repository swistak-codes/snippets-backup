const _ = require('lodash');

// deklarujemy dwie tablice
const A = [1, 3, 5];
const B = [2, 4, 5];
// wypisujemy rezultat użycia funkcji _.difference()
console.log(_.difference(A, B));  // [ 1, 3 ]
console.log(_.difference(B, A));  // [ 2, 4 ]