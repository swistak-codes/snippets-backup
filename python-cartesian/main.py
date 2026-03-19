def cartesian(first, second):
  # skrócony zapis dwóch zagnieżdżonych pętli for
  return {(a, b) for a in first for b in second}

# deklarujemy dwa zbiory
A = {1, 3, 5}
B = {2, 4, 5}
# wypisujemy rezultat użycia funkcji cartesian()
print(cartesian(A, B))
# {(1, 2), (5, 5), (3, 4), (1, 5), (5, 4), (1, 4), (3, 2), (3, 5), (5, 2)}
print(cartesian(B, A))
# {(5, 5), (2, 1), (4, 3), (5, 1), (2, 3), (4, 5), (5, 3), (2, 5), (4, 1)}