// przesunięcie timestampu
const EPOCH = 1288834974657;
// aktualny numer sekwencyjny
let sequence = 0;

// machineId to liczba, musi być mniejsza od 1024
function snowflake(machineId) {
  // inkrementujemy licznik sekwencji
  // dla uproszczenia ignorujemy zapobieganie przeskokom
  sequence = (sequence + 1) % 4096;
  // obliczamy znacznik czasu
  // używam tutaj BigInt, ponieważ domyślny typ liczbowy w JS nie jest 64-bitową liczbą całkowitą
  const timestamp = BigInt(Date.now() - EPOCH);
  // łączymy całość w jedną liczbę
  const result =
    (timestamp << 22n) | // 22 ponieważ 41 bitów przesuwamy żeby były od 63 bitu
    (BigInt(machineId) << 12n) | // 12, bo 10 bitów przesuwamy na 21 bit w przód
    BigInt(sequence); // tu zajmujemy ostatnie 12 bitów
  // zwracamy rezultat
  return result;
}

const MACHINE_ID = 213;

console.log(snowflake(MACHINE_ID));
console.log(snowflake(MACHINE_ID));
console.log(snowflake(MACHINE_ID));
console.log(snowflake(MACHINE_ID));
console.log(snowflake(MACHINE_ID));
