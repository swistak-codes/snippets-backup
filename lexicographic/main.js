/**
 * Leksykograficzne generowanie permutacji
 * @param {number[]} a
 */
function* lexicographic(a) {
  let j, k, l;
  let n = a.length - 1;
  while (true) {
    // 1. odwiedź
    yield a;

    // 2. znajdź j
    j = n - 1;
    while (a[j] >= a[j + 1]) {
      j--;
    }
    if (j < 0) {
      // oryginalny algorytm zakłada tablicę numerowaną od 1, stąd zmiana warunku
      return;
    }

    // 3. zwiększ a_j
    l = n;
    while (a[j] >= a[l]) {
      l--;
    }
    swap(a, j, l);

    // 4. odwróć a_{j+1} z a_n
    k = j + 1;
    l = n;
    while (k < l) {
      swap(a, k, l);
      k++;
      l--;
    }
  }
}

/**
 * Funkcja zwracająca litery, które nie mogą być zerem
 * @param {string[]} words
 */
function getNonZeroLetters(words) {
  return new Set(words.map((x) => x[0]));
}

/**
 * Funkcja sprawdzająca, czy litery które nie miały być zerem faktycznie nim nie są
 * @param {Map<string, number>} letterMap
 * @param {Set<string>} nonZeroLetters
 */
function checkZeroLetters(letterMap, nonZeroLetters) {
  for (const nonZero of nonZeroLetters) {
    if (letterMap.get(nonZero) === 0) {
      return false;
    }
  }
  return true;
}

/**
 * Funkcja podstawiająca cyfry pod litery w słowach
 * @param {string[]} words
 * @param {Map<string, number>} letterMap
 */
function wordsToNumbers(words, letterMap) {
  const result = [];
  for (const word of words) {
    let number = "";
    for (const letter of word) {
      number += letterMap.get(letter);
    }
    result.push(parseInt(number));
  }
  return result;
}

/**
 * Funkcja rozbijająca słowa na poszczególne składniki dodawania
 * @param {number[]} numbers
 */
function getSummationParts(numbers) {
  return {
    sum: numbers[numbers.length - 1],
    addends: numbers.slice(0, -1),
  };
}

/**
 * Funkcja sprawdzająca czy rozwiązanie jest poprawne
 * @param {string[]} words
 * @param {Map<string, number>} letterMap
 */
function isCorrect(words, letterMap) {
  const numbers = wordsToNumbers(words, letterMap);
  const { sum, addends } = getSummationParts(numbers);
  return addends.reduce((prev, curr) => prev + curr) === sum;
}

/**
 * Funkcja wypisująca wyniki w konsoli
 * @param {string[]} words
 * @param {Map<string, number>[]} letterMaps
 */
function logResults(words, letterMaps) {
  console.log(`Znalezionych rozwiązań: ${letterMaps.length}`);
  for (const letterMap of letterMaps) {
    const numbers = wordsToNumbers(words, letterMap);
    const { sum, addends } = getSummationParts(numbers);
    console.log(`${addends.join(" + ")} = ${sum}`);
  }
}

/**
 * Funkcja normalizująca wyrazy do wspólnej formy
 * @param {string[]} words
 */
function normalizeWords(words) {
  return words.map((x) => x.toUpperCase());
}

/**
 * Funkcja wyciągająca unikalne litery ze słów
 * @param {string[]} words
 */
function getLetters(words) {
  const letterSet = new Set(words.flatMap((x) => [...x]));
  if (letterSet > 10) {
    throw new Error("Nie może być więcej niż 10 unikalnych liter!");
  }
  return [...letterSet];
}

/**
 * Funkcja generująca klucz do tablicy wyników
 * @param {Map<string, number>} letterMap
 */
function getKeyForResultsMap(letterMap) {
  return JSON.stringify([...letterMap.entries()]);
}

/**
 * Funkcja generująca mapę litera-wartość
 * @param {string[]} letters
 * @param {number[]} values
 */
function generateLetterMap(letters, values) {
  const result = new Map();
  for (let i = 0; i < letters.length; i++) {
    result.set(letters[i], values[i]);
  }
  return result;
}

/**
 * Zamienia miejscami elementy i oraz j w tablicy
 * @param {[]} array
 * @param {number} i
 * @param {number} j
 */
function swap(array, i, j) {
  let tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
}

function runner(words, algorithm) {
  const results = new Map();
  const fixedWords = normalizeWords(words);
  const letters = getLetters(fixedWords);
  const nonZeroLetters = getNonZeroLetters(fixedWords);
  const startTime = process.hrtime();

  for (const permutation of algorithm([0, 1, 2, 3, 4, 5, 6, 7, 8, 9])) {
    const result = generateLetterMap(letters, permutation);

    if (!checkZeroLetters(result, nonZeroLetters)) {
      continue;
    }
    if (!isCorrect(fixedWords, result)) {
      continue;
    }

    const key = getKeyForResultsMap(result);
    results.set(key, result);
  }

  const endTime = process.hrtime(startTime);
  console.log(`Czas wykonania: ${endTime[0]}s ${endTime[1] / 1000000}ms`);
  logResults(fixedWords, [...results.values()]);
}

const sendMoreMoney = ["SEND", "MORE", "MONEY"];
const doubleTrue = ["THREE", "THREE", "TWO", "TWO", "ONE", "ELEVEN"];
const manySolutions = ["TRZY", "TRZY", "SZEŚĆ"];
const twoLetters = ["X", "YYYY", "YYYY", "YYYY", "YYYY", "XYYYY"];
const noSolutions = ["JAN", "PAWEL", "DRUGI"];

const algorithm = lexicographic;

console.log(sendMoreMoney);
runner(sendMoreMoney, algorithm);
console.log("");

console.log(doubleTrue);
runner(doubleTrue, algorithm);
console.log("");

console.log(manySolutions);
runner(manySolutions, algorithm);
console.log("");

console.log(twoLetters);
runner(twoLetters, algorithm);
console.log("");

console.log(noSolutions);
runner(noSolutions, algorithm);

