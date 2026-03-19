# deklarujemy trzy zbiory
A = {1, 3, 5}
B = {2, 4, 5}
C = {6, 7, 8}
# wypisujemy rezultat użycia funkcji intersection()
print(A.intersection(B))  # {5}
print(A.intersection(C))  # set()
# to samo uzyskamy stosując operator &
print(A & B) # {5}
print(A & C) # set()