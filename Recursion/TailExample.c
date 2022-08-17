#include <stdio.h>

int fib(int n, int a, int b) {
  if (n == 0) {
    return a;
  } else if (n == 1) {
    return b;
  } else {
    return fib(n - 1, b, a + b);
  }
}
int fibonacci(int n) {
  return fib(n, 0, 1);
}

int fac(int n, int acc) {
  if (n == 0) {
    return acc;
  } else {
    return fac(n - 1, n * acc);
  }
}
int factorial(int n) {
  return fac(n, 1);
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