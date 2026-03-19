# deklarujemy dwa zbiory
A = {1, 3, 5}
B = {2, 4, 5}
# wypisujemy rezultat użycia funkcji difference()
print(A.difference(B))  # {1, 3}
print(B.difference(A))  # {2, 4}
# to samo uzyskamy stosując operator -
print(A - B) # {1, 3}
print(B - A) # {2, 4}
