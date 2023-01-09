#include <stdio.h>

int main(void) {
  // ustawiamy licznik iteracji na 0
  int counter = 0;
loop_start:
  // sprawdzenie warunku pętli
  if (counter == 10) {
    // jeśli licznik osiągnął 10 przeskakujemy do loop_end
    goto loop_end;
  }
  // wypisujemy tekst na wyjściu standardowym
  printf("Cześć\n");
  // zwiększamy wartość licznika o 1
  counter++;
  // przeskakujemy do początku pętli
  goto loop_start;
loop_end:
  // zakończenie aplikacji
  return 0;
}