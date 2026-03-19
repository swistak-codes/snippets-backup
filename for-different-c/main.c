#include <stdio.h>
#include <string.h>
#include <time.h>
#include <stdlib.h>

int main(void) {
  // --- 1 ---
  // ustawiamy dwa liczniki z różnymi wartościami: 0 i 1
  // pętlę wykonujemy tak długo jak iloraz obu liczników jest podzielny przez 3
  // i zwiększamy o 3, j o wartość i
  for (int i = 0, j = 1; i * j % 3 == 0; i += 3, j += i) {
    // wypisujemy obie wartości
    printf("%d, %d\n", i, j);
  }
  // --- 2 ---
  // tym razem zmienne zadeklarujemy na zewnątrz
  int i;
  char* j;
  // pętlę wykonujemy tak długo, jak rozmiar stringa j jest mniejszy od 20
  for (i = 0, j = ""; strlen(j) < 20; i++) {
    // wykonujemy kod tylko jak licznik jest podzielny przez 4
    if (i % 4 == 0) {
      // deklarujemy tymczasową zmienną na przechowanie nowego ciągu
      char tmp[100];
      // tworzymy nowy ciąg
      sprintf(tmp, "%d%s", i, j);
      // przepisujemy go do zmiennej j
      j = tmp;
      // wypisujemy zawartość j na ekranie
      printf("%s\n", j);
    }
  }
  // --- 3 ---
  // ponownie zmienna deklarowana będzie na zewnątrz
  int isEven = 1;
  // inicjujemy generator liczb pseudolosowych
  srand(time(NULL));
  // pętla zawiera jedynie warunek, że ma się wykonywać, kiedy isEven jest prawdziwe
  for (; isEven;) {
    // losujemy liczbę
    int number = rand();
    // wypisujemy ją
    printf("%d\n", number);
    // zapisujemy w isEven czy liczba jest parzysta
    isEven = number % 2 == 0;
  }
  return 0;
}