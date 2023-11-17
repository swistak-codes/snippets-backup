// a i b to ciągi znaków
function hamming(a, b) {
  // rzucamy błąd, jeśli ciągi są różnej długości
  if (a.length !== b.length) {
    throw new Error("Ciągi muszą być tej samej długości!");
  }
  // ustawiamy zmienną z wynikiem na wartość 0
  let result = 0;
  // iterujemy po kolejnych znakach
  for (let i = 0; i < a.length; i++) {
    // jeśli znaki są różne, zwiększamy wynik
    if (a[i] !== b[i]) {
      result++;
    }
  }
  // zwracamy wynik
  return result;
}

console.log('brama', 'brawo', hamming('brama', 'brawo'));
console.log('drukarz', 'piekarz', hamming('drukarz', 'piekarz'));
console.log('świstak', 'pelikan', hamming('świstak', 'pelikan'));
console.log('jan', 'jon', hamming('jan', 'jon'));
console.log('gwizd', 'gwizd', hamming('gwizd', 'gwizd'));

try {
  hamming('brawo', 'bramka');
} catch (e) {
  console.log('brawo', 'bramka', e.message);
}