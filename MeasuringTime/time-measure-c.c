#include <stdio.h>
#include <time.h>

int a(int m, int n) {
  int next[m + 1];
  int goal[m + 1];
  for (int i = 0; i < m + 1; i++) {
    next[i] = 0;
    goal[i] = 1;
  }
  goal[m] = -1;
  int value;
  do {
    value = next[0] + 1;
    int transferring = 1;
    int m_current = 0;
    while (transferring) {
      if (next[m_current] == goal[m_current]) {
        goal[m_current] = value;
      } else {
        transferring = 0;
      }
      next[m_current] = next[m_current] + 1;
      m_current++;
    }
  } while (next[m] != n + 1);
  return value;
}

// pierwszy argument to wskaźnik na funkcję, pozostałe to jej argumenty
// int (*func)(int, int) czyli funkcja zwracająca int, przyjmująca dwa inty
void measure(int (*func)(int, int), int m, int n) {
  // ts1 i ts2 są typu struktury timespec
  // przechowuje czas rozbity na sekundy i nanosekundy
  struct timespec ts1, ts2;
  // w time przechowamy obliczony przez nas wynik
  // zmienna przechowa liczbę 64-bitową bez znaku
  unsigned long long int time;
  // pobieramy początkowy moment czasu
  // CLOCK_PROCESS_CPUTIME_ID to czas zajmowania CPU przez proces
  clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &ts1);
  // wykonujemy przekazaną funkcję
  int f_result = func(m, n);
  // i ściągamy czas po wykonaniu
  clock_gettime(CLOCK_PROCESS_CPUTIME_ID, &ts2);
  // obliczamy róznicę czasu
  time = 1e9 * ts2.tv_sec + ts2.tv_nsec - (1e9 * ts1.tv_sec + ts1.tv_nsec);
  // tu możesz zrobić co chcesz z tym czasem, ja wypisuję w konsoli razem z
  // wynikiem
  printf("Wynik: %d; czas: %llu ns\n", f_result, time);
}

int main(void) {
  measure(a, 1, 4);
  measure(a, 2, 4);
  measure(a, 3, 4);
  measure(a, 4, 1);
  return 0;
}