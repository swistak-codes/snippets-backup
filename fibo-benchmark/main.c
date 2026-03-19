#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>

const int REPEATS = 10;
const int MAX_N = 41;

int recursive(int n) {
  if (n == 0) {
    return 0;
  } else if (n == 1) {
    return 1;
  } else {
    return recursive(n - 1) + recursive(n - 2);
  }
}

int do_tail(int n, int a, int b) {
  if (n == 0) {
    return a;
  } else if (n == 1) {
    return b;
  } else {
    return do_tail(n - 1, b, a + b);
  }
}
int tail(int n) {
  return do_tail(n, 0, 1);
}

int iteration_tail(int n) {
  int a = 0;
  int b = 1;
  while (n > 1) {
    int tmp = a;
    a = b;
    b = tmp + b;
    n -= 1;
  }
  if (n == 0) {
    return a;
  }
  return b;
}

int iteration_stack(int n) {
  int currentAddress = 10;
  int currentResult = 0;
  int tempResult = 0;
  int stack[1024];
  int stackPtr = -1;
  stack[++stackPtr] = 40;
  stack[++stackPtr] = currentResult;
  stack[++stackPtr] = n;
  while (stackPtr > -1) {   
    switch (currentAddress) {
      case 10:
        n = stack[stackPtr--];
        tempResult = stack[stackPtr--];
        if (n == 0) {
          currentAddress = stack[stackPtr--];
          currentResult = 0;
        } else if (n == 1) {
          currentAddress = stack[stackPtr--];
          currentResult = 1;
        } else {
          stack[++stackPtr] = tempResult;
          stack[++stackPtr] = n;
          stack[++stackPtr] = 20;
          stack[++stackPtr] = tempResult;
          stack[++stackPtr] = n - 1;
          currentAddress = 10;
        }
        break;
      case 20:
        n = stack[stackPtr--];
        tempResult = stack[stackPtr--];
        stack[++stackPtr] = currentResult;
        stack[++stackPtr] = n;
        stack[++stackPtr] = 30;
        stack[++stackPtr] = tempResult;
        stack[++stackPtr] = n - 2;
        currentAddress = 10;
        break;
      case 30:
        n = stack[stackPtr--];
        currentResult += stack[stackPtr--];
        currentAddress = stack[stackPtr--];
        break;
      case 40:
        stackPtr = -1;
        break;
    }
  }
  return currentResult;
}

int iteration_cache[100];
int iteration(int n) {
  if (n <= 1) {
    return iteration_cache[n] = n;
  }
  return iteration_cache[n] = iteration_cache[n - 1] + iteration_cache[n - 2];
}

int binet(int n) {
  return 1.0/sqrt(5) * (pow((1.0 + sqrt(5)) / 2.0, n) - pow((1.0 - sqrt(5)) / 2.0, n));
}

void do_test(int (*func)(int), long double result[MAX_N]) {
  unsigned long long int sum;
  struct timespec ts1, ts2;
  int i, j, f_result;
  unsigned long long int time;

  for (i = 0; i < MAX_N; i++) {
    sum = 0;
    for (j = 0; j < REPEATS; j++) {
      clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &ts1);
      f_result = func(i);
      clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &ts2);
      time = 1e9*ts2.tv_sec + ts2.tv_nsec - (1e9*ts1.tv_sec + ts1.tv_nsec);
      printf("i = %d, j = %d, f_result = %d, time = %llu\n", i, j, f_result, time);
      sum += time;
    }
    result[i] = sum / (double)REPEATS;
    printf("avg = %.2Lf\n", result[i]);
  }
}

int main(void) {
  long double recursive_t[MAX_N];
  long double tail_t[MAX_N];
  long double iteration_tail_t[MAX_N];
  long double iteration_stack_t[MAX_N];
  long double iteration_t[MAX_N];
  long double binet_t[MAX_N];
  do_test(recursive, recursive_t);
  do_test(tail, tail_t);
  do_test(iteration_tail, iteration_tail_t);
  do_test(iteration_stack, iteration_stack_t);
  do_test(iteration, iteration_t);
  do_test(binet, binet_t);

  FILE *fp;
  fp = fopen("results.csv", "w");
  fputs("rekurencyjny;rekurencyjny ogonowy;iteracyjny z r. ogonowej;iteracyjny (stos);iteracyjny (opt.);Binet\n", fp);
  for (int i = 0; i < MAX_N; i++) {
    fprintf(fp, "%Lf;%Lf;%Lf;%Lf;%Lf;%Lf\n", recursive_t[i], tail_t[i], iteration_tail_t[i], iteration_stack_t[i], iteration_t[i], binet_t[i]);
  }
  fclose(fp);

  return 0;
}