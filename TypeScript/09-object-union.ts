type Obiekt = {
    poleTekstowe: string;
    poleNumeryczne: number;
}

type InnyObiekt = {
    logiczneLubNiezdefiniowane: boolean | undefined;
    jakasStala: 'cos' | 'tekst';
}

// tworzymy unię obu typów
type SumaObiektow = Obiekt | InnyObiekt;

// prawidłowe przypisanie wartości z typu Obiekt
var obiekt1: SumaObiektow = {
    poleNumeryczne: 20,
    poleTekstowe: 'jakiś tekst'
};
// prawidłowe przypisanie wartości z typu InnyObiekt
var obiekt2: SumaObiektow = {
    logiczneLubNiezdefiniowane: true,
    jakasStala: 'tekst'
};
