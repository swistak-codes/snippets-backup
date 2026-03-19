// funkcja obliczająca NWD oraz rozwiązanie równania diofantycznego
// a i b są liczbami całkowitymi
function extendedGCD(a, b) {
  if (b === 0) {
    // jeśli b jest równe 0, to NWD(a, 0) = a
    // wówczas x = 1, y = 0
    return [a, 1, 0];
  }
  // wywołanie rekurencyjne, takie samo jak w tradycyjnym algorytmie Euklidesa
  const [gcd, x1, y1] = extendedGCD(b, a % b);
  // nowy x to y z poprzedniego kroku
  const x = y1;
  // natomiast nowy y następująco:
  const y = x1 - Math.floor(a / b) * y1;
  // zwracamy rezultat jako krotkę zawierającą NWD, x i y
  return [gcd, x, y];
}

// funkcja obliczająca odwrotność modularną
function modularInverse(a, m) {
  // pobieramy NWD oraz rozwiązanie równania diofantycznego
  const [gcd, x] = extendedGCD(a, m);
  // sprawdzenie, czy odwrotność modularna istnieje
  if (gcd !== 1) {
    throw new Error(
      `Odwrotność modularna nie istnieje dla a = ${a} i m = ${m}`,
    );
  }
  // sprowadzamy x do przedziału [0, m-1]
  return ((x % m) + m) % m;
}

// funkcja obliczająca wynik z chińskiego twierdzenia o resztach
// a i m są tablicami liczb całkowitych
function chineseRemainderTheorem(a, m) {
  // obliczenie iloczynu wszystkich modułów
  let M = 1;
  for (let i = 0; i < m.length; i++) {
    M *= m[i];
  }
  // obliczenie wszystkich M_i
  const M_i = [];
  for (let i = 0; i < m.length; i++) {
    M_i.push(M / m[i]);
  }
  // obliczenie e_i
  const e = [];
  for (let i = 0; i < m.length; i++) {
    e.push(modularInverse(M_i[i], m[i]) * M_i[i]);
  }
  // obliczenie n, czyli wyniku
  let n = 0;
  for (let i = 0; i < a.length; i++) {
    n = (n + a[i] * e[i]) % M;
  }
  // zwrócenie wyniku
  return [n, M];
}

// x ≡ 2 (mod 3), x ≡ 3 (mod 5), x ≡ 2 (mod 7)
// spodziewany wynik: 23 mod 105
console.log(chineseRemainderTheorem([2, 3, 2], [3, 5, 7]));

// x ≡ 0 (mod 2), x ≡ 3 (mod 5), x ≡ 4 (mod 7)
// spodziewany wynik: 18 mod 70
console.log(chineseRemainderTheorem([0, 3, 4], [2, 5, 7]));

// przypadek bez rozwiązania (moduły nie są wzajemnie pierwsze)
try {
  console.log(chineseRemainderTheorem([2, 3], [4, 6]));
} catch (error) {
  console.log(error.message);
}
