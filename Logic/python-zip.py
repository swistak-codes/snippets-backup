# deklarujemy dwa zbiory
A = {1, 3, 5}
B = {2, 4, 5}
# otrzymujemy relację R z funkcji zip
R = zip(A, B)
# wypisujemy wynik
print(set(R)) # {(1, 2), (3, 4), (5, 5)}