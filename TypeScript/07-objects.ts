// definiujemy typ za pomocą słowa kluczowego `type`
type Obiekt = {
    poleTekstowe: string;
    poleNumeryczne: number;
    nieobowiazkoweLogiczne?: boolean;
    // ? wskazuje nieobowiązkowe pole, któremu nie musimy przypisywać wartości
    logiczneLubNiezdefiniowane: boolean | undefined;
    // w przypadku `| undefined` musimy już jawnie podać wartość undefined
    jakasStala: 'cos' | 'tekst';
}
// moglibyśmy też zdefiniować typ obiektowy za pomocą `interface`,
// ale dla uproszczenia artykułu pominiemy różnice

// prawidłowe przypisanie
var obiekt1: Obiekt = {
    poleTekstowe: 'tekst',
    poleNumeryczne: 73.12,
    jakasStala: 'cos',
    logiczneLubNiezdefiniowane: undefined,
};

// możemy też zrobić, że oprócz wskazanych pól obiekt może trzymać dowolne inne
type Obiekt2 = {
    // pod dowolnym kluczem (typu string) mogą być tylko wartości typu number lub string
    [k: string]: number | string;
    // wszystkie jawnie zdefiniowane muszą mieć typ będący podzbiorem typu wartości dowolnego pola
    znanePole: string;
}

// prawidłowe przypisanie
var obiekt2: Obiekt2 = {
    znanePole: 'tekst',
    dowolneInne: 73,
};

// błędne przypisanie
obiekt2.znanePole = 21; // Type 'number' is not assignable to type 'string'.
