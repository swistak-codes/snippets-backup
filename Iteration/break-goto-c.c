#include <stdio.h>

int main(void) {
  // w pierwszej pętli odliczamy od 1 do 10
  for (int i = 1; i < 10; i++) {
    // w drugiej również
    for (int j = 1; j < 10; j++) {
      // wypisujemy obie liczby
      printf("Break: %d %d\n", i, j);
      // jeśli ich iloraz jest parzysty, przerywamy
      if (i * j % 2 == 0) {
        break;
      }
    }
  }
  // powyższy kod wykona się 14 razy (przerywamy tylko wewnętrzną pętlę)
  // poniższy tylko 2 razy (przerywamy całość)
  for (int i = 1; i < 10; i++) {
    for (int j = 1; j < 10; j++) {
      printf("Goto: %d %d\n", i, j);
      if (i * j % 2 == 0) {
        goto outside;
      }
    }
  }
  outside:
  return 0;
}