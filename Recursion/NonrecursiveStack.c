#include <stdio.h>

int factorial(int n) {
  // zmienna przechowująca "adres" aktualnego przypadku
  // adresy: 10 - wywołanie; 20 - obliczenie; 30 - koniec
  int currentAddress = 10;
  // tymczasowa zmienna na przechowanie wyniku
  int currentResult = n;
  // stos wywołań; załóżmy że 1024 elementy wystarczą
  int stack[1024];
  // wskaźnik ostatniego elementu na stosie;
  int stackPtr = -1;

  // dodajemy na stos adres ostatniego przypadku
  stack[++stackPtr] = 30;
  // dodajemy na stos aktualną wartość n, czyli aktualny wynik
  stack[++stackPtr] = currentResult;

  /*
    Drobne wyjaśnienie dla osób nieznających zapisu:
    ++A - najpierw zwiększa wartość zmiennej A, a potem zwraca jej wartość
    A++ - najpierw zwraca wartość zmiennej A, potem zwiększa jej wartość
    Analogicznie jest z dwoma minusami (zmniejszanie wartości.
    Działa to tutaj na takiej zasadzie, że przed dodaniem do stosu 
    zawsze podnosimy wskaźnik o 1 i dodajemy w puste miejsce. 
    Natomiast ściągając ze stosu (A--) najpierw używamy
    aktualną wartość wskaźnika, a potem cofamy go.
  */
  
  // uruchamiamy pętlę, która będzie się wykonywać póki stos ma elementy
  while (stackPtr > -1) {
    switch (currentAddress) {
      case 10: // wywołanie
        /* Odpowiednik:
          if (n == 0) {
            return 1;
          } else {
            return factorial(n - 1)
          }
        */
        // "wywołujemy" funkcję z n zapisanym w stosie
        n = stack[stackPtr--];
        // sprawdzamy czy jesteśmy w stanie podać od razu wartość
        if (n == 0) {
          // zamiast zwracać wartość pobieramy ze stosu
          // adres poprzedniego przypadku
          currentAddress = stack[stackPtr--];
          // natomiast rezultat zapisujemy na stosie
          stack[++stackPtr] = 1;
        } else {
          // jeżeli nie to tworzymy sztuczne wywołanie "rekurencyjne"
          // najpierw wrzucamy na stos aktualne n
          stack[++stackPtr] = n;
          // następnie adres w który powinno się przejść po obliczeniu
          stack[++stackPtr] = 20;
          // oraz n pomniejszone o 1, z którym "wywołujemy" funkcję
          stack[++stackPtr] = n - 1;
          // i powtórzymy aktualny krok
          currentAddress = 10;
        }
        break;
      case 20: // obliczenie
        /* Odpowiednik:
          return factorial(n - 1) * n;
        */
        // pobieramy aktualną wartość ze stosu
        currentResult = stack[stackPtr--];
        // następnie n dla którego obliczamy wartość
        n = stack[stackPtr--];
        // oraz adres dokąd mamy przejść po obliczeniu
        currentAddress = stack[stackPtr--];
        // obliczamy wartość wg wzoru na silnię
        currentResult = n * currentResult;
        // wrzucamy wartość na stos
        stack[++stackPtr] = currentResult;
        break;
      case 30: // koniec
        currentResult = stack[stackPtr--];
    }
  }

  // zwracamy ostateczny wynik
  return currentResult;
}

int fibonacci(int n) {
  // zmienna przechowująca "adres" aktualnego przypadku
  // adresy: 10 - wywołanie; 20 - obliczenie; 30 - koniec
  int currentAddress = 10;
  // zmienna do obliczania wyniku końcowego
  int currentResult = 0;
  // tymczasowa zmienna do przechowywania wyniku ściągniętego ze stosu
  int tempResult = 0;
  // stos wywołań; załóżmy że 1024 elementy wystarczą
  int stack[1024];
  // wskaźnik ostatniego elementu na stosie;
  int stackPtr = -1;

  // dodajemy na stos adres ostatniego przypadku
  stack[++stackPtr] = 40;
  // dodajemy na stos aktualny wynik
  stack[++stackPtr] = currentResult;
  // dodajemy na stos aktualną wartość n
  stack[++stackPtr] = n;

  // uruchamiamy pętlę, która będzie się wykonywać póki stos ma elementy
  while (stackPtr > -1) {   
    switch (currentAddress) {
      case 10: // wywołanie
        /* Odpowiednik:
          if (n == 0) {
            return 0;
          } else if (n == 1) {
            return 1;
          } else {
            return fibonacci(n - 1)
          }
        */
        // "wywołujemy" funkcję z n zapisanym w stosie
        n = stack[stackPtr--];
        // wyciągamy rezultat zapisany w stosie do tymczasowej zmiennej
        tempResult = stack[stackPtr--];
        if (n == 0) {
          // ściągamy adres powrotu ze stosu
          currentAddress = stack[stackPtr--];
          // ustalamy aktualny wynik na 0
          currentResult = 0;
        } else if (n == 1) {
          // analogicznie jak wyżej
          currentAddress = stack[stackPtr--];
          currentResult = 1;
        } else {          
          // przywracamy stare wartości na stos
          stack[++stackPtr] = tempResult;
          stack[++stackPtr] = n;
          // dodajemy nowe wraz z przejściem do drugiej rekurencji
          stack[++stackPtr] = 20;
          stack[++stackPtr] = tempResult;
          stack[++stackPtr] = n - 1;
          // następny krok to powrót do początkowego wywołania
          currentAddress = 10;
        }
        break;
      case 20: // wywołanie drugiej rekurencji
        /* Odpowiednik:
          fibonacci(n - 2);
        */
        // ściągamy aktualne wartości n i wyniku ze stosu
        n = stack[stackPtr--];
        tempResult = stack[stackPtr--];
        // podmieniamy wynik na stosie na aktualny w pamięci
        stack[++stackPtr] = currentResult;
        // przywracamy stare n na stos
        stack[++stackPtr] = n;
        // dodajemy nowe wraz z przejściem na obliczenie wartości
        stack[++stackPtr] = 30;
        stack[++stackPtr] = tempResult;
        stack[++stackPtr] = n - 2;
        // następny krok to powrót do początkowego wywołania
        currentAddress = 10;
        break;
      case 30: // obliczenie
        /* Odpowiednik:
          return fibonacci(n - 1) + fibonacci(n - 2);
        */
        // ściągamy n ze stosu, nie będzie nam potrzebne
        n = stack[stackPtr--];
        // dodajemy wynik znajdujący się w stosie do wyniku w pamięci
        currentResult += stack[stackPtr--];
        // ustawiamy kolejny adres na ten zapisany w stosie
        currentAddress = stack[stackPtr--];
        break;
      case 40: // zakończenie
        // najprawdopodobniej tu nie trafimy, ale jeśli tak to zakończmy iterację
        stackPtr = -1;
        break;
    }
  }
  return currentResult;
}

int main(void) {
  for (int i = 0; i <= 10; i++) {
    printf("fibonacci(%d) = %d\n", i, fibonacci(i));
  }
  for (int i = 0; i <= 10; i++) {
    printf("factorial(%d) = %d\n", i, factorial(i));
  }
  return 0;
}