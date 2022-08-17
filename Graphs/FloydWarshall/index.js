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

// funkcja zwracająca listę wszystkich wierzchołków
function getAllNodes(graph) {
  // wierzchołki to liczby od 0 do N, gdzie N to rozmiar macierzy
  return [...Array(graph.length).keys()];
}

// funkcja szukająca najkrótsze ścieżki algorytmem Floyda-Warshalla
function getShortestPath(graph, getWeight) {
  // pobieramy wszystkie wierzchołki
  const vertices = getAllNodes(graph);
  // inicjalizujemy macierz odległości
  const distance = Array(vertices.length).fill().map(() => Array(vertices.length).fill(Number.POSITIVE_INFINITY));
  // inicjalizujemy macierz następników
  const next = Array(vertices.length).fill().map(() => Array(vertices.length).fill(null));
  // ustawiamy wartości w macierzach dla krawędzi
  for (const [u, v] of getAllEdges(graph)) {
    distance[u][v] = getWeight(u, v);
    next[u][v] = v;
  }
  // ustawiamy wartości w macierzach dla wierzchołków
  for (const v of vertices) {
    distance[v][v] = 0;
    next[v][v] = v;
  }
  // główna, potrójna pętla algorytmu; my będziemy iterować od 0
  for (let k = 0; k < vertices.length; k++) {
    for (let i = 0; i < vertices.length; i++) {
      for (let j = 0; j < vertices.length; j++) {
        const newDistance = distance[i][k] + distance[k][j];
        // sprawdzamy czy aktualna ścieżka jest mniejsza
        if (distance[i][j] > newDistance) {
          // przypisujemy nową odległość
          distance[i][j] = newDistance;
          // przypisujemy poprawnego następnika
          next[i][j] = next[i][k];
        }
      }
    }
  }

  return {
    distance,
    next
  }
}

// funkcja wypisująca najkrótszą ścieżkę między dwoma wierzchołkami
function constructShortestPath(next, startNode, endNode) {
  // jeśli nie ma drogi, zwracamy pustą tablicę
  if (next[startNode][endNode] === null) {
    return [];
  }
  // ścieżkę zaczynamy od startego węzła
  const result = [startNode];
  // tak długo jak u jest różny od końcowego węzłą...
  let u = startNode;
  while (u !== endNode) {
    // pobieramy następnik
    u = next[u][endNode];
    // dodajemy go do rezultatu
    result.push(u);
  }
  return result;
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
const result = getShortestPath(graph, generateWeightFunction(graph));

// generujemy ścieżki do wszystkich par wierzchołków
// oraz wypisujemy ich długość
for (let i = 0; i < graph.length; i++) {
  console.log(`${i}:`);
  for (let j = 0; j < graph.length; j++) {
    if (i === j) {
      continue;
    }
    console.log(
      constructShortestPath(result.next, i, j).join('->') + 
      ', długość ' +
      result.distance[i][j]
    );
  }
  console.log('---')
}