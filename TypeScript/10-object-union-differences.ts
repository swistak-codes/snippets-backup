// prawidłowe przypisanie wartości z obu typów
var obiekt3: SumaObiektow = {
    poleNumeryczne: 20,
    poleTekstowe: 'jakiś tekst',
    logiczneLubNiezdefiniowane: true,
    jakasStala: 'tekst'
};
// prawidłowe przypisanie wartości z typu Obiekt i wybranego z InnyObiekt
var obiekt4: SumaObiektow = {
    poleNumeryczne: 20,
    poleTekstowe: 'jakiś tekst',
    logiczneLubNiezdefiniowane: true
};
// prawidłowe przypisanie wartości z typu InnyObiekt i wybranego z Obiekt
var obiekt5: SumaObiektow = {
    poleNumeryczne: 20,
    logiczneLubNiezdefiniowane: true,
    jakasStala: 'tekst'
};
// błędne jest natomiast przypisanie tylko wybranych wartości z obu typów
var obiekt6: SumaObiektow = {
    poleNumeryczne: 20,
    jakasStala: 'tekst'
}
// Type '{ poleNumeryczne: number; jakasStala: "tekst"; }' is not assignable to type 'SumaObiektow'.
// Property 'logiczneLubNiezdefiniowane' is missing in type '{ poleNumeryczne: number; jakasStala: "tekst"; }' but required in type 'InnyObiekt'.
