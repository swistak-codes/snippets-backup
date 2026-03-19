#include <stdio.h>

int main(void) {
  float test_f = 0.1f + 0.2f;
  double test_d = 0.1 + 0.2;
  long double test_ld = 0.1l + 0.2l;
  printf("%d\n", test_f == 0.3f);
  printf("%d\n", test_d == 0.3);
  printf("%d\n", test_ld == 0.3l);
  return 0;
}