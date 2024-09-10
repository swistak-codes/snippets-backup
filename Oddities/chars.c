#include <stdio.h>

int main(void) {
  for (char i = 'a'; i <= 'z'; i++) {
    printf("%c", i);
  }
  printf("\n");
  // wyjasnienie
  for (char i = 'a'; i <= 'z'; i++) {
    printf("%d ", i);
  }
  return 0;
}