#include <stdio.h>

int fibonacci(int n) {
  if (n == 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  } else {
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}

int factorial(int n) {
  if (n == 0) {
    return 1;
  } else {
    return factorial(n - 1) * n;
  }
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