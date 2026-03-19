import time


def a(m, n):
  next = [0] * (m + 1)
  goal = [1] * (m + 1)
  goal[m] = -1
  value = 0

  while next[m] != n + 1:
    value = next[0] + 1
    transferring = True
    m_current = 0

    while transferring:
      if next[m_current] == goal[m_current]:
        goal[m_current] = value
      else:
        transferring = False
      next[m_current] += 1
      m_current += 1

  return value


# funkcja przyjmuje jako argument funkcję i jej argumenty
def measure(func, *args):
  # pobieramy czas początkowy z licznika process_time
  start = time.process_time_ns()
  # wykonujemy funkcję
  result = func(*args)
  # pobieramy czas końcowy
  end = time.process_time_ns()
  # obliczamy czas wykonania
  total_time = end - start
  # możesz tutaj zrobić cokolwiek chcesz z total_time
  # ja go wypisuję w konsoli
  print(f"Wynik: {result}; czas: {total_time} ns")


measure(a, 1, 4)
measure(a, 2, 4)
measure(a, 3, 4)
measure(a, 4, 1)
