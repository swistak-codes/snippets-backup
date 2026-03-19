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

// ostatni znacznik czasowy, aby wiedzieć czy wygenerować nową sekwencję zegarową
let lastTimestamp = 0;
// ostatnia sekwencja zegarowa
let clockSequence = 0;

// funkcja zwracająca UUID w wersji 1
function v1(nodeId) {
  // przesunięcie epoki gregoriańskiej względem czasu uniksowego
  const GREGORIAN_OFFSET = 12219292800000n;
  // obliczamy znacznik czasowy
  const timestamp = (BigInt(Date.now()) + GREGORIAN_OFFSET) * 10000n;
  // jeśli timestamp jest taki sam jak poprzednio, zwiększamy sekwencję zegarową
  if (timestamp === lastTimestamp) {
    // 0x3ff, ponieważ interesuje nas tylko znaczące 14 bitów
    clockSequence = (clockSequence + 1) & 0x3fff;
  } else {
    // w przeciwnym wypadku generujemy nową sekwencję zegarową
    clockSequence = Math.floor(Math.random() * 0x3fff);
  }
  // zapamiętujemy aktualny znacznik czasowy
  lastTimestamp = timestamp;
  // tworzymy tablicę bajtów o długości 16
  const bytes = new Uint8Array(16);
  // time_low: 32 najmniej znaczące bity timestampu
  bytes[0] = Number((timestamp >> 24n) & 0xffn);
  bytes[1] = Number((timestamp >> 16n) & 0xffn);
  bytes[2] = Number((timestamp >> 8n) & 0xffn);
  bytes[3] = Number(timestamp & 0xffn);
  // time_mid: środkowe 16 bitów timestampu
  bytes[4] = Number((timestamp >> 40n) & 0xffn);
  bytes[5] = Number((timestamp >> 32n) & 0xffn);
  // ustawienie wersji 1 i time_high
  bytes[6] = Number((timestamp >> 56n) & 0x0fn) | 0x10;
  bytes[7] = Number((timestamp >> 48n) & 0xffn);
  // przenosimy znacznik sekwencji zegarowej oraz ustawiamy wariant
  bytes[8] = ((clockSequence >> 8) & 0x3f) | 0x80;
  bytes[9] = clockSequence & 0xff;
  // przenosimy nodeId na koniec identyfikatora
  bytes.set(nodeId, 10);
  // zwracamy wynik
  return bytes;
}

// funkcja zwracająca UUID w wersji 6
function v6(nodeId) {
  // utworzymy UUIDv6 na podstawie UUIDv1, bo różnią się tylko wersją i kolejnością bitów
  const uuidV1 = v1(nodeId);
  // tworzymy tablicę bajtów o długości 16
  const bytes = new Uint8Array(16);
  // kopiujemy znacznik czasowy z końca na początek
  // pamiętamy, że ze względu na oznaczenie wersji, nie kopiujemy całych bajtów
  // a jedynie po 4 bity z każdego - stąd przesunięcie
  bytes[0] = ((uuidV1[6] & 0x0f) << 4) | ((uuidV1[7] >> 4) & 0x0f);
  bytes[1] = ((uuidV1[7] & 0x0f) << 4) | ((uuidV1[4] & 0xf0) >> 4);
  bytes[2] = ((uuidV1[4] & 0x0f) << 4) | ((uuidV1[5] & 0xf0) >> 4);
  bytes[3] = ((uuidV1[5] & 0x0f) << 4) | ((uuidV1[0] & 0xf0) >> 4);
  bytes[4] = ((uuidV1[0] & 0x0f) << 4) | ((uuidV1[1] & 0xf0) >> 4);
  bytes[5] = ((uuidV1[1] & 0x0f) << 4) | ((uuidV1[2] & 0xf0) >> 4);
  // na 7 bajcie poza kopiowaniem musimy też ustawić wersję
  bytes[6] = (uuidV1[2] & 0x0f) | 0x60;
  // 4 bajt z UUIDv1 możemy już przekopiować w całości na 8 bajt UUIDv6
  bytes[7] = uuidV1[3];
  // reszta bajtów jest bez zmiany, więc po prostu kopiujemy całość tablicy od 8 do 16 pozycji
  bytes.set(uuidV1.slice(8, 16), 8);
  // zwracamy wynik
  return bytes;
}

const NODE_ID = new Uint8Array([106, 112, 50, 103, 109, 100]);

console.log("v1", uuidToString(v1(NODE_ID)));
console.log("v6", uuidToString(v6(NODE_ID)));
console.log("v1", uuidToString(v1(NODE_ID)));
console.log("v6", uuidToString(v6(NODE_ID)));
console.log("v1", uuidToString(v1(NODE_ID)));
console.log("v6", uuidToString(v6(NODE_ID)));
console.log("v1", uuidToString(v1(NODE_ID)));
console.log("v6", uuidToString(v6(NODE_ID)));
