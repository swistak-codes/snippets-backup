// dla ułatwienia, ustawmy sobie makro na wartość false
// ponieważ C nie posiada typu boolowskiego
#define false 0
#include <stdio.h>

int main(void) {
  // zdefiniujmy, że nie chcemy pokazywać nic
  short show = false;
  // tworzymy pętlę, która będzie działać tylko wtedy, kiedy show ma wartość true
  while (show) {
    printf("Nie wyświetlę się na ekranie\n");
  }
  // oraz drugą z tym samym warunkiem
  do {
    printf("Wyświetlę się na ekranie\n");
  } while (show);
  return 0;
}