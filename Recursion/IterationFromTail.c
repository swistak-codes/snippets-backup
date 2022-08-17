#include <stdio.h>

int fibonacci(int n) {
  int a = 0;
  int b = 1;
  while (n > 1) {
    int tmp = a; // zmienna pomocnicza do obliczenia wartości
    a = b;
    b = tmp + b;
    n -= 1;
  }
  if (n == 0) {
    return a;
  }
  return b;
}

int factorial(int n) {
  int acc = 1;
  while (n > 0) {
    acc = n * acc;
    n -= 1;
  }
  return acc;
}

int main(void) {
  for (int i = 0; i <= 10; i++) {
    printf("fibonacci(%d) = %d\n", i, fibonacci(i));
  }
  for (int i = 0; i <= 10; i++) {
    printf("factorial(%d) = %d\n", i, factorial(i));
  }
  return 0;
}