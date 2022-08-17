// wykorzystamy gotową implementację kopca Fibonacciego stąd: https://www.npmjs.com/package/@tyriar/fibonacci-heap
const { FibonacciHeap } = require('@tyriar/fibonacci-heap');

// funkcja zwracająca sąsiadów wierzchołka
function getNeighbors(graph, node) {
  const result = [];
  // iterujemy po wierszu reprezentującym skąd dojdziemy ze wskazanego wierzchołka
  for (let i = 0; i < graph.length; i++) {
    const edge = graph[node][i];
    if (edge !== null) {
      result.push(i);
    }
  }
  return result;
}

// funkcja zwracająca listę wszystkich wierzchołków
function getAllNodes(graph) {
  // wierzchołki to liczby od 0 do N, gdzie N to rozmiar macierzy
  return [...Array(graph.length).keys()];
}

// funkcja szukająca najkrótsze ścieżki algorytmem Bellmana-Forda
function getShortestPath(graph, start, getWeight) {
  // pobieramy tablicę wierzchołków
  const vertices = getAllNodes(graph);
  // tworzymy tablicę poprzedników i wypełniamy ją wartościami null
  const previous = Array(vertices.length).fill(null);
  // tworzymy tablicę odległości i wypełniamy ją nieskończonością
  const distance = Array(vertices.length).fill(Number.POSITIVE_INFINITY);
  // ustawiamy dystans do wierzchołka startowego na 0
  distance[start] = 0;
  // tworzymy kolejkę priorytetową
  const queue = new FibonacciHeap();
  // dodajemy wierzchołki do kolejki; ze względu na implementację kolejki
  // musimy przechować referencje do wierzchołków w niej;
  // jeżeli napiszesz kolejkę samodzielnie, można tego uniknąć
  const queueNodes = Array(vertices.length);
  for (let i = 0; i < vertices.length; i++) {
    queueNodes[i] = queue.insert(distance[i], i);
  }
  // dopóki kolejka nie jest pusta...
  while (!queue.isEmpty()) {
    // ściągamy wierzchołek o najmniejszym priorytecie
    const u = queue.extractMinimum().value;
    // dla każdego wierzchołka sąsiadującego...
    for (const v of getNeighbors(graph, u)) {
      const newDistance = distance[u] + getWeight(u, v)
      // sprawdzamy, czy aktualna ścieżka jest krótsza od znanej
      if (distance[v] > newDistance) {
        // ustawiamy nową ścieżkę
        distance[v] = newDistance;
        previous[v] = u;
        // aktualizujemy priorytet w kolejce
        queue.decreaseKey(queueNodes[v], newDistance);
      }
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
  [null, null, 1, 3, null, null, null, null, null],
  [null, null, null, null, 2, null, null, null, 1],
  [null, null, null, null, null, 2, null, null, null],
  [null, null, null, null, null, null, null, 4, null],
  [1, null, null, 0, null, null, null, null, null],
  [null, null, null, null, null, 0, null, null, null],
  [null, null, null, null, null, null, 1, null, null],
  [null, null, null, null, 1, null, 6, null, null],
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
