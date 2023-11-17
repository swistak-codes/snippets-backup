const crypto = require('crypto');
const { performance } = require('perf_hooks');

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

function randomString(length) {
  return crypto.randomBytes(length).toString('hex');
}

// odliczajmy od 1 do największej wartości całkowitej w JS
for (let i = 1; i < Number.MAX_SAFE_INTEGER; i++) {
  const a = randomString(i);
  const b = randomString(i);
  console.log('Iteracja', i);
  performance.mark('start');
  lev(a, b);
  performance.mark('stop');
  console.log(performance.measure('', 'start', 'stop').duration, '👍');
}