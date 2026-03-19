const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");

// określamy parametry okregu na podstawie rozmiaru płótna
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = canvas.width / 2 - 10;

// funkcja obliczająca położenie wierzchołków
// count - liczba wierzchołków
function getVertices(count) {
  // wynikowa tablica
  const result = [];
  // odliczamy po kolei wierzchołki
  for (let i = 0; i < count; i++) {
    // obliczamy położenie na okręgu wierzchołka
    // robimy to poprzez obliczenie długości każdego łuku
    // a następnie pomnożenie, który wierzchołek nas interesuje
    // dodatkowo obracamy o 90 stopni (pi/2), aby czubek był na samej górze
    const angle = ((Math.PI * 2) / count) * i - Math.PI / 2;
    // przekształcamy położenie na okręgu na współrzędne
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    // dodajemy do wynikowej tablicy
    result.push({ x, y });
  }
  // zwracamy wynik
  return result;
}

// zbiór odwiedzonych wierzchołków
const visited = new Set();

// funkcja łącząca ze sobą wierzchołki
// startIndex - indeks wierzchołka od którego zaczynamy rysować
// vertices - tablica współrzędnych wierzchołków
// step - co który wierzchołek ze sobą łączymy
function connectVertices(startIndex, vertices, step) {
  // przenosimy się na pozycję pierwszego wierzchołka
  context.moveTo(vertices[startIndex].x, vertices[startIndex].y);
  // zmienna, która przechowa indeks aktualnego wierzchołka
  let current = startIndex;
  // pętla rysująca linie; musi wykonać się conajmniej raz
  // wykonujemy ją tak długo, aż aktualny wierzchołek znowu będzie początkowym
  do {
    // zmieniamy indeks aktualnego wierzchołka robiąc przeskok o `step`
    // robimy modulo liczbę wierzchołków, aby zagwarantować przejście za pierwszy wierzchołek
    current = (current + step) % vertices.length;
    // rysujemy linię z aktualnego punktu do aktualnego wierzchołka
    // przeniesie to od razu naszą pozycję na to miejsce, więc nie musimy znowu robić `moveTo`
    context.lineTo(vertices[current].x, vertices[current].y);
    // dodajemy wierzchołek do listy odwiedzonych
    visited.add(current);
  } while (current !== startIndex);
}

// funkcja rysująca gwiazdę
// verticesCount - liczba wierzchołków
// step - co którt wierzchołek łączymy ze sobą
function drawStar(verticesCount, step) {
  // obliczamy pozycje wierzchołków
  const vertices = getVertices(verticesCount);
  // czyścimy zbiór odwiedzonych wierzchołków
  visited.clear();
  // adnotujemy, że rozpoczynamy rysować ciągłą ścieżkę
  context.beginPath();
  // iterujemy od 0 do połowy liczby wierzchołków, aby mieć pewność, że narysujemy wszystkie połączenia
  for (let i = 0; i < verticesCount / 2; i++) {
    // jeśli wierzchołek był już wykorzystany przy rysowaniu, pomijamy
    if (visited.has(i)) {
      continue;
    }
    // wywołujemy funkcję rysującą, aby zaczynała od aktualnego wierzchołka
    connectVertices(i, vertices, step);
  }
  // zamykamy ścieżkę
  context.closePath();
  // ustalamy kolor pędzla na czarny
  context.strokeStyle = "black";
  // rysujemy kontur wzdłuż wyznaczonej ścieżki
  context.stroke();
  // możemy też wypełnić ją, wówczas uzyskamy zwykłą gwiazdę
  // context.fillStyle = "yellow";
  // context.fill();
}

drawStar(8, 3);
