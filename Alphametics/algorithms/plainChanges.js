const { swap } = require("../helpers");

/**
 * Algorytm prostych zmian
 * @param {number[]} a
 */
function* plainChanges(a) {
  let n = a.length;
  // tablice c oraz o będą o 1 element większe niż oryginalna, ponieważ będziemy indeksować od 1
  let c = Array(n + 1);
  let o = Array(n + 1);
  let j, q, s;
  // przesuwamy tablicę a, aby prawidłowe indeksy nam się numerowały od 1
  a.unshift(undefined); // unshift wstawia element na początku tablicy

  // 1. inicjalizacja
  for (let i = 1; i <= n; i++) {
    c[i] = 0;
    o[i] = 1;
  }

  while (true) {
    // 2. odwiedź
    yield a.slice(1); // slice tworzy wycinek tablicy od n elementu do końca

    // 3. przygotuj do zmiany
    j = n;
    s = 0;

    while (true) {
      // 4. gotowy do zmiany?
      q = c[j] + o[j];
      let skipSwap = false;
      let skipIncrease = false;
      if (q < 0) {
        skipSwap = true;
        skipIncrease = true;
      }
      if (q === j) {
        skipSwap = true;
        skipIncrease = false;
      }

      // 5. zmiana
      if (!skipSwap) {
        swap(a, j - c[j] + s, j - q + s);
        c[j] = q;
        break;
      }

      // 6. zwiększ s
      if (!skipIncrease) {
        if (j === 1) {
          return;
        } else {
          s++;
        }
      }

      // 7. zmień kierunek
      o[j] = -o[j];
      j--;
    }
  }
}

module.exports = plainChanges;
