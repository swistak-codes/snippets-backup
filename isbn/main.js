// funkcja generująca sumę kontrolną dla ISBN
// zakładam, że numer jest stringiem i podany bez myślników
function generateISBNChecksum(isbn) {
  // rozbijamy ISBN na pojedyncze cyfry
  // i dokonujemy ich konwersji na typ liczbowy
  const digits = isbn.split('').map(x => parseInt(x));
  // zmienna przechowująca sumę iloczynów cyfry i wag
  let sum = 0;
  // pętla wykonująca mnożenia cyfr przez wagi
  for (let i = 0; i < digits.length; i++) {
    // decydujemy jaką wagę ma cyfra w zależności od jej pozycji
    const weight = (i + 1) % 2 === 0 ? 3 : 1;
    // do sumy dodajemy iloczyn wagi i cyfry
    sum += weight * digits[i];
  }
  // zwracamy cyfrę kontrolną
  return (10 - sum % 10) % 10;
}

// funkcja sprawdzająca sumę kontrolną dla ISBN
// zakładam, że numer jest stringiem i podany bez myślników
function isValidISBN(isbn) {
  // rozbijamy ISBN na pojedyncze cyfry
  // i dokonujemy ich konwersji na typ liczbowy
  const digits = isbn.split('').map(x => parseInt(x));
  // zmienna przechowująca sumę iloczynów cyfry i wag
  let sum = 0;
  // pętla wykonująca mnożenia cyfr przez wagi
  for (let i = 0; i < digits.length; i++) {
    // decydujemy jaką wagę ma cyfra w zależności od jej pozycji
    const weight = (i + 1) % 2 === 0 ? 3 : 1;
    // do sumy dodajemy iloczyn wagi i cyfry
    sum += weight * digits[i];
  }
  // zwracamy czy obliczona suma jest podzielna przez 10
  return sum % 10 === 0;
}

console.log(generateISBNChecksum('978316148410'));
console.log(isValidISBN('9783161484100'));
console.log(isValidISBN('9783161484101'));