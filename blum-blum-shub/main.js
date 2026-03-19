// generator zwracający pseudolosowe liczby według algorytmu Blum Blum Shub
// seed to wartość początkowa generatora (ziarno)
// p, q to liczby pierwsze
// bits to liczba bitów wyniku
function* blumBlumShubGenerator(seed, p, q, bits) {
  // obliczamy M
  const M = BigInt(p) * BigInt(q);
  // zmienna pomocnicza do przechowywania kolejnych wartości
  // rozpoczynamy od ziarna
  let state = BigInt(seed);
  // zmienna, w której przechowamy bity składające się na wynik do zwrócenia
  let result = [];
  // generujemy kolejne wartości w nieskończonej pętli
  while (true) {
    // obliczamy nową wartość
    state = state ** 2n % M;
    // dodajemy najmłodszy bit do wyniku jako zwykłą liczbę
    result.push(Number(state & 1n));
    // jeśli uzbieraliśmy już odpowiednią liczbę bitów, zwracamy wynik
    if (result.length >= bits) {
      // zmienna, w której przechowamy wynik
      let num = 0;
      // iterujemy po kolejnych przechowanych bitach
      for (const bit of result) {
        // aby dodać bit na końcu, przesuwamy liczbę w lewo i dodajemy bit za pomocą operacji OR
        num = (num << 1) | bit;
      }
      // wracamy wynik
      yield num;
      // czyścimy tablicę przechowującą bity
      result = [];
    }
  }
}

console.log("Generator zainicjalizowanymi przykładowymi, małymi wartościami");
const generator = blumBlumShubGenerator(11, 23, 3, 31);
for (let i = 0; i < 10; i++) {
  console.log(generator.next().value);
}

console.log("Generator zainicjalizowanymi bardziej złożonymi wartościami");
const generator2 = blumBlumShubGenerator(
  24672462467892469787n,
  396736894567834589803n,
  BigInt(Date.now()) ** 2n % (24672462467892469787n * 396736894567834589803n),
  31,
);
for (let i = 0; i < 10; i++) {
  console.log(generator2.next().value);
}
