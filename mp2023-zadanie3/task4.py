# funkcja pomocnicza do zadania 3.4
# oblicza NWD dwóch liczb
def gcd(a, b):
  # algorytm Euklidesa w wersji modulo
  while b != 0:
    temp = b
    b = a % b
    a = temp
  return a


# zadanie 3.4
def task4(data):
  # zmienna przechowująca liczbę liczb względnie pierwszych
  count = 0
  # iterujemy po kolejnych liczbach
  for (M, a, b) in data:
    # znajdujemy NWD liczba M i a
    gcd_Ma = gcd(M, a)
    # jeśli ich NWD jest równy 1 to są względnie pierwsze
    if gcd_Ma == 1:
      count += 1
  # zwracamy wynik
  return count
