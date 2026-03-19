// alfabet, z którego korzysta domyślnie Nano ID
// ciekawostka: w oryginale jest zmieniona kolejność znaków, aby zapewnić lepsze skompresowanie przez gzip lub Brotli
const ALPHABET =
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-";

// funkcja zwracająca Nano ID
// opcjonalnie można podać długość identyfikatora
function nanoid(length = 21) {
  // tym razem wynik przechowamy jako ciąg znaków
  let result = "";
  // odliczamy od 0 do zadanej długości
  for (let i = 0; i < length; i++) {
    // obliczamy indeks znaku w alfabecie na podstawie losowej wartości
    // UWAGA: jeśli generator liczb (pseudo)losowych zwraca nam liczby całkowite,
    // to lepiej jest zamiast reszty z dzielenia użyć operację bitową &,
    // zapewni to równomierny rozkład liczb losowych
    const index = Math.trunc(Math.random() * ALPHABET.length);
    // dodajemy znak z alfabetu do wyniku
    result += ALPHABET[index];
  }
  // zwracamy wynik
  return result;
}

console.log(nanoid());
console.log(nanoid());
console.log(nanoid());
console.log(nanoid());
console.log(nanoid(4));
console.log(nanoid(4));
console.log(nanoid(4));
console.log(nanoid(4));
