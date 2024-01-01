type Liczby3 = number & never; // type Liczby = never

var niepoprawne: Liczby3 = 1; // Type 'number' is not assignable to type 'never'.
