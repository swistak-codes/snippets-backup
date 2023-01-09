#include <stdio.h>

// funkcja zwróci nam pierwszą liczbę parzystą
// kod ten nie ma totalnie sensu, ale pokaże działanie przerywania pętli
int getFirstEvenNumber() {
  // licznik zaczynamy od zera, bez warunku przerwania i inkrementujemy o 1
  for (int i = 1;; i++) {
    // sprawdzamy czy liczba jest parzysta
    if (i % 2 == 0) {
      // zwracamy licznik jeśli jest parzysty
      return i;
    }
  }
}

int main(void) {
  // wypisujemy na ekranie wynik funkcji
  printf("Pierwsza liczba parzysta to: %d\n", getFirstEvenNumber());
  return 0;
}