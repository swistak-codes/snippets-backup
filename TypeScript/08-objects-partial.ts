type Obiekt = {
    poleTekstowe: string;
    poleNumeryczne: number;
    nieobowiazkoweLogiczne?: boolean;
    logiczneLubNiezdefiniowane: boolean | undefined;
    jakasStala: 'cos' | 'tekst';
}

var fragment = {
    poleTekstowe: 'tekst'
};

var obiekt: Obiekt = fragment;
// Type '{ poleTekstowe: string; }' is missing the following properties from type 'Obiekt': poleNumeryczne, logiczneLubNiezdefiniowane, jakasStala
