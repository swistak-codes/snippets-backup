// iloczyn dwóch obiektów z różnymi polami
type Obiekt1 = {
    poleTekstowe: string;
    poleNumeryczne: number;
}
type Obiekt2 = {
    poleLogiczne: boolean;
}
type DwaRozne = Obiekt1 & Obiekt2;
// musimy wypełnić pola z obu obiektów
var poprawne1: DwaRozne = {
    poleLogiczne: true,
    poleTekstowe: 'tekst',
    poleNumeryczne: 21
};
// niewypełnienie któregokolwiek prowadzi do błędu
var niepoprawne1: DwaRozne = {
    poleTekstowe: 'tekst',
    poleNumeryczne: 21
}
// Type '{ poleTekstowe: string; poleNumeryczne: number; }' is not assignable to type 'DwaRozne'.
// Property 'poleLogiczne' is missing in type '{ poleTekstowe: string; poleNumeryczne: number; }' but required in type 'Obiekt2'.

// analogicznie działa `extends`
interface Interfejs1 {
    poleTekstowe: string;
    poleNumeryczne: number;
}
interface Interfejs2 extends Interfejs1 {
    poleLogiczne: boolean;
}
// możemy zrobić przypisanie wcześniej zdefiniowanej zmiennej, bo typy zawierają te same pola
var poprawne2: Interfejs2 = poprawne1;
