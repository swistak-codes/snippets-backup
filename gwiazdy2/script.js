const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// określamy parametry okregu na podstawie rozmiaru płótna
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = canvas.width / 2 - 10;
const innerRadius = (radius * 2) / 4;

// funkcja obliczająca położenie wierzchołków
// count - liczba wierzchołków
// radius - promień okregu
// shift - przesunięcie kąta
function getVertices(count, radius, shift) {
  // wynikowa tablica
  const result = [];
  // odliczamy po kolei wierzchołki
  for (let i = 0; i < count; i++) {
    // obliczamy położenie na okręgu wierzchołka
    // robimy to poprzez obliczenie długości każdego łuku
    // a następnie pomnożenie, który wierzchołek nas interesuje
    // dodatkowo obracamy o 90 stopni (pi/2), aby czubek był na samej górze
    // a na końcu dodajemy przesunięcie
    const angle = ((Math.PI * 2) / count) * i - Math.PI / 2 + shift;
    // przekształcamy położenie na okręgu na współrzędne
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    // dodajemy do wynikowej tablicy
    result.push({ x, y });
  }
  // zwracamy wynik
  return result;
}

// funkcja rysująca gwiazdę
// verticesCount - liczba wierzchołków
function drawStar(verticesCount) {
  // obliczamy pozycje zewnętrznych wierzchołków
  const vertices = getVertices(verticesCount, radius, 0);
  // obliczamy przesunięcie wewnętrznych wierzchołków jako połowę długości łuku
  // ((Math.PI * 2) / verticesCount) / 2 == Math.PI / verticesCount
  const shift = Math.PI / verticesCount;
  // obliczamy pozycje wewnętrznych wierzchołków
  const verticesInner = getVertices(verticesCount, innerRadius, shift);
  // adnotujemy, że rozpoczynamy rysować ciągłą ścieżkę
  context.beginPath();
  // przesuwamy kursor na pozycję ostatniego wierzchołka zewnętrznego
  context.moveTo(verticesInner.at(-1).x, verticesInner.at(-1).y);
  // łączymy ze sobą kolejne wierzchołki
  for (let i = 0; i < verticesCount; i++) {
    context.lineTo(vertices[i].x, vertices[i].y);
    context.lineTo(verticesInner[i].x, verticesInner[i].y);
  }
  // zamykamy ścieżkę
  context.closePath();
  // ustalamy kolor pędzla na czarny
  context.strokeStyle = "black";
  // rysujemy kontur wzdłuż wyznaczonej ścieżki
  context.stroke();
  // możemy też wypełnić ją
  // context.fillStyle = "yellow";
  // context.fill();
}

drawStar(8, 3);
