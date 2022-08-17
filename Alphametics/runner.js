const {
  getLetters,
  normalizeWords,
  logResults,
  isCorrect,
  getNonZeroLetters,
  checkZeroLetters,
  getKeyForResultsMap,
  generateLetterMap,
} = require("./helpers");

/**
 * Funkcja wykonująca algorytm
 * @param {string[]} words
 * @param {Function} algorithm
 */
function runAlgorithm(words, algorithm) {
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

module.exports = runAlgorithm;
