// wersja z any
type Liczby = number & any; // type Liczby = any
// prawidłowe przypisania
var poprawne1: Liczby = 1;
var poprawne2: Liczby = 'tekst';

// wersja z unknown
type Liczby2 = number & unknown; // type Liczby = number
// prawidłowe przypisanie
var poprawne3: Liczby2 = 1;
// błędne przypisanie
var niepoprawne: Liczby2 = 'tekst'; // Type 'string' is not assignable to type 'number'.
