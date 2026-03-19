import math


# zadanie 3.3
def task3(data):
  # zmienna przechowująca liczbę liczb pierwszych
  count = 0
  # iterujemy po kolejnych liczbach
  for (M, a, b) in data:
    # zmienna, gdzie zapiszemy, czy liczba jest pierwsza
    is_prime = True
    # sprawdzimy pierwszość metodą naiwną
    # iterując od 2 do sqrt(M)
    for i in range(2, int(math.sqrt(M)) + 1):
      # jeśli M jest podzielne przez i, to liczba nie jest pierwsza
      if M % i == 0:
        is_prime = False
        break
    # jeśli liczba była pierwsza, zwiększamy licznik
    if is_prime:
      count += 1
  # zwracamy wynik
  return count
