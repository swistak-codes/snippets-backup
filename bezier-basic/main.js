// dla drobnej optymalizacji, zrobimy zapamiętywanie wyników obliczeń symbolu Newtona
const newtonResults = new Map();

// funkcja obliczająca rekurencyjnie symbol Newtona
function newtonRec(n, k) {
  if (newtonResults.has(`${n},${k}`)) {
    return newtonResults.get(`${n},${k}`);
  }
  if (k === 0 || k === n) {
    return 1;
  }
  return newton(n - 1, k) + newton(n - 1, k - 1);
}

// funkcja która wywoła obliczanie symbolu Newtona i zapamięta wynik
function newton(n, k) {
  // obliczamy wartość
  const result = newtonRec(n, k);
  // zapamiętujemy wynik
  newtonResults.set(`${n},${k}`, result);
  // zwracamy zapamiętany wynik
  return result;
}

// funkcja obliczająca punkt na krzywej Béziera 
// dla wskazanego t i punktów kontrolnych `points`
// zakładam, że każdy punkt to dwuelementowa tablica
function bezier(t, points) {
  // zmienne przechowujące sumę dla poszczególnych współrzędnych
  let resultX = 0;
  let resultY = 0;
  // dla uproszczenia wyciągamy n
  const n = points.length - 1;
  // obliczamy punkt wg wzoru
  for (let i = 0; i <= n; i++) {
    // wyciągamy współrzędne punktu kontrolnego
    const x = points[i][0];
    const y = points[i][1];
    // obliczamy wspólną część dla X i Y
    const coefficient = newton(n, i) * (t ** i) * ((1 - t) ** (n - i));
    // zwiększamy odpowiednio wyniki
    resultX += x * coefficient;
    resultY += y * coefficient;
  }
  // zwracamy rezultat jako tablicę dwuelementową
  return [resultX, resultY];
}

// przykładowe wywołania
// pojedynczy punkt
console.log(bezier(0, [[1, 1]])); // [1, 1]
console.log(bezier(0.5, [[1, 1]])); // [1, 1]
console.log(bezier(1, [[1, 1]])); // [1, 1]
// dwa punkty kontrolne
console.log(bezier(0, [[1, 1], [3, 3]])); // [1, 1]
console.log(bezier(0.2, [[1, 1], [3, 3]])); // [1.4, 1.4]
console.log(bezier(0.5, [[1, 1], [3, 3]])); // [2, 2]
console.log(bezier(0.7, [[1, 1], [3, 3]])); // [2.4, 2.4]
console.log(bezier(1, [[1, 1], [3, 3]])); // [3, 3]
// trzy punkty na jednej prostej
console.log(bezier(0, [[1, 1], [2, 2], [3, 3]])); // [1, 1]
console.log(bezier(0.2, [[1, 1], [2, 2], [3, 3]])); // [1.5, 1.5]
console.log(bezier(0.5, [[1, 1], [2, 2], [3, 3]])); // [2, 2]
console.log(bezier(0.7, [[1, 1], [2, 2], [3, 3]])); // [2.5, 2.5]
console.log(bezier(1, [[1, 1], [2, 2], [3, 3]])); // [3, 3]
// krzywa definiowana przez cztery punkty kontrolne
console.log(bezier(0, [[1, 0], [3, 3], [6, 3], [8, 1]])); // [1, 0] 
console.log(bezier(0.2, [[1, 0], [3, 3], [6, 3], [8, 1]])); // [2.304, 1.448]
console.log(bezier(0.5, [[1, 0], [3, 3], [6, 3], [8, 1]])); // [4.5, 2.375]
console.log(bezier(0.7, [[1, 0], [3, 3], [6, 3], [8, 1]])); // [5.984, 2.233]
console.log(bezier(1, [[1, 0], [3, 3], [6, 3], [8, 1]])); // [8, 1]