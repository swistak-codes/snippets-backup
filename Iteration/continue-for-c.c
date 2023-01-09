#include <stdio.h>

int main(void) {
  // poniższa pętla się wykona
  for (int i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
      printf("Liczba %d jest parzysta!\n", i);
      continue;
    }
    printf("Liczba %d jest nieparzysta!\n", i);
  }
  // poniższa pętla będzie wykonywać się nieskończenie dla i == 2
  // int i = 1;
  // while (i <= 10) {
  //   if (i % 2 == 0) {
  //     printf("Liczba %d jest parzysta!\n", i);
  //     continue;
  //   }
  //   printf("Liczba %d jest nieparzysta!\n", i);
  //   i++;
  // }
  return 0;
}