// funkcja sprawdzająca poprawność NIP
// zakładamy, że NIP jest ciągiem znaków
function isValidNIP(nip) {
  // tablica z wagami poszczególnych cyfr
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  // rozbijamy NIP na pojedyncze cyfry
  // i dokonujemy ich konwersji na typ liczbowy
  const digits = nip.split('').map(x => parseInt(x));
  // zmienna przechowująca sumę iloczynów cyfry i wagi
  let sum = 0;
  // pętla wykonująca mnożenia cyfr przez wagi
  // aby łatwo pominąć ostatnią cyfrę, iterować będziemy po tablicy wag
  for (let i = 0; i < weights.length; i++) {
    // do sumy dodajemy iloczyn wagi i cyfry
    sum += weights[i] * digits[i];
  }
  // obliczamy cyfrę kontrolną
  const checksum = sum % 11;
  // zwracamy, czy obliczona cyfra kontrolna jest taka sama
  // jak ostatnia cyfra NIP
  return checksum === digits.at(-1);
}

// przykładowy NIP z Wikipedii
console.log(isValidNIP('1234563218'))
// NIP z liczbą kontrolną 10
console.log(isValidNIP('1234567890'))