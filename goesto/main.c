#include <stdio.h>

int main(void) {
  int i = 10;
  while (i --> 0) {
    printf("W prawo %d\n", i);
  }
  i = 10;
  do {
    printf("W lewo %d\n", i);
  } while (0 <-- i);
  i = 10;
  while (i \
            \
             \
              \
               --> 0) {
    printf("W dol %d\n", i);
  }
  // wyjasnienie
  i = 10;
  while ((i--) > 0) {
    printf("W prawo %d\n", i);
  }
  i = 10;
  do {
    printf("W lewo %d\n", i);
  } while (0 < (--i));
  return 0;
}