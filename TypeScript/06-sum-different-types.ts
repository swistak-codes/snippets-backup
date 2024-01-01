var liczbaLubTekst: number | string;
var logicznaLubPusta: boolean | null;

// poniższe przypisania są prawidłowe
liczbaLubTekst = 21;
liczbaLubTekst = 'tekst';
logicznaLubPusta = true;
logicznaLubPusta = null;

// można również przypisywać wartości z dowolnych podzbiorów
declare var wybraneLiczby: 37 | 21;
declare var wybraneLiczbaTekst: 999 | "tekst";
// poniższe przypisania są również prawidłowe
liczbaLubTekst = wybraneLiczby;
liczbaLubTekst = wybraneLiczbaTekst;

// nie można jednak przypisać typów, które jedynie się przecinają
declare var rozne: 21 | false | "cos";
liczbaLubTekst = rozne; // Type 'boolean' is not assignable to type 'string | number'.
logicznaLubPusta = rozne; // Type '21' is not assignable to type 'boolean | null'.
