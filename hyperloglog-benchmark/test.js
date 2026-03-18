import { faker } from "@faker-js/faker";
import { HyperLogLogDjb2, HyperLogLogMurmurHash3 } from "./hyperloglog.js";

function singleTest(b, count) {
  const data = new Array(count).fill(0).map(() => faker.person.fullName());
  const uniqueExact = new Set(data).size;
  const hllDb2 = new HyperLogLogDjb2(b);
  const hllMm = new HyperLogLogMurmurHash3(b);
  for (const value of data) {
    hllDb2.add(value);
    hllMm.add(value);
  }
  return {
    uniqueExact,
    hllDb2: hllDb2.count(),
    hllMm: hllMm.count(),
  };
}

function getError(trials) {
  const relativeDiffs = trials.map(([exact, measured]) => measured / exact - 1);
  const meanRelativeDiff =
    relativeDiffs.reduce((acc, val) => acc + val, 0) / relativeDiffs.length;
  const variance =
    relativeDiffs.reduce((acc, val) => acc + (val - meanRelativeDiff) ** 2, 0) /
    relativeDiffs.length;
  const stdDev = Math.sqrt(variance);
  return {
    stdDev,
    stdErr: stdDev / Math.sqrt(trials.length),
  };
}

export function test(b, count, repeats) {
  const hllDb2Trials = new Array(repeats);
  const hllMmTrials = new Array(repeats);
  for (let i = 0; i < repeats; i++) {
    const trial = singleTest(b, count);
    console.log(`${i + 1}/${repeats}`, trial);
    hllDb2Trials[i] = [trial.uniqueExact, trial.hllDb2];
    hllMmTrials[i] = [trial.uniqueExact, trial.hllMm];
  }
  return {
    hllDb2: getError(hllDb2Trials),
    hllMm: getError(hllMmTrials),
  };
}
