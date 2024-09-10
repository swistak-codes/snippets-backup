# funkcja pomocnicza do zadania 3.5
# oblicza a^x mod M
def pow_mod(a, x, M):
  # zmienna z wynikiem
  result = 1
  # tak długo, jak wykładnik jest większy od 0
  while x > 0:
    # jeśli wykładnik jest nieparzysty
    if x % 2 != 0:
      # mnożymy wynik przez podstawę i liczymy modulo
      result = (result * a) % M
    # dzielimy wykładnik przez 2
    x = x // 2  # dzielenie całkowito-liczbowe
    # podnosimy podstawę do kwadratu i liczymy modulo
    a = (a * a) % M
  # zwracamy wynik
  return result


# zadanie 3.5
def task5(data):
  # zmienna przechowująca liczbę liczb spełniających warunek
  count = 0
  # iterujemy po kolejnych liczbach
  for (M, a, b) in data:
    # dla wszystkich x z przedziału [0..M-1]
    for x in range(M):
      # obliczamy a^x mod M
      a_x = pow_mod(a, x, M)
      # jeśli a^x mod M = b, to liczba spełnia warunek
      if a_x == b:
        count += 1
        # możemy przestać iterować dalej
        break
  # zwracamy wynik
  return count
