// a i b to ciągi znaków
function lev(a, b) {
  // przypadki, gdzie zwracamy długość drugiego ciągu
  if (b.length === 0) {
    return a.length;
  }
  if (a.length === 0) {
    return b.length;
  }
  // znaki są takie same
  if (a[0] === b[0]) {
    // w JavaScript "odciąć" pierwszy znak możemy funkcją slice
    return lev(a.slice(1), b.slice(1));
  }
  // pozostałe przypadki
  return 1 + Math.min(
    lev(a.slice(1), b),
    lev(a, b.slice(1)),
    lev(a.slice(1), b.slice(1))
  );
}

console.log('brawo', 'bramka', lev('brawo', 'bramka'));
console.log('bramka', 'brawo', lev('bramka', 'brawo'));
console.log('brama', 'brawo', lev('brama', 'brawo'));
console.log('gwizd', 'gwizd', lev('gwizd', 'gwizd'));
console.log('gwizd', '[pusty ciąg]', lev('gwizd', ''));
console.log('brama', 'brawo', lev('brama', 'brawo'));
console.log('świst', 'gwizdek', lev('świst', 'gwizdek'));
