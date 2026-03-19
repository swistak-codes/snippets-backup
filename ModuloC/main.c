#include <stdio.h>
#include <math.h>

int main(void) {
  printf("Pierwszy sposób (operator %%):\n");
  printf("8 mod 5 = %d\n", 8 % 5);
  printf("-8 mod 5 = %d\n", -8 % 5);
  printf("8 mod -5 = %d\n", 8 % -5);
  printf("-8 mod -5 = %d\n", -8 % -5);
  printf("Drugi sposób (funkcja remainder):\n");
  printf("8 mod 5 = %0.f\n", remainder(8, 5));
  printf("-8 mod 5 = %0.f\n", remainder(-8, 5));
  printf("8 mod -5 = %0.f\n", remainder(8, -5));
  printf("-8 mod -5 = %0.f\n", remainder(-8, -5));
  return 0;
}