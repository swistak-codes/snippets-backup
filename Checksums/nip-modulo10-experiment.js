// funkcja wyliczająca sumę kontrolną NIP
function calculateChecksum(nip, modulo) {
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
  // zwracamy cyfrę kontrolną
  return sum % modulo;
}

// przykładowy NIP z Wikipedii, sprawdzamy prawdziwą sumę kontrolną:
console.log('Prawdziwa suma kontrolna: ', calculateChecksum('123456321', 11))
// suma kontrolna modulo 10:
console.log('Suma kontrolna mod 10: ', calculateChecksum('123456321', 10))
// po zmianie o 5 numeru na pozycji z wagą parzystą, modulo 10:
console.log('Po zafałszowaniu (suma mod 10): ', calculateChecksum('123456371', 10))
// po zmianie o 5 numeru na pozycji z wagą parzystą, modulo 11:
console.log('Po zafałszowaniu (suma mod 11): ', calculateChecksum('123456371', 11))