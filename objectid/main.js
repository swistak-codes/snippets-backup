let counter = null;
// przykładowy identyfikator procesu
const PROCESS_ID = new Uint8Array([0x02, 0x01, 0x03, 0x07, 0xff]);

// funkcja zwracająca ObjectID
// opcjonalnie można podać wartość (liczba 4-bajtowa), która zastąpi znacznik czasu
function objectId(value = null) {
  // tworzymy tablicę bajtów o długości 12
  const result = new Uint8Array(12);
  if (value !== null) {
    // jeśli podana została wartość, wstawiamy ją zamiast znacznika czasu
    // obcinamy wartość do 4 ostatnich bajtów (w innych językach wystarczy typ 32-bitowy)
    const properValue = value & 0xffffffff;
    // ustawiamy wartość na pierwszych 4 bajtach
    result[0] = (properValue >> 24) & 0xff;
    result[1] = (properValue >> 16) & 0xff;
    result[2] = (properValue >> 8) & 0xff;
    result[3] = properValue & 0xff;
  } else {
    // jeśli wartości nie ma, używamy znacznik czasu
    // pobieramy aktualny czas uniksowy w sekundach
    const timestamp = Math.trunc(Date.now() / 1000);
    // ustawiamy czas na pierwszych 4 bajtach
    result[0] = (timestamp >> 24) & 0xff;
    result[1] = (timestamp >> 16) & 0xff;
    result[2] = (timestamp >> 8) & 0xff;
    result[3] = timestamp & 0xff;
  }
  // przepisujemy processId na kolejne 5 bajtów
  result[4] = PROCESS_ID[0];
  result[5] = PROCESS_ID[1];
  result[6] = PROCESS_ID[2];
  result[7] = PROCESS_ID[3];
  result[8] = PROCESS_ID[4];
  // inicjalizujemy licznik, jeśli jeszcze go nie ma
  if (!counter) {
    // licznik zajmuje 3 bajty, stąd 0xffffff
    counter = Math.trunc(Math.random() * 0xffffff);
  }
  // inkrementujemy licznik; modulo aby zapewnić długość 3 bajty
  counter = (counter + 1) % 0xffffff;
  // przepisujemy licznik na kolejne 3 bajty
  result[9] = (counter >> 16) & 0xff;
  result[10] = (counter >> 8) & 0xff;
  result[11] = counter & 0xff;
  // zwracamy wynik
  return result;
}

// funkcja konwertująca bajty składające się na ObjectID
// do ciągu cyfr w systemie szesnastkowym
function objectIdToString(bytes) {
  // wynikowy ciąg znaków
  let result = "";
  // iterujemy po kolejnych bitach
  for (let i = 0; i < bytes.length; i++) {
    // konwertujemy bajt do formatu szesnastkowego
    // jeśli jest potrzeba, poprzedzamy cyfrę zerem (padStart)
    const hex = bytes[i].toString(16).padStart(2, "0");
    // w przeciwieństwie do UUID tutaj po prostu spisujemy bajty
    // bez dzielenia łącznikami
    result += hex;
  }
  return result;
}

console.log(objectIdToString(objectId()));
console.log(objectIdToString(objectId()));
console.log(objectIdToString(objectId()));
console.log(objectIdToString(objectId()));
console.log(objectIdToString(objectId(21372137)));
console.log(objectIdToString(objectId(21372137)));
console.log(objectIdToString(objectId(666)));
console.log(objectIdToString(objectId(666)));
