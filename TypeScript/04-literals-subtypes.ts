var liczba: 21;
liczba = 21;

// deklarujemy zmienną o ogólniejszym typie
var liczba2: number;
liczba2 = liczba; // prawidłowe przypisanie

// sprawdźmy w drugą stronę, nieznając wartości zmiennej
// słowo kluczowe declare mówi kompilatorowi,
// że ta zmienna na pewno już istnieje i ma wartość
declare var liczba3: number;
liczba = liczba3; // Type 'number' is not assignable to type '21'.
