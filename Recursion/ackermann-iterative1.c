#include <stdio.h>
#include <time.h>

// obsługa stosu
int stack[65536];
int top = -1;

int pop() {
  int data = stack[top];
  top--;
  return data;
}

void push(int data) {
  top++;
  stack[top] = data;
}

// funkcja Ackermanna
int a(int m, int n) {
  // dodajemy na stos wartości m i n
  push(m);
  push(n);
  // zmienne do których będziemy pobierać wartości
  int m_current, n_current;
  // tak długo jak na stosie jest więcej niż jedna wartość
  while (top > 0) {
    // ściągamy wartości m i n ze stosu
    n_current = pop();
    m_current = pop();
    if (m_current == 0) {
      // przypadek: A(0, n) = n + 1
      push(n_current + 1);
    } else if (n_current == 0) {
      // przypadek A(m, 0) = A(m - 1, 1)
      push(m_current - 1);
      push(1);
    } else {
      // przypadek A(m, n) = A(m - 1, A(m, n - 1))
      push(m_current - 1);
      push(m_current);
      push(n_current - 1);
    }
  }
  // ostatnia wartość jaka została na stosie to wynik
  return pop();
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