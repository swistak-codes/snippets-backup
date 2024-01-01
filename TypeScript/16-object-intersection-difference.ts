type Obiekt = {
    poleTekstowe: string;
    poleNumeryczne: number;
}
// 1 przypadek: powtórzone pole jest podtypem
type Przypadek1 = Obiekt & { poleTekstowe: 'tekst' };
// prawidłowe przypisanie
var poprawne1: Przypadek1 = {
    poleNumeryczne: 21,
    poleTekstowe: 'tekst',
};
// błędne
var niepoprawne1: Przypadek1 = {
    poleNumeryczne: 37,
    poleTekstowe: 'coś', // Type '"coś"' is not assignable to type '"tekst"'.
};

// 2 przypadek: powtórzone pole jest zupełnie innego typu
type Przypadek2 = Obiekt & { poleTekstowe: number };
// każde przypisanie będzie teraz niepoprawne
var niepoprawne2: Przypadek2 = {
    poleNumeryczne: 21,
    poleTekstowe: 'tekst', // Type 'string' is not assignable to type 'never'.
};
var niepoprawne3: Przypadek2 = {
    poleNumeryczne: 37,
    poleTekstowe: 1, // Type 'number' is not assignable to type 'never'.
}

// zobaczmy, jak to działa przy interfejsie
interface Interfejs1 {
    poleTekstowe: string;
    poleNumeryczne: number;
}
// błąd kompilacji pojawi się już przy definicji interfejsu
interface Interfejs2 extends Interfejs1 {
    poleTekstowe: number;
}
// Interface 'Interfejs2' incorrectly extends interface 'Interfejs1'.
//  Types of property 'poleTekstowe' are incompatible.
//    Type 'number' is not assignable to type 'string'.
