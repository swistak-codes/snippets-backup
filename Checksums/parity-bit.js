// funkcja obliczająca bit parzystości
// zakładam, że liczba jest typu liczbowego
function calculateParityBit(number) {
  // zmienna przechowująca rezultat
  let result = 0;
  // wykonujemy całość tak długo, 
  // aż nie przesuniemy liczby za daleko
  while (number !== 0) {
    // wykonujemy XOR aktualnego wyniku z liczbą
    result ^= number;
    // przesuwamy liczbę o 1 bit w prawo
    number >>= 1;
  }
  // wyciągamy ostatni bit zmiennej z wynikiem, 
  // bo zawiera on wyliczony bit parzystości
  return result & 1;
}

console.log((1).toString(2), calculateParityBit(1));
console.log((3).toString(2), calculateParityBit(3));
console.log((4).toString(2), calculateParityBit(4));
console.log((15).toString(2), calculateParityBit(15));
console.log((16).toString(2), calculateParityBit(16));
console.log((200).toString(2), calculateParityBit(200));
console.log((231).toString(2), calculateParityBit(231));
console.log((2137).toString(2), calculateParityBit(2137));