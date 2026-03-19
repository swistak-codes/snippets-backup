// a i b to ciągi znaków
function lev(a, b) {
  // tworzymy tablicę dwuwymiarową, o rozmiarze |a|+1,|b|+1 (miejsce na pusty ciąg)
  // niestety w JS nie jest to tak proste jak w innych językach
  // normalnie wystarczyłoby zrobić coś w stylu `new int[a.length + 1][b.length + 1]`
  const distances = Array.from(Array(a.length + 1), () => new Array(b.length + 1));
  // uzupełniamy pierwszą kolumnę
  for (let i = 0; i < distances.length; i++) {
    distances[i][0] = i;
  }
  // uzupełniamy pierwszy wiersz
  for (let i = 0; i < distances[0].length; i++) {
    distances[0][i] = i;
  }
  // iterujemy po kolejnych komórkach, wiersz po wierszu
  for (let i = 1; i < distances.length; i++) {
    for (let j = 1; j < distances[i].length; j++) {
      // sprawdźmy czy znaki są takie same
      // musimy sprawdzić liczniki o 1 wstecz
      if (a[i - 1] === b[i - 1]) {
        // jeśli są takie same, to przepisujemy poprzednią wartość
        distances[i][j] = distances[i - 1][j - 1];
      } else {
        // w przeciwnym przypadku bierzemy najmniejszą z sąsiadujących wartości
        // i dodajemy do niej 1
        distances[i][j] = 1 + Math.min(
          distances[i - 1][j],
          distances[i][j - 1],
          distances[i - 1][j - 1]
        );
      }
    }
  }
  // zwracamy wynik, który znajduje się w ostatnim wierszu, w ostatniej kolumnie
  return distances.at(-1).at(-1)
}

console.log('brawo', 'bramka', lev('brawo', 'bramka'));
console.log('bramka', 'brawo', lev('bramka', 'brawo'));
console.log('brama', 'brawo', lev('brama', 'brawo'));
console.log('gwizd', 'gwizd', lev('gwizd', 'gwizd'));
console.log('gwizd', '[pusty ciąg]', lev('gwizd', ''));
console.log('brama', 'brawo', lev('brama', 'brawo'));
console.log('świst', 'gwizdek', lev('świst', 'gwizdek'));