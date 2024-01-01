#include <stdio.h>
#include <time.h>

// funkcja Ackermanna
int a(int m, int n) {
  // inicjalizujemy tablice które pomogą nam przechować
  // cząstkowe rozwiązania
  int next[m + 1];
  int goal[m + 1];
  // tablicę next zapełniamy wartościami 0
  // tablicę goal wartościami 1
  for (int i = 0; i < m + 1; i++) {
    next[i] = 0;
    goal[i] = 1;
  }
  // goal[m] nadajemy wartość -1
  goal[m] = -1;
  // inicjalizujemy zmienną, w której zapiszemy wynik
  int value;
  // iterujemy tak długo, jak next[m] jest różne od n+1
  // stosujemy do..while ponieważ musimy wykonać przynajmniej jeden przebieg
  do {
    // zaczynamy od pierwszej zapamiętanej wartości zwiększonej o 1
    value = next[0] + 1;
    // zmienna określająca jak długo będziemy w wewnętrznej pętli
    int transferring = 1;
    // zmienna przechowująca aktualną wartość m
    // będziemy wewnątrz pętli zwiększać ją o 1
    int m_current = 0;
    // pętla szukająca kolejnych wartości
    while (transferring) {
      if (next[m_current] == goal[m_current]) {
        // jeśli wartości next i goal są takie same, zmieniamy wartość goal na
        // value
        goal[m_current] = value;
      } else {
        // w przeciwntym wypadku będziemy mogli wyjść z pętli po zakończeniu
        // aktualnej iteracji
        transferring = 0;
      }
      // zwiększamy wartość aktualnego next
      next[m_current] = next[m_current] + 1;
      // zwiększamy wartość aktualnego m
      m_current++;
    }
  } while (next[m] != n + 1);
  // zwracamy wynik
  return value;
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