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

// funkcja zwracająca UUID w wersji 4
function v4() {
  // tworzymy tablicę bajtów o długości 16
  const bytes = new Uint8Array(16);
  // wypełniamy ją losowymi wartościami w zakresie 0-255
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = Math.trunc(Math.random() * 256);
  }
  // ustawiamy odpowiednie bity, aby zapewnić zgodność ze standardem
  // najpierw 0100 (4) oznaczające wersję
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  // następnie 10 oznaczającej wariant (8 to 1000)
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  // wyjaśnienie operacji binarnych:
  // wynikiem iloczynu bytes[8] & 0x0f (lub 0x3f) jest usunięcie początkowych bitów
  // 0x0f to 00001111, a 0x3f to 00111111 - zera usuwają aktualną wartość
  // natomiast w wyniku sumy | 0x40 wstawiamy tą wartość w miejscu zer

  // zwracamy wynik
  return bytes;
}

console.log(uuidToString(v4()));
console.log(uuidToString(v4()));
console.log(uuidToString(v4()));
console.log(uuidToString(v4()));
console.log(uuidToString(v4()));
