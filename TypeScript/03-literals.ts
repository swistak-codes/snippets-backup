// Uwaga! Definicja typu to co innego niż przypisanie wartości!
// W tym miejscu jedynie definiujemy typ
var liczba: 21;
var tekst: 'tekst';
var logiczna: false;

// prawidłowe przypisania wartości
liczba = 21;
tekst = 'tekst';
logiczna = false;

// błędne przypisania, mimo że dalej jest to wartość z tego samego zbioru
liczba = 37; // Type '37' is not assignable to type '21'.
tekst = 'coś'; // Type '"coś"' is not assignable to type '"tekst"'.
logiczna = true; // Type 'true' is not assignable to type 'false'.
