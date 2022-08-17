const averages = require('./averages');
const comparisons = require('./comparisons');

const appMode = {
    averages,
    comparisons,
};

// pobieramy tryb działania aplikacji z argumentów - 'comparisons' albo 'averages'
const mode = 'comparisons';
// pobieramy pierwszą wartość liczbową która będzie argumentem dla uruchamianej przez nas części aplikacji
let start = 0;
// pobieramy drugą wartość liczbową która będzie argumentem dla uruchamianej przez nas części aplikacji
let end = 100;

if (isNaN(start)) { start = undefined; }
if (isNaN(end)) { end = undefined; }

appMode[mode](start, end);
