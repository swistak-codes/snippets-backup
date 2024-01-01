// iloczyn podtypu i nadtypu zawsze daje podtyp
type Liczba1 = 21 & number; // type Liczba1 = 21;
var poprawna1: Liczba1 = 21;
var niepoprawna1: Liczba1 = 37; // Type '37' is not assignable to type '21'.

// bardziej złożony przypadek, ale działający tak samo
type StaleTekstowe = 'tekst' | 'cos';
type Tekst1 = StaleTekstowe & string; // type Tekst1 = "tekst" | "cos"
var poprawna2: Tekst1 = 'tekst';
var niepoprawna2: Tekst1 = 'inny'; // Type '"inny"' is not assignable to type 'Tekst1'.

// analogiczna sytuacja jest przy sumie literal różnych rodzajów
type TekstLiczba = 'tekst' | 21;
type Liczba2 = TekstLiczba & number; // type Liczba2 = 21
type Tekst2 = TekstLiczba & string; // type Tekst2 = "tekst"
var poprawna3: Liczba2 = 21;
var poprawna4: Tekst2 = 'tekst';
var niepoprawna3: Liczba2 = 'tekst'; // Type '"tekst"' is not assignable to type '21'.
var niepoprawna4: Tekst2 = 21; // Type '21' is not assignable to type '"tekst"'.

// oczywiście możemy też wyliczyć część wspólną typów literal
type Wspolny = StaleTekstowe & TekstLiczba; // type Wspolny = "tekst"
var poprawna5: Wspolny = 'tekst';
var niepoprawna5: Wspolny = 'cos'; // Type '"cos"' is not assignable to type '"tekst"'.
var niepoprawna6: Wspolny = 21; // Type '21' is not assignable to type '"tekst"'.

// gdy typy literal są rozłączne, ich iloczyn jest zbiorem pustym
type StaleTekstoweInne = StaleTekstowe & 'inny' // type StaleTekstoweInne = never
type TekstLiczbaInna = TekstLiczba & 37; // type TekstLiczbaInna = never
type TekstLiczbaLogiczny = TekstLiczba & boolean; // type TekstLiczbaLogiczny = never
var niepoprawna7: StaleTekstoweInne = 'inny'; // Type 'string' is not assignable to type 'never'.
var niepoprawna8: TekstLiczbaInna = 37; // Type 'number' is not assignable to type 'never'.
var niepoprawna9: TekstLiczbaLogiczny = false; // Type 'boolean' is not assignable to type 'never'.
