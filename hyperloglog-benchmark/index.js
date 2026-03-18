import fs from "node:fs";
import { test } from "./test.js";

const results = [];

for (let i = 1; i < 17; i++) {
  console.log(i);
  const result = test(i, 100000, 10);
  results.push(result);
}

console.log("Wyniki:");
results.forEach((x, i) => console.log(i + 1, x));

const csv =
  "b;HLL DJB2 odchylenie;HLL DJB2 błąd;HLL MMH3 odchylenie;HLL MMH3 błąd\n" +
  results
    .map(
      (x, i) =>
        `${i + 1};${x.hllDb2.stdDev};${x.hllDb2.stdErr};${x.hllMm.stdDev};${x.hllMm.stdErr}`,
    )
    .join("\n");

fs.writeFileSync("results.csv", csv, "utf-8");
