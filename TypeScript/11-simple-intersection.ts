// definiujemy typ będący iloczynem typów prostych
type LiczbaLogiczna = number & boolean; // type LiczbaLogiczna = never

// błędne przypisania - nie istnieje część wspólna number i boolean
var nieDaRady: LiczbaLogiczna = 1; // Type 'number' is not assignable to type 'never'.
var tezNieDaRady: LiczbaLogiczna = true; // Type 'number' is not assignable to type 'never'.
var nawetTo: LiczbaLogiczna = undefined; // Type 'undefined' is not assignable to type 'never'.
