// funkcja zwracająca listę wszystkich wierzchołków
function getAllNodes(graph) {
  // wierzchołki to liczby od 0 do N, gdzie N to rozmiar macierzy
  return [...Array(graph.length).keys()];
}

// funkcja zwracająca sąsiadów wierzchołka
function getNeighbors(graph, node) {
  const result = [];
  // iterujemy po wierszu reprezentującym skąd dojdziemy ze wskazanego wierzchołka
  for (let i = 0; i < graph.length; i++) {
    const edge = graph[node][i];
    if (edge > 0) {
      result.push(i);
    }
  }
  return result;
}

// funkcja przechodząca po grafie BFSem
// zwraca listę poprzedników wierzchołków
function traverse(graph, startNode) {
  // tworzymy zbiór odwiedzonych wierzchołków
  const visited = new Set();
  // tworzymy kolejkę przechowująca wierzchołki
  const queue = [startNode];
  // tworzymy listę poprzedników
  const previous = getAllNodes(graph).fill(null);
  // przechodzimy graf tak długo, aż kolejka będzie pusta
  while (queue.length > 0) {
    // ściągamy wierzchołek z kolejki
    const node = queue.shift();
    // dodajemy go do listy odwiedzonych
    visited.add(node);
    // przechodzimy po sąsiadach
    for (const neighbor of getNeighbors(graph, node)) {
      // interesują nas tylko nieodwiedzone
      if (!visited.has(neighbor)) {
        // dodajemy wierczhołek do kolejki
        queue.push(neighbor);
        // ustawiamy jego poprzednika
        if (previous[neighbor] === null) {
          previous[neighbor] = node;
        }
      }
    }
  }
  // zwracamy listę poprzedników
  return previous;
}

// funkcja wypisująca najkrótszą ścieżkę między dwoma wierzchołkami
// dodatkowy argument to akumulator wyniku
function constructShortestPath(previous, startNode, endNode, result = []) {
  if (startNode === endNode) {
    // dodajemy wierzchołek do wyniku jeśli początek i wynik są takie same
    result.push(startNode);
  } else if (previous[endNode] === null) {
    // ścieżka nie istnieje
    result.push('brak ścieżki');
  } else {
    // wywołujemy rekurencyjnie funkcję dla poprzednika
    constructShortestPath(previous, startNode, previous[endNode], result);
    // dodajemy węzeł końcowy do wyniku
    result.push(endNode);
    // zwracamy wynik
    return result;
  }
}

// przykładowy graf z wieloma połączeniami
const graph = [
  [0, 1, 0, 0, 0, 1, 0, 0, 1],
  [0, 0, 1, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 0, 0, 0, 1],
  [0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 1, 0],
  [1, 0, 0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 0, 0, 1, 0, 1, 0, 0],
];

// tworzymy listę poprzedników
// warto ją wygenerować raz i używać do wyznaczania wielu ścieżek
const previous = traverse(graph, 0);

// generujemy ścieżki do wszystkich wierzchołków od wierzchołka 0
for (let i = 1; i < graph.length; i++) {
  console.log(constructShortestPath(previous, 0, i));
}
