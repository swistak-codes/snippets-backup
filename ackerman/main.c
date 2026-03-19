#include <stdio.h>
#include <time.h>

int a(int m, int n) {
  if (m == 0) {
    return n + 1;
  }
  if (m > 0 && n == 0) {
    return a(m - 1, 1);
  }
  return a(m - 1, a(m, n - 1));
}

void with_time(int (*func)(int, int), int m, int n) {
  struct timespec ts1, ts2;
  unsigned long long int time;
  clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &ts1);
  int f_result = func(m, n);
  clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &ts2);
  time = 1e9 * ts2.tv_sec + ts2.tv_nsec - (1e9 * ts1.tv_sec + ts1.tv_nsec);
  printf("A(%d, %d) = %d; czas: %llu ns\n", m, n, f_result, time);
}

int main(void) {
  with_time(a, 1, 4);
  with_time(a, 2, 4);
  with_time(a, 3, 4);
  with_time(a, 4, 1);
  return 0;
}