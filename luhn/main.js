// funkcja generująca sumę kontrolną dla numeru
// zakładam, że numer jest stringiem
function generateChecksum(number) {
  // rozbijamy numer na pojedyncze cyfry
  // i dokonujemy ich konwersji na typ liczbowy,
  // a następnie odwracamy tablicę
  const digits = number.split('').map(x => parseInt(x)).reverse();
  // zmienna przechowująca sumę
  let sum = 0;
  // pętla obliczająca sumę
  for (let i = 0; i < digits.length; i++) {
    // sprawdzamy czy aktualna cyfra jest na parzystej pozycji
    const isEven = (i + 1) % 2 === 0;
    if (isEven) {
      // w przypadku parzystych, po prostu sumujemy
      sum += digits[i];
    } else {
      // w przeciwnym przypadku mnożymy przez 2
      const tmp = digits[i] * 2;
      // dodajemy odpowiednią liczbę do sumy
      if (tmp > 9) {
        sum += tmp - 9;
      } else {
        sum += tmp;
      }
    }
  }
  return (10 - (sum % 10)) % 10;
}

// funkcja sprawdzająca poprawność numeru
// zakładam, że numer jest stringiem
function isValid(number) {
  // tablica do obliczania wyniku sumowania dwóch cyfr
  const sumArray = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9];
  // rozbijamy numer na pojedyncze cyfry
  // i dokonujemy ich konwersji na typ liczbowy,
  // a następnie odwracamy tablicę
  const digits = number.split('').map(x => parseInt(x)).reverse();
  // zmienna przechowująca sumę
  let sum = 0;
  // pętla obliczająca sumę
  for (let i = 0; i < digits.length; i++) {
    // sprawdzamy czy aktualna cyfra jest na parzystej pozycji
    const isEven = (i + 1) % 2 === 0;
    if (isEven) {
      // w przypadku parzystych, mnożymy przez 2
      sum += sumArray[digits[i]];
    } else {
      // w przeciwnym przypadku dodajemy
      sum += digits[i];
    }
  }
  return sum % 10 === 0;
}

// własny przykłąd
console.log(generateChecksum('03503650353'));
console.log(isValid('035036503530'));
console.log(isValid('035036503536'));

// przykłady z rosetta code
console.log(generateChecksum('6178937299'));
console.log(isValid('61789372994'));

console.log(generateChecksum('4992739871'));
console.log(isValid('49927398717'));

console.log(generateChecksum('123456781234567'));
console.log(isValid('1234567812345678'));
console.log(isValid('1234567812345670'));

// przykład z wikipedii
console.log(generateChecksum('7992739871'));
console.log(isValid('79927398713'));