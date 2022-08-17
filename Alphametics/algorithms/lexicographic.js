const { swap } = require("../helpers");

/**
 * Leksykograficzne generowanie permutacji
 * @param {number[]} a
 */
function* lexicographic(a) {
  let j, k, l;
  let n = a.length - 1;
  while (true) {
    // 1. odwiedź
    yield a;

    // 2. znajdź j
    j = n - 1;
    while (a[j] >= a[j + 1]) {
      j--;
    }
    if (j < 0) {
      // oryginalny algorytm zakłada tablicę numerowaną od 1, stąd zmiana warunku
      return;
    }

    // 3. zwiększ a_j
    l = n;
    while (a[j] >= a[l]) {
      l--;
    }
    swap(a, j, l);

    // 4. odwróć a_{j+1} z a_n
    k = j + 1;
    l = n;
    while (k < l) {
      swap(a, k, l);
      k++;
      l--;
    }
  }
}

module.exports = lexicographic;
