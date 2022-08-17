// funkcja zwracająca wszystkie krawędzie grafu
function getAllEdges(graph) {
  // zmienna przechowująca wynik
  const result = [];
  // iterujemy po wszystkich elementach macierzy sąsiedztwa
  for (let i = 0; i < graph.length; i++) {
    for (let j = 0; j < graph[i].length; j++) {
      // jeśli istnieje krawędź, zapiszmy ją do wyniku
      if (graph[i][j] !== null) {
        result.push([i, j]);
      }
    }
  }
  // zwracamy pary krawędzi
  return result;
}

// funkcja zwracająca liczbę wierzchołków
function getVerticesCount(graph) {
  // w macierzy sąsiedztwa jej długość to liczba wierzchołków
  return graph.length;
}

// funkcja szukająca najkrótsze ścieżki algorytmem Bellmana-Forda
function getShortestPath(graph, start, getWeight) {
  // dla ułatwienia pobieramy zawczasu liczbę wierzchołków oraz krawędzie
  const vertices = getVerticesCount(graph);
  const edges = getAllEdges(graph);

  // etap 1 - inicjalizacja
  // tworzymy tablicę poprzedników i wypełniamy ją wartościami null
  const previous = Array(vertices).fill(null);
  // tworzymy tablicę odległości i wypełniamy ją nieskończonością
  const distance = Array(vertices).fill(Number.POSITIVE_INFINITY);
  // ustawiamy dystans do wierzchołka startowego na 0
  distance[start] = 0;

  // etap 2 - powtarzanie relaksacji
  // iterujemy V-1 razy
  for (let i = 0; i < vertices - 1; i++) {
    // iterujemy po wszystkich krawędziach
    for (const [u, v] of edges) {
      const newDistance = distance[u] + getWeight(u, v)

      // sprawdzamy, czy aktualna ścieżka jest krótsza od znanej
      if (distance[v] > newDistance) {
        // ustawiamy nową ścieżkę
        distance[v] = newDistance;
        previous[v] = u;
      }
    }
  }

  // etap 3 - znalezienie cykli
  // iterujemy po wszystkich krawędziach
  for (const [u, v] of edges) {
    // jeśli warunek znany z relaksacji jest prawdziwy, mamy cykl
    if (distance[v] > distance[u] + getWeight(u, v)) {
      throw new Error('Znaleziono cykl z wagami ujemnymi');
    }
  }

  return {
    distance,
    previous
  };
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
  [null, 5, null, null, null, 1, null, null, 3],
  [null, null, -1, 3, null, null, null, null, null],
  [null, null, null, null, 2, null, null, null, 1],
  [null, null, null, null, null, 2, null, null, null],
  [null, null, null, null, null, null, null, 4, null],
  [1, null, null, -2, null, null, null, null, null],
  [null, null, null, null, null, 0, null, null, null],
  [null, null, null, null, null, null, 1, null, null],
  [null, null, null, null, -2, null, 6, null, null],
];

// funkcja generująca funkcję wagowa
function generateWeightFunction(graph) {
  return (u, v) => graph[u][v];
}

// generujemy najkrótsze ścieżki od wierzchołka 0
const result = getShortestPath(graph, 0, generateWeightFunction(graph));

// generujemy ścieżki do wszystkich wierzchołków od wierzchołka 0
// oraz wypisujemy ich długość
for (let i = 1; i < graph.length; i++) {
  console.log(constructShortestPath(result.previous, 0, i), result.distance[i]);
}
