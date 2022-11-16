function isValidRomanNumeral(numeral) {
  const regex = /^M{0,3}(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$/;
  return regex.test(numeral);
}

// poprawne
console.log(isValidRomanNumeral('I'));
console.log(isValidRomanNumeral('IV'));
console.log(isValidRomanNumeral('V'));
console.log(isValidRomanNumeral('VIII'));
console.log(isValidRomanNumeral('MCM'));
console.log(isValidRomanNumeral('MMMCMXCIX'));
// niepoprawne
console.log(isValidRomanNumeral('I1')); // zły symbol
console.log(isValidRomanNumeral('CMM')); // zła kolejność (najpierw mniejsza, potem większa)
console.log(isValidRomanNumeral('XCX')); // zła kolejność (najpierw większa, potem mniejsza, jednak zapis jest niepoprawny, bo sumując otrzymujemy wartość opisaną innym symbolem)
console.log(isValidRomanNumeral('IIII')); // 4 powtórzenia
console.log(isValidRomanNumeral('XD')); // złe połączenie do odejmowania