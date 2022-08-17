const runner = require("./runner");
const algorithms = require("./algorithms");

const sendMoreMoney = ["SEND", "MORE", "MONEY"];
const doubleTrue = ["THREE", "THREE", "TWO", "TWO", "ONE", "ELEVEN"];
const manySolutions = ["TRZY", "TRZY", "SZEŚĆ"];
const twoLetters = ["X", "YYYY", "YYYY", "YYYY", "YYYY", "XYYYY"];
const noSolutions = ["JAN", "PAWEL", "DRUGI"];

const algorithm =
  process.argv.length > 2 ? algorithms[process.argv[2]] : () => {};

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
