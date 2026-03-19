// generator zwracający pseudolosowe liczby według algorytmu Blum Blum Shub
// seed to wartość początkowa generatora (ziarno)
// p, q to liczby pierwsze
// bits to liczba bitów wyniku
function* blumBlumShubGeneratorWithParityBit(seed, p, q, bits) {
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
    result.push(Number(calculateParityBit(state)));
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

// funkcja obliczająca bit parzystości
// zakładamy, że liczba jest typu liczbowego
function calculateParityBit(number) {
  // zmienna przechowująca rezultat
  let result = 0n;
  // wykonujemy całość tak długo,
  // dopóki nie przesuniemy liczby za daleko
  while (number !== 0n) {
    // wykonujemy XOR aktualnego wyniku z liczbą
    result ^= number;
    // przesuwamy liczbę o 1 bit w prawo
    number >>= 1n;
  }
  // wyciągamy ostatni bit zmiennej z wynikiem,
  // bo zawiera on wyliczony bit parzystości
  return result & 1n;
}

console.log("Generator zainicjalizowanymi przykładowymi, małymi wartościami");
const generator = blumBlumShubGeneratorWithParityBit(11, 23, 3, 31);
for (let i = 0; i < 10; i++) {
  console.log(generator.next().value);
}

console.log("Generator zainicjalizowanymi bardziej złożonymi wartościami");
const generator2 = blumBlumShubGeneratorWithParityBit(
  24672462467892469787n,
  396736894567834589803n,
  BigInt(Date.now()) ** 2n % (24672462467892469787n * 396736894567834589803n),
  31,
);
for (let i = 0; i < 10; i++) {
  console.log(generator2.next().value);
}
