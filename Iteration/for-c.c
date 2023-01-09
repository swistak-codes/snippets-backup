#include <stdio.h>

int main(void) {
  // definiujemy kolejno:
  // - licznik iteracji jako zmienną typu int o wartości 0
  // - iterujemy tak długo, jak i jest mniejsze od 10
  // - na koniec każdej iteracji zwiększamy wartość i o 1
  for (int i = 0; i < 10; i++) {
    // wypisujemy tekst wraz z wartością licznika
    printf("Cześć. Iteracja nr %d\n", i);
  }
  // teraz iterujemy od tyłu
  for (int i = 10; i > 0; i--) {
    // wypisujemy tekst wraz z wartością licznika
    printf("Jeszcze raz. Iteracja nr %d\n", i);
  }
  return 0;
}