// funkcja konwertująca bajty składające się na UUID
// do ciągu cyfr w systemie szesnastkowym
function uuidToString(bytes) {
  // wynikowy ciąg znaków
  let result = "";
  // iterujemy po kolejnych bajtach
  for (let i = 0; i < bytes.length; i++) {
    // konwertujemy bajt do formatu szesnastkowego
    // jeśli jest potrzeba, poprzedzamy cyfrę zerem (padStart)
    const hex = bytes[i].toString(16).padStart(2, "0");
    // 4, 6, 8 i 10 bajt poprzedzamy łącznikiem
    if (i === 4 || i === 6 || i === 8 || i === 10) {
      result += `-${hex}`;
    } else {
      // pozostałe bajty zapisujemy po prostu tak jak są
      result += hex;
    }
  }
  return result;
}

// funkcja zwracająca UUID w wersji 7
function v7() {
  // tworzymy tablicę bajtów o długości 16
  const bytes = new Uint8Array(16);
  // pobieramy aktualną datę (timestamp) jako liczbę milisekund od 01.01.1970
  // musimy go trzymać jako BigInt, ponieważ w JS operacje binarne na zwykłym typie liczbowym działają tylko do 32 bitów
  const timestamp = BigInt(Date.now());
  // przenosimy timestamp na 6 pierwszych bajtów UUID
  // jest on zapisany na 48 bitach, więc musimy przesuwać sobie co 8 bitów
  // aby kopiować zawsze ostatnie 8 bitów do kolejnych elementów tablicy
  // `& 0xff` zapewnia nam, że zostawiamy tylko ostatni bajt (8 bitów)
  // `n` na końcu każdej z liczb oznacza, że jest to BigInt
  bytes[0] = Number((timestamp >> 40n) & 0xffn);
  bytes[1] = Number((timestamp >> 32n) & 0xffn);
  bytes[2] = Number((timestamp >> 24n) & 0xffn);
  bytes[3] = Number((timestamp >> 16n) & 0xffn);
  bytes[4] = Number((timestamp >> 8n) & 0xffn);
  bytes[5] = Number(timestamp & 0xffn);
  // bajtom od 6 do 16 przypisujemy losowe wartości
  for (let i = 6; i < 16; i++) {
    bytes[i] = Math.trunc(Math.random() * 256);
  }
  // na początku 7 bajtu zapisujemy wersję "7"
  bytes[6] = (bytes[6] & 0x0f) | 0x70;
  // a na początku 8 bajtu zapisujemy wariant
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  // zwracamy wynik
  return bytes;
}

console.log(uuidToString(v7()));
console.log(uuidToString(v7()));
console.log(uuidToString(v7()));
console.log(uuidToString(v7()));
console.log(uuidToString(v7()));
