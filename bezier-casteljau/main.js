// funkcja obliczająca punkt na krzywej Béziera 
// dla wskazanego t i punktów kontrolnych `points`
// zakładam, że każdy punkt to dwuelementowa tablica
function deCasteljau(t, points) {
  // iterujemy tak długo, jak mamy więcej niż 1 punkt kontrolny
  // będziemy nadpisywać tablicę punktów nową, zmniejszając za każdym razem jej rozmiar
  while (points.length > 1) {
    // tworzymy tablicę, w której zapiszemy zestaw nowych punktów
    const midpoints = [];
    // odliczamy kolejne punkty, aby obliczać nowe z dwóch sąsiadujących ze sobą
    for (let i = 0; i < points.length - 1; i++) {
      // wyciągamy sąsiadujące ze sobą punkty kontrolne
      const [point1X, point1Y] = points[i];
      const [point2X, point2Y] = points[i + 1];
      // obliczamy interpolację liniową między tymi punktami
      const x = point1X + (point2X - point1X) * t;
      const y = point1Y + (point2Y - point1Y) * t;
      // dodajemy nowy punkt do tymczasowej tablicy
      midpoints.push([x, y]);
    }
    // podmieniamy tablicę punktów na nowo utworzoną
    points = midpoints;
  }
  // w tym momencie został nam już tylko jeden punkt, który jest szukanym przez nas
  return points[0];
}

// przykładowe wywołania
// pojedynczy punkt
console.log(deCasteljau(0, [[1, 1]])); // [1, 1]
console.log(deCasteljau(0.5, [[1, 1]])); // [1, 1]
console.log(deCasteljau(1, [[1, 1]])); // [1, 1]
// dwa punkty kontrolne
console.log(deCasteljau(0, [[1, 1], [3, 3]])); // [1, 1]
console.log(deCasteljau(0.2, [[1, 1], [3, 3]])); // [1.4, 1.4]
console.log(deCasteljau(0.5, [[1, 1], [3, 3]])); // [2, 2]
console.log(deCasteljau(0.7, [[1, 1], [3, 3]])); // [2.4, 2.4]
console.log(deCasteljau(1, [[1, 1], [3, 3]])); // [3, 3]
// trzy punkty na jednej prostej
console.log(deCasteljau(0, [[1, 1], [2, 2], [3, 3]])); // [1, 1]
console.log(deCasteljau(0.2, [[1, 1], [2, 2], [3, 3]])); // [1.5, 1.5]
console.log(deCasteljau(0.5, [[1, 1], [2, 2], [3, 3]])); // [2, 2]
console.log(deCasteljau(0.7, [[1, 1], [2, 2], [3, 3]])); // [2.5, 2.5]
console.log(deCasteljau(1, [[1, 1], [2, 2], [3, 3]])); // [3, 3]
// krzywa definiowana przez cztery punkty kontrolne
console.log(deCasteljau(0, [[1, 0], [3, 3], [6, 3], [8, 1]])); // [1, 0] 
console.log(deCasteljau(0.2, [[1, 0], [3, 3], [6, 3], [8, 1]])); // [2.304, 1.448]
console.log(deCasteljau(0.5, [[1, 0], [3, 3], [6, 3], [8, 1]])); // [4.5, 2.375]
console.log(deCasteljau(0.7, [[1, 0], [3, 3], [6, 3], [8, 1]])); // [5.984, 2.233]
console.log(deCasteljau(1, [[1, 0], [3, 3], [6, 3], [8, 1]])); // [8, 1]