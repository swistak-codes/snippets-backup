const { performance } = require("node:perf_hooks");
const fs = require("node:fs");

// funkcja do parsowania pliku .tsp
function parseTSP(fileContent) {
  const lines = fileContent.split("\n");
  const nodes = new Map();
  let isNodeSection = false;
  for (let line of lines) {
    line = line.trim();
    if (line === "NODE_COORD_SECTION") {
      isNodeSection = true;
      continue;
    }
    if (line === "EOF") {
      break;
    }
    if (isNodeSection) {
      const parts = line.split(/\s+/);
      if (parts.length === 3) {
        const nodeId = parseInt(parts[0]);
        const x = parseFloat(parts[1]);
        const y = parseFloat(parts[2]);
        nodes.set(nodeId, { x, y });
      }
    }
  }
  return nodes;
}

// odczytujemy dane z pliku att48.tsp ze zbioru TSPLIB
// att48 zawiera współrzędne stolic 48 kontynentalnych stanów USA
// dla naszych testów będziemy używać jedynie wycinek danych
const data = fs.readFileSync("att48.tsp", "utf8");
const nodes = parseTSP(data);

// funkcja obliczająca odległość między dwoma wierzchołkami
// liczymy tutaj odległość zgodnie z instrukcją z TSPLIB
function distance(a, b) {
  const nodeA = nodes.get(a);
  const nodeB = nodes.get(b);
  if (!nodeA || !nodeB) {
    throw new Error(`Nie znaleziono wierzchołków ${a} i/lub ${b}`);
  }
  const xd = nodeA.x - nodeB.x;
  const yd = nodeA.y - nodeB.y;
  const rij = Math.sqrt((xd * xd + yd * yd) / 10.0);
  const tij = Math.round(rij);
  return tij < rij ? tij + 1 : tij;
}

// funkcja do tworzenia klucza dla memoizacji zbiorów
function memoKey(visitedSet, last) {
  // klucz jest unikalny dla danego zbioru odwiedzonych miast i ostatniego miasta
  const visitedKey = [...visitedSet].sort().join(",");
  return `${visitedKey},${last}`;
}

// funkcja znajdująca najkrótszą ścieżkę w grafie
// nodes jest typu number[]
function tsp(nodes) {
  // zmierzymy czas wykonania algorytmu
  const start = performance.now();
  // pomocniczo spiszmy sobie liczbę miast
  const n = nodes.length;
  // mapa w której przechowamy wyniki poprzednich iteracji
  const memo = new Map();
  // licznik iteracji
  let iterations = 0;
  // funkcja rekurencyjna, która oblicza minimalny koszt dotarcia do wierzchołka `last`
  // odwiedzając wszystkie wierzchołki z visitedSet
  // argumenty funkcji są indeksami z tablicy nodes
  function heldKarp(visitedSet, last) {
    iterations++;
    // pobieramy klucz dla aktualnego zbioru odwiedzonych miast i ostatniego miasta
    const key = memoKey(visitedSet, last);
    // sprawdzamy, czy wynik jest już w pamięci
    if (memo.has(key)) {
      return memo.get(key);
    }
    // jeśli wszystkie wierzchołki zostały odwiedzone, zawracamy do wierzchołka początkowego
    if (visitedSet.size === n) {
      return {
        cost: distance(nodes[last], nodes[0]),
        path: [nodes[last], nodes[0]],
      };
    }
    // zmienne przechowujące aktualne minimum
    let minLength = Number.POSITIVE_INFINITY;
    let minPath = [];
    // próbujemy odwiedzić każdy wierzchołek, który jeszcze nie został odwiedzony
    for (let next = 0; next < n; next++) {
      // jeśli wierzchołek nie został odwiedzony, wykonujemy obliczenia
      if (!visitedSet.has(next)) {
        // tworzymy nowy zbiór odwiedzonych wierzchołków z aktualnego
        const newVisitedSet = new Set(visitedSet);
        // dodajemy aktualny wierzchołek
        newVisitedSet.add(next);
        // wywołujemy rekurencyjnie funkcję dla nowego zbioru odwiedzonych wierzchołków
        const result = heldKarp(newVisitedSet, next);
        // obliczamy aktualną długość trasy wykorzystując wynik z wywołania rekurencyjnego
        const currentCost = distance(nodes[last], nodes[next]) + result.cost;
        // jeśli jest mniejsza, zapamiętujemy
        if (currentCost < minLength) {
          minLength = currentCost;
          minPath = [nodes[last], ...result.path];
        }
      }
    }
    // zapamiętujemy wynik
    memo.set(key, { cost: minLength, path: minPath });
    // i zwracamy go
    return memo.get(key);
  }
  // zaczynamy obliczenia od wierzchołka początkowego i odwiedzając tylko jego
  const result = heldKarp(new Set([0]), 0);
  // koniec pomiaru czasu wykonania
  const end = performance.now();
  // zwracamy wynik
  return {
    length: result.cost,
    path: result.path,
    iterations,
    time: end - start,
  };
}

const allVertices = [...nodes.keys()];
for (let i = 2; i <= 12; i++) {
  console.log(`${i} wierzchołków:`, tsp(allVertices.slice(0, i)));
}
