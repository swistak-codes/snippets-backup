var tekst: string;
var liczba: number;
var logiczna: boolean;
var wszystko: any;
var nic: never;

// prawidłowe przypisania wartości
tekst = 'coś';
liczba = 37;
logiczna = false;

tekst = 37; // Type 'number' is not assignable to type 'string'.
liczba = false; // Type 'boolean' is not assignable to type 'number'.
logiczna = 'coś'; // Type 'string' is not assignable to type 'boolean'.

// any może mieć każdą wartość
wszystko = 37;
wszystko = 'coś';
wszystko = false;

// never nie może przyjąć żadnej wartości
nic = 37; // Type 'number' is not assignable to type 'never'.
nic = 'coś'; // Type 'string' is not assignable to type 'never'.
nic = false; // Type 'boolean' is not assignable to type 'never'.
// nawet pustej i niezdefiniowanej wartości
nic = null; // Type 'null' is not assignable to type 'never'.
nic = undefined; // Type 'undefined' is not assignable to type 'never'.
