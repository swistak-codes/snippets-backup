# deklarujemy dwa zbiory stosując klamry
A = {1, 3, 5}
B = {2, 4, 5}
# wypisujemy rezultat użycia funkcji union()
print(A.union(B))  # {1, 2, 3, 4, 5}
# to samo uzyskamy stosując operator |
print(A | B) # {1, 2, 3, 4, 5}