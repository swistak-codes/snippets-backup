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

// funkcja znajdująca prawie najkrótszą ścieżkę w grafie
// nodes jest typu number[], startNode typu number
function tsp(nodes, startNode) {
  // zmierzymy czas wykonania algorytmu
  const start = performance.now();
  // licznik iteracji
  let iterations = 0;
  // zbiór przechowujący odwiedzone wierzchołki, może już przechować startowy
  const visitedNodes = new Set([startNode]);
  // zmienna przechowująca długość ścieżki
  let length = 0;
  // zmienna przechowująca ścieżkę, zaczynamy od startego wierzchołka
  const path = [startNode];
  // iterujemy tak długo, jak są jeszcze nieodwiedzone wierzchołki
  while (visitedNodes.size < nodes.length) {
    // wyciągamy ostatnio odwiedzony wierzchołek
    const lastNode = path.at(-1);
    // zmienne przechowujące aktualne minimum
    let minDistance = Number.POSITIVE_INFINITY;
    let nextNode = null;
    // iterujemy po kolejnych wierzchołkach
    for (let node of nodes) {
      iterations++;
      // ignorujemy odwiedzone wierzchołki
      if (visitedNodes.has(node)) {
        continue;
      }
      // sprawdzamy odległość z ostatniego wierzchołka do aktualnego
      const distanceToNode = distance(lastNode, node);
      // jeśli jest to najmniejsza odległość, to zapamiętujemy
      if (distanceToNode < minDistance) {
        minDistance = distanceToNode;
        nextNode = node;
      }
    }
    // dodajemy najbliższy wierzchołek do odwiedzonych
    visitedNodes.add(nextNode);
    // dodajemy do ścieżki
    path.push(nextNode);
    // oraz dodajemy odległość do niego
    length += minDistance;
  }
  // dodajemy odległość do początku
  length += distance(path.at(-1), startNode);
  // zapętlamy ścieżkę do początku
  path.push(startNode);
  // koniec pomiaru czasu wykonania
  const end = performance.now();
  // zwracamy wynik
  return {
    length,
    path,
    iterations,
    time: end - start,
  };
}

// funkcja znajdująca prawie najkrótszą ścieżkę w grafie
// wykonuje NN dla wszystkich wierzchołków i wybiera najkrótszy wariant
function allTsp(nodes) {
  // zmierzymy czas wykonania algorytmu
  const start = performance.now();
  // licznik iteracji
  let allIterations = 0;
  // zmienne przechowujące aktualne minimum
  let currentMinLength = Number.POSITIVE_INFINITY;
  let currentMinPath = [];
  for (const node of nodes) {
    const { length, path, iterations } = tsp(nodes, node);
    allIterations += iterations;
    if (length < currentMinLength) {
      currentMinLength = length;
      currentMinPath = path;
    }
  }
  // koniec pomiaru czasu wykonania
  const end = performance.now();
  // zwracamy wynik
  return {
    length: currentMinLength,
    path: currentMinPath,
    iterations: allIterations,
    time: end - start,
  };
}

const allVertices = [...nodes.keys()];
for (let i = 2; i <= 12; i++) {
  console.log(
    `${i} wierzchołków, start na 1:`,
    tsp(allVertices.slice(0, i), allVertices[0]),
  );
  console.log(`${i} wierzchołków:`, allTsp(allVertices.slice(0, i)));
}
