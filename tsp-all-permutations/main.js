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

// funkcja zamieniająca ze sobą elementy tablicy
function swap(array, i, j) {
  let tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

// funkcja generująca wszystkie permutacje elementów tablicy a
// * oznacza, że jest to generator (więcej o tym w artykule "Iteracja - co to jest")
// opis algorytmu znajdziesz w artykule "Kryptarytmy"
function* lexicographic(a) {
  let j, k, l;
  let n = a.length - 1;
  while (true) {
    yield a;
    j = n - 1;
    while (a[j] >= a[j + 1]) {
      j--;
    }
    if (j < 0) {
      return;
    }
    l = n;
    while (a[j] >= a[l]) {
      l--;
    }
    swap(a, j, l);
    k = j + 1;
    l = n;
    while (k < l) {
      swap(a, k, l);
      k++;
      l--;
    }
  }
}

// funkcja znajdująca najkrótszą ścieżkę w grafie
// nodes jest typu number[]
function tsp(nodes) {
  // zmierzymy czas wykonania algorytmu
  const start = performance.now();
  // każda trasa będzie zaczynać się od pierwszego wierzchołka
  // dlatego permutacje będziemy generować z pozostałych
  const nodesToFindPath = nodes.slice(1);
  // zmienne przechowujące aktualne minimum
  let currentMinLength = Number.POSITIVE_INFINITY;
  let currentMinPath = [];
  // licznik iteracji
  let iterations = 0;
  // iterujemy po wszystkich permutacjach
  for (const path of lexicographic(nodesToFindPath)) {
    iterations++;
    // pełna ścieżka, którą sprawdzamy
    const fullPath = [nodes[0], ...path, nodes[0]];
    // obliczamy długość ścieżki
    let currentLength = 0;
    for (let i = 0; i < fullPath.length - 1; i++) {
      // pobieramy dwa sąsiadujące wierzchołki
      const currentNode = fullPath[i];
      const nextNode = fullPath[i + 1];
      // dodajemy do ścieżki odległość między wierzchołkami
      currentLength += distance(currentNode, nextNode);
    }
    // jeśli ścieżka jest krótsza od aktualnego minimum, to aktualizujemy
    if (currentLength < currentMinLength) {
      currentMinLength = currentLength;
      currentMinPath = fullPath;
    }
  }
  // koniec pomiaru czasu wykonania
  const end = performance.now();
  // zwracamy wynik
  return {
    length: currentMinLength,
    path: currentMinPath,
    iterations,
    time: end - start,
  };
}

const allVertices = [...nodes.keys()];
for (let i = 2; i <= 12; i++) {
  console.log(`${i} wierzchołków:`, tsp(allVertices.slice(0, i)));
}
