// funkcja sprawdzająca poprawność numeru PESEL
// zakładamy, że PESEL jest ciągiem znaków
function isValidPESEL(pesel) {
  // tablica z wagami poszczególnych cyfr
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  // rozbijamy PESEL na pojedyncze cyfry
  // i dokonujemy ich konwersji na typ liczbowy
  const digits = pesel.split('').map(x => parseInt(x));
  // zmienna przechowująca sumę iloczynów cyfry i wagi
  let sum = 0;
  // pętla wykonująca mnożenia cyfr przez wagi
  // aby łatwo pominąć ostatnią cyfrę, iterować będziemy po tablicy wag
  for (let i = 0; i < weights.length; i++) {
    // do sumy dodajemy iloczyn wagi i cyfry modulo 10
    // modulo 10 wydobywa nam ostatnią cyfrę dwucyfrowej liczby
    sum += weights[i] * digits[i] % 10;
  }
  // obliczamy cyfrę kontrolną
  const checksum = (10 - sum % 10) % 10;
  // zwracamy, czy obliczona cyfra kontrolna jest taka sama
  // jak ostatnia cyfra numeru PESEL
  return checksum === digits.at(-1);
}

// przykładowy PESEL ze strony gov.pl
console.log(isValidPESEL('02070803628'))
// PESEL który daje 10-0 przy obliczaniu cyfry kontrolnej
console.log(isValidPESEL('55030101230'))
// losowy ciąg cyfr
console.log(isValidPESEL('12345678901'))
// pozornie poprawny numer, również losowy
console.log(isValidPESEL('88021374206'))
// powyższy, ale z ręcznie obliczoną cyfrą kontrolną
console.log(isValidPESEL('88021374203'))