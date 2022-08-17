const comparisons = require('./comparisons');
const generators = require('./data-generators');

// pobieramy wybrany generator wartości
const generator = process.argv[3] || 'oneToN';
// pobieramy argument dla generatora
let arg = parseInt(process.argv[4]);

if (isNaN(arg)) { arg = undefined; }

// generujemy ciąg
const array = generators[generator](arg);

comparisons(array, generator);
